module.exports = (res, data = {}) => {
	if (!data.status) data.status = 500;
	return res.status(data.status).json({ success: false, ...data });
};
