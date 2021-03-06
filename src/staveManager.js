import Vex from 'vexflow';

// Manage global Stave state for use in playing music, redrawing stavenotes at selected positions,
// etc.


const VF = Vex.Flow;
const DURATIONS = ['32', '16', '8', 'q', 'h', 'w'];
const NEXT_DURATIONS = new Map(
	DURATIONS.map( (dur, i) => [dur, DURATIONS[(i+1) % DURATIONS.length]])
); // Map each note duration to the next biggest duration

// Stave state

var _element = null; // Element we draw the stave to
var _cursor_note = null; // Vex.Flow.StaveNote; cursor note that users can drop onto the stave
var _context = null; // Vex.Flow.Context
var _stave = null; // Vex.Flow.Stave
var _committedNotes = []; // []Vex.Flow.StaveNote Notes that have been saved to the stave

// Public

export function getCursorNote() {
	if (!_cursor_note) {
		console.error("cursor note not initialized.")
	}
	return _cursor_note;
}

function setStaveElement(element) {
	_element = element;
}

export function getStaveElement(element) {
	if (!_element) {
		console.error("element not initialized.")
	}
	return _element;
}

function setCursorNote(staveNote) {
	_cursor_note = staveNote;
}

export function getContext() {
	if (!_context) {
		console.error("context not initialized.")
	}
	return _context;
}

function setContext(context) {
	_context = context;
}

export function getStave() {
	if (!_stave) {
		console.error("stave not initialized.")
	}
	return _stave;
}

export function commitCursorNote() {
	const note = copyNote(getCursorNote());
	_committedNotes.push(note);
}

function copyNote(note) {
	return new Vex.Flow.StaveNote(
		{keys: note.keys, duration: note.duration}
	)
	.setContext(getContext())
	.setStave(getStave())
	.setTickContext(
		new Vex.Flow.TickContext().setX(note.getTickContext().getX())
	);
}

function drawCommittedNotes() {
	_committedNotes.forEach(note => {
		note.draw();
	})
}

function setStave(stave) {
	_stave = stave;
}

export function initializeStave(id) {
	const div = document.getElementById(id);
	setStaveElement(div);
	const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
	
	// Configure the rendering context.
	renderer.resize(500, 500);
	const context = renderer.getContext();
	context.setFont('Arial', 10);
	setContext(context);
	
	// Create a stave 
	setNewStave();
}

function setNewStave() {
	const stave = new VF.Stave(10, 40, 400);
	stave.addClef('treble');
	setStave(stave);

	return stave;
}


export function drawCursorNote(xpos, ypos) {
	const key = getKeyForY(ypos); 
	const cursorNote = new Vex.Flow.StaveNote({keys: [key], duration: DURATIONS[0]});
	cursorNote.setContext(getContext()).setStave(getStave());
	cursorNote.setTickContext(new Vex.Flow.TickContext());

	cursorNote.getTickContext().setX(xpos);

	setCursorNote(cursorNote);
	cursorNote.draw();
}

function getKeyForY(ypos) {
	// Takes a Y page position.
	// Returns a key specification like 'g/5' or 'd/3'--a pitch and octave.
	const keySet = "fedcbag"; // Order of keys starting from top staffline and descending the staff.

	const staffline = getStave().getLineForY(ypos);

	// Stafflines correspond to every other note in the keySet.
	// We multiply by 2 to get an index into the keySet to account for that alternation.
	const noteNum = Math.round((staffline)*2) - 1; 

	let idx = noteNum % keySet.length;
	
	// Lines can go negative, in which case we can just reverse our index. 
	if (idx < 0) {
		idx = keySet.length + idx;
	}

	const key =  keySet[idx];

	// Determine octave of this key.
	
	// Our top staffline 'f' is an 'f/5', so we'll call 5 our baseOctave.
	const baseOctave = 5; 
	const baseNote = 3; // We roll over to the next octave every time we pass a 'c', which is the index-3 note in our keySet.
	const octave = baseOctave - Math.floor((noteNum + baseNote)/keySet.length);
	return key + "/" + octave;
}

export function drawBaseStave() {
	getStave().setContext(getContext()).draw();
}

export function redrawStave() {
	// Redraw current stave state
	getContext().clear()
	setNewStave();
	drawBaseStave();
	drawCommittedNotes();
}
