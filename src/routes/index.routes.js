import { Router } from 'express';
const router = Router();

import { renderIndex, renderAbout } from '../controllers/index.controller';

router.get('/', renderIndex);

router.get('/about', renderAbout);

module.exports = router;