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
							Explore
						</a>
					</li>

					<li>
						<a className={styles.navlinks} href="/explore">
							{' '}
							<img src="/images/settings.svg" alt="" />
							Settings
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
}
