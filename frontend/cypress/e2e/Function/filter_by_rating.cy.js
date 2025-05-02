describe('Filter Reviews by Rating', () => {
  beforeEach(() => {
    // Reset and seed the database with test data
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/test/reset',
      timeout: 10000
    });
    
    // Add test reviews with different ratings
    const testReviews = [
      {
        bookTitle: "Book 1",
        bookAuthor: "Author 1",
        rating: 5,
        review: "Excellent book"
      },
      {
        bookTitle: "Book 2",
        bookAuthor: "Author 2",
        rating: 3,
        review: "Average book"
      },
      {
        bookTitle: "Book 3",
        bookAuthor: "Author 3",
        rating: 5,
        review: "Another great book"
      }
    ];

    testReviews.forEach(review => {
      cy.request('POST', 'http://localhost:3000/reviews', review);
    });

    // Visit the reviews page
    cy.visit('http://localhost:3010');
  });

  it('should filter reviews by rating', () => {
    // Check initial state shows all reviews
    cy.get('li').should('have.length', 3);

    // Select rating 5
    cy.get('select').first().select('5');
    
    // Verify only rating 5 reviews are shown
    cy.get('li').should('have.length', 2);
    cy.get('li').each($el => {
      cy.wrap($el).contains('Rating: 5 / 5');
    });

    // Select rating 3
    cy.get('select').first().select('3');
    
    // Verify only rating 3 reviews are shown
    cy.get('li').should('have.length', 1);
    cy.get('li').contains('Rating: 3 / 5');

    // Select all ratings
    cy.get('select').first().select('');
    
    // Verify all reviews are shown again
    cy.get('li').should('have.length', 3);
  });

  it('should handle non-existent ratings', () => {
    // Select rating 2 (which doesn't exist in test data)
    cy.get('select').first().select('2');
    
    // Should show "No reviews found" message
    cy.get('li').should('have.length', 0);
    cy.contains('No reviews found').should('be.visible');
  });

  it('should handle invalid rating inputs', () => {
    // Verify only valid options exist in select
    cy.get('select').first().find('option').then($options => {
      const validValues = ['', '1', '2', '3', '4', '5'];
      const optionValues = [...$options].map(opt => opt.value);
      
      // Verify all values are valid
      expect(optionValues).to.deep.equal(validValues);
      
      // Check numeric values are within range
      optionValues
        .filter(val => val !== '')
        .forEach(val => {
          const num = Number(val);
          expect(num).to.be.a('number');
          expect(num).to.be.within(1, 5);
        });
    });
  });

  it('should persist filter state on page reload', () => {
    // Select rating 5
    cy.get('select').first().select('5');
    
    // Verify filtered results
    cy.get('li').should('have.length', 2);
    
    // Reload page
    cy.reload();
    
    // Verify filter and results are maintained
    cy.get('select').first().should('have.value', '5');
    cy.get('li').should('have.length', 2);
  });
});
