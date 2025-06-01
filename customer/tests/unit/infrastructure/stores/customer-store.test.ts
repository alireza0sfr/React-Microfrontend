import { it, describe, beforeEach, expect, expectTypeOf } from 'vitest'
import { useCustomerStore } from '~/infrastructure/stores/customer-store'
import { customer } from '../../mock'

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
})