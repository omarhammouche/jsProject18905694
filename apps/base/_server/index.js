const ModuleBase = load("com/base");

class Base extends ModuleBase {

	constructor(app, settings) {
		super(app, settings);
	}

	hello(req, res, ... params) {
		let answer = ["hello", ...params, "!"].join(" ");
		console.log(answer);
		this.sendJSON(req, res, 200, {message: answer});
	}

}

module.exports = Base;