import Head from 'next/head';

import RegisterForm from '../components/homeguest/RegisterForm';
import styles from '../styles/Home.module.css';

import { useState } from 'react';
import ThirdPart from '../components/homeguest/ThirdPart';
import MiddlePart from '../components/homeguest/MiddlePart';
import SideBar from '../components/homeguest/SideBar';

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
				<SideBar styles={styles} />

				<MiddlePart styles={styles} />

				<ThirdPart styles={styles} setRegisterForm={setRegisterForm} />
			</main>
			{showRegisterForm ? (
				<RegisterForm setRegisterForm={setRegisterForm} />
			) : (
				''
			)}
		</div>
	);
}
