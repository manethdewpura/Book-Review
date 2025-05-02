// Test suite for adding a new book review
describe("Book Review Functionality", () => {
  // Test case for successfully adding a new book review
  it("should allow a user to add a book review and verify it in the list", () => {
    // Reset the test database
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/test/reset',
      timeout: 10000
    });
    
    // Visit the application
    cy.visit("http://localhost:3010");

    // Wait for any loading overlays to disappear
    cy.get(".fixed.bg-black.bg-opacity-60").should("not.exist");

    // Click on the "Add Book" button - wait for it to be visible and clickable
    cy.get("button")
      .contains("Add Review")
      .should("be.visible")
      .should("not.be.disabled")
      .click();

    // Fill in the book details - wait for inputs to be visible
    cy.get("input[name='name']").should("be.visible").type("The Great Gatsby");

    cy.get("input[name='author']")
      .should("be.visible")
      .type("F. Scott Fitzgerald");

    cy.get("input[name='rating']")
      .should("be.visible")
      .type("4");

    cy.get("textarea[name='review']")
      .should("be.visible")
      .type("A classic novel about the American dream.");

    // Submit the form - ensure button is visible and clickable
    cy.get("button[type='submit']")
      .should("be.visible")
      .should("not.be.disabled")
      .click();

    // Verify that the book review appears in the list
    cy.contains("The Great Gatsby").should("be.visible");
    cy.contains("F. Scott Fitzgerald").should("be.visible");
    cy.contains("Rating: 4 / 5").should("be.visible");
    cy.contains("A classic novel about the American dream.").should(
      "be.visible"
    );
  });
});

// Test suite for validation scenarios
describe("Invalid Book Review Scenarios", () => {
  // Common setup for all validation tests
  beforeEach(() => {
    // Reset the test database and navigate to the review form
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/test/reset',
      timeout: 10000
    });
    cy.visit("http://localhost:3010");
    cy.get("button").contains("Add Review").click();
  });

  // Test case for submitting an empty form
  it("should show validation errors for empty form", () => {
    // Attempt to submit the form without filling any fields
    cy.get("button[type='submit']").click();
    cy.get('[name="name"]').parent().find('.text-red-500').should('contain', 'Book name is required');
    cy.get('[name="author"]').parent().find('.text-red-500').should('contain', 'Author name is required');
    cy.get('[name="review"]').parent().find('.text-red-500').should('contain', 'Review is required');
  });

  // Test case for book name length validation
  it("should validate book name length", () => {
    // Enter a book name exceeding the maximum allowed length
    const longBookName = "a".repeat(101);
    cy.get('[name="name"]').type(longBookName);
    cy.get('[name="name"]').blur();
    cy.get('[name="name"]').parent().find('.text-red-500')
      .should('contain', 'Book name must be less than 100 characters');
  });

  // Test case for author name length validation
  it("should validate author name length", () => {
    // Enter an author name exceeding the maximum allowed length
    const longAuthorName = "a".repeat(51);
    cy.get('[name="author"]').type(longAuthorName);
    cy.get('[name="author"]').blur();
    cy.get('[name="author"]').parent().find('.text-red-500')
      .should('contain', 'Author name must be less than 50 characters');
  });

  // Test case for review text length validation
  it("should validate review length", () => {
    // Enter a review text that is too short
    cy.get('[name="review"]').type('Short');
    cy.get('[name="review"]').blur();
    cy.get('[name="review"]').parent().find('.text-red-500')
      .should('contain', 'Review must be at least 10 characters');

    // Enter a review text exceeding the maximum allowed length
    const longReview = "a".repeat(501);
    cy.get('[name="review"]').clear().type(longReview);
    cy.get('[name="review"]').blur();
    cy.get('[name="review"]').parent().find('.text-red-500')
      .should('contain', 'Review must be less than 500 characters');
  });

  // Test case for rating range validation
  it("should validate rating range", () => {
    // First clear any existing value
    cy.get('[name="rating"]').clear();
    
    // Test negative rating
    cy.get('[name="rating"]').type("-1", { delay: 100 }).blur();
    // Look for error message in the entire form, not just parent
    cy.get('form').contains('.text-red-500', 'Rating must be between 0 and 5')
      .should('be.visible');

    // Test rating above maximum
    cy.get('[name="rating"]').clear().type("6", { delay: 100 }).blur();
    cy.get('form').contains('.text-red-500', 'Rating must be between 0 and 5')
      .should('be.visible');

    // Test valid rating clears error
    cy.get('[name="rating"]').clear().type("4.5").blur();
    cy.get('form').contains('.text-red-500', 'Rating must be between 0 and 5')
      .should('not.exist');
  });

  // Test case for complete form validation before submission
  it("should validate all fields before submission", () => {
    // Fill in valid data except rating
    cy.get('[name="name"]').type("Valid Book Name");
    cy.get('[name="author"]').type("Valid Author");
    cy.get('[name="rating"]').clear().type("6", { delay: 100 });
    cy.get('[name="review"]').type("Valid review content that is long enough");
    
    // Try to submit
    cy.get("button[type='submit']").click();
    
    // Check for error message anywhere in the form
    cy.get('form').contains('.text-red-500', 'Rating must be between 0 and 5')
      .should('be.visible');
    
    // Verify no review was added
    cy.get('li').should('not.exist');
  });
});