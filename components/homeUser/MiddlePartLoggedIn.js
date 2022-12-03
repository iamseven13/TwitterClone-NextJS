import Image from 'next/image';

import styles from './MiddlePartLoggedIn.module.css';

import Tweets from './Tweets';
export default function MiddlePartLoggedIn({ tweets }) {
	console.log(tweets);
	return (
		<div className={styles.middle}>
			<div className={styles['top-header']}>
				<h2>Home</h2>
				<img src="/images/list.svg" alt="" />
			</div>
			<div className={styles['image-textarea']}>
				<Image
					src="https://api.lorem.space/image/book?w=150&h=220"
					alt=""
					width={35}
					height={35}
					className={styles['image-textarea-user']}
				/>
				<div className={styles['text-area']}>
					<textarea
						maxLength="250"
						placeholder="What is happening?"
						autoFocus
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
