import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from './MiddlePartLoggedIn.module.css';

import Tweets from './Tweets';
import { useEffect, useState } from 'react';
export default function MiddlePartLoggedIn({ tweets }) {
	const [avatarPic, setAvatarPic] = useState(
		'https://images.unsplash.com/photo-1534294668821-28a3054f4256?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
	);

	const { data: session, status, loading } = useSession();

	useEffect(() => {
		if (session) {
			setAvatarPic(session.token.avatar);
		}
	}, []);

	return (
		<div className={styles.middle}>
			<div className={styles['top-header']}>
				<h2>Home</h2>
				<img src="/images/list.svg" alt="" />
			</div>
			<div className={styles['image-textarea']}>
				<Image
					src={avatarPic}
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
