export default async function getPost(postId) {
	const res = await fetch(`${process.env.DEV}/api/tweets/getpost`, {
		method: 'POST',
		body: JSON.stringify({ postId }),
	});
	const data = await res.json();
	return data;
}
