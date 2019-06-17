import express from "express";
import path from "path";
//opens our site in the browser
import open from "open";
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

// it's for gzip compression and can see gzip file sizes locally and see sizes sent over the wire to the user
app.use(compression());
//serve static files in dist directory
app.use(express.static('dist'));

//requesting root
app.get("/", function(req, res){
	//sending the file I specified
	res.sendFile(path.join(__dirname, "../dist/index.html"));
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
