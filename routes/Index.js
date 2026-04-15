const router = require('express').Router();

router.get('/', (req, res) => res.status(418).end());

module.exports = router;