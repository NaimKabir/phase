import Vex from 'vexflow';
import { drawCursorNote, redrawStave, commitCursorNote } from './staveManager.js';

export function handleClick(e) {
	// Flush a cursor note to the stave if not hovering above a flushed note.
	commitCursorNote(e.pageX);
	redrawStave();
	drawCursorNoteAtMouse(e);
}

export function handleMouseOver(e) {
	// Render a cursorNote ready to be placed somewhere on the stave.
	redrawStave();
	drawCursorNoteAtMouse(e);
}

function drawCursorNoteAtMouse(e) {
	const X = e.pageX;
	const Y = e.pageY;
	drawCursorNote(X, Y);
}
