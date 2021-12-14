import Vex from 'vexflow';
import { initializeStave, drawBaseStave } from './staveManager.js';
import { handleMouseOver, handleClick } from './mouseHandlers.js';

const ID = 'boo'; // vexflow element ID

function addHandlers(id) {
	const E = document.getElementById(ID); // vexflow div
	E.addEventListener('click', handleClick);
	E.addEventListener('mousemove', handleMouseOver);
}

initializeStave(ID);
drawBaseStave();
addHandlers(ID);
