import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const directory = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tempFolder: directory,
  uploadFolder: path.resolve(directory, 'uploads'),
  storage: multer.diskStorage({
    destination: directory,
    filename(req, file, callback) {
      const fileName = file.originalname;
      const fileHashName = `${crypto
        .randomBytes(10)
        .toString('hex')}-${fileName}`;
      return callback(null, fileHashName);
    },
  }),
};
