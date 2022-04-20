const noteModel = require("../models/notes.model");
const multer = require("multer");
const path = require("path");




const filesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    /*fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }*/
});

const upload = multer({ storage: filesStorage }).single('file');




const Getnotes = async (req, res) => {
    try {
        const note = await noteModel.find();
        res.status(201).json(note);
    } catch (error) {
        console.log(error.message);
    }
}

const Addnote = async (req, res) => {
    const note = new noteModel(req.body)
    note.save((error, note) => {
        if (error) return res.status(404).json({ error });
        if (note) {
            res.status(201).json({ note });
        }
     })
}


const Deletenote = async (req, res) => {
};


const Updatenote = async (req, res) => {
}

const Uploadfiles = (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
}


module.exports = {
    Getnotes,
    Deletenote,
    Addnote,
    Updatenote,
    Uploadfiles
};
