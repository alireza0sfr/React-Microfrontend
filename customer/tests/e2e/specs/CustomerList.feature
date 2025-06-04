Feature: Customer List

  Scenario: Saving Customer
    Given Filling empty form and then clicking on submit
    Then Should add 1 submited customer

  Scenario: Read the created Customer
    Given Read the created Customer
    Then All customer fields should be saved and readonly

  Scenario: Updating Existing Customer
    Given Update firstName of existing customer
    Then Should change firstName to updated value

  Scenario: Deleting Customer
    Given Clicking on trash icon should delete the existing customer
    Then Customer list should be empty after delete

  Scenario: Deleting All Customers
    Given Clicking on Delete All should delete all customers
    Then Customer list should be empty after delete all

  Scenario: Before Saving Customer validate the given data
    Given Clicking save on not validated data
    Then Should display formErors

  Scenario: Stroing Customers in DB
    Given Refreshing page with 1 customer
    Then Added customers should exist

  Scenario: Changing to readonly after refresh
    Given Refreshing page with 1 customer on update mode
    Then Customer should be on readonly mode

  Scenario: Refreshing page with empty cards
    Given Adding multiple empty cards
    Then After refreshing page empty cards should be removed

  Scenario: Remove FormErrors on interactions
    Given After clicking on delete with validation errors
    Given After clicking on deleteAll with validation errors
    Given After clicking on add Button with validation errors
    Given After clicking on edit button with validation errors
    Then formErrors should disapper after with validation errors

  Scenario: Delete correct customer when multiple customer found
    Given Adding multiple customers to delete
    Then Delete second customer and check the correct one is deleted

  Scenario: Update correct customer when multiple customer found
    Given Adding multiple customers to update
    Then Update second customer and check the correct one is updated

  Scenario: Refreshing on update before save
    Given Adding one customer
    Then Updating customer but before clicking save refresh the page then data should not be saved