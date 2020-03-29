import { Router } from 'express';
const router = Router();
import { isAuthenticated } from '../helpers/auth';
 
import { 
    renderNoteForm, 
    createNewNote, 
    renderNotes, 
    renderEditForm, 
    updateNote, 
    deleteNote 
} from '../controllers/notes.contoller';

// New note

router.get('/notes/add', isAuthenticated, renderNoteForm);

router.post('/notes/newNote', isAuthenticated, createNewNote);

// Get all note

router.get('/notes', isAuthenticated, renderNotes);

// Edit note

router.get('/notes/edit/:id', isAuthenticated, renderEditForm);

router.put('/notes/edit/:id', isAuthenticated, updateNote);

// Delete note

router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;