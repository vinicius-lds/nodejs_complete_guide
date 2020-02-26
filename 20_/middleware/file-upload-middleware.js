const multer = require("multer");
const uuid = require("uuid");

const filterImageExtensions = (accept, reject) => {
  if (accept.length) {
    const accptedMimetypes = accept.map(v => `image/${v}`);
    return (req, file, cb) =>
      cb(null, accptedMimetypes.includes(file.mimetype));
  } else {
    const rejectedMimetypes = reject.map(v => `image/${v}`);
    return (req, file, cb) =>
      cb(null, !rejectedMimetypes.includes(file.mimetype));
  }
};

module.exports = (fieldName, options) => {
  if (!options.destination) {
    options.destination = "public/uploads";
  } else {
    options.destination = `public/${options.destination}`;
  }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, options.destination);
    },
    filename: (req, file, cb) => {
      cb(null, `${uuid.v4()}_${file.originalname}`);
    }
  });
  let fileFilter;
  if (options.imageExtensions) {
    fileFilter = filterImageExtensions(
      options.imageExtensions.accept,
      options.imageExtensions.reject
    );
  }
  return multer({ storage: storage, fileFilter: fileFilter }).single(fieldName);
};
