import express from 'express';
import nfc from './nfc';

const router = express.Router();

router.use('/nfc', nfc);

export default router;