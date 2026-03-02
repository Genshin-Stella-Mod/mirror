const path = require('node:path');

const benefitsDir = process.env.STELLA_BENEFITS_DIR;

module.exports = benefitId => {
	switch (Number(benefitId)) {
	case 2:
		return path.join(benefitsDir, 'tier-2_favorite-cat.zip');
	case 3: case 4: case 5:
		return path.join(benefitsDir, 'tier-3_safety-kitten.zip');
	default:
		return null;
	}
};
