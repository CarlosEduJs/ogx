import type { ReactNode } from "react";

export function ControlGroup({
	icon,
	label,
	children,
}: {
	icon: ReactNode;
	label: string;
	children: ReactNode;
}) {
	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2 text-zinc-400 border-b border-white/5 pb-2">
				{icon}
				<span className="text-xs font-bold uppercase tracking-wide">
					{label}
				</span>
			</div>
			{children}
		</div>
	);
}

export function Field({
	label,
	children,
}: {
	label: ReactNode;
	children: ReactNode;
}) {
	return (
		<div className="space-y-2">
			<div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
				{label}
			</div>
			{children}
		</div>
	);
}

export function CopyIcon(props: any) {
	return (
		<svg
			role="img"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<title>Copy Icon</title>
			<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
			<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
		</svg>
	);
}
