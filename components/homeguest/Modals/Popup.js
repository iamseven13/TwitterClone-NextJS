import styles from './Popup.module.css';

export default function Popup({ setRegisterForm }) {
	function handleFormModal() {
		setRegisterForm(true);
	}

	return (
		<div className={styles.container}>
			<div className={styles.popup}>
				<button onClick={handleFormModal} className={styles.btnLeft}>
					Log In
				</button>
				<button onClick={handleFormModal}>Sign Up</button>
			</div>
		</div>
	);
}
