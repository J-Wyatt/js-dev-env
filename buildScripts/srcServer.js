import express from "express";
import path from "path";
//opens our site in the browser
import open from "open";
import webpack from "webpack";
import config from "../webpack.config.dev";

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

//a way for us to tell express to use the webpack-dev-middleware
//and pass it the compiler
app.use(require("webpack-dev-middleware")(compiler, {
	noInfo : true,
	publicPath : config.output.publicPath //refing a variable when we set up our webpack config
}));

//requesting root
app.get("/", function(req, res){
	//sending the file I specified
	res.sendFile(path.join(__dirname, "../src/index.html"));
	// res.sendFile(path.join(__dirname, "../index.html")); To work on surge
});

app.get('/users', function(req, res) {
	// Hard coding for simplicity. Pretend this hits a real database
	res.json([
		{"id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bob@gmail.com"},
		{"id": 2, "firstName": "Tammy", "lastName": "Norton", "email": "tnorton@yahoo.com"},
		{"id": 3, "firstName": "Tina", "lastName": "Lee", "email": "lee.tina@hotmail.com"},
	]);
});

app.listen(port, function(err){
	if(err){
		console.log(err);

	}else{
		//open this address at this port
		open("http://localhost:" + port);
	}
});
