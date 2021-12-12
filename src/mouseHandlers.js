import Vex from 'vexflow';

export function getMouseOverHandler(context, stave) {
	return (e) => {
		// Render a note ready to be placed somewhere on the stave.
		let X = e.pageX;
		let Y = e.pageY;
		let note = new Vex.Flow.StaveNote({keys:['g/4'], duration:'q'});
		note.setContext(context).setStave(stave).setTickContext(new Vex.Flow.TickContext());
		note.getTickContext().setX(X);
		note.draw();
		console.log(e)
	}
}
