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
	const [path, setPath] = useState();

	const [isOwner, setIsOwner] = useState(false);

	const [fetchData, setFetchedData] = useState();

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

			try {
				const res = await fetch(
					'http://localhost:3000/api/profile/ProfileData',
					{
						method: 'POST',
						body: path,
						'Content-Type': 'application/json',
					}
				);
				const data = await res.json();

				setFetchedData(data);
				console.log(data);

				if (data.error) {
					console.log(data.error);
				}
			} catch (e) {
				console.log(e.message);
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
