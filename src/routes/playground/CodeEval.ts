interface CodeExecutionStrategy {
	run: (code: string, context: any) => void;
}

export class CodeEvaluationBuilder {
	config: EvaluationConfig = {
		code: '',
		context: {},
		strategy: IndirectEvalStrategy
	};



	withExecStrategy(strat: new () => CodeExecutionStrategy) {
		this.config.strategy = strat;
	}

	withCode(code: string) {
		this.config.code = code;
	}

	withContext(context: object) {
		this.config.context = context;
	}

  addToContext(moreContext: object) {
    this.config.context = {
      ...this.config.context, 
      ...moreContext
    }
  }

  wrapCodeAsync() {
    this.config.code = `async function run() {${this.config.code}}; run()`
  }



	run() {
    console.log(this.config.code)
		return new this.config.strategy().run(this.config.code, this.config.context);
	}
}

interface EvaluationConfig {
	strategy: new () => CodeExecutionStrategy;
	code: string;
	context: object;
}


export class IndirectEvalStrategy implements CodeExecutionStrategy {
	run(code: string, context: any) {
		function evalInContext(js: string, context: any) {
			//# Return the results of the in-line anonymous function we .call with the passed context
			return function () {
				return eval(js);
			}.call(context);
		}

    evalInContext(code, context)
	}
}

export class FunctionConstructorStrategy implements CodeExecutionStrategy {
  run(code: string, context: object){
    let executionFunc = Function.constructor([...Object.keys(context)], code)
    executionFunc.call({}, ...Object.values(context))
  }
}
