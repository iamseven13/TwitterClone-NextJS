import SideBarLoggedIn from '../../components/homeUser/SideBarLoggedIn';

describe('Navbar component', () => {
	it('should have a nav section with links to different pages', () => {
		cy.mount(<SideBarLoggedIn />);
		cy.get('.styles.navbar')
			.find('.styles.nav')
			.find('ul')
			.children()
			.should('have.length', 8)
			.each(($el, index) => {
				switch (index) {
					case 0:
						cy.wrap($el)
							.find('a')
							.should('have.class', 'styles.navlinks')
							.and('have.attr', 'href', '/home')
							.find('img')
							.should('have.attr', 'src', '/images/home.svg')
							.and('have.attr', 'alt', '')
							.siblings()
							.should('contain', 'Home');
						break;
					case 1:
						cy.wrap($el)
							.find('a')
							.should('have.class', 'styles.navlinks')
							.and('have.attr', 'href', '/explore')
							.find('img')
							.should('have.attr', 'src', '/images/explore.svg')
							.and('have.attr', 'alt', '')
							.siblings()
							.should('contain', 'Explore');
						break;
					case 2:
						cy.wrap($el)
							.find('a')
							.should('have.class', 'styles.navlinks')
							.and('have.attr', 'href', '/explore')
							.find('img')
							.should('have.attr', 'src', '/images/bell.svg')
							.and('have.attr', 'alt', '')
							.siblings()
							.should('contain', 'Notifications');
						break;
					case 3:
						cy.wrap($el)
							.find('a')
							.should('have.class', 'styles.navlinks')
							.and('have.attr', 'href', '/explore')
							.find('img')
							.should('have.attr', 'src', '/images/message.svg')
							.and('have.attr', 'alt', '')
							.siblings()
							.should('contain', 'Messages');
						break;
					case 4:
						cy.wrap($el)
							.find('a')
							.should('have.class', 'styles.navlinks')
							.and('have.attr', 'href', '/explore')
							.find('img')
							.should('have.attr', 'src', '/images/bookmark.svg');
				}
			});
	});
});
