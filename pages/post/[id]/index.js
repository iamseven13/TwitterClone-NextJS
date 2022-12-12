import { useSession, getSession } from 'next-auth/react';

import SideBarLoggedIn from '../../../components/homeUser/SideBarLoggedIn';
import ThirdPartLoggedIn from '../../../components/homeUser/ThirdPartLoggedIn';

import styles from '../../../styles/Home.module.css';
import { useEffect, useState } from 'react';
import SideBar from '../../../components/homeguest/SideBar';
import { useRouter } from 'next/router';
import ThirdPart from '../../../components/homeguest/ThirdPart';
import Post from '../../../components/homeUser/Post/Post';
import getPost from '../../../lib/getpost';
import getAllPostIds from '../../../lib/getallpostsID';
import Popup from '../../../components/homeguest/Modals/Popup';

export default function PostID(props) {
	const { post } = props;

	const { data: session, status } = useSession();

	const [isUserLoggedIn, setIsUserLoggedIn] = useState();

	useEffect(() => {
		setIsUserLoggedIn(Boolean(localStorage.getItem('loggedInUsername')));
	}, []);

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				{isUserLoggedIn ? (
					<SideBarLoggedIn styles={styles} />
				) : (
					<SideBar styles={styles} />
				)}

				<Post isUserLoggedIn={isUserLoggedIn} postSSG={post} />

				{isUserLoggedIn ? (
					<ThirdPartLoggedIn styles={styles} />
				) : (
					<ThirdPart styles={styles} />
				)}
			</main>
		</div>
	);
}

export async function getStaticProps(context) {
	const postId = context.params.id;
	const post = await getPost(postId);

	return {
		props: { post },
	};
}

export async function getStaticPaths() {
	const allPosts = await getAllPostIds();
	const ids = allPosts.map((post) => post._id);
	const params = ids.map((id) => ({ params: { id: id } }));

	return {
		paths: params,
		fallback: false,
	};
}
