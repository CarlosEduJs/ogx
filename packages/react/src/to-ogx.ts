import type { OGXChildren, OGXElement } from "@ogxjs/core";
import React from "react";

/**
 * Transforms a React node tree into an OGX-compatible element tree.
 * Maps `className` or `tw` props to the internal `tw` property.
 * Correcty resolves functional components and Fragments.
 */
export function toOGX(node: React.ReactNode): OGXChildren {
	if (node === null || node === undefined || typeof node === "boolean") {
		return null;
	}

	if (typeof node === "string" || typeof node === "number") {
		return node;
	}

	if (Array.isArray(node)) {
		return node.map((c) => toOGX(c)) as any;
	}

	if (React.isValidElement(node)) {
		const { type, props } = node;

		// Resolve Fragments
		if (type === React.Fragment) {
			return toOGX((props as any).children);
		}

		// Resolve Functional Components
		if (typeof type === "function") {
			try {
				const Component = type as (props: unknown) => React.ReactNode;
				const resolved = Component(props);
				return toOGX(resolved);
			} catch (err) {
				// Only log detailed errors in development to avoid information disclosure
				if (process.env.NODE_ENV !== "production") {
					console.error(
						"OGX: Failed to resolve functional component:",
						type.name,
						err,
					);
				}
				return null;
			}
		}

		const { children, className, tw, ...rest } = props as any;

		return {
			type: type as string,
			props: {
				...rest,
				tw: tw || className,
				children: toOGX(children) as any,
			},
		} as any as OGXElement;
	}

	// Fallback for plain objects that look like OGX elements (type + props)
	if (typeof node === "object" && "type" in node && "props" in (node as any)) {
		const ogx = node as any as OGXElement;
		return {
			type: ogx.type,
			props: {
				...ogx.props,
				children: toOGX(ogx.props.children as any) as any,
			},
		} as any as OGXElement;
	}

	return null;
}
