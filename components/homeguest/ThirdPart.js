export default function ThirdPart({ styles, setRegisterForm }) {
	return (
		<div className={styles.signup}>
			<div className={styles['signup-container']}>
				<div>
					<h2>New To Twitter?</h2>
					<span>Sign up now to get your own personalized timeline!</span>
				</div>
				<div className={styles['signup-btn']}>
					<button onClick={() => setRegisterForm(true)}>
						Sign up with phone or email
					</button>
					<button>Sign up with Google</button>
					<button>Sign up with Apple</button>
				</div>
			</div>
		</div>
	);
}
