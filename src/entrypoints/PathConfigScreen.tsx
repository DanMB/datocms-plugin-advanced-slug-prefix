import type { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas, TextField } from 'datocms-react-ui';
import { useState } from 'react';

export const PathConfigScreen = ({ ctx }: { ctx: RenderManualFieldExtensionConfigScreenCtx }): JSX.Element => {
	const [value, setValue] = useState('');

	return (
		<Canvas ctx={ctx}>
			<div className='container'>
				<TextField
					required={true}
					id={`path`}
					name={`path`}
					onChange={value => {
						ctx.setParameters({ path: value });
						setValue(value);
					}}
					label='Value'
					value={value}
				/>
			</div>
		</Canvas>
	);
};
