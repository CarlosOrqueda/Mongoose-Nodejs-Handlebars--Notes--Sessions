import Note from '../models/Note';

const notesController = {};

notesController.renderNoteForm = (req, res) => {
    res.render('notes/newNote');
};

notesController.createNewNote = async (req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({title,description});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('successMessage', 'Note added successfuly');
    res.redirect('/notes');
};

notesController.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id}).lean().sort({createdAt: 'desc'});
    res.render('notes/allNotes', {notes});
};

notesController.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if(note.user != req.user.id) {
        req.flash('errorMessage', 'Not authorized');
        return res.redirect('/notes');
    }
    res.render('notes/editNote', {note});
};

notesController.updateNote = async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('successMessage', 'Note updated successfuly');
    res.redirect('/notes');
};

notesController.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('successMessage', 'Note deleted successfuly');
    res.redirect('/notes');
};

module.exports = notesController;