import Interpreter from 'js-interpreter'
import * as Babel from '@babel/standalone'


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

    let transpiledCode = Babel.transform(this.code, {presets: ['es2015']}).code

		let interpreter = new Interpreter(transpiledCode, initFunc);

		interpreter.run();
	}
}
