import type { Field, RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { SelectInput } from 'datocms-react-ui';
import { useEffect, useRef, useState } from 'react';
import { getValue } from '../utils/getValue';

export const SelectPrefix = ({ ctx }: { ctx: RenderFieldExtensionCtx }) => {
	const [value, setValue] = useState<{ value: string; label: string } | undefined>();
	const [prefixes, setPrefixes] = useState<{ value: string; label: string }[]>([]);
	const field = useRef<Field | undefined>();

	useEffect(() => {
		const key = field.current?.attributes.api_key;
		if (key) ctx.setFieldValue(key, value?.value);
	}, [value]);

	useEffect(() => {
		ctx.loadItemTypeFields(ctx.itemType.id).then(fields => {
			const prefixFields = fields.filter(
				field => field.attributes.appearance.field_extension === 'AdvancedSlug__Prefix'
			);
			if (prefixFields.length > 1) {
				ctx.alert('This item has more than one slug prefix fields.');
				return;
			} else if (prefixFields.length < 1) {
				return;
			}

			field.current = prefixFields[0];

			const prefixes = (field.current?.attributes.validators.enum as Record<string, string[]> | undefined)?.values;
			if (!prefixes) {
				ctx.alert(`No prefixes found in config of field ${field.current?.attributes.api_key}#${field.current?.id}`);
				return;
			}

			let value = getValue(ctx, field.current);
			if (!value || prefixes.includes(value)) value = prefixes[0];

			setPrefixes(
				prefixes.map(p => ({
					value: p,
					label: p,
				}))
			);
			setValue({
				value,
				label: value,
			});
		});
	}, []);

	return (
		<SelectInput
			className='input-group__addon advancedSlugInput__parent'
			classNamePrefix={'advancedSlugInput'}
			options={prefixes}
			id={'prefixSelector'}
			name={'prefixSelector'}
			value={value}
			onChange={val => {
				if (val) {
					setValue(val);
				} else {
					setValue(prefixes[0]);
				}
			}}
		/>
	);
};
