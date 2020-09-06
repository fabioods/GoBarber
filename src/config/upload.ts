import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(req, file, callback) {
      const fileName = file.originalname;
      const fileHashName = `${crypto
        .randomBytes(10)
        .toString('hex')}-${fileName}`;
      return callback(null, fileHashName);
    },
  }),
};
