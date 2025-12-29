import { type BlogPresetProps, blogPreset } from "./blog";
import { type DocsPresetProps, docsPreset } from "./docs";
import { type MinimalPresetProps, minimalPreset } from "./minimal";
import { type SocialPresetProps, socialPreset } from "./social";

export const presets = {
	docs: docsPreset,
	blog: blogPreset,
	minimal: minimalPreset,
	social: socialPreset,
} as const;

export type PresetName = keyof typeof presets;

export interface PresetProps {
	docs: DocsPresetProps;
	blog: BlogPresetProps;
	minimal: MinimalPresetProps;
	social: SocialPresetProps;
}

export { docsPreset, blogPreset, minimalPreset, socialPreset };
export type {
	DocsPresetProps,
	BlogPresetProps,
	MinimalPresetProps,
	SocialPresetProps,
};
