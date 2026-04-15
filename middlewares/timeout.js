const timeout = require('express-timeout-handler');

module.exports = () => timeout.handler({
	timeout: 600000,
	onTimeout: (req, res) => res.status(503).json({ success: false, status: 503, message: 'Processing the request took too long.' }),
	disable: ['write', 'setHeaders', 'send', 'json', 'end'],
});