import express from 'express';
import configure from '../configure';

import {
  Nfc,
} from '../models';

const router = express.Router();

// nfc 단일 조회
router.get('/link/:_id', (req, res) => {
  const { REDIRECT_TO } = configure;
  Nfc.findOne({ _id: req.params._id })
    .lean()
    .exec((err, result) => {
      if(err) {
        return res.status(500).json({ message: 'nfc 조회 오류'});
      }
      res.cookie(
        'nfc',
        String(result._id),
        {
          domain: 'www.mamre.kr',
          expires: new Date(Date.now() + 9000000000),
          signed: false,
        });
      return res.redirect(REDIRECT_TO);
    });
});
export default router;
