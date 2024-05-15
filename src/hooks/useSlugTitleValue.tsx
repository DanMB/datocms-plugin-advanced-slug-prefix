import { Field, RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { useEffect, useRef } from 'react';
import { getValue } from '../utils/getValue';

export const useSlugTitleValue = (ctx: RenderFieldExtensionCtx) => {
	const field = useRef<Field | undefined>();

	const titleId = (ctx.field.attributes.validators.slug_title_field as Record<string, string> | undefined)
		?.title_field_id;

	useEffect(() => {
		ctx.loadItemTypeFields(ctx.itemType.id).then(fields => {
			field.current = fields.find(field => field.id === titleId);
		});
	}, [titleId]);

	const title = getValue(ctx, field.current);

	return title;
};
