import styles from './RegisterForm.module.css';
import { useRef, useState } from 'react';

import { signIn } from 'next-auth/react';

export default function RegisterForm(props) {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const passwordInputRef2 = useRef();

	const [isLogin, setIsLogin] = useState(false);

	async function handleRegister(e) {
		e.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
		const enteredPassword2 = passwordInputRef2.current.value;

		if (enteredPassword !== enteredPassword2) {
			return res.json({ msg: 'password should match' });
		}

		const clientData = {
			email: enteredEmail,
			password: enteredPassword,
			password2: enteredPassword2,
		};

		try {
			const res = await fetch('/api/auth/signup', {
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

	async function handleLogin(e) {
		e.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		if (isLogin) {
			// log in user
			const result = await signIn('credentials', {
				redirect: false,
				email: enteredEmail,
				password: enteredPassword,
			});
			console.log(result);
			if (!result.error) {
				handleExitForm(e);
			}
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
						onSubmit={isLogin ? handleLogin : handleRegister}
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
						{!isLogin ? (
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
						) : (
							''
						)}
						<a
							onClick={() => setIsLogin((prev) => !prev)}
							className={styles.login}
						>
							{isLogin ? 'or Register' : 'or Login'}
						</a>
						<button type="submit">{!isLogin ? 'Register' : 'Login'}</button>
					</form>
				</div>
			</div>
		</div>
	);
}
