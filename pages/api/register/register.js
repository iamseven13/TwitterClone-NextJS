export default async function handler(req, res) {
	if (req.method === 'POST') {
		console.log(req.body);
		return res.json({ data: req.body });
	}
	if (req.method === 'GET') {
		return res.json({ msg: 'hey there' });
	}
}
