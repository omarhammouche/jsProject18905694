window.addEventListener("load", event => new Base());

class Base {

	constructor() {
		console.log("loaded");

		this.test();
	}

	async test() {
		console.log("test server hello method");
		let result = await Comm.get("hello/everyone");
		console.log("result", result);
		console.log("response", result.response);
	}
}