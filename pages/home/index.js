import styles from '../../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSession, getSession } from 'next-auth/react';
import { getData } from '../../DUMMY_TWEETS';

import SideBarLoggedIn from '../../components/homeUser/SideBarLoggedIn';
import MiddlePartLoggedIn from '../../components/homeUser/MiddlePartLoggedIn';
import ThirdPartLoggedIn from '../../components/homeUser/ThirdPartLoggedIn';

export default function Home(props) {
	const { tweets } = props;
	const [isLoading, setIsLoading] = useState(true);
	const { data: session, status, loading } = useSession();

	useEffect(() => {
		if (session) {
			localStorage.setItem('loggedInUsername', session.token.username);
		}
	}, [isLoading]);

	useEffect(() => {
		getSession().then((session) => {
			if (!session) {
				window.location.href = '/';
			} else {
				setIsLoading(false);
			}
		});
	}, []);

	if (isLoading) {
		return <h1>loading</h1>;
	}

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
				<SideBarLoggedIn styles={styles} />

				<MiddlePartLoggedIn styles={styles} tweets={tweets} />

				<ThirdPartLoggedIn styles={styles} />
			</main>
		</div>
	);
}

export async function getStaticProps(context) {
	const tweets = getData();

	return {
		props: {
			tweets,
		},
		revalidate: 30,
	};
}
