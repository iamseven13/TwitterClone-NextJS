export default async function getUser(params) {
	const res = await fetch(`${process.env.DEV}/api/profile/ProfileData`, {
		method: 'POST',
		body: params,
	});
	const data = await res.json();

	return data;
}
