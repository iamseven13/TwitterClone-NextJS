import styles from './RegisterForm.module.css';
import { useRef } from 'react';

export default function RegisterForm(props) {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const passwordInputRef2 = useRef();

	async function registerUserHandler(e) {
		e.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
		const enteredPassword2 = passwordInputRef2.current.value;

		const clientData = {
			email: enteredEmail,
			password: enteredPassword,
			password2: enteredPassword2,
		};

		try {
			const res = await fetch('/api/register/register', {
				method: 'POST',
				body: JSON.stringify(clientData),
				headers: { 'Content-type': 'application/json' },
			});
			const data = await res.json();
			console.log(data);
		} catch (e) {
			console.log(e.message);
		}
	}

	function handleExitForm(e) {
		e.preventDefault();
		props.setRegisterForm(false);
	}

	return (
		<div className={styles['register-background']}>
			<div className={styles['register-container']}>
				<div className={styles.exit}>
					<a href="" className="exit-form" onClick={handleExitForm}>
						<img src="./images/exit.svg" alt="" />
					</a>
				</div>
				<div className={styles['form']}>
					<form
						className={styles['form-container']}
						onSubmit={registerUserHandler}
					>
						<div className={styles['form-email']}>
							<input
								type="email"
								id="femail"
								name="femail"
								placeholder="Email"
								required
								ref={emailInputRef}
							/>
						</div>
						<div className={styles['form-email']}>
							<input
								type="password"
								id="fpassword"
								name="fpassword"
								placeholder="Password"
								required
								ref={passwordInputRef}
							/>
						</div>
						<div className={styles['form-email']}>
							<input
								type="password"
								id="retype"
								name="retype"
								placeholder="Retype password"
								required
								ref={passwordInputRef2}
							/>
						</div>
						<button type="submit">Register</button>
					</form>
				</div>
			</div>
		</div>
	);
}
