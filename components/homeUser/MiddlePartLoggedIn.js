import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from './MiddlePartLoggedIn.module.css';

import Tweets from './Tweets';
import { useEffect, useState } from 'react';
export default function MiddlePartLoggedIn({ tweets }) {
	const [avatarPic, setAvatarPic] = useState();

	const { data: session, status, loading } = useSession();
	const [tweet, setTweet] = useState('');

	async function handleTweetSubmit(e) {
		e.preventDefault();
		setTweet('');

		const tweetData = {
			tweet,
			username: session.token.username,
			name: session.token.name,
			surname: session.token.surname,
			avatar: session.token.avatar,
		};

		try {
			const res = await fetch('/api/tweets/post', {
				method: 'POST',
				body: JSON.stringify(tweetData),
				'Content-Type': 'application/json',
			});
			const data = await res.json();
			console.log(data);
		} catch (e) {
			console.log(e.message);
		}
	}

	useEffect(() => {
		if (session) {
			setAvatarPic(session.token.avatar);
			const { token } = session;
			setAvatarPic(token.avatar);
		}

		async function fetchAllTweets() {
			try {
				const res = await fetch('/api/tweets/getalltweets', {
					method: 'GET',
				});
				const data = await res.json();
				console.log(data);
			} catch (e) {
				console.log(e.message);
			}
		}
		fetchAllTweets();
	}, []);

	console.log(session);

	if (!session) {
		return <p>not logged in</p>;
	}

	return (
		<div className={styles.middle}>
			<div className={styles['top-header']}>
				<h2>Home</h2>
				<img src="/images/list.svg" alt="" />
			</div>
			<div className={styles['image-textarea']}>
				<img
					src={`https://${session.token.avatar}`}
					alt=""
					className={styles['image-textarea-user']}
				/>
				<div className={styles['text-area']}>
					<form onSubmit={handleTweetSubmit}>
						<textarea
							maxLength="250"
							placeholder="What is happening?"
							autoFocus
							onChange={(e) => setTweet(e.target.value)}
							value={tweet}
						/>
						<div className={styles.icons}>
							<div className={styles.AllIcons}>
								<a href="">
									<img src="./images/explore.svg" alt="" />
								</a>
								<a href="">
									<img src="./images/user.svg" alt="" />
								</a>
								<a href="">
									<img src="./images/list.svg" alt="" />
								</a>
								<a href="">
									<img src="./images/more.svg" alt="" />
								</a>
							</div>
							<button className={styles.tweetBtn}>Tweet</button>
						</div>
					</form>
				</div>
			</div>

			<div className={styles['new-tweets']}>
				<a className={styles['show-more']} href="#">
					Show 105 Tweets
				</a>
			</div>
			<Tweets tweets={tweets} />
		</div>
	);
}
