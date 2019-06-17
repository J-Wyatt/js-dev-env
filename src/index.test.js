import {expect} from "chai"; //named import
import jsdom from "jsdom";
import fs from "fs"; //file system

describe("Our first test", () => {
	it("should pass", () =>{
		expect(true).to.equal(true);
	});
});

describe("index.html", () => {
	it("should have h1 that says Users", (done) => {
		const index = fs.readFileSync("./src/index.html", "utf-8");
		//our way of defining the jsdom environment
		jsdom.env(index, function(err, window){//window is the window in the browser
			const h1 = window.document.getElementsByTagName("h1")[0];//get the first h1 on the page
			expect(h1.innerHTML).to.equal("Users");
			done(); //tell mocha our test is done and it'll run the expect and report the results
			window.close();
		});
	});
});
