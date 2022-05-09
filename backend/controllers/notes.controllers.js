const noteModel = require("../models/notes.model");
const commentModel = require("../models/comment.model");
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
        const note = await noteModel.find().populate('createdby').populate('category').populate('comments');
        res.status(201).json(note);
    } catch (error) {
        console.log(error.message);
    }
}

const Addnote = async (req, res) => {
    req.body.date = new Date().toISOString()
    const note = new noteModel(req.body)
    try {
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(409).json({ message: error.message });
    } 
}

const Commentnote = async (req, res) => {
    const {id} = req.params;
    const newComment = new commentModel ({
        user: req.body.user,
        comment: req.body.comment 
    })

    const note = await noteModel.findById(id);
    if (!Array.isArray(note.comments)) {
        note.comments = [];
    }
    note.comments.push(newComment);
    newComment.save().then(savedcomment => {
        console.log(note.comments);
    }      
        )
    const updatedNote = await noteModel.findByIdAndUpdate(id, note, { new: true }).populate('comments')
    res.status(201).json(updatedNote);

};

const getPostsBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {

        const title = new RegExp(searchQuery, "i");
        const content = new RegExp(searchQuery, "i");

        const posts = await noteModel.find({title}).populate('category').populate('createdby');
        res.status(201).json(posts);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }
    
    const note = await noteModel.findById(id);
    const index = note.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      note.likes.push(req.userId);
    } else {
      note.likes = note.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await noteModel.findByIdAndUpdate(id, note, { new: true });

    res.status(201).json(updatedPost);
   
}

const BookmarkPost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }
    
    const note = await noteModel.findById(id);
    const index = note.bookmarks.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      note.bookmarks.push(req.userId);
    } else {
      note.bookmarks = note.bookmarks.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await noteModel.findByIdAndUpdate(id, note, { new: true });

    res.status(200).json(updatedPost);
   
}


const Deletenote = async (req, res) => {
    const { id } = req.params;
    await noteModel.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
};


const Updatenote = async (req, res) => {
    const { id } = req.params;
    const { title, category, content } = req.body;
    const updatedPost = { category, title, content, _id: id };

    await noteModel.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
}

const Uploadfiles = (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
}
const GetSinglenote = async (req, res) => { 
    const { id } = req.params;
    try {
        const post = await noteModel.findById(id).populate('createdby').populate('category').populate('comments');       
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports = {
    GetSinglenote,
    Getnotes,
    Deletenote,
    Addnote,
    Updatenote,
    Uploadfiles,
    Commentnote,
    likePost,
    BookmarkPost,
    getPostsBySearch
};
