import Image from 'next/image';
import styles from './Tweets.module.css';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Tweets(props) {
	const { propsTweets, setShowReplyForm, setGatherDataFromPost, submitTweet } =
		props;

	const [loggedInUser, setLoggedInUser] = useState();
	const [loggedInUserId, setLoggedInUserId] = useState();

	// Immer

	const [state, setState] = useImmer({
		data: [],
		counts: '...',
		tweet: null,
		isLiked: false,
		isLoading: true,
		isRetweeted: false,
	});

	useEffect(() => {
		setLoggedInUser(localStorage.getItem('loggedInUsername'));
		setLoggedInUserId(localStorage.getItem('loggedInUserId'));
	}, []);
	const session = useSession();

	useEffect(() => {
		if (state.data) {
			async function fetchAllTweets() {
				try {
					const res = await fetch('/api/tweets/getposts', {
						method: 'GET',
					});
					const data = await res.json();
					console.log(data);
					setState((draft) => {
						draft.data = data;
					});
					setState((draft) => {
						draft.isLoading = false;
					});
				} catch (e) {
					console.log(e.message);
				}
			}
			fetchAllTweets();
		}
	}, [submitTweet, state.isLiked, state.isRetweeted]);

	async function handleLikeTweet(e, tweet) {
		const tweetID = {
			id: tweet?._id,
			name: loggedInUser,
			userId: loggedInUserId,
		};

		console.log(tweetID);

		try {
			const res = await fetch('/api/tweets/like', {
				method: 'POST',
				body: JSON.stringify(tweetID),
			});

			const data = await res.json();
			setState((draft) => {
				draft.isLiked = true;
			});
			console.log(data);
		} catch (e) {
			console.log(e.message);
		}

		e.preventDefault();

		setState((draft) => {
			draft.tweet = tweet;
		});
	}

	async function handleUnlikeTweet(e, tweet) {
		e.preventDefault();

		const tweetID = { id: tweet._id, loggedInUser, userId: tweet.user };

		try {
			const res = await fetch('/api/tweets/unlike', {
				method: 'POST',
				body: JSON.stringify(tweetID),
			});

			const data = await res.json();
			console.log(data);
			setState((draft) => {
				draft.isLiked = false;
			});
		} catch (e) {
			console.log(e.message);
		}
	}

	function handleReplyTweet(e, tweetPost) {
		e.preventDefault();

		setShowReplyForm(true);
		setGatherDataFromPost(tweetPost);
	}

	async function handleRetweetTweet(e, tweetPost) {
		try {
			const tweetID = {
				id: tweetPost._id,
				name: loggedInUser,
				userId: loggedInUserId,
			};
			async function fetchPosts() {
				const res = await fetch('/api/tweets/retweet', {
					method: 'POST',
					body: JSON.stringify(tweetID),
				});

				const data = await res.json();
				console.log(data);
				setState((draft) => {
					draft.isRetweeted = true;
				});
			}
			fetchPosts();
		} catch (e) {
			console.log('cant load tweets');
		}
	}

	async function handleUnRetweetTweet(e, tweetPost) {
		try {
			const tweetID = {
				id: tweetPost._id,
				name: loggedInUser,
				userId: loggedInUserId,
			};
			async function fetchPosts() {
				const res = await fetch('/api/tweets/unretweet', {
					method: 'POST',
					body: JSON.stringify(tweetID),
				});

				const data = await res.json();
				console.log(data);
				setState((draft) => {
					draft.isRetweeted = false;
				});
			}
			fetchPosts();
		} catch (e) {
			console.log('cant load tweets');
		}
	}

	if (!state.data) {
		return (
			<div className={styles.tweets}>
				<p>Loading</p>
			</div>
		);
	}

	if (state.data)
		return (
			<div className={styles.tweets}>
				{state?.data.map((tweet) => (
					<div key={Math.random()} className={styles['user-tweet']}>
						<a href="">
							<Image
								src={`https://${tweet.avatar}`}
								alt=""
								width={35}
								height={35}
								className={styles['image-textarea-user']}
							/>{' '}
						</a>
						<div className={styles['user-info']}>
							<div className={styles['name-username']}>
								<a href={`/${tweet.username}`} className={styles.fullname}>
									<span>{tweet.name + ' ' + tweet.surname}</span>
								</a>
								<a href={`/${tweet.username}`} className={styles.username}>
									<span>@{tweet.username}</span>
								</a>
							</div>
							<div className={styles['tweet-info']}>
								<a href={`/post/${tweet._id}`}>
									<p>{tweet.tweet}</p>
								</a>
							</div>
							<div className={styles.icons}>
								<a
									className={styles.comments}
									onClick={(e) => handleReplyTweet(e, tweet)}
								>
									<img src="./images/chat.svg" alt="" />
									{tweet.comments?.length > 0 ? (
										<span>{tweet.comments?.length} </span>
									) : (
										''
									)}
								</a>

								{tweet.retweets?.every(
									(retweet) => retweet.username !== loggedInUser
								) ? (
									<a
										className={styles.retweets}
										onClick={(e) => handleRetweetTweet(e, tweet)}
									>
										<img src="./images/retweet.svg" alt="" />
										{tweet.retweets?.length > 0 ? (
											<span>{tweet.retweets?.length}</span>
										) : (
											''
										)}
									</a>
								) : (
									<a
										className={styles.retweets}
										onClick={(e) => handleUnRetweetTweet(e, tweet)}
									>
										<img src="./images/retweet-green.svg" alt="" />
										{tweet.retweets?.length > 0 ? (
											<span>{tweet.retweets?.length}</span>
										) : (
											''
										)}
									</a>
								)}

								{tweet.likes?.every(
									(like) => like.username !== loggedInUser
								) ? (
									<a
										className={styles.likes}
										onClick={(e) => handleLikeTweet(e, tweet)}
									>
										<img src="./images/heart.svg" alt="" />

										{tweet.likes?.length > 0 ? (
											<span>{tweet.likes?.length}</span>
										) : (
											''
										)}
									</a>
								) : (
									<a
										className={styles.likes}
										onClick={(e) => handleUnlikeTweet(e, tweet)}
									>
										<img src="./images/heart-red.svg" alt="" />
										{tweet.likes?.length > 0 ? (
											<span>{tweet.likes?.length}</span>
										) : (
											''
										)}
									</a>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		);
}
