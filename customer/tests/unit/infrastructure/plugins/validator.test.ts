import { it, describe, expect, expectTypeOf } from 'vitest'
import { Customer } from '~/domain/customer'
import { ValidatorTypes } from '~/application/interfaces/plugins/validator'
import CustomerValidator, { isEmpty } from '~/infrastructure/plugins/validator'
import { customer } from '../../mock'
import { idGenerator } from '~/domain/base'

describe('isEmpty', () => {

  it('returns true on empty string', () => {

    // Arrange
    const value = ''

    // Act
    const result = isEmpty(value)

    // Assert
    expect(result).toEqual(true)

  })

  it('returns false on not empty string', () => {

    // Arrange
    const value = 'not empty string'

    // Act
    const result = isEmpty(value)

    // Assert
    expect(result).toEqual(false)

  })

})

describe('validateUnique', () => {

  it('return true when customer is unique', () => {

    // Arrange
    const validator = new CustomerValidator()
    const newCustomer = new Customer('jack', 'daniel', '2024561413', 'jackdaniel@gmail.com', '4155279860456', new Date(0).toString())

    // Act
    const result = validator.validateUnique([customer], newCustomer)

    // Assert
    expect(result.success).toEqual(true)
    expectTypeOf(result.errors).toBeArray()
    expect(result.errors).toHaveLength(0)

  })

  it('return false when customer is not unique', () => {

    // Arrange
    const validator = new CustomerValidator()
    const newCustomer = new Customer('john', 'daniel', '2024561413', 'jackdaniel@gmail.com', '4155279860456', new Date(0).toString())
    customer.id = idGenerator()

    // Act
    const result = validator.validateUnique([customer], newCustomer)

    // Assert
    expect(result.success).toEqual(false)
    expectTypeOf(result.errors).toBeArray()
    expect(result.errors.length).toBeGreaterThan(0)

  })

})

describe('validateNotEmpty', () => {

  it('return true when customer properties are not empty', () => {

    // Arrange
    const validator = new CustomerValidator()

    // Act
    const result = validator.validateNotEmpty(customer)

    // Assert
    expect(result.success).toEqual(true)
    expectTypeOf(result.errors).toBeArray()
    expect(result.errors).toHaveLength(0)

  })

  it('return false when customer properties are empty', () => {

    // Arrange
    const validator = new CustomerValidator()
    const newCustomer = new Customer()

    // Act
    const result = validator.validateNotEmpty(newCustomer)

    // Assert
    expect(result.success).toEqual(false)
    expectTypeOf(result.errors).toBeArray()
    expect(result.errors.length).toBeGreaterThan(0)

  })

})

describe('validateBankAccount', () => {

  it('return true when customer bankAccountNumber is in a valid format', () => {

    // Arrange
    const validator = new CustomerValidator()

    // Act
    const result = validator.validateBankAccount(customer)

    // Assert
    expect(result.success).toEqual(true)
    expectTypeOf(result.errors).toBeArray()
    expect(result.errors).toHaveLength(0)

  })

  it('return false when customer bankAccountNumber is not in a valid format', () => {

    // Arrange
    const validator = new CustomerValidator()
    const newCustomer = new Customer()
    newCustomer.bankAccountNumber = '123'

    // Act
    const result = validator.validateBankAccount(newCustomer)

    // Assert
    expect(result.success).toEqual(false)
    expectTypeOf(result.errors).toBeArray()
    expect(result.errors.length).toBeGreaterThan(0)

  })

})

describe('validatePhoneNumber', () => {

  it('return true when customer phoneNumber is in a valid format', () => {

    // Arrange
    const validator = new CustomerValidator()

    // Act
    const result = validator.validatePhoneNumber(customer)

    // Assert
    expect(result.success).toEqual(true)
    expectTypeOf(result.errors).toBeArray()
    expect(result.errors).toHaveLength(0)

  })

  it('return false when customer phoneNumber is not in a valid format', () => {

    // Arrange
    const validator = new CustomerValidator()
    const newCustomer = new Customer()
    newCustomer.phoneNumber = '123'

    // Act
    const result = validator.validatePhoneNumber(newCustomer)

    // Assert
    expect(result.success).toEqual(false)
    expectTypeOf(result.errors).toBeArray()
    expect(result.errors.length).toBeGreaterThan(0)

  })

})

describe('validateEmail', () => {

  it('return true when customer email is in a valid format', () => {

    // Arrange
    const validator = new CustomerValidator()

    // Act
    const result = validator.validateEmail(customer)

    // Assert
    expect(result.success).toEqual(true)
    expectTypeOf(result.errors).toBeArray()
    expect(result.errors).toHaveLength(0)

  })

  it('return false when customer email is not in a valid format', () => {

    // Arrange
    const validator = new CustomerValidator()
    const newCustomer = new Customer()
    newCustomer.email = 'test@gmailco'

    // Act
    const result = validator.validateEmail(newCustomer)

    // Assert
    expect(result.success).toEqual(false)
    expectTypeOf(result.errors).toBeArray()
    expect(result.errors.length).toBeGreaterThan(0)

  })

})

describe('messageGenerator', () => {

  it('generates error string based on type', () => {

    // Arrange
    const validator = new CustomerValidator()

    // Act
    const result = validator.messageGenerator(customer.firstName, ValidatorTypes.Required)

    // Assert
    expectTypeOf(result).toBeString()
    expect(result).not.to.be.equal('')
  })

})