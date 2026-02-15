const path = require('node:path');

const benefitsDir = process.env.STELLA_BENEFITS_DIR;

const COMMON_FILES = Object.freeze({
	'3dmigoto': '3DMigoto.zip',
	'addons': 'Addons.zip',
	'presets': 'Presets.zip',
	'shaders': 'Shaders.zip',
});

module.exports = (benefitType, benefitId) => {
	const commonFile = COMMON_FILES[benefitType];
	if (commonFile) return path.join(benefitsDir, commonFile);

	if (benefitType === '3dmigoto-mods') {
		const tierDir = benefitId === 2 ? '2' : '3';
		return path.join(benefitsDir, tierDir, '3DMigoto Mods.zip');
	}

	return null;
};
