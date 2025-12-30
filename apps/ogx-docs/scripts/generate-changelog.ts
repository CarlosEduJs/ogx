import fs from "node:fs";
import path from "node:path";

interface Release {
	version: string;
	date: string;
	title: string;
	description?: string;
	npmLink: string;
	changes: {
		type: "added" | "fixed" | "changed" | "performance" | "security";
		items: string[];
	}[];
	isLatest?: boolean;
	scope:
		| "ogxjs-core"
		| "ogxjs-next"
		| "ogxjs-react"
		| "ogxjs-playground"
		| "global";
}

function parseChangelog(changelogPath: string): Release[] {
	const content = fs.readFileSync(changelogPath, "utf-8");
	const releases: Release[] = [];

	const sections = content.split(/(?=## \[@?)/);

	for (const section of sections) {
		// Match: ## [@ogxjs/core 0.1.2] - 2025-12-30 OR ## [0.1.0] - 2025-12-28
		const releaseMatch = section.match(
			/## \[(@ogxjs\/(core|next|react)|[\d.]+)\s*([\d.]+)?\] - (\d{4}-\d{2}-\d{2})/,
		);
		if (!releaseMatch) continue;

		const [, packageOrVersion, , versionPart, date] = releaseMatch;

		const isGlobalRelease = /^[\d.]+$/.test(packageOrVersion);
		const version = isGlobalRelease ? packageOrVersion : versionPart;

		let scope: Release["scope"] = "global";
		let versionPrefix = "";

		if (!isGlobalRelease) {
			if (packageOrVersion.includes("core")) {
				scope = "ogxjs-core";
				versionPrefix = "core-";
			} else if (packageOrVersion.includes("next")) {
				scope = "ogxjs-next";
				versionPrefix = "next-";
			} else if (packageOrVersion.includes("react")) {
				scope = "ogxjs-react";
				versionPrefix = "react-";
			}
		}

		// Extrair título - primeira linha de texto após o header (não vazia, não ###)
		const lines = section.split("\n");
		let title = `Release ${version}`;

		for (let i = 1; i < lines.length; i++) {
			const line = lines[i].trim();
			if (
				line &&
				!line.startsWith("###") &&
				!line.startsWith("##") &&
				!line.startsWith("-") &&
				!/^\[.+\]:/.test(line)
			) {
				title = line;
				break;
			}
		}

		if (title === `Release ${version}`) {
			if (section.includes("### Security")) title = "Security Patch";
			else if (section.includes("### Fixed")) title = "Bug Fixes";
			else if (section.includes("### Added")) title = "New Features";
			else if (section.includes("### Performance"))
				title = "Performance Improvements";
		}

		const changesMap = new Map<string, string[]>();
		const typeMatches = [
			...section.matchAll(
				/### (Added|Fixed|Changed|Performance|Security)\n([\s\S]*?)(?=###|$)/gi,
			),
		];

		for (const match of typeMatches) {
			const type = match[1].toLowerCase();
			const content = match[2];

			if (!changesMap.has(type)) {
				changesMap.set(type, []);
			}

			const items = changesMap.get(type)!;

			const itemMatches = content.matchAll(/^[\s]*-\s+(.+?)$/gm);
			for (const itemMatch of itemMatches) {
				const item = itemMatch[1].trim();
				if (item) {
					const formatted = item
						.replace(/&/g, "&amp;")
						.replace(/</g, "&lt;")
						.replace(/>/g, "&gt;")
						.replace(/"/g, "&quot;")
						.replace(/'/g, "&#039;")
						.replace(
							/`([^`]+)`/g,
							'<code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">$1</code>',
						);
					items.push(formatted);
				}
			}
		}

		const changes: Release["changes"] = Array.from(changesMap.entries())
			.filter(([_, items]) => items.length > 0)
			.map(([type, items]) => ({
				type: type as any,
				items,
			}));

		const packageName =
			scope === "global" ? "core" : scope.replace("ogxjs-", "");
		const npmLink = `https://www.npmjs.com/package/@ogxjs/${packageName}/v/${version}`;
		if (version === "0.1.0") {
			title = "Initial Release";
		}

		releases.push({
			scope,
			version: `${versionPrefix}v${version}`,
			date,
			title,
			npmLink,
			changes,
			...(version === "0.1.0" ? { isLatest: false } : {}),
		});
	}

	return releases;
}

const changelogPath = path.join(process.cwd(), "../../CHANGELOG.md");
const outputPath = path.join(
	process.cwd(),
	"src/app/changelog/_constantes/releasesData.ts",
);

const releases = parseChangelog(changelogPath);

const releasesStr = JSON.stringify(releases, null, "\t").replace(
	/"(\w+)":/g,
	"$1:",
);

const output = `// Auto-generated from CHANGELOG.md - DO NOT EDIT MANUALLY
// Run 'pnpm generate:changelog' to update

interface Release {
	version: string;
	date: string;
	title: string;
	description?: string;
	npmLink: string;
	changes: {
		type: "added" | "fixed" | "changed" | "performance" | "security";
		items: string[];
	}[];
	isLatest?: boolean;
	scope:
		| "ogxjs-core"
		| "ogxjs-next"
		| "ogxjs-react"
		| "ogxjs-playground"
		| "global";
}

export const releases: Release[] = ${releasesStr};
`;

fs.writeFileSync(outputPath, output, "utf-8");
console.log("Generated releasesData.ts from CHANGELOG.md");
