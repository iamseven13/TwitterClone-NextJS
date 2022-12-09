import styles from './Post.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
export default function Post() {
	const router = useRouter();
	const [post, setPost] = useState();
	const [comments, setComments] = useState();
	const [commentActionLoading, setCommentActionLoading] = useState(false);
	const [startCommentRequestCount, setstartCommentRequestCount] =
		useState(true);
	const [stopCommentRequestCount, setstopCommentRequestCount] = useState(0);
	const [loggedInAvatar, setLoggedInAvatar] = useState();

	const inputAreaRef = useRef();

	const session = useSession();

	useEffect(() => {
		if (startCommentRequestCount)
			setLoggedInAvatar(localStorage.getItem('loggedInAvatar'));

		const postId = router.query.id;

		async function fetchPost() {
			const res = await fetch('/api/tweets/getpost', {
				method: 'POST',
				body: JSON.stringify({ postId }),
			});
			const data = await res.json();
			setPost(data);
			setComments(data?.post?.comments);
		}
		fetchPost();
	}, [router, startCommentRequestCount]);

	useEffect(() => {
		setstartCommentRequestCount(false);
	}, [comments]);

	async function handleReplyTweet(e) {
		const postId = router.query.id;
		const inputText = inputAreaRef.current.value;
		setstartCommentRequestCount(startCommentRequestCount + 1);
		e.preventDefault();

		console.log(postId);

		const dataInfo = {
			tweet: postId,
			comment: inputText,
			userLoggedIn: session,
		};

		const res = await fetch('/api/tweets/comment', {
			method: 'POST',
			body: JSON.stringify(dataInfo),
		});

		const data = await res.json();
		inputAreaRef.current.value = '';
	}

	if (!post) {
		return (
			<div className={styles['post-container']}>
				<p>LOADING</p>
			</div>
		);
	}

	return (
		<div className={styles['post-container']}>
			<div className={styles['post-header']}>
				<a href="">
					<img src="/images/left-arrow.svg" alt="" />
				</a>
				<div className={styles['post-user']}>
					<h3>Tweet</h3>
				</div>
			</div>

			<div className={styles.tweets}>
				<div className={styles['user-tweet']}>
					<a href="">
						<img
							src={`https://${post?.post?.avatar}`}
							alt=""
							width={35}
							height={35}
							className={styles['image-textarea-user']}
						/>{' '}
					</a>
					<div className={styles['user-info']}>
						<div className={styles['name-username']}>
							<a href={`/${post?.post?.username}`} className={styles.fullname}>
								<span>
									{post?.post?.name} {post?.post?.surname}
								</span>
							</a>
							<a href={`/${post?.post?.username}`} className={styles.username}>
								<span>@{`${post?.post?.username}`}</span>
							</a>
						</div>
						<div className={styles['tweet-info']}>
							<a href="">
								<p>{post?.post?.tweet}</p>
							</a>
						</div>
						<div className={styles.allIcons}>
							<a className={styles.comments}>
								<img src="/images/chat.svg" alt="" />

								<span>{post?.post?.comments.length} </span>
							</a>
							<a className={styles.retweets}>
								<img src="/images/retweet.svg" alt="" />

								<span>{post?.post?.retweets.length}</span>
							</a>

							<a className={styles.likes}>
								<img src="/images/heart.svg" alt="" />

								<span>{post?.post?.likes.length}</span>
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className={styles['user-replying']}>
				<div className={styles.border}>
					<img src={`https://${loggedInAvatar}`} alt="" />
					<div className={styles['empty-bottom']}></div>
				</div>
				<form>
					<textarea
						maxLength="250"
						placeholder="Tweet your reply"
						autoFocus
						className={styles.textarea}
						ref={inputAreaRef}
					/>
					<div className={styles.icons}>
						<div className={styles.icons1}>
							<a href="">
								<img src="/images/explore.svg" alt="" />
							</a>
							<a href="">
								<img src="/images/user.svg" alt="" />
							</a>
							<a href="">
								<img src="/images/list.svg" alt="" />
							</a>
							<a href="">
								<img src="/images/more.svg" alt="" />
							</a>
						</div>
						<button onClick={handleReplyTweet} className={styles.btn}>
							Tweet
						</button>
					</div>
				</form>
			</div>

			{comments?.map((comment, index) => (
				<div key={index} className={styles.tweets + ' ' + styles.commenter}>
					<div className={styles['user-tweet'] + ' ' + styles['user']}>
						<a href="">
							<img
								src={`http://${comment?.avatar}`}
								alt=""
								width={35}
								height={35}
								className={styles['image-textarea-user']}
							/>{' '}
						</a>
						<div className={styles['user-info']}>
							<div className={styles['name-username']}>
								<a href={`/${comment?.username}`} className={styles.fullname}>
									<span>
										{comment?.name} {comment?.surname}
									</span>
								</a>
								<a href={`/${comment?.username}`} className={styles.username}>
									<span>@{`${comment?.username}`}</span>
								</a>
							</div>
							<span className={styles.replyingtoUser}>
								Replying to <a href="">@{`${post?.post?.username}`}</a>
							</span>
							<div className={styles['tweet-info']}>
								<a href="">
									<p>{comment?.text}</p>
								</a>
							</div>
							<div className={styles.allIcons}>
								<a className={styles.comments}>
									<img src="/images/chat.svg" alt="" />

									<span>0</span>
								</a>
								<a className={styles.retweets}>
									<img src="/images/retweet.svg" alt="" />

									<span>0</span>
								</a>

								<a className={styles.likes}>
									<img src="/images/heart.svg" alt="" />

									<span>0</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
