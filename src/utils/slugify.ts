const oeRegex = /ø/g;
const aeRegex = /æ/g;
const normRegex = /[\u0300-\u036f]/g;
const whitespaceRegex = /\s+/g;
const nontextRegex = /[^a-z0-9]+/g;

export const slugify = (name: string): string => {
	name = name.toLowerCase();
	name = name.replace(oeRegex, 'o');
	name = name.replace(aeRegex, 'ae');
	name = name.normalize('NFD').replace(normRegex, '');
	name = name.replace(whitespaceRegex, '-');
	name = name.replace(nontextRegex, '-');
	name = name.split('-').filter(Boolean).join('-');
	return name;
};
