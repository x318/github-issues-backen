import express from 'express';

import githubRoute from './modules/github/github.route';
import statsRoute from './modules/stats/stats.route';

const router = express.Router();

router.use('/github', githubRoute);
router.use('/stats', statsRoute);

export default router;
