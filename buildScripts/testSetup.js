//This file isn't transpiled, so must use CommonJS and ES5

//Register babel to transpile before Mocha runs our tests.
require("babel-register")();

//Disable webpack features that Mocha doesn't understand.
//If Mocha sees any css, it will treat it like an empty function
require.extensions[".css"] = function() {};
