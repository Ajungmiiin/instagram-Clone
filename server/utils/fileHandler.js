const multer = require('multer');
const path = require('path');

module.exports = function fileHandler(dest) {
  return multer({
    // storage
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `${__dirname}/../files/${dest}/`);
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
      }
    }),
    // fileFilter (필터링)
    fileFilter: (req, file, cb) => {
      // ext : 파일의 확장자(extension)
      const ext = path.extname(file.originalname);
      // 확장자명 필터
      if(ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        return cb(null, true);
      }
      const err = new TypeError('This type of file is not acceptable.');
      cb(err);
    },
    limits: { //limits
      fileSize: 1e7, // 10MB 사이즈의 파일까지만 가능
      files: 10 // 최대 10개의 파일까지만 가능
    }
  })
};