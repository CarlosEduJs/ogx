/**
 * CSS properties supported by Satori
 * This is a subset of React.CSSProperties optimized for OG image generation
 */
export interface CSSProperties {
	// Layout
	display?: "flex" | "none";
	position?: "relative" | "absolute";
	flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
	flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
	flexGrow?: number;
	flexShrink?: number;
	flexBasis?: number | string;
	alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
	alignContent?:
		| "flex-start"
		| "flex-end"
		| "center"
		| "space-between"
		| "space-around"
		| "stretch";
	alignSelf?:
		| "auto"
		| "flex-start"
		| "flex-end"
		| "center"
		| "baseline"
		| "stretch";
	justifyContent?:
		| "flex-start"
		| "flex-end"
		| "center"
		| "space-between"
		| "space-around"
		| "space-evenly";
	gap?: number | string;
	columnGap?: number | string;
	rowGap?: number | string;

	// Sizing
	width?: number | string;
	height?: number | string;
	minWidth?: number | string;
	minHeight?: number | string;
	maxWidth?: number | string;
	maxHeight?: number | string;

	// Spacing
	margin?: number | string;
	marginTop?: number | string;
	marginRight?: number | string;
	marginBottom?: number | string;
	marginLeft?: number | string;
	padding?: number | string;
	paddingTop?: number | string;
	paddingRight?: number | string;
	paddingBottom?: number | string;
	paddingLeft?: number | string;

	// Position
	top?: number | string;
	right?: number | string;
	bottom?: number | string;
	left?: number | string;

	// Border
	border?: string;
	borderWidth?: number | string;
	borderStyle?: "solid" | "dashed";
	borderColor?: string;
	borderTop?: string;
	borderRight?: string;
	borderBottom?: string;
	borderLeft?: string;
	borderRadius?: number | string;
	borderTopLeftRadius?: number | string;
	borderTopRightRadius?: number | string;
	borderBottomLeftRadius?: number | string;
	borderBottomRightRadius?: number | string;

	// Background
	backgroundColor?: string;
	backgroundImage?: string;
	backgroundPosition?: string;
	backgroundSize?: string;
	backgroundClip?: "border-box" | "text";
	backgroundRepeat?: "repeat" | "repeat-x" | "repeat-y" | "no-repeat";

	// Typography
	color?: string;
	fontFamily?: string;
	fontSize?: number | string;
	fontWeight?: number | string;
	fontStyle?: "normal" | "italic";
	lineHeight?: number | string;
	letterSpacing?: number | string;
	textAlign?: "left" | "right" | "center" | "justify";
	textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
	textDecoration?: string;
	textOverflow?: "clip" | "ellipsis";
	textShadow?: string;
	whiteSpace?: "normal" | "pre" | "pre-wrap" | "pre-line" | "nowrap";
	wordBreak?: "normal" | "break-all" | "break-word" | "keep-all";

	// Visual
	opacity?: number;
	overflow?: "visible" | "hidden";
	boxShadow?: string;
	transform?: string;
	transformOrigin?: string;
	objectFit?: "contain" | "cover" | "none";
	objectPosition?: string;
	filter?: string;
	clipPath?: string;
}
