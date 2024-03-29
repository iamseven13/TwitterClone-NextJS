import styles from '../../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSession, getSession } from 'next-auth/react';

import SideBarLoggedIn from '../../components/homeUser/SideBarLoggedIn';
import MiddlePartLoggedIn from '../../components/homeUser/MiddlePartLoggedIn';
import ThirdPartLoggedIn from '../../components/homeUser/ThirdPartLoggedIn';
import Reply from '../../components/homeUser/Modals/Reply';

export default function Home(props) {
	const { tweets } = props;
	const [isLoading, setIsLoading] = useState(true);
	const [showReplyForm, setShowReplyForm] = useState(false);
	const [gatherDataFromPost, setGatherDataFromPost] = useState();
	const { data: session, status, loading } = useSession();
	console.log(session);
	useEffect(() => {
		if (session) {
			localStorage.setItem('loggedInUsername', session.token.username);
			localStorage.setItem('loggedInUserId', session.token.loggedInUserId);
			localStorage.setItem('loggedInAvatar', session.token.avatar);
		}
	}, [isLoading]);

	useEffect(() => {
		getSession().then((session) => {
			if (!session) {
				window.location.href = '/';
			} else {
				setIsLoading(false);
			}
		});
	}, []);

	if (isLoading) {
		return <h1>loading</h1>;
	}

	console.log(gatherDataFromPost);

	return (
		<>
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

					<MiddlePartLoggedIn
						styles={styles}
						tweets={tweets}
						setShowReplyForm={setShowReplyForm}
						setGatherDataFromPost={setGatherDataFromPost}
					/>

					<ThirdPartLoggedIn styles={styles} />
				</main>
			</div>
			{showReplyForm ? (
				<Reply
					gatherDataFromPost={gatherDataFromPost}
					setShowReplyForm={setShowReplyForm}
					session={session}
				/>
			) : (
				''
			)}
		</>
	);
}
