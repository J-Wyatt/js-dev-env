export default function getBaseUrl() {
	const inDevelopment = window.location.hostname === 'localhost';//checks to see if it's running in dev and sets the base url accordingly
	return inDevelopment ? 'http://localhost:3001/' : '/';
}
