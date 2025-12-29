import type { FC, PropsWithChildren, CSSProperties } from "react";

type OGXComponentProps = PropsWithChildren<{
	tw?: string;
	style?: CSSProperties;
}>;

export const Box: FC<OGXComponentProps> = ({ tw, children, style }) => (
	<div tw={tw} style={style}>
		{children}
	</div>
);

export const Stack: FC<OGXComponentProps> = ({ tw, children, style }) => (
	<div tw={`flex flex-col ${tw || ""}`} style={style}>
		{children}
	</div>
);

export const Row: FC<OGXComponentProps> = ({ tw, children, style }) => (
	<div tw={`flex flex-row ${tw || ""}`} style={style}>
		{children}
	</div>
);

export const Absolute: FC<OGXComponentProps> = ({ tw, children, style }) => (
	<div tw={`absolute inset-0 flex ${tw || ""}`} style={style}>
		{children}
	</div>
);

export const Grid: FC<OGXComponentProps> = ({ tw, children, style }) => (
	<div tw={`flex flex-row flex-wrap ${tw || ""}`} style={style}>
		{children}
	</div>
);

export const Header: FC<OGXComponentProps> = ({ tw, children, style }) => (
	<div tw={`flex ${tw || ""}`} style={style}>
		{children}
	</div>
);

export const Footer: FC<OGXComponentProps> = ({ tw, children, style }) => (
	<div tw={`flex ${tw || ""}`} style={style}>
		{children}
	</div>
);

export const Main: FC<OGXComponentProps> = ({ tw, children, style }) => (
	<div tw={`flex ${tw || ""}`} style={style}>
		{children}
	</div>
);

export const H1: FC<OGXComponentProps> = ({ tw, children, style }) => (
	<div tw={`flex text-6xl font-bold ${tw || ""}`} style={style}>
		{children}
	</div>
);

export const H2: FC<OGXComponentProps> = ({ tw, children, style }) => (
	<div tw={`flex text-4xl font-semibold ${tw || ""}`} style={style}>
		{children}
	</div>
);

export const P: FC<OGXComponentProps> = ({ tw, children, style }) => (
	<div tw={`flex text-lg text-slate-400 ${tw || ""}`} style={style}>
		{children}
	</div>
);

export const Span: FC<OGXComponentProps> = ({ tw, children }) => (
	<div tw={tw}>{children}</div>
);

export const Spacer: FC<{ size?: string | number; tw?: string }> = ({
	size,
	tw,
}) => {
	const style: CSSProperties = {};
	if (typeof size === "number") {
		style.flex = `0 0 ${size}px`;
	} else if (size) {
		// Handled by tw class w-{size}
	} else {
		style.flex = 1;
	}

	return (
		<div
			tw={`${size && typeof size === "string" ? `w-${size}` : "flex-1"} ${
				tw || ""
			}`}
			style={style}
		/>
	);
};

export const Card: FC<OGXComponentProps> = ({ tw, children }) => (
	<Stack
		tw={`bg-white shadow-lg rounded-2xl p-8 border border-slate-100 ${tw || ""}`}
	>
		{children}
	</Stack>
);

export const Badge: FC<{
	children: React.ReactNode;
	color?: "blue" | "green" | "purple" | "slate" | "emerald" | "amber" | "rose";
}> = ({ children, color = "blue" }) => {
	const variants = {
		blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
		green: "bg-green-500/10 text-green-500 border-green-500/20",
		purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
		slate: "bg-slate-500/10 text-slate-500 border-slate-500/20",
		emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
		amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
		rose: "bg-rose-500/10 text-rose-500 border-rose-500/20",
	};
	const [bg, tx, border] = variants[color].split(" ");
	return (
		<div tw={`flex ${bg} ${border} px-3 py-1 rounded-full border`}>
			<span tw={`${tx} text-sm font-bold`}>{children}</span>
		</div>
	);
};
