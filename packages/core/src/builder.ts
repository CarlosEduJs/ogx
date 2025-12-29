import type {
	OGXChildren,
	OGXElement,
	OGXElementProps,
	TailwindSpacing,
	TailwindUtility,
} from "./types";

/**
 * Universal element factory (h/createElement style)
 */
export function h(
	type: string,
	props: OGXElementProps | string | TailwindUtility[] = {},
	children?: OGXChildren,
): OGXElement {
	// Shorthand: h('div', 'bg-blue-500', 'Hello')
	if (typeof props === "string" || Array.isArray(props)) {
		return {
			type,
			props: {
				tw: normalizeTW(props as any) as any,
				children,
			},
		};
	}

	return {
		type,
		props: {
			...(props as OGXElementProps),
			children: children ?? (props as OGXElementProps).children,
		},
	};
}

/** Internal helper to normalize tailwind utilities into a flat array of single classes */
function normalizeTW(tw?: TailwindUtility | TailwindUtility[]): any[] {
	if (!tw) return [];
	if (Array.isArray(tw)) {
		// Even if it is an array, some elements might be strings with spaces
		return tw.flatMap((item) =>
			typeof item === "string" ? item.split(/\s+/).filter(Boolean) : [item],
		);
	}
	return tw.split(/\s+/).filter(Boolean);
}

/** Create a div element */
export const div = (
	tw?: TailwindUtility | TailwindUtility[],
	children?: OGXChildren,
	props?: Omit<OGXElementProps, "tw" | "children">,
) =>
	h("div", {
		tw: ["flex", ...normalizeTW(tw)],
		children,
		...props,
	});

/** Create a span element */
export const span = (
	tw?: TailwindUtility | TailwindUtility[],
	children?: OGXChildren,
	props?: Omit<OGXElementProps, "tw" | "children">,
) => h("span", { tw: normalizeTW(tw), children, ...props });

/** Create an img element */
export const img = (
	src: string,
	tw?: TailwindUtility | TailwindUtility[],
	props?: Omit<OGXElementProps, "tw" | "src">,
) => h("img", { src, tw: normalizeTW(tw), ...props });

/** Create a vertical stack (flex-col) */
export const stack = (
	tw?: TailwindUtility | TailwindUtility[],
	children?: OGXChildren,
	props?: Omit<OGXElementProps, "tw" | "children">,
) =>
	h("div", {
		tw: ["flex", "flex-col", ...normalizeTW(tw)],
		children,
		...props,
	});

/** Create a horizontal row (flex-row) */
export const row = (
	tw?: TailwindUtility | TailwindUtility[],
	children?: OGXChildren,
	props?: Omit<OGXElementProps, "tw" | "children">,
) =>
	h("div", {
		tw: ["flex", "flex-row", ...normalizeTW(tw)],
		children,
		...props,
	});

/** Create an absolute positioned overlay */
export const absolute = (
	tw?: TailwindUtility | TailwindUtility[],
	children?: OGXChildren,
	props?: Omit<OGXElementProps, "tw" | "children">,
) =>
	h("div", {
		tw: ["absolute", "inset-0", "flex", ...normalizeTW(tw)],
		children,
		...props,
	});

/** Create a grid-like layout (flex-row with wrap) */
export const grid = (
	tw?: TailwindUtility | TailwindUtility[],
	children?: OGXChildren,
	props?: Omit<OGXElementProps, "tw" | "children">,
) =>
	h("div", {
		tw: ["flex", "flex-row", "flex-wrap", ...normalizeTW(tw)],
		children,
		...props,
	});

/** Create a semantic header */
export const header = (
	tw?: TailwindUtility | TailwindUtility[],
	children?: OGXChildren,
	props?: Omit<OGXElementProps, "tw" | "children">,
) =>
	h("div", {
		tw: ["flex", ...normalizeTW(tw)],
		children,
		...props,
	});

/** Create a semantic footer */
export const footer = (
	tw?: TailwindUtility | TailwindUtility[],
	children?: OGXChildren,
	props?: Omit<OGXElementProps, "tw" | "children">,
) =>
	h("div", {
		tw: ["flex", ...normalizeTW(tw)],
		children,
		...props,
	});

/** Create a semantic main content area */
export const main = (
	tw?: TailwindUtility | TailwindUtility[],
	children?: OGXChildren,
	props?: Omit<OGXElementProps, "tw" | "children">,
) =>
	h("div", {
		tw: ["flex", ...normalizeTW(tw)],
		children,
		...props,
	});

/** Create a spacer (flex-1 or custom size) */
export const spacer = (
	size?: TailwindSpacing | number,
	tw?: TailwindUtility | TailwindUtility[],
) => {
	const style: any = {};
	if (typeof size === "number") {
		style.flex = `0 0 ${size}px`;
	} else if (size) {
		// If it's a tailwind spacing string, it will be handled by the parser in tw
	} else {
		style.flex = 1;
	}
	return h("div", {
		tw: [
			size && typeof size === "string" ? (`w-${size}` as any) : "flex-1",
			...normalizeTW(tw),
		],
		style,
	});
};

/**
 * Semantic Typography
 */
export const h1 = (
	tw?: TailwindUtility | TailwindUtility[],
	children?: OGXChildren,
) =>
	h("div", {
		tw: ["flex", "text-6xl", "font-bold", ...normalizeTW(tw)],
		children,
	});

export const h2 = (
	tw?: TailwindUtility | TailwindUtility[],
	children?: OGXChildren,
) =>
	h("div", {
		tw: ["flex", "text-4xl", "font-semibold", ...normalizeTW(tw)],
		children,
	});

export const p = (
	tw?: TailwindUtility | TailwindUtility[],
	children?: OGXChildren,
) =>
	h("div", {
		tw: ["flex", "text-lg", "text-slate-400", ...normalizeTW(tw)],
		children,
	});

/**
 * Fluent Builder API (Chainable)
 */
export class FluentBuilder {
	private _element: OGXElement;

	constructor(element: OGXElement) {
		this._element = element;
	}

	get element() {
		return this._element;
	}

	// Layout
	gap(val: TailwindSpacing) {
		this._add(`gap-${val}`);
		return this;
	}
	padding(val: TailwindSpacing) {
		this._add(`p-${val}`);
		return this;
	}
	px(val: TailwindSpacing) {
		this._add(`px-${val}`);
		return this;
	}
	py(val: TailwindSpacing) {
		this._add(`py-${val}`);
		return this;
	}
	margin(val: TailwindSpacing) {
		this._add(`m-${val}`);
		return this;
	}
	mt(val: TailwindSpacing) {
		this._add(`mt-${val}`);
		return this;
	}
	rounded(val: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full" = "md") {
		this._add(`rounded-${val}`);
		return this;
	}

	// Flex
	center() {
		this._add("items-center justify-center");
		return this;
	}
	itemsCenter() {
		this._add("items-center");
		return this;
	}
	justifyCenter() {
		this._add("justify-center");
		return this;
	}
	justifyBetween() {
		this._add("justify-between");
		return this;
	}

	// Style
	bg(color: string) {
		this._add(`bg-${color}`);
		return this;
	}
	text(color: string) {
		this._add(`text-${color}`);
		return this;
	}
	border(color?: string) {
		this._add("border");
		if (color) this._add(`border-${color}`);
		return this;
	}
	shadow(val: "sm" | "md" | "lg" | "xl" | "2xl" = "md") {
		this._add(`shadow-${val}`);
		return this;
	}
	opacity(val: string) {
		this._add(`opacity-${val}`);
		return this;
	}

	private _add(tw: string) {
		const current = this._element.props.tw || [];
		const next = Array.isArray(current) ? [...current] : [current as any];
		next.push(...tw.split(/\s+/));
		this._element.props.tw = next;
	}
}

/** Wrap an element for fluent chaining */
export const fluent = (el: OGXElement) => new FluentBuilder(el);

/**
 * High-level Primitives
 */

/** Create a card container */
export const card = (
	tw?: TailwindUtility | TailwindUtility[],
	children?: OGXChildren,
) =>
	stack(
		[
			"bg-white",
			"shadow-lg",
			"rounded-2xl",
			"p-8",
			"border",
			"border-slate-100",
			...normalizeTW(tw),
		],
		children,
	);

/** Create a badge/pill */
export const badge = (
	text: string,
	color: "blue" | "green" | "purple" | "slate" = "blue",
) => {
	const variants = {
		blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
		green: "bg-green-500/10 text-green-500 border-green-500/20",
		purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
		slate: "bg-slate-500/10 text-slate-500 border-slate-500/20",
	};
	const [bg, tx, border] = variants[color].split(" ");
	return div(
		[bg as any, border as any, "px-3", "py-1", "rounded-full", "border"],
		[span([tx as any, "text-sm", "font-bold"], text)],
	);
};

/**
 * External Asset Helpers
 */

/** Helper to use a raw SVG string directly in img */
export function svgFromContent(svg: string): string {
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/** Proxy/Alias for URLs */
export function imgFromUrl(url: string): string {
	return url;
}
