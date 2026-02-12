const axios = require('axios');
const { validationResult } = require('express-validator');
const fs = require('node:fs');
const generateSecret = require('../../scripts/generateSecret.js');
const sendResult = require('../../scripts/sendResult.js');
const determineZipPath = require('../../scripts/determineZipPath.js');

const prefix = '[DownloadBenefits]:';

exports.download = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return sendResult(res, { status: 400, message: errors.array() });

		const { userId, registrySecretKey } = req.params;

		// API validates device status, subscription, and mirror match
		const { data } = await axios.get(`${process.env.STELLA_API}/mirror/download-check`, {
			headers: { 'X-Registry-Secret-Key': registrySecretKey, 'X-Secret-Key': generateSecret(), 'X-User-IP': req.ip },
		});

		// Captcha redirect
		if (!data.verified) {
			return res.status(307).redirect(`${process.env.PATRON_CENTER}/stella-mod-plus/benefits/receive/${userId}/${data.registrySecretKey}/captcha`);
		}

		// Zip file
		const zipPath = determineZipPath(data.benefitId);
		if (!zipPath || !fs.existsSync(zipPath)) {
			console.error(prefix, `Zip file not found for benefitId ${data.benefitId} at path ${zipPath}`);
			return sendResult(res, { status: 500, message: 'Something went wrong. Please report this error.' });
		}

		// Mark as downloaded
		await axios.patch(`${process.env.STELLA_API}/mirror/device/status`, {
			status: { downloaded: true },
		}, { headers: { 'X-User-IP': req.ip, 'X-Registry-Secret-Key': registrySecretKey, 'X-Secret-Key': generateSecret() } });

		// Send file
		console.log(prefix, `Serving zip file for ${data.email} from path ${zipPath}`);
		res.download(zipPath);
	} catch (err) {
		if (err.response?.data?.message) return sendResult(res, { status: err.response.status, message: err.response.data.message });

		sendResult(res, { status: err.status || 500, message: err.message || 'Internal server error' });
	}
};
