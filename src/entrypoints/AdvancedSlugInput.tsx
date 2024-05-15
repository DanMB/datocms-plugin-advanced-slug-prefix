import type { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Button, Canvas, TextInput } from 'datocms-react-ui';
import { useEffect, useRef, useState } from 'react';
import { slugify } from '../utils/slugify';
import { useSlugTitleValue } from '../hooks/useSlugTitleValue';
import { SelectPrefix } from '../components/SelectPrefix';

export const AdvancedSlugInput = ({ ctx }: { ctx: RenderFieldExtensionCtx }) => {
	const [slugValue, setSlugValue] = useState(ctx.formValues[ctx.fieldPath] as string | undefined);
	const [shouldKeepSynced, setShouldKeepSynced] = useState(true);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const onInputChange = (value: string) => {
		setShouldKeepSynced(false);
		setSlugValue(value);
	};

	const sync = () => {
		setShouldKeepSynced(true);
	};

	const title = useSlugTitleValue(ctx);

	useEffect(() => {
		if (inputRef.current && shouldKeepSynced && title !== undefined) {
			const value = slugify(title || '');
			inputRef.current.value = value;
			setSlugValue(value);
		}
	}, [title, shouldKeepSynced]);

	useEffect(() => {
		ctx.setFieldValue(ctx.fieldPath, slugValue);
	}, [slugValue]);

	return (
		<Canvas ctx={ctx}>
			<div className='input-group input-group--small advancedSlugInput__row'>
				<SelectPrefix ctx={ctx} />
				<TextInput
					name='slugValue'
					id='slugValue'
					autoComplete='false'
					value={slugValue}
					inputRef={inputRef}
					onChange={onInputChange}
				/>
				<Button
					disabled={shouldKeepSynced}
					onClick={sync}
					className='input-group__addon input-group__addon--button'
					leftIcon={
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='1em' height='1em'>
							<path d='M496 200c0 13.3-10.7 24-24 24h0H360 328c-13.3 0-24-10.7-24-24s10.7-24 24-24h32 54.1l-52.1-52.1C333.8 95.8 295.7 80 256 80c-72.7 0-135.2 44.1-162 107.1c-5.2 12.2-19.3 17.9-31.5 12.7s-17.9-19.3-12.7-31.5C83.9 88.2 163.4 32 256 32c52.5 0 102.8 20.8 139.9 57.9L448 142.1V88l0-.4V56c0-13.3 10.7-24 24-24s24 10.7 24 24V200zM40 288H152c13.3 0 24 10.7 24 24s-10.7 24-24 24H97.9l52.1 52.1C178.2 416.2 216.3 432 256 432c72.6 0 135-43.9 161.9-106.8c5.2-12.2 19.3-17.8 31.5-12.6s17.8 19.3 12.6 31.5C427.8 424 348.5 480 256 480c-52.5 0-102.8-20.8-139.9-57.9L64 369.9V424c0 13.3-10.7 24-24 24s-24-10.7-24-24V312c0-13.3 10.7-24 24-24z'></path>
						</svg>
					}
				/>
			</div>
		</Canvas>
	);
};
