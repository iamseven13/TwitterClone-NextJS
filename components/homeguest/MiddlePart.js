import Image from 'next/image';

export default function MiddlePart({ styles }) {
	return (
		<div className={styles.middle}>
			<div className={styles.input}>
				<input type="text" placeholder="Search Twitter" />
			</div>
			<div className={styles.imageContainer}>
				<Image
					src="/images/worldcup.jpg"
					alt="picture of 2022 worldcup stadium"
					fill
					sizes="(max-width: 610px) 100vw"
					priority="true"
				/>
				<div className={styles.text}>
					<span>Live: Sport</span>
					<span>Watch WorldCup</span>
				</div>
			</div>
			<div className={styles.trendList}>
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
	);
}
