import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import { BookText, Logs, TestTubeDiagonal } from "lucide-react";
import Image from "next/image";

export const linksItems: LinkItemType[] = [
	{
		text: "Docs",
		url: "/docs",
		icon: <BookText className="w-5 h-5" />,
		active: "url",
	},
	{
		text: "Playground",
		url: "/playground",
		icon: <TestTubeDiagonal className="w-5 h-5" />,
		active: "url",
	},
	{
		text: "Changelog",
		url: "/changelog",
		icon: <Logs className="w-5 h-5" />,
		active: "url",
	},
];

export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: (
				<div className="flex items-center gap-2">
					<Image
						alt="OGX"
						src="/logo.svg"
						width={24}
						height={24}
						className="w-6 h-6"
						aria-label="OGX"
					/>
					<span className="font-bold">OGX</span>
				</div>
			),
		},
		links: linksItems,

		githubUrl: "https://github.com/carlosedujs/ogx",
	};
}
