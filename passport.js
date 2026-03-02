const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');

const verifyToken = async (token, req, done) => {
	if (!token) {
		const message = 'Missing token.';
		console.warn(message);

		return done(null, false, { message });
	}

	try {
		// DEBUG
		const parts = token.split('.');
		const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString());
		console.log('[JWT Debug] header:', header);
		console.log('[JWT Debug] secret loaded:', !!process.env.SML_JWT_SECRET, '| first 10 chars:', process.env.SML_JWT_SECRET?.substring(0, 10));

		const decoded = jwt.verify(token, process.env.SML_JWT_SECRET);

		console.log('============================ AUTHORIZED USER `mirror` ============================');

		return done(null, decoded);
	} catch (err) {
		if (err.name === 'TokenExpiredError') {
			console.log('JWT token expired');
			return done(null, false, { message: 'Token expired' });
		}

		console.log('[JWT Debug] token first 50 chars:', token.substring(0, 50));
		console.error(err);
		return done(null, false, { message: 'Unauthorized' });
	}
};

passport.use('mirror', new BearerStrategy({ passReqToCallback: true }, (req, token, done) =>
	verifyToken(token, req, done)
));