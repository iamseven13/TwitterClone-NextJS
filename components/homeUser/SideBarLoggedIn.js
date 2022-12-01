export default function SideBarLoggedIn({ styles }) {
	return (
		<div className={styles.navbar}>
			<a href="/" className={styles.logo}>
				<img src="/images/logo.svg" alt="logo" />
			</a>
			<nav className={styles.nav}>
				<ul>
					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/settings.svg" alt="" />
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
							<img src="/images/settings.svg" alt="" />
							Notifications
						</a>
					</li>
					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/settings.svg" alt="" />
							Messages
						</a>
					</li>
					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/settings.svg" alt="" />
							Bookmarks
						</a>
					</li>
					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/settings.svg" alt="" />
							Lists
						</a>
					</li>
					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/settings.svg" alt="" />
							Profile
						</a>
					</li>
					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/settings.svg" alt="" />
							More
						</a>
					</li>
				</ul>
			</nav>
			<button>Tweet</button>
		</div>
	);
}
