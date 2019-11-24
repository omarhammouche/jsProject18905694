window.addEventListener("load", event => new Base());

class Base {

	constructor() {
		console.log("loaded");

		this.initialize();
	}

	async initialize() {

		this.io = io.connect("http://localhost/myroom");
		this.io.on("connect", () => this.onIOConnect());

		this.mvc = new MVC("myMVC", this, new MyModel(), new MyView(), new MyController());
		await this.mvc.initialize();
		this.mvc.view.attach(document.body);
		this.mvc.view.activate();

	}

	async test() {
		console.log("test server hello method");
		let result = await Comm.get("hello/everyone");
		console.log("result", result);
		console.log("response", result.response);
	}

	onIOConnect() {
		trace("yay IO connected");

		// add listeners and send messages
	}
}

class MyModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

	}

	async data() {
		trace("get model data");
		let result = await Comm.get("data");
		return result.response;
	}

}

class MyView extends View {

	constructor() {
		super();
		this.table = null;
	}

	initialize(mvc) {
		super.initialize(mvc);

		this.btn = document.createElement("button");
		this.btn.innerHTML = "click me";
		this.stage.appendChild(this.btn);

		this.table = document.createElement("table");
		this.stage.appendChild(this.table);
	}

	activate() {
		super.activate();
		this.addListeners();
	}

	addListeners() {
		this.btn.addEventListener("click", e => this.btnClick(e));
	}

	btnClick(event) {
		this.mvc.controller.btnWasClicked("more parameters");
	}

	update(data) {
		while(this.table.firstChild) this.table.removeChild(this.table.firstChild); // empty table
		data.forEach(el => { // loop data
			let line = document.createElement("tr"); // create line
			Object.keys(el).forEach(key => { // loop object keys
				let cell = document.createElement("td"); // create cell
				cell.innerHTML = el[key]; // display
				line.appendChild(cell); // add cell
			});
			this.table.appendChild(line); // add line
		});
	}

}

class MyController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}

	async btnWasClicked(params) {
		trace("btn click", params);
		this.mvc.view.update(await this.mvc.model.data());
	}

}