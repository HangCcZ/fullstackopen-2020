/* eslint-disable no-undef */
describe("Blog app", function () {
  beforeEach(function () {
    // signed up two user and create a form for each user
    cy.request("Post", "http://localhost:3003/api/testing/reset")

    // sign up user 1
    const user1 = {
      username: "hang1",
      password: "hang",
      name: "hang1",
    }

    // sign up user 2
    const user2 = {
      username: "hang2",
      password: "hang",
      name: "hang2",
    }

    cy.request("POST", "http://localhost:3003/api/users/", user1)
    cy.request("POST", "http://localhost:3003/api/users/", user2)

    cy.visit("http://localhost:3000")

    // sign in user 1
    cy.get("#username").type(user1.username)
    cy.get("#password").type(user1.password)
    cy.get("#login-button").click()

    // create a blog for user 1
    cy.get("#showForm").click()
    cy.get("#title").type("user1's vlog")
    cy.get("#author").type(user1.username)
    cy.get("#url").type("Google.com")
    cy.get("#create-button").click()

    // log out user 1
    cy.contains("Logout").click()

    cy.visit("http://localhost:3000")

    // sign in user 2
    cy.get("#username").type(user2.username)
    cy.get("#password").type(user2.password)
    cy.get("#login-button").click()

    // create a blog for user 2
    cy.get("#showForm").click()
    cy.get("#title").type("user2's vlog")
    cy.get("#author").type(user2.username)
    cy.get("#url").type("Google.com")
    cy.get("#create-button").click()

    cy.wait(3000)
    cy.get(".blog").then((blogs) => {
      console.log("number of blog after beforeEach", blogs.length)
    })

    // cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("username")
    cy.contains("password")
    cy.contains("login")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("hangchen1128")
      cy.get("#password").type("hang")
      cy.get("#login-button").click()

      cy.contains("logged in")
    })

    it("fails with wrong credentials", function () {
      cy.get("#username").type("hang")
      cy.get("#password").type("hang")
      cy.get("#login-button").click()

      cy.contains("Wrong username or password")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      const user = {
        username: "hangchen1128",
        password: "hang",
        name: "hang",
      }

      cy.get("#username").type(user.username)
      cy.get("#password").type(user.password)
      cy.get("#login-button").click()

      // create a blog
      cy.get("#showForm").click()
      cy.get("#title").type("Hang's vlog")
      cy.get("#author").type("Hang")
      cy.get("#url").type("Google.com")
      cy.get("#create-button").click()
    })

    it("A blog can be liked after creation", function () {
      cy.contains("view").click()
      cy.get(".likeButton").click()
      cy.contains("1 likes")
    })
  })

  describe("Check delete funtionalities", function () {
    it("A blog cannot be delete by other users", function () {
      // cy.get(".blog").should("have.value", "user2")

      cy.get(".blog").then((blogs) => {
        console.log("number of blog from test", blogs.length)
      })
      cy.get(".blog")
        .get(".showButton")
        .then((buttons) => cy.wrap(buttons[0]).click())
      cy.get(".detailedView").should("not.have.value", "remove")
    })

    it("A blog can be delete by the user who create it", function () {
      cy.get(".blog").then((blogs) => {
        console.log("number of blog from test", blogs)
      })
      cy.get(".blog")
        .get(".showButton")
        .then((buttons) => cy.wrap(buttons[1]).click())
      cy.get(".delete-button").contains("remove")
    })
  })

  describe.only("checks that the blogs are ordered according to likes with the blog with the most likes being first.", function () {
    it("Click like once for first blog and twice for second blog, second blog should be in the first position afterward", function () {
      // check order before like button press
      cy.get(".blog").get(".showButton").click({ multiple: true })

      cy.get(".blog").then((blogs) => {
        cy.wrap(blogs[0]).contains("0 likes")
        cy.wrap(blogs[1]).contains("0 likes")
      })

      // click like button once for both blog
      cy.get(".likeButton").click({ multiple: true })

      cy.get(".blog").then((blogs) => {
        cy.wrap(blogs[0]).contains("1 likes")
        cy.wrap(blogs[1]).contains("1 likes")
      })

      //click like twice for second blog and once for first blog
      cy.get(".likeButton").click({ multiple: true })
      cy.get(".likeButton").then((buttons) => {
        cy.wrap(buttons[1]).click()
      })
      cy.get(".blog").then((blogs) => {
        cy.wrap(blogs[0]).contains("3 likes")
        cy.wrap(blogs[1]).contains("2 likes")
      })
    })
  })
})
