import Head from 'next/head';
import Image from 'next/image';
import RegisterForm from '../components/RegisterForm';
import styles from '../styles/Home.module.css';

import { useState } from 'react';

export default function Home(props) {
	const [showRegisterForm, setRegisterForm] = useState(false);
	return (
		<div className={styles.container}>
			<Head>
				<title>Twitter Clone</title>
				<meta
					name="description"
					content="Twitter but just better with free speech."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				{/* First part*/}

				<div className={styles.navbar}>
					<a href="/" className={styles.logo}>
						<img src="/images/logo.svg" alt="logo" />
					</a>
					<nav className={styles.nav}>
						<ul>
							<li>
								<a className={styles.navlinks} href="/explore">
									{' '}
									<img src="/images/explore.svg" alt="" />
									Explore
								</a>
							</li>

							<li>
								<a className={styles.navlinks} href="/explore">
									{' '}
									<img src="/images/settings.svg" alt="" />
									Settings
								</a>
							</li>
						</ul>
					</nav>
				</div>

				{/* Middle part*/}

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
								<span className={styles.middleSpan}>{props.obj.name}</span>
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

				{/* Third part*/}

				<div className={styles.signup}>
					<div className={styles['signup-container']}>
						<div>
							<h2>New To Twitter?</h2>
							<span>Sign up now to get your own personalized timeline!</span>
						</div>
						<div className={styles['signup-btn']}>
							<button onClick={() => setRegisterForm(true)}>
								Sign up with phone or email
							</button>
							<button>Sign up with Google</button>
							<button>Sign up with Apple</button>
						</div>
					</div>
				</div>
			</main>
			{showRegisterForm ? (
				<RegisterForm setRegisterForm={setRegisterForm} />
			) : (
				''
			)}
		</div>
	);
}

export async function getStaticProps() {
	const obj = {
		name: 'Live: Sport',
	};

	return {
		props: {
			obj,
		},
	};
}
