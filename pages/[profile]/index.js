import { useSession } from 'next-auth/react';

import SideBarLoggedIn from '../../components/homeUser/SideBarLoggedIn';
import ThirdPartLoggedIn from '../../components/homeUser/ThirdPartLoggedIn';
import ProfileUser from '../../components/homeUser/ProfileUser/ProfileUser';

import styles from '../../styles/Home.module.css';

export default function Profile() {
	const { data: session, status } = useSession();

	let username;

	if (session) {
		const { name, surname } = session.token;
		username = name + surname;
	}

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<SideBarLoggedIn styles={styles} user={username} />
				<ProfileUser />
				<ThirdPartLoggedIn styles={styles} />
			</main>
		</div>
	);
}
