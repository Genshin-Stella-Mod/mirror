const timeout = require('express-timeout-handler');

module.exports = () => timeout.handler({
	timeout: 600000,
	onTimeout: (req, res) => res.status(503).json({ success: false, status: 503, message: 'Timeout error.' }),
	disable: ['write', 'setHeaders', 'send', 'json', 'end'],
});