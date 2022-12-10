import { useSession, getSession } from 'next-auth/react';

import SideBarLoggedIn from '../../components/homeUser/SideBarLoggedIn';
import ThirdPartLoggedIn from '../../components/homeUser/ThirdPartLoggedIn';
import ProfileUser from '../../components/homeUser/ProfileUser/ProfileUser';

import styles from '../../styles/Home.module.css';
import { useEffect, useState } from 'react';
import SideBar from '../../components/homeguest/SideBar';
import { useRouter } from 'next/router';
import ThirdPart from '../../components/homeguest/ThirdPart';
import getAllUsers from '../../lib/getAllUsers';
import getUser from '../../lib/getuser';

export default function Profile({ data }) {
	const [path, setPath] = useState();
	const [loggedInUsername, setLoggedInUsername] = useState();
	const [isOwner, setIsOwner] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const [fetchData, setFetchedData] = useState(data);
	const [updateFollowing, setUpdateFollowing] = useState();
	const { data: session, status } = useSession();

	const [isUserLoggedIn, setIsUserLoggedIn] = useState(Boolean(session));

	console.log(data);

	let username;

	const { user } = fetchData;

	useEffect(() => {
		const loggedIn = localStorage.getItem('loggedInUsername');
		setLoggedInUsername(loggedIn);
		if (fetchData && loggedIn) {
			if (fetchData.user.username === loggedInUsername) {
				setIsOwner(true);
			} else {
				setIsOwner(false);
			}
		}
	}, [path, fetchData]);

	const followRequest = {
		loggedInUsername,
		followProfile: user?.username,
	};

	useEffect(() => {
		async function isFollowing() {
			try {
				const res = await fetch('/api/follow/isfollowing', {
					method: 'POST',
					body: JSON.stringify(followRequest),
				});
				const data = await res.json();
				setIsFollowing(data.isFollowing);
			} catch (e) {
				console.log(e.message);
			}
		}
		isFollowing();
	}, [fetchData]);

	useEffect(() => {
		const path = window.location.pathname.split('/')[1];
		setPath(path);

		if (session) {
			setIsUserLoggedIn(true);
		} else {
			setIsUserLoggedIn(false);
		}
	}, [path]);

	useEffect(() => {
		async function fetchData() {
			const path = window.location.pathname.split('/')[1];

			if (path) {
				try {
					const res = await fetch('/api/profile/ProfileData', {
						method: 'POST',
						body: path,
						'Content-Type': 'application/json',
					});
					const data = await res.json();

					setFetchedData(data);

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
	}, [isFollowing, updateFollowing]);

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

				<ProfileUser
					fetchData={fetchData}
					isOwner={isOwner}
					loggedInUsername={loggedInUsername}
					isFollowing={isFollowing}
					setUpdateFollowing={setUpdateFollowing}
					updateFollowing={updateFollowing}
				/>

				{!isUserLoggedIn ? (
					<ThirdPartLoggedIn styles={styles} />
				) : (
					<ThirdPart styles={styles} />
				)}
			</main>
		</div>
	);
}

export async function getStaticProps(context) {
	const params = context.params.profile;
	// let data;
	const data = await getUser(params);
	console.log(data);
	// const data = JSON.parse(dataAll);

	return {
		props: {
			data: JSON.parse(data),
		},
	};
}

export async function getStaticPaths() {
	const data = await getAllUsers();

	const profiles = data.map((profile) => profile.username);
	const params = profiles.map((profile) => ({ params: { profile } }));
	console.log(params);
	return {
		paths: params,
		fallback: false, // can also be true or 'blocking'
	};
}
