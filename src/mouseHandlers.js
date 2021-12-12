import Vex from 'vexflow';

export function getMouseOverHandler(context, stave) {
	const CURSOR_NOTE = new Vex.Flow.StaveNote({keys:['g/4'], duration:'q'});
	CURSOR_NOTE.setContext(context).setStave(stave);
	CURSOR_NOTE.setTickContext(new Vex.Flow.TickContext());
	return (e) => {
		// Render a CURSOR_NOTE ready to be placed somewhere on the stave.
		let X = e.pageX;
		let Y = e.pageY;
		CURSOR_NOTE.getTickContext().setX(X);
		context.clear();
		CURSOR_NOTE.draw();
		console.log(e);
	}
}
