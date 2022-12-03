import { useSession, signOut } from 'next-auth/react';

export default function SideBarLoggedIn({ styles, user }) {
	const { data: session, status } = useSession();
	function handleLogout() {
		signOut();
		console.log(session);
	}
	console.log(user);
	console.log(session);
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
							Home
						</a>
					</li>

					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/explore.svg" alt="" />
							Explore
						</a>
					</li>

					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/bell.svg" alt="" />
							Notifications
						</a>
					</li>
					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/message.svg" alt="" />
							Messages
						</a>
					</li>
					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/bookmark.svg" alt="" />
							Bookmarks
						</a>
					</li>
					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/list.svg" alt="" />
							Lists
						</a>
					</li>
					<li>
						<a className={styles.navlinks} href={username}>
							{' '}
							<img src="/images/user.svg" alt="" />
							Profile
						</a>
					</li>
					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/more.svg" alt="" />
							More
						</a>
					</li>
				</ul>
			</nav>
			<button className={styles['sidebar-btn-logout']} onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
}
