export default async function getAllUsers() {
	const res = await fetch('http://localhost:3000/api/users/getallusers');
	const data = await res.json();
	return JSON.parse(data);
}
