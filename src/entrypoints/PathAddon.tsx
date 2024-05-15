import type { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas, TextInput } from 'datocms-react-ui';
import { useEffect, useMemo, useState } from 'react';
import { getValue } from '../utils/getValue';

const regexp = /{([a-z-_]+)}/gi;

export const PathdAddon = ({ ctx }: { ctx: RenderFieldExtensionCtx }) => {
	const keys = useMemo(() => Array.from((ctx.parameters.path as string).matchAll(regexp)), [ctx.parameters.path]);

	const values = keys.map(([string, key]) => {
		if (!key) {
			return {
				find: string,
				replace: string,
			};
		}

		if (ctx.formValues[key]) {
			return {
				find: string,
				replace: ctx.formValues[key] as string,
			};
		} else {
			return {
				find: string,
				replace: string,
			};
		}
	});

	useEffect(() => {
		ctx.setFieldValue(
			ctx.fieldPath,
			values.reduce((acc, { find, replace }) => {
				return acc.replace(find, replace);
			}, ctx.parameters.path as string)
		);
	}, [values]);

	return (
		<Canvas ctx={ctx}>
			<></>
		</Canvas>
	);
};
