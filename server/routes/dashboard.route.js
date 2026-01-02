import express from 'express';
import overviewPlatform from '../controllers/dashboard.controller.js';

const overviewRouter = express.Router();

overviewRouter.get('/', overviewPlatform);

export default overviewRouter;