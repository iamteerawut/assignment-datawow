/// <reference types='cypress' />

const username = Cypress.env("username");
const email = Cypress.env("email");
const password = Cypress.env("password");

const random_string = (length) => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};

describe("tweet function", () => {
  beforeEach(() => {
    cy.visit("https://twitter.com/i/flow/login");
    cy.get('[name="username"]').type(email, { log: false });
    cy.contains("Next").click();
    if (cy.contains("Phone or username")) {
      cy.get("input").first().type(username, { log: false });
      cy.contains("Next").click();
    }
    cy.get('[name="password"]').type(password, { log: false });
    cy.contains("Log in").click();
    cy.contains("Home");
    cy.wait(5000);
  });
  it("normal tweet using main tweet", () => {
    cy.get('[data-testid="tweetTextarea_0"]')
      .first()
      .type("Tweet text using main tweet");
    cy.get('[data-testid="tweetButtonInline"]').click();
    cy.wait(3000);
    cy.contains("Your Tweet was sent.");
  });
  it("media tweet using main tweet", () => {
    cy.get('[data-testid="tweetTextarea_0"]')
      .first()
      .type("Tweet media using main tweet");
    cy.get('[data-testid="fileInput"]').attachFile("noface.png");
    cy.get('[data-testid="attachments"]').should("be.visible");
    cy.get('[data-testid="tweetButtonInline"]').click();
    cy.wait(3000);
    cy.contains("Your Tweet was sent.");
  });
  it("more than maximum character tweet", () => {
    cy.get('[data-testid="tweetTextarea_0"]').first().type(random_string(281));
    cy.contains("You have exceeded the character limit");
  });
  it("normal tweet using sidebar tweet", () => {
    cy.get('[data-testid="SideNav_NewTweet_Button"]').click();
    cy.get('[data-testid="tweetTextarea_0"]')
      .first()
      .type("Tweet text using sidebar tweet");
    cy.get('[data-testid="tweetButton"]').click();
    cy.wait(3000);
    cy.contains("Your Tweet was sent.");
  });
  it("media tweet using sidebar tweet", () => {
    cy.get('[data-testid="SideNav_NewTweet_Button"]').click();
    cy.get('[data-testid="tweetTextarea_0"]')
      .first()
      .type("Tweet media using sidebar tweet", { force: true });
    cy.get('[data-testid="fileInput"]').attachFile("noface.png");
    cy.get('[data-testid="attachments"]').should("be.visible");
    cy.get('[data-testid="tweetButton"]').click();
    cy.wait(3000);
    cy.contains("Your Tweet was sent.");
  });
});
