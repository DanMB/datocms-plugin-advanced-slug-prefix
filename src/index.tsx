import { connect } from 'datocms-plugin-sdk';
import { render } from './utils/render';
import 'datocms-react-ui/styles.css';
import './styles.css';
import { AdvancedSlugInput } from './entrypoints/AdvancedSlugInput';
import { PathConfigScreen } from './entrypoints/PathConfigScreen';
import { PathdAddon } from './entrypoints/PathAddon';

connect({
	manualFieldExtensions() {
		return [
			{
				id: 'AdvancedSlug__Main',
				name: 'Advanced slug - slug',
				type: 'editor',
				fieldTypes: ['slug'],
			},
			{
				id: 'AdvancedSlug__Prefix',
				name: 'Advanced slug - prefix',
				type: 'editor',
				fieldTypes: ['string'],
			},
			{
				id: 'AdvancedSlug__Path',
				name: 'Advanced slug - path',
				type: 'editor',
				fieldTypes: ['slug'],
				configurable: true,
			},
		];
	},
	renderFieldExtension(id, ctx) {
		if (id === 'AdvancedSlug__Main') {
			return render(<AdvancedSlugInput ctx={ctx} />);
		} else if (id === 'AdvancedSlug__Path') {
			return render(<PathdAddon ctx={ctx} />);
		}
	},
	renderManualFieldExtensionConfigScreen(_, ctx) {
		return render(<PathConfigScreen ctx={ctx} />);
	},
});
