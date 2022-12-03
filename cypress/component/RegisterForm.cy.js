import RegisterForm from '../../components/homeguest/RegisterForm';

describe('RegisterForm', () => {
	it('should allow users to register', () => {
		// Visit the page that contains the RegisterForm component
		cy.mount(<RegisterForm />);

		// Enter test values into the name and surname inputs
		cy.get('input[name="name"]').type('Test Name');
		cy.get('input[name="surname"]').type('Test Surname');

		// Enter a test email address into the email input
		cy.get('input[name="email"]').type('test@example.com');

		// Enter test values into the password and password2 inputs
		cy.get('input[name="password"]').type('testpassword');
		cy.get('input[name="password2"]').type('testpassword');
	});
});
