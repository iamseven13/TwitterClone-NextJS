import Image from 'next/image';
import styles from './Tweets.module.css';
import { useEffect, useState } from 'react';

import { getData } from '../../DUMMY_TWEETS';

export default function Tweets(props) {
	const { propsTweets } = props;
	console.log(props);
	const [tweets, setAllTweets] = useState(props.tweets.tweets);
	const [isLoading, setIsloading] = useState(true);
	console.log(tweets);
	useEffect(() => {
		if (tweets) {
			try {
				async function fetchPosts() {
					const res = await fetch('/api/tweets/getposts', {
						method: 'GET',
					});

					const data = await res.json();
					setAllTweets(data);

					props.setSubmitTweet(false);
					setIsloading(false);
					console.log(data);
				}
				fetchPosts();
			} catch (e) {
				console.log('cant load tweets');
			}
		}
	}, [props.submitTweet]);

	if (!tweets) {
		return (
			<div className={styles.tweets}>
				<div className={styles['user-tweet']}>
					<a href="">
						<Image
							src=""
							alt=""
							width={35}
							height={35}
							className={styles['image-textarea-user']}
						/>{' '}
					</a>
					<div className={styles['user-info']}>
						<div className={styles['name-username']}>
							<a href="" className={styles.fullname}>
								<span>RapidAPI</span>
							</a>
							<a href="" className={styles.username}>
								<span>@rapid_API</span>
							</a>
						</div>
						<div className={styles['tweet-info']}>
							<a href="">
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Excepturi expedita voluptatum magnam a, quod sequi ipsam in
									cumque iusto suscipit doloribus sit molestiae blanditiis
									deleniti corrupti veniam illum nemo neque?
								</p>
							</a>
						</div>
						<div className={styles.icons}>
							<a href="">
								<img src="./images/chat.svg" alt="" />
							</a>
							<a href="">
								<img src="./images/retweet.svg" alt="" />
							</a>
							<a href="">
								<img src="./images/heart.svg" alt="" />
							</a>
							<a href="">
								<img src="./images/download.svg" alt="" />
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (tweets)
		return (
			<div className={styles.tweets}>
				{tweets.map((tweet) => (
					<div className={styles['user-tweet']}>
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
								<a href="">
									<p>{tweet.tweet}</p>
								</a>
							</div>
							<div className={styles.icons}>
								<a href="">
									<img src="./images/chat.svg" alt="" />
								</a>
								<a href="">
									<img src="./images/retweet.svg" alt="" />
								</a>
								<a href="">
									<img src="./images/heart.svg" alt="" />
								</a>
								<a href="">
									<img src="./images/download.svg" alt="" />
								</a>
							</div>
						</div>
					</div>
				))}
			</div>
		);
}
