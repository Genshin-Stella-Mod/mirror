const router = require('express').Router();
const { param } = require('express-validator');
const limiter = require('../middlewares/ratelimit.js');
const DownloadBenefitsController = require('../controllers/benefits/DownloadBenefits.js');

router.get('/stella-mod-plus/benefits/download', limiter.downloads, DownloadBenefitsController.downloadBenefit);

router.get('/stella-mod-plus/benefits/receive/:userId/:registrySecretKey/download', limiter.downloads, [
	param('userId')
		.notEmpty()
		.isString()
		.isLength({ min: 64, max: 64 }),
	param('registrySecretKey')
		.notEmpty()
		.isString()
		.isLength({ min: 256, max: 256 }),
], DownloadBenefitsController.download);

router.get('/mirror/ping', (req, res) => res.sendStatus(204));

module.exports = router;
