import type { RenderFieldExtensionCtx, Field } from 'datocms-plugin-sdk';

export const getValue = (ctx: RenderFieldExtensionCtx, field: Field | undefined) => {
	if (field?.attributes.api_key) {
		if (field.attributes.localized) {
			return (ctx.formValues[field.attributes.api_key] as Record<string, string>)[ctx.locale];
		} else {
			return ctx.formValues[field.attributes.api_key] as string;
		}
	}
	return undefined;
};
