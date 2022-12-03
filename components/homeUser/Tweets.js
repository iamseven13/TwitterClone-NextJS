import Image from 'next/image';
import styles from './Tweets.module.css';
import { useEffect, useState } from 'react';

import { getData } from '../../DUMMY_TWEETS';

export default function Tweets({ tweets }) {
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

	return (
		<div className={styles.tweets}>
			{tweets.tweets
				.map((tweet) => (
					<div className={styles['user-tweet']}>
						<a href="">
							<Image
								src="https://api.lorem.space/image/book?w=150&h=220"
								alt=""
								width={35}
								height={35}
								className={styles['image-textarea-user']}
							/>{' '}
						</a>
						<div className={styles['user-info']}>
							<div className={styles['name-username']}>
								<a href="" className={styles.fullname}>
									<span>{tweet.name + ' ' + tweet.surname}</span>
								</a>
								<a href="" className={styles.username}>
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
				))
				.reverse()}
		</div>
	);
}
