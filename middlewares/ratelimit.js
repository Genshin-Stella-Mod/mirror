const rateLimit = require('express-rate-limit');

const general = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 120,
	standardHeaders: true,
	legacyHeaders: false,
	message: { success: false, status: 429, message: 'Too many requests. Please try again later.' },
});

const downloads = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 30,
	standardHeaders: true,
	legacyHeaders: false,
	message: { success: false, status: 429, message: 'Too many download requests. Please try again later.' },
});

module.exports = { general, downloads };
