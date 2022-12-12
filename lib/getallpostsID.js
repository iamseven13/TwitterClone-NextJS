export default async function getAllPostIds() {
	const res = await fetch(`${process.env.DEV}/api/tweets/getposts`, {
		method: 'GET',
	});
	const data = await res.json();
	return data;
}
