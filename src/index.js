import "./index.css";
import { getUsers, deleteUser } from './api/userApi';

// Populate table of users via API call.
getUsers().then(result => {
	let usersBody = "";

	result.forEach(user => {
		usersBody+= `<tr>
			<td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
			<td>${user.id}</td>
			<td>${user.firstName}</td>
			<td>${user.lastName}</td>
			<td>${user.email}</td>
			</tr>`
	});
	document.getElementById("users").innerHTML = usersBody;
	const deleteLinks = document.getElementsByClassName('deleteUser'); //gets reference to delete links on the page

	// Must use array.from to create a real array from a DOM collection
	// getElementsByClassname only returns an "array like" object
	Array.from(deleteLinks, link => {
		link.onclick = function(event) {	//attaches a click handler to each link
			const element = event.target;
			event.preventDefault();			//prevents any change to the url
			deleteUser(element.attributes["data-id"].value);
			const row = element.parentNode.parentNode;	//removes the row from the UI
			row.parentNode.removeChild(row);
		};//can do this in react, angular, etc.
	});
});
