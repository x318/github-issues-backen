import express from 'express';

import requestLogging from '@/middlewares/requestLogging';
import githubController from './github.controller';

const router = express.Router().use(requestLogging);

router.route('/issues/:owner/:repo').get(githubController.getRepositoryIssues);
router.route('/issues/:owner/:repo/:id').get(githubController.getIssue);
router.route('/searches').get(githubController.getTotalSearches);

export default router;
