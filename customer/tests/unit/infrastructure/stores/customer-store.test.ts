import { it, describe, beforeEach, expect, expectTypeOf } from 'vitest'
import { useCustomerStore } from '~/infrastructure/stores/customer-store'
import { customer } from '../../mock'
import { Customer } from '~/domain/customer'
import { idGenerator } from '~/domain/base'

describe('Store Operations', () => {
  beforeEach(() => {
    // Clear the store before each test
    useCustomerStore.getState().flush()
  })

  it('should get all customers', () => {
    // Arrange
    useCustomerStore.getState().addCustomer(customer)

    // Act
    const result = useCustomerStore.getState().customers

    // Assert
    expectTypeOf(result).toBeArray()
    expect(result).toHaveLength(1)
  })

  it('should get customer by id when found', () => {
    // Arrange
    useCustomerStore.getState().addCustomer(customer)

    // Act
    const result = useCustomerStore.getState().getCustomerById(customer.id)

    // Assert
    expect(result).toBeDefined()
    expect(result?.id).toEqual(customer.id)
  })

  it('should return undefined when getting customer by invalid id', () => {
    // Arrange
    useCustomerStore.getState().addCustomer(customer)

    // Act
    const result = useCustomerStore.getState().getCustomerById('1')

    // Assert
    expect(result).toBeUndefined()
  })

  it('should clear all customers', () => {
    // Arrange
    useCustomerStore.getState().addCustomer(customer)

    // Act
    useCustomerStore.getState().flush()

    // Assert
    expect(useCustomerStore.getState().customers).toHaveLength(0)
  })

  it('should add a customer', () => {
    // Act
    useCustomerStore.getState().addCustomer(customer)

    // Assert
    expect(useCustomerStore.getState().customers).toHaveLength(1)
    expect(useCustomerStore.getState().customers[0]).toEqual(customer)
    expect(useCustomerStore.getState().customers[0].id).toBeDefined()
    expect(useCustomerStore.getState().customers[0].id).not.toBe('')
    expect(useCustomerStore.getState().customers[0].createdDate).toBeDefined()
    expect(useCustomerStore.getState().customers[0].createdDate).not.toBe('')
  })

  it('should delete a customer', () => {
    // Arrange
    useCustomerStore.getState().addCustomer(customer)

    // Act
    useCustomerStore.getState().deleteCustomer(customer.id)

    // Assert
    expect(useCustomerStore.getState().customers).toHaveLength(0)
  })

  it('should update a customer', () => {
    // Arrange
    useCustomerStore.getState().addCustomer(customer)
    const updatedCustomer = { ...customer, firstName: 'updated' }

    // Act
    useCustomerStore.getState().updateCustomer(updatedCustomer)

    // Assert
    const result = useCustomerStore.getState().getCustomerById(customer.id)
    expect(result?.firstName).toEqual('updated')
  })

  it('should validate a customer', () => {
    // Arrange
    useCustomerStore.getState().addCustomer(customer)

    // Act
    const result = useCustomerStore.getState().validate(customer)

    // Assert
    expect(result.success).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('should check customer required fields', () => {
    // Arrange
    const customerWithoutRequiredFields = new Customer()

    // Act
    const result = useCustomerStore.getState().validate(customerWithoutRequiredFields)

    // Assert
    expect(result.success).toBe(false)
    expect(result.errors).toHaveLength(6)
    expect(result.errors).toContain('firstName is required.')
    expect(result.errors).toContain('lastName is required.')
    expect(result.errors).toContain('phoneNumber is required.')
    expect(result.errors).toContain('email is required.')
    expect(result.errors).toContain('bankAccountNumber is required.')
    expect(result.errors).toContain('dateOfBirth is required.')
  })

  it('should validate customer email field', () => {
    // Arrange
    const customerWithInvalidEmail = { ...customer, email: 'invalid-email' }

    // Act
    const result = useCustomerStore.getState().validate(customerWithInvalidEmail)

    // Assert
    expect(result.success).toBe(false)
    expect(result.errors).toHaveLength(1)
    expect(result.errors).toContain('email is not in a valid format.')
  })

  it('should validate customer bank account field', () => {
    // Arrange
    const customerWithInvalidBankAccount = { ...customer, bankAccountNumber: 'invalid-bank-account' }

    // Act
    const result = useCustomerStore.getState().validate(customerWithInvalidBankAccount)

    // Assert
    expect(result.success).toBe(false)
    expect(result.errors).toHaveLength(1)
    expect(result.errors).toContain('bankAccountNumber is not in a valid format.')
  })

  it('should validate customer phone number field', () => {
    // Arrange
    const customerWithInvalidPhoneNumber = { ...customer, phoneNumber: 'invalid-phone-number' }

    // Act
    const result = useCustomerStore.getState().validate(customerWithInvalidPhoneNumber)

    // Assert
    expect(result.success).toBe(false)
    expect(result.errors).toHaveLength(1)
    expect(result.errors).toContain('phoneNumber is not in a valid format.')
  })

  it('should validate customer unique fields', () => {
    // Arrange
    useCustomerStore.getState().addCustomer(customer)

    const secondCustomer = { ...customer, id: idGenerator(), createdDate: new Date().toISOString() }

    // Act
    const result = useCustomerStore.getState().validate(secondCustomer)

    // Assert
    expect(result.success).toBe(false)
    expect(result.errors).toHaveLength(4)
    expect(result.errors).toContain('firstName should be unique.')
    expect(result.errors).toContain('lastName should be unique.')
    expect(result.errors).toContain('email should be unique.')
  })
})