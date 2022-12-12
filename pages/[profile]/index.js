import { useSession, getSession } from 'next-auth/react';

import SideBarLoggedIn from '../../components/homeUser/SideBarLoggedIn';
import ThirdPartLoggedIn from '../../components/homeUser/ThirdPartLoggedIn';
import ProfileUser from '../../components/homeUser/ProfileUser/ProfileUser';
import styles from '../../styles/Home.module.css';
import { useEffect, useState } from 'react';
import SideBar from '../../components/homeguest/SideBar';
import ThirdPart from '../../components/homeguest/ThirdPart';

export default function Profile() {
	const [path, setPath] = useState();
	const [loggedInUsername, setLoggedInUsername] = useState();
	const [isOwner, setIsOwner] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const [fetchData, setFetchedData] = useState();
	const [updateFollowing, setUpdateFollowing] = useState();
	const { data: session, status } = useSession();
	const [userNotFound, setUserNotFound] = useState(false);

	const [isUserLoggedIn, setIsUserLoggedIn] = useState();

	let username;

	console.log(isUserLoggedIn);
	console.log(isOwner);

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
		followProfile: fetchData?.user?.username,
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
		setIsUserLoggedIn(Boolean(localStorage.getItem('loggedInUsername')));
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
					console.log(data);
					if (data.user) {
						setFetchedData(data);
					} else {
						setUserNotFound(true);
						console.log('user doesnt exist');
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
				{isUserLoggedIn ? (
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
					userNotFound={userNotFound}
					loggedInUsername={loggedInUsername}
					isFollowing={isFollowing}
					setUpdateFollowing={setUpdateFollowing}
					updateFollowing={updateFollowing}
				/>

				{isUserLoggedIn ? (
					<ThirdPartLoggedIn styles={styles} />
				) : (
					<ThirdPart styles={styles} />
				)}
			</main>
		</div>
	);
}

// export async function getStaticProps(context) {
// 	const params = context.params.profile;
// 	// let data;
// 	const data = await getUser(params);
// 	console.log(data);
// 	// const data = JSON.parse(dataAll);

// 	return {
// 		props: {
// 			data: JSON.parse(data),
// 		},
// 	};
// }

// export async function getStaticPaths() {
// 	const res = await getAllUsers();
// 	const data = JSON.parse(res);

// 	const profiles = data.map((profile) => profile.username);
// 	const params = profiles.map((profile) => ({ params: { profile } }));
// 	console.log(params);
// 	return {
// 		paths: params,
// 		fallback: false, // can also be true or 'blocking'
// 	};
// }
