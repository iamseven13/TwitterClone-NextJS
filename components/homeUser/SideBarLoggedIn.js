import { useSession, signOut } from 'next-auth/react';

export default function SideBarLoggedIn({ styles, user, setIsUserLoggedIn }) {
	const { data: session, status } = useSession();
	function handleLogout(e) {
		signOut();
		setIsUserLoggedIn(false);
		console.log(session);

		localStorage.removeItem('loggedInUsername');
		localStorage.removeItem('loggedInUserId');
		localStorage.removeItem('loggedInAvatar');
	}

	let username;

	if (username === undefined) {
		username = user;
	}

	if (session) {
		const { name, surname } = session.token;
		username = name.toLowerCase() + surname.toLowerCase();
	}

	return (
		<div className={styles.navbar}>
			<a href="/" className={styles.logo}>
				<img src="/images/logo.svg" alt="logo" />
			</a>
			<nav className={styles.nav}>
				<ul>
					<li>
						<a className={styles.navlinks} href="/home">
							{' '}
							<img src="/images/home.svg" alt="" />
							<span className={styles.aLinks}>Home</span>
						</a>
					</li>

					<li>
						<a className={styles.navlinks + ' ' + styles.disabledBtn}>
							{' '}
							<img src="/images/explore.svg" alt="" />
							<span className={styles.aLinks}>Explore</span>
						</a>
					</li>

					<li>
						<a className={styles.navlinks + ' ' + styles.disabledBtn}>
							{' '}
							<img src="/images/bell.svg" alt="" />
							<span className={styles.aLinks}>Notifications</span>
						</a>
					</li>
					<li>
						<a className={styles.navlinks + ' ' + styles.disabledBtn}>
							{' '}
							<img src="/images/message.svg" alt="" />
							<span className={styles.aLinks}>Messages</span>
						</a>
					</li>
					<li>
						<a className={styles.navlinks + ' ' + styles.disabledBtn}>
							{' '}
							<img src="/images/bookmark.svg" alt="" />
							<span className={styles.aLinks}>Bookmarks</span>
						</a>
					</li>
					<li>
						<a className={styles.navlinks + ' ' + styles.disabledBtn}>
							{' '}
							<img src="/images/list.svg" alt="" />
							<span className={styles.aLinks}>Lists</span>
						</a>
					</li>
					<li>
						<a className={styles.navlinks} href={`/${username}`}>
							{' '}
							<img src="/images/user.svg" alt="" />
							<span className={styles.aLinks}>Profile</span>
						</a>
					</li>
					<li>
						<a className={styles.navlinks + ' ' + styles.disabledBtn}>
							{' '}
							<img src="/images/more.svg" alt="" />
							<span className={styles.aLinks}>More</span>
						</a>
					</li>
				</ul>
			</nav>
			<a onClick={handleLogout} className={styles.logout}>
				<img src="/images/logout.svg" alt="" />
			</a>
			<button className={styles['sidebar-btn-logout']} onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
}
