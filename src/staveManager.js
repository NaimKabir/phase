import Vex from 'vexflow';

// Manage global Stave state for use in playing music, redrawing stavenotes at selected positions,
// etc.


const VF = Vex.Flow;

// Stave state
//
var _cursor_note = null; // Vex.Flow.StaveNote; cursor note that users can drop onto the stave
var _context = null; // Vex.Flow.Context
var _stave = null; // Vex.Flow.Stave

// Public

export function getCursorNote() {
	if (!_cursor_note) {
		console.error("cursor note not initialized.")
	}
	return _cursor_note;
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

function setStave(stave) {
	_stave = stave;
}

export function initializeStave(id) {
	const div = document.getElementById(id);
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
	setStave(stave);

	return stave;
}

export function drawCursorNote(xpos, ypos) {
	const key = getKeyForY(ypos) ? getKeyForY(ypos) : 'g/4';
	console.log(key);
	const cursorNote = new Vex.Flow.StaveNote({keys: [key], duration:'q'});
	cursorNote.setContext(getContext()).setStave(getStave());
	cursorNote.setTickContext(new Vex.Flow.TickContext());
	// modify xpos depending on padding, stave bounding box, etc.
	cursorNote.getTickContext().setX(xpos);
	cursorNote.draw();
}

function getKeyForY(ypos) {
	let mapping = "fedcbag";
	const line = getStave().getLineForY(ypos);
	let noteNum = Math.round((line)*2) - 1;
	const idx = noteNum % mapping.length;

	if (noteNum < 0) {
		mapping = mapping.substring(1, mapping.length) + mapping.substring(0, 1);
		mapping = [...mapping].reverse().join('');
		console.log(mapping)
	}
	const key =  mapping[Math.abs(idx)];

	const baseOctave = 5; // Octaves decrease as `line` increases
	const baseNote = 3;
	const octave = baseOctave - Math.floor((noteNum + baseNote)/mapping.length);
	console.log(line);
	console.log(idx);
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
	// TODO: Once I maintain selected notes, redraw them here
}
