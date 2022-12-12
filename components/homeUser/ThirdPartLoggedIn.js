import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ThirdPartLoggedIn({ styles }) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function fetchUsers() {
			const res = await fetch('/api/users/getallusers', {
				method: 'GET',
			});
			const data = await res.json();

			const slicedArr = data.slice(2, 5);

			setUsers(slicedArr);
		}
		fetchUsers();
	}, []);

	return (
		<div className={styles.signup}>
			<div className={styles['right-tabs']}>
				<div className={styles[('trendList', 'trendList-m0')]}>
					<h3>Trends for you</h3>
					<div className={styles.trends}>
						<a href="/" className={styles.trend}>
							<span>Politics - Trending</span>
							<span className={styles.middleSpan}>Trump is unbanned</span>
							<span>123K Tweets</span>
						</a>
						<a href="/" className={styles.trend}>
							<span>Music - Trending</span>
							<span className={styles.middleSpan}>Rihanna Album</span>
							<span>53K Tweets</span>
						</a>
						<a href="/" className={styles.trend}>
							<span>Technology - Trending</span>
							<span className={styles.middleSpan}>Apple New Iphone</span>
							<span>123K Tweets</span>
						</a>
						<a href="/" className={styles.trend}>
							<span>Politics - Trending</span>
							<span className={styles.middleSpan}>Elon Musk Free Speech</span>
							<span>123K Tweets</span>
						</a>
						<a className={styles.btn} href="/show-more">
							Show More
						</a>
					</div>
				</div>
			</div>

			<div className={styles['who-toFollow']}>
				<span>Who to Follow</span>
				<div className={styles.users}>
					{users.map((user) => (
						<div className={styles.user}>
							<div className={styles['user-firstPart']}>
								<Image
									src={`https://${user.avatar}`}
									alt=""
									width={40}
									height={40}
									objectFit="cover"
									className={styles['who-toFollow-pics']}
								/>

								<a href={`/${user.username}`} className={styles['user-info']}>
									<span>{user.name + ' ' + user.surname}</span>
									<span>{user.username}</span>
								</a>
							</div>
							<button className={styles.disabledBtn}>Follow</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
