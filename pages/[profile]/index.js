import { useSession } from 'next-auth/react';
import { server } from '../../config/index';
import SideBarLoggedIn from '../../components/homeUser/SideBarLoggedIn';
import ThirdPartLoggedIn from '../../components/homeUser/ThirdPartLoggedIn';
import ProfileUser from '../../components/homeUser/ProfileUser/ProfileUser';

import styles from '../../styles/Home.module.css';

export default function Profile(props) {
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
				<ProfileUser props={props} />
				<ThirdPartLoggedIn styles={styles} />
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { params } = context;

	console.log(params.profile);

	const res = await fetch(
		'https://twitter-clone-next-fukx29jxc-iamseven13.vercel.app/api/profile/ProfileData',
		{
			method: 'POST',
			body: params.profile,
			'Content-Type': 'application/json',
		}
	);
	const data = await res.json();
	if (data.error) {
		return {
			redirect: {
				destination: '/home',
				permanent: false,
			},
		};
	}
	return {
		props: { data },
	};
}
