export default async function getAllUsers() {
	const res = await fetch(`${process.env.DEV}/api/users/getallusers`);
	const data = await res.json();

	return data;
}
