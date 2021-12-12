import Vex from 'vexflow';
import { getMouseOverHandler } from './mouseHandlers.js';

const VF = Vex.Flow;
const ID = 'boo'; // vexflow element ID

function getRenderingContext() {
	// Create an SVG renderer and attach it to the DIV element named "vf".
	const div = document.getElementById(ID);
	const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
	
	// Configure the rendering context.
	renderer.resize(500, 500);
	const context = renderer.getContext();
	context.setFont('Arial', 10);

	return context
}

function getStave(id, context) {
	// Create a stave of width 400 at position 10, 40 on the canvas.
	const stave = new VF.Stave(10, 40, 400);
	
	// Add a clef and time signature.
	stave.addClef('treble').addTimeSignature('4/4');
	
	// Connect it to the rendering context and draw!
	stave.setContext(context).draw();

	return stave;
}

function addHandlers(id, context, stave) {
	const E = document.getElementById(ID); // vexflow div
	E.addEventListener('click', (e) => alert(e.type));
	E.addEventListener('mouseover', getMouseOverHandler(context, stave));
}

const context = getRenderingContext();
const stave = getStave(ID, context);
addHandlers(ID, context, stave);
