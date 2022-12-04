import { useSession } from 'next-auth/react';

import useSWR from 'swr';
import SideBarLoggedIn from '../../components/homeUser/SideBarLoggedIn';
import ThirdPartLoggedIn from '../../components/homeUser/ThirdPartLoggedIn';
import ProfileUser from '../../components/homeUser/ProfileUser/ProfileUser';

import styles from '../../styles/Home.module.css';
import { useEffect, useState } from 'react';
import SideBar from '../../components/homeguest/SideBar';
import { useRouter } from 'next/router';
import ThirdPart from '../../components/homeguest/ThirdPart';

export default function Profile(props) {
	console.log(props);
	const [path, setPath] = useState();

	const [isOwner, setIsOwner] = useState(false);

	const [fetchData, setFetchedData] = useState(props);

	const { data: session, status } = useSession();

	const [isUserLoggedIn, setIsUserLoggedIn] = useState(Boolean(session));
	console.log(session);

	let username;

	useEffect(() => {
		const path = window.location.pathname.split('/')[1];
		setPath(path);

		console.log(`this is ${session}`);

		if (session) {
			setIsUserLoggedIn(true);
			console.log(path);
		} else {
			setIsUserLoggedIn(false);
		}
	}, [path]);

	useEffect(() => {
		async function fetchData() {
			const path = window.location.pathname.split('/')[1];
			console.log(path);

			if (path) {
				try {
					const res = await fetch('/api/profile/ProfileData', {
						method: 'POST',
						body: path,
						'Content-Type': 'application/json',
					});
					const data = await res.json();

					setFetchedData(data);
					console.log(data);

					if (data.error) {
						console.log(data.error);
					}
				} catch (e) {
					console.log(e.message);
				}
			} else {
				console.log(`${path} doesnt exist`);
			}
		}
		fetchData();
	}, []);

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				{!isUserLoggedIn ? (
					<SideBarLoggedIn
						styles={styles}
						user={username}
						setIsUserLoggedIn={setIsUserLoggedIn}
					/>
				) : (
					<SideBar styles={styles} />
				)}

				<ProfileUser fetchData={fetchData} isOwner={isOwner} />

				{!isUserLoggedIn ? (
					<ThirdPartLoggedIn styles={styles} />
				) : (
					<ThirdPart styles={styles} />
				)}
			</main>
		</div>
	);
}

export async function getStaticPaths() {
	return {
		paths: [{ params: { profile: 'yllihey' } }],
		fallback: false, // can also be true or 'blocking'
	};
}

export async function getStaticProps(context) {
	return {
		props: {
			user: {
				name: 'test',
				surname: 'test',
				avatar:
					'www.gravatar.com/avatar/0ec80989ce27b889868092e028f4fd73?s=200&r=pg&d=mm',
				username: 'test',
			},
		},
	};
}
