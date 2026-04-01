const path = require('node:path');

const benefitsDir = process.env.STELLA_BENEFITS_DIR;

const BENEFIT_FILES = Object.freeze({
	'3dmigoto':      '3DMigoto.zip',
	'3dmigoto-mods': '3DMigoto Mods.zip',
	'addons':        'Addons.zip',
	'presets':       'Presets.zip',
	'shaders':       'Shaders.zip',
});

module.exports = (benefitType) => {
	const file = BENEFIT_FILES[benefitType];
	return file ? path.join(benefitsDir, file) : null;
};
