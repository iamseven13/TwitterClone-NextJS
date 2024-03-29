import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from './MiddlePartLoggedIn.module.css';

import Tweets from './Tweets';
import { useEffect, useState } from 'react';
import Reply from './Modals/Reply';
export default function MiddlePartLoggedIn({
	tweets,
	setShowReplyForm,
	setGatherDataFromPost,
}) {
	const { data: session, status, loading } = useSession();
	const [tweet, setTweet] = useState('');
	const [submitTweet, setSubmitTweet] = useState(false);

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
			setSubmitTweet(true);
		} catch (e) {
			console.log(e.message);
		}
	}

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
							<div className={styles.AllIcons + ' ' + styles.disabledBtn}>
								<a>
									<img src="./images/explore.svg" alt="" />
								</a>
								<a>
									<img src="./images/user.svg" alt="" />
								</a>
								<a>
									<img src="./images/list.svg" alt="" />
								</a>
								<a>
									<img src="./images/more.svg" alt="" />
								</a>
							</div>
							<button className={styles.tweetBtn}>Tweet</button>
						</div>
					</form>
				</div>
			</div>

			<div className={styles['new-tweets']}>
				<a className={styles['show-more'] + ' ' + styles.disabledBtn}>
					Show 105 Tweets
				</a>
			</div>
			<Tweets
				tweets={tweets}
				submitTweet={submitTweet}
				setSubmitTweet={setSubmitTweet}
				setShowReplyForm={setShowReplyForm}
				setGatherDataFromPost={setGatherDataFromPost}
			/>
		</div>
	);
}
