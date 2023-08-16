import express from 'express';

import statsController from './stats.controller';

const router = express.Router();

router.route('/').get(statsController.getStats);

export default router;
