// cypress/e2e/duckduckgo.ts
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"
import { customer } from '../mock'

const TestIds = {
  AddBtn: 'addBtn',
  SaveBtn: 'saveBtn',
  EditBtn: 'editBtn',
  DeleteBtn: 'deleteBtn',
  DeleteAllBtn: 'deleteAllBtn',
  FirstName: 'firstName',
  LastName: 'lastName',
  Email: 'email',
  PhoneNumber: 'phoneNumber',
  BankAccountNumber: 'bankAccountNumber',
  DateOfBirth: 'dateOfBirth',
  FullName: 'fullName',
  FormErrors: 'formErrors',
  EmailReadonly: 'emailReadonly',
  PhoneNumberReadonly: 'phoneNumberReadonly',
  BankAccountNumberReadonly: 'bankAccountNumberReadonly',
  DateOfBirthReadonly: 'dateOfBirthReadonly'
}

function init() {
  cy.visit("http://localhost:3000/")
}

function create_customer(index = 1) {
  cy.clickThe(TestIds.AddBtn)
  cy.existsThe('customerCard-0')
  cy.fillThe(TestIds.FirstName, `${customer.firstName}${index}`)
  cy.fillThe(TestIds.LastName, `${customer.lastName}${index}`)
  cy.fillThe(TestIds.Email, `${index}${customer.email}`)
  cy.fillThe(TestIds.PhoneNumber, `${customer.phoneNumber}`.replace(customer.phoneNumber.at(-1), index.toString()))
  cy.fillThe(TestIds.BankAccountNumber, `${customer.bankAccountNumber}`.replace(customer.bankAccountNumber.at(-1), index.toString()))
  cy.fillThe(TestIds.DateOfBirth, `2023-01-0${index}`)
  cy.clickThe(TestIds.SaveBtn)
  cy.existsThe(TestIds.FullName)
}

Given("Filling empty form and then clicking on submit", () => {
  init()
})

Then("Should add 1 submited customer", () => {
  create_customer()
})

Given("Read the created Customer", () => {
  init()
  create_customer()
  cy.existsThe('customerCard-0')
})

Then("All customer fields should be saved and readonly", () => {
  cy.existsThe(TestIds.FullName)
  cy.existsThe(TestIds.EmailReadonly)
  cy.existsThe(TestIds.PhoneNumberReadonly)
  cy.existsThe(TestIds.BankAccountNumberReadonly)
  cy.existsThe(TestIds.DateOfBirthReadonly)
})

Given("Update firstName of existing customer", () => {
  init()
  create_customer()
  cy.existsThe('customerCard-0')
})

Then("Should change firstName to updated value", () => {
  cy.clickThe(TestIds.EditBtn)
  cy.fillThe(TestIds.FirstName, 'updated')
  cy.clickThe(TestIds.SaveBtn)
  cy.existsThe(TestIds.FullName).should('contain', 'updated')
})

Given("Clicking on trash icon should delete the existing customer", () => {
  init()
  create_customer()
  cy.existsThe('customerCard-0')
})

Then("Customer list should be empty after delete", () => {
  cy.clickThe(TestIds.DeleteBtn)
  cy.notExistsThe('customerCard-0')
})

Given("Clicking on Delete All should delete all customers", () => {
  init()
  create_customer(1)
  create_customer(2)
  create_customer(3)
  cy.existsThe('customerCard-0')
  cy.existsThe('customerCard-1')
  cy.existsThe('customerCard-2')
})

Then("Customer list should be empty after delete all", () => {
  cy.clickThe(TestIds.DeleteAllBtn)
  cy.notExistsThe('customerCard-0')
  cy.notExistsThe('customerCard-1')
  cy.notExistsThe('customerCard-2')
})

Given("Clicking save on not validated data", () => {
  init()
  create_customer(1)
  cy.existsThe('customerCard-0')
})

Then("Should display formErors", () => {
  create_customer(1)
  cy.existsThe(TestIds.FormErrors)
})

Given("Refreshing page with 1 customer", () => {
  init()
  create_customer()
  cy.existsThe('customerCard-0')
})

Then("Added customers should exist", () => {
  cy.reload()
  cy.existsThe('customerCard-0')
})

Given("Refreshing page with 1 customer on update mode", () => {
  init()
  create_customer()
  cy.existsThe('customerCard-0')
  cy.clickThe(TestIds.EditBtn)
})

Then("Customer should be on readonly mode", () => {
  cy.reload()
  cy.existsThe('customerCard-0')
  cy.existsThe(TestIds.FullName)
})

Given("Refreshing page with empty card", () => {
  init()
  cy.clickThe(TestIds.AddBtn)
  cy.existsThe('customerCard-0')
})

Then("Upon refreshing page empty card should be removed", () => {
  cy.reload()
  cy.notExistsThe('customerCard-0')
})

Given("Adding an empty card", () => {
  init()
  cy.clickThe(TestIds.AddBtn)
  cy.existsThe('customerCard-0')
})

Then("Add Customer should be disabled", () => {
  cy.get(`[data-test=${TestIds.AddBtn}]`).should('be.disabled')
})

Given("Adding multiple customers to delete", () => {
  init()
  create_customer(1)
  create_customer(2)
})

Then("Delete second customer and check the correct one is deleted", () => {
  cy.get(`[data-test=${TestIds.DeleteBtn}]`).eq(1).click()
  cy.get(`[data-test=${TestIds.FullName}]`).should('contain', `${customer.firstName}1`)
})

Given("Adding multiple customers to update", () => {
  init()
  create_customer(1)
  create_customer(2)
})

Then("Update second customer and check the correct one is updated", () => {
  cy.get(`[data-test=${TestIds.EditBtn}]`).eq(1).click()
  cy.get(`[data-test=${TestIds.FirstName}]`).click().type('updated')
  cy.clickThe(TestIds.SaveBtn)
  cy.get(`[data-test=${TestIds.FullName}]`).eq(1).should('contain', 'updated')
})

Given("Adding one customer", () => {
  init()
  create_customer()
  cy.clickThe(TestIds.EditBtn)
  cy.fillThe(TestIds.FirstName, 'updated')
})

Then("Updating customer but before clicking save refresh the page then data should not be saved", () => {
  cy.reload()
  cy.get(`[data-test=${TestIds.FullName}]`).should('not.contain', 'updated')
})