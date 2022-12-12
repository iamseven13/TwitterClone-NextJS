import styles from './Reply.module.css';
import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Reply({ setShowReplyForm, gatherDataFromPost }) {
	const [session, setSession] = useState(useSession());
	const replyTextRef = useRef();

	async function handleReplyTweet(e) {
		const replyTextInput = replyTextRef.current.value;
		e.preventDefault();

		setShowReplyForm(false);

		const dataInfo = {
			tweet: gatherDataFromPost,
			comment: replyTextInput,
			userLoggedIn: session,
		};
		const res = await fetch('/api/tweets/comment', {
			method: 'POST',
			body: JSON.stringify(dataInfo),
		});

		const data = await res.json();
	}

	if (!session) {
		return <h1>loading</h1>;
	}

	console.log(session);
	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<a className={styles.exitForm} onClick={() => setShowReplyForm(false)}>
					<img src="./images/exit.svg" alt="" />
				</a>
				<div className={styles.tweet}>
					<div className={styles.border}>
						<img src={`https://${gatherDataFromPost?.avatar}`} alt="" />
						<div className={styles.empty}></div>
					</div>

					<div className={styles['tweet-info']}>
						<div className={styles['top-info']}>
							<a href="">
								<span>
									{gatherDataFromPost?.name} {gatherDataFromPost?.surname}
								</span>{' '}
								<span className={styles['top-info-username']}>
									@{gatherDataFromPost?.username}
								</span>
							</a>
							<div className={styles.text}>
								<span>{gatherDataFromPost?.tweet}</span>
							</div>
							<div className={styles['replying-to']}>
								<span>Replying to</span>
								<a href="">@{gatherDataFromPost?.username}</a>
							</div>
						</div>
					</div>
				</div>
				<div className={styles['user-replying']}>
					<div className={styles.border}>
						<img src={`https://${session.data?.token?.avatar}`} alt="" />
						<div className={styles['empty-bottom']}></div>
					</div>
					<form>
						<textarea
							maxLength="250"
							placeholder="What is happening?"
							autoFocus
							className={styles.textarea}
							ref={replyTextRef}
						/>
						<div className={styles.icons}>
							<div className={styles.icons1}>
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
							<button className={styles.btn} onClick={handleReplyTweet}>
								Tweet
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
