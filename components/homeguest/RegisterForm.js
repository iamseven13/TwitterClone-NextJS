import styles from './RegisterForm.module.css';
import { useRef, useState } from 'react';

import { signIn } from 'next-auth/react';

export default function RegisterForm(props) {
	const nameInputRef = useRef();
	const surnameInputRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const passwordInputRef2 = useRef();
	let username;
	const [isLogin, setIsLogin] = useState(false);

	async function handleRegister(e) {
		e.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredSurname = surnameInputRef.current.value;
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
		const enteredPassword2 = passwordInputRef2.current.value;

		if (enteredPassword !== enteredPassword2) {
			return res.json({ msg: 'password should match' });
		}

		username = (enteredName + enteredSurname).toLowerCase().trim();

		const clientData = {
			name: enteredName,
			surname: enteredSurname,
			email: enteredEmail,
			username: username,
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

			if (data.msg) {
				setIsLogin(true);
			}
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

			localStorage.setItem('loggedInUsername', username);

			if (!result.error) {
				handleExitForm(e);
				window.location.href = `${window.location.origin}/home`;
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
						<span>DEMO</span>
						<span>demo@demo.com</span>
						<span>demo1234</span>
						{!isLogin ? (
							<>
								<div className={styles['form-email']}>
									<input
										type="name"
										id="name"
										name="name"
										placeholder="Name"
										required
										ref={nameInputRef}
									/>
								</div>
								<div className={styles['form-email']}>
									<input
										type="name"
										id="surname"
										name="surname"
										placeholder="Surname"
										required
										ref={surnameInputRef}
									/>
								</div>
							</>
						) : (
							''
						)}
						<div className={styles['form-email']}>
							<input
								type="email"
								id="femail"
								name="email"
								placeholder="Email"
								required
								ref={emailInputRef}
							/>
						</div>
						<div className={styles['form-email']}>
							<input
								type="password"
								id="fpassword"
								name="password"
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
									name="password2"
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

export async function getStaticProps() {}
