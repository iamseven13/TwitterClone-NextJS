import { useSession, getSession } from 'next-auth/react';

import SideBarLoggedIn from '../../../components/homeUser/SideBarLoggedIn';
import ThirdPartLoggedIn from '../../../components/homeUser/ThirdPartLoggedIn';

import styles from '../../../styles/Home.module.css';
import { useEffect, useState } from 'react';
import SideBar from '../../../components/homeguest/SideBar';
import { useRouter } from 'next/router';
import ThirdPart from '../../../components/homeguest/ThirdPart';
import Post from '../../../components/homeUser/Post/Post';

export default function PostID(props) {
	const { data: session, status } = useSession();

	const [isUserLoggedIn, setIsUserLoggedIn] = useState(Boolean(session));

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				{!isUserLoggedIn ? (
					<SideBarLoggedIn styles={styles} />
				) : (
					<SideBar styles={styles} />
				)}

				<Post />

				{!isUserLoggedIn ? (
					<ThirdPartLoggedIn styles={styles} />
				) : (
					<ThirdPart styles={styles} />
				)}
			</main>
		</div>
	);
}
