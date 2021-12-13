import Vex from 'vexflow';
import { drawCursorNote, redrawStave } from './staveManager.js';

export function handleMouseOver(e) {
	// Render a cursorNote ready to be placed somewhere on the stave.
	const X = e.pageX;
	const Y = e.pageY;

	redrawStave();
	drawCursorNote(X, Y);
}
