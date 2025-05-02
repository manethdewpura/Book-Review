/* eslint-disable no-undef */
describe('Add Book Form Responsive UI Tests', () => {
    const viewports = [
        { width: 320, height: 568, device: 'mobile' },
        { width: 768, height: 1024, device: 'tablet' },
        { width: 1024, height: 768, device: 'laptop' },
        { width: 1920, height: 1080, device: 'desktop' }
    ];

    beforeEach(() => {
        cy.visit('/');
        // Click the Add Review button to open the modal
        cy.contains('button', 'Add Review').click();
    });

    viewports.forEach(viewport => {
        describe(`${viewport.device} viewport (${viewport.width}x${viewport.height})`, () => {
            beforeEach(() => {
                cy.viewport(viewport.width, viewport.height);
            });

            it('should display form properly', () => {
                cy.get('form')
                    .should('be.visible')
                    .and('have.class', 'space-y-4');
            });

            it('should have properly sized input fields', () => {
                // Check book name input
                cy.get('input[name="name"]')
                    .should('be.visible')
                    .and('have.class', 'h-11');

                // Check author input
                cy.get('input[name="author"]')
                    .should('be.visible')
                    .and('have.class', 'h-11');
            });

            it('should have properly styled submit button', () => {
                cy.get('button[type="submit"]')
                    .should('be.visible')
                    .and('have.class', 'w-full')
                    .and('have.class', 'sm:w-auto');
            });

            it('should maintain proper modal alignment', () => {
                cy.get('.bg-white').then($modal => {
                    const rect = $modal[0].getBoundingClientRect();
                    expect(rect.left).to.be.at.least(0);
                    expect(rect.right).to.be.at.most(viewport.width);
                });
            });
        });
    });
});