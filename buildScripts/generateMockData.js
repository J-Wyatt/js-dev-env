/* 	This script generates mock data for local development.
	This way you don't have to point to an actual API
	but you can enjoy realistic, but randomized data,
	and rapid page loads due to local, static data.
*/

/* 	NOTE: I wasn't able to get the json-schema faker shit to work until
	I went to
	https://stackoverflow.com/questions/52920729/why-does-json-schema-faker-return-latin-for-everything/53232279#53232279

/*es-lint-disable no-console */

import jsf from 'json-schema-faker';
import { schema } from './mockDataSchema';
import fs from 'fs';
import chalk from 'chalk';

const json = JSON.stringify(jsf(schema));//pass the schema to json faker and convert to a string

fs.writeFile("./src/api/db.json", json, function(err) {//write DB file
	if(err) {
		return console.log(chalk.red(err));
	}else {
		console.log(chalk.green("Mock data generated"));
	}
});
