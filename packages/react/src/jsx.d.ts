import "react";

declare module "react" {
	interface HTMLAttributes<T>
		extends React.AriaAttributes,
			React.DOMAttributes<T> {
		/**
		 * Tailwind-like utility classes for OGX.
		 * Supports standard Tailwind classes and OGX extensions.
		 */
		tw?: string | string[];
	}

	interface SVGAttributes<T>
		extends React.AriaAttributes,
			React.DOMAttributes<T> {
		/**
		 * Tailwind-like utility classes for OGX.
		 */
		tw?: string | string[];
	}
}
