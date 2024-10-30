const MAPPINGS = {};
const KEYSDOWN = new Set();

const GAMEPADBUTTONNAMES = ["A", "B", "Y", "X", "L1", "R1", "L2", "R2", "Back", "Start", "L3", "R3", "DpadUp", "DpadDown", "DpadLeft", "DpadRight", "Mode"];
//Also, Dpad only works when the switch is set to "X", and mode only is in one of the two, but never registers

const JOYSTICKTRESHOLD = 0.1;





window.addEventListener("keydown", (event) => {
	
	KEYSDOWN.add(event.key);

});

window.addEventListener("keyup", (event) => {

	KEYSDOWN.delete(event.key);
	
});

let gamepadIndex;

window.addEventListener("gamepadconnected", (event) => {
	
	gamepadIndex = event.gamepad.index;

});

window.addEventListener("gamepaddisconnected", (event) => {

	gamepadIndex = null;

});

function updateGamepad() {
	
	if (gamepadIndex != null) {
		
		const gamepad = navigator.getGamepads()[gamepadIndex];

		if (gamepad) {

			const buttons = gamepad.buttons.map(button => button.pressed);
			
			for (let i=0;i<GAMEPADBUTTONNAMES.length;i++) {

				if (buttons[i]) {
					KEYSDOWN.add("Gamepad" + GAMEPADBUTTONNAMES[i]);
				} else {
					KEYSDOWN.delete("Gamepad" + GAMEPADBUTTONNAMES[i]);
				}

			}

			const axes = gamepad.axes;

			//Due to multiple directions in the same axis, this is hardcoded, sorry :-(
			
			if (axes[0] > JOYSTICKTRESHOLD) {	
				KEYSDOWN.add("GamepadLJoystickRight");
			} else {
				KEYSDOWN.delete("GamepadLJoystickRight");
			}

			if (axes[0] < -JOYSTICKTRESHOLD) {
				KEYSDOWN.add("GamepadLJoystickLeft");
			} else {
				KEYSDOWN.delete("GamepadLJoystickLeft");
			}

			if (axes[1] > JOYSTICKTRESHOLD) {
				KEYSDOWN.add("GamepadLJoystickDown");
			} else {
				KEYSDOWN.delete("GamepadLJoystickDown");
			}

			if (axes[1] < -JOYSTICKTRESHOLD) {
				KEYSDOWN.add("GamepadLJoystickUp");
			} else {
				KEYSDOWN.delete("GamepadLJoystickUp");
			}

			if (axes[2] > JOYSTICKTRESHOLD) {
				KEYSDOWN.add("GamepadRJoystickRight");
			} else {
				KEYSDOWN.delete("GamepadRJoystickRight");
			}

			if (axes[2] < -JOYSTICKTRESHOLD) {
				KEYSDOWN.add("GamepadRJoystickLeft");
			} else {
				KEYSDOWN.delete("GamepadRJoystickLeft");
			}

			if (axes[3] > JOYSTICKTRESHOLD) {
				KEYSDOWN.add("GamepadRJoystickDown");
			} else {
				KEYSDOWN.delete("GamepadRJoystickDown");
			}

			if (axes[3] < -JOYSTICKTRESHOLD) {
				KEYSDOWN.add("GamepadRJoystickUp");
			} else {
				KEYSDOWN.delete("GamepadRJoystickUp");
			}

			if (axes[4] > JOYSTICKTRESHOLD) {
				KEYSDOWN.add("GamepadL2");
			} else {
				KEYSDOWN.delete("GamepadL2");
			}

			if (axes[5] > JOYSTICKTRESHOLD) {
				KEYSDOWN.add("GamepadR2");
			} else {
				KEYSDOWN.delete("GamepadR2");
			}

			console.log(axes[6]);

		}

	}

	window.requestAnimationFrame(updateGamepad);

}

updateGamepad();





function bindKey(key, action) {
	
	if (MAPPINGS[action] != null) {
		MAPPINGS[action].add(key);
	} else {
		MAPPINGS[action] = new Set([key]);
	}

}

function unbindKey(key, action) {

	if (MAPPINGS[action] == null || !MAPPINGS[action].has(key)) {
		console.error(`Can't unbind: '${key}' is not bound to action '${action}'.`);
	} else {
		MAPPINGS[action].delete(key);
	}

}

function isKeyPressed(key) {
	return KEYSDOWN.has(key);
}

function isActionPressed(action) {

	if (MAPPINGS[action] == null) {
		console.error(`Action called '${action}' does not exist.`);
		return false;
	}

	for (let key of MAPPINGS[action]) {
		if (KEYSDOWN.has(key)) {
			return true;
		}
	}

	return false;

}

export { bindKey, unbindKey, isKeyPressed, isActionPressed };
