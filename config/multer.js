var multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({

    destination: (req, file, callBack) => {
        console.log(file.filename);
        if (!file) {
            const error = new Error('No File')
            error.httpStatusCode = 400
            return next(error)
        }
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + `${file.originalname}`)
    }
})


const uploadimages = multer({
    storage: storage,
    // limits: { fileSize: 1000000 },
    // fileFilter: function(req, file, cd) {
    //     checkImageType(file, cb);

    // }

})

function checkImageType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}
module.exports = { uploadimages };