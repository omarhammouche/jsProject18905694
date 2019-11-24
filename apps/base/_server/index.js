const ModuleBase = load("com/base");

class Base extends ModuleBase {

	constructor(app, settings) {
		super(app, settings);
		this._clients = new Map();
		this._io = this._app._io.of("myroom");
	}

	hello(req, res, ... params) {
		let answer = ["hello", ...params, "!"].join(" ");
		console.log(answer);
		this.sendJSON(req, res, 200, {message: answer});
	}

	data(req, res) {
		let data = [
			{id: 0, name: "data0", value: Math.random()},
			{id: 1, name: "data1", value: Math.random()},
			{id: 2, name: "data2", value: Math.random()}
		];
		this.sendJSON(req, res, 200, data);
	}

	onIOConnect(socket) {
		this._clients.set(socket.id, socket);
	}

}

module.exports = Base;