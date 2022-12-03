import Image from 'next/image';

export default function ThirdPartLoggedIn({ styles }) {
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
					<div className={styles.user}>
						<div className={styles['user-firstPart']}>
							<Image
								src=""
								alt=""
								width={40}
								height={40}
								objectFit="cover"
								className={styles['who-toFollow-pics']}
							/>

							<a href="/jimmyfallon" className={styles['user-info']}>
								<span>Jimmy Fallon</span>
								<span>@jimmyfallon</span>
							</a>
						</div>
						<button>Follow</button>
					</div>

					<div className={styles.user}>
						<div className={styles['user-firstPart']}>
							<Image
								src=""
								alt=""
								width={40}
								height={40}
								className={styles['who-toFollow-pics']}
							/>

							<a href="/jimmyfallon" className={styles['user-info']}>
								<span>Jimmy Fallon</span>
								<span>@jimmyfallon</span>
							</a>
						</div>
						<button>Follow</button>
					</div>
				</div>
			</div>
		</div>
	);
}
