import Vex from 'vexflow';
import { getStaveElement, drawCursorNote, redrawStave, commitCursorNote } from './staveManager.js';

export function handleClick(e) {
	// Flush a cursor note to the stave if not hovering above a flushed note.
	commitCursorNote();
	redrawStave();
	drawCursorNoteAtMouse(e);
}

export function handleMouseOver(e) {
	// Render a cursorNote ready to be placed somewhere on the stave.
	redrawStave();
	drawCursorNoteAtMouse(e);
}

function drawCursorNoteAtMouse(e) {
	const pos = getXandY(e);
	drawCursorNote(pos.x, pos.y);
}

function getXandY(e) {
	const X = e.pageX;
	const Y = e.pageY;
	const bodyRect = document.body.getBoundingClientRect();
    	const elemRect = getStaveElement().getBoundingClientRect();
	const xOffset = elemRect.left - bodyRect.left;
	const yOffset = elemRect.top - bodyRect.top;

	// TODO: This is an arbitrary X adjustment which works for... some reason. Pin down why.
	const xAdj = 67;
	return {
		x: X - xOffset - xAdj,
		y: Y - yOffset,
	};
}

