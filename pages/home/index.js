import styles from '../../styles/Home.module.css';
import Head from 'next/head';

import SideBarLoggedIn from '../../components/homeUser/SideBarLoggedIn';
import MiddlePartLoggedIn from '../../components/homeUser/MiddlePartLoggedIn';
import ThirdPartLoggedIn from '../../components/homeUser/ThirdPartLoggedIn';

export default function Home() {
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

				<MiddlePartLoggedIn styles={styles} />

				<ThirdPartLoggedIn styles={styles} />
			</main>
		</div>
	);
}
