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

app.listen(port, function(err){
	if(err){
		console.log(err);

	}else{
		//open this address at this port
		open("http://localhost:" + port);
	}
});
