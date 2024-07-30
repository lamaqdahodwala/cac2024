import Interpreter from 'js-interpreter'

export class CodeEvaluator {
	private code: string = '';
	private apiCallbacks: ((interpreter: any, globalObject: any) => void)[] = [];

	addCode(code: string) {
		this.code += code;
	}

	// Use the JSInterpreter docs, they don't provide any type definitions
	addExternalAPI(callback: (interpreter: any, globalObject: any) => void) {
		this.apiCallbacks.push(callback);
	}

	reset() {
		this.code = '';
		this.apiCallbacks = [];
	}

	run() {
		let initFunc = (interpreter: any, globalObject: any) => {
			this.apiCallbacks.forEach((value) => {
				value(interpreter, globalObject);
			});
		};

		let interpreter = new Interpreter(this.code, initFunc);
		interpreter.run();
	}
}
