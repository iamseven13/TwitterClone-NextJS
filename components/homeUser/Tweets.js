import Image from 'next/image';
import styles from './Tweets.module.css';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

export default function Tweets(props) {
	const { propsTweets, setShowReplyForm, setGatherDataFromPost } = props;

	const [tweets, setAllTweets] = useState(props.tweets.tweets);
	const [isLoading, setIsloading] = useState(true);
	const [loggedInUser, setLoggedInUser] = useState();
	const [loggedInUserId, setLoggedInUserId] = useState();
	const [isLiked, setIsLiked] = useState(false);
	const [retweetActionLoading, setRetweetActionLoading] = useState(false);
	const [startRetweetRequestCount, setstartRetweetRequestCount] = useState(0);
	const [stopRetweetRequestCount, setStopRetweetRequestCount] = useState(0);
	const [hasRetweeted, setHasRetweeted] = useState(false);

	const [tweetPost, setTweetPost] = useState();

	// const [allLikes, setAllLikes] = useState([]);
	const [liked, setLiked] = useState(false);
	const router = useRouter();
	console.log(tweets);
	// useEffect(() => {
	// 	const data = tweets.map((like) => like.likes);
	// 	console.log(data);
	// 	setAllLikes(data);
	// 	console.log(allLikes);
	// }, [tweets]);

	// useEffect(() => {
	// 	setLiked(
	// 		allLikes.findIndex((like) => (like.username === loggedInUser) !== -1)
	// 	);
	// }, []);

	useEffect(() => {
		if (tweets) {
			try {
				async function fetchPosts() {
					const res = await fetch('/api/tweets/getposts', {
						method: 'GET',
					});

					const data = await res.json();
					setAllTweets(data);
					console.log(data);

					props.setSubmitTweet(false);
					setIsloading(false);
				}
				fetchPosts();
				setLoggedInUser(localStorage.getItem('loggedInUsername'));
				setLoggedInUserId(localStorage.getItem('loggedInUserId'));
			} catch (e) {
				console.log('cant load tweets');
			}
		}
	}, [props.submitTweet, isLiked, liked]);

	async function handleLikeTweet(e, tweet) {
		e.preventDefault();

		setLiked(!liked);

		const tweetID = {
			id: tweet._id,
			name: loggedInUser,
			userId: loggedInUserId,
		};

		console.log(loggedInUserId, loggedInUser);

		try {
			const res = await fetch('/api/tweets/like', {
				method: 'POST',
				body: JSON.stringify(tweetID),
			});

			const data = await res.json();
			console.log(data);
			setIsLiked(!isLiked);
		} catch (e) {
			console.log(e.message);
		}
	}

	async function handleUnlikeTweet(e, tweet) {
		e.preventDefault();
		setLiked(!liked);
		const tweetID = { id: tweet._id, loggedInUser, userId: tweet.user };

		try {
			const res = await fetch('/api/tweets/unlike', {
				method: 'POST',
				body: JSON.stringify(tweetID),
			});

			const data = await res.json();
			console.log(data);
			setIsLiked(!isLiked);
		} catch (e) {
			console.log(e.message);
		}
	}

	function handleReplyTweet(e, tweetPost) {
		e.preventDefault();

		setShowReplyForm(true);
		setGatherDataFromPost(tweetPost);
	}

	useEffect(() => {
		if (startRetweetRequestCount) {
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

					setHasRetweeted(true);
					const data = await res.json();
					console.log(data);
				}
				fetchPosts();
			} catch (e) {
				console.log('cant load tweets');
			}
		}
	}, [startRetweetRequestCount]);

	async function handleRetweetTweet(e, tweetPost) {
		setstartRetweetRequestCount(startRetweetRequestCount + 1);
		setTweetPost(tweetPost);
	}

	if (!tweets) {
		return (
			<div className={styles.tweets}>
				<p>Loading</p>
			</div>
		);
	}

	if (tweets)
		return (
			<div className={styles.tweets}>
				{tweets.map((tweet) => (
					<div key={Math.random()} className={styles['user-tweet']}>
						<a href="">
							<Image
								src={
									isLoading ? props.tweets.tweets : `https://${tweet.avatar}`
								}
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

								{tweet.retweets?.findIndex(
									(retweet) => retweet.username === loggedInUser
								) === -1 ? (
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
										onClick={(e) => handleRetweetTweet(e, tweet)}
									>
										<img src="./images/retweet-green.svg" alt="" />
										{tweet.retweets?.length > 0 ? (
											<span>{tweet.retweets?.length}</span>
										) : (
											''
										)}
									</a>
								)}

								{tweet.likes?.findIndex(
									(like) => like.username === loggedInUser
								) === -1 ? (
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
