export default function SideBar({ styles }) {
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
							<img src="/images/explore.svg" alt="" />
							<span className={styles.aLinks}>Explore</span>
						</a>
					</li>

					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/settings.svg" alt="" />
							<span className={styles.aLinks}>Settings</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
}
