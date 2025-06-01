import { Customer } from '~/domain/customer'
import { type IValidatorResponse, ValidatorTypes } from '~/application/interfaces/plugins/validator'

export function isEmpty(value: string): boolean {
  return value.toString().trim() === ''
}

export default class CustomerValidator {

  /**
   * Checks given Customer's properties uniqueness.
   * Unique Fields: firstName, lastName, dateOfBirth, email
   * @param customers - The list of customers to check against.
   * @param customer - The customer to check.
   * @returns An object containing a boolean success value and an array of error messages.
   */
  validateUnique(customers: Customer[], customer: Customer): IValidatorResponse {
    const errors: string[] = []
    const properties: (keyof Customer)[] = ['firstName', 'lastName', 'email', 'dateOfBirth']

    properties.forEach(property => {

      if (customers.some((x: Customer) => x.id !== customer.id && x[property] === customer[property]))
        errors.push(this.messageGenerator(property, ValidatorTypes.Unique))
    })

    return {
      success: errors.length === 0,
      errors
    }
  }

  /**
   * Checks given Customer's properties not to be empty.
   * @param customer - The customer to check.
   * @returns An object containing a boolean success value and an array of error messages.
   */
  validateNotEmpty(customer: Customer): IValidatorResponse {
    const errors: string[] = []

    for (const [key, value] of Object.entries(customer))
      if (!['id', 'createdDate'].includes(key) && isEmpty(value))
        errors.push(this.messageGenerator(key, ValidatorTypes.Required))

    return {
      success: errors.length === 0,
      errors
    }
  }

  /**
   * Checks given Customer's bankAccountNumber to be a valid format.
   * @param customer - The customer to check.
   * @returns An object containing a boolean success value and an array of error messages.
   */
  validateBankAccount(customer: Customer): IValidatorResponse {
    const bankNumberRegex = /^4[0-9]{12}(?:[0-9]{3})?$/
    const errors = []

    if (customer.bankAccountNumber && !bankNumberRegex.test(customer.bankAccountNumber))
      errors.push(this.messageGenerator('bankAccountNumber', ValidatorTypes.ValidFormat))

    return {
      success: errors.length === 0,
      errors
    }
  }

  /**
   * Checks given Customer's validatePhoneNumber to be a valid format.
   * @param customer - The customer to check.
   * @returns An object containing a boolean success value and an array of error messages.
   */
  validatePhoneNumber(customer: Customer): IValidatorResponse {
    const phoneNumberRegex = /\+?1?\s*\(?-*\.*(\d{3})\)?\.*-*\s*(\d{3})\.*-*\s*(\d{4})$/
    const errors = []

    if (customer.phoneNumber && !phoneNumberRegex.test(customer.phoneNumber))
      errors.push(this.messageGenerator('phoneNumber', ValidatorTypes.ValidFormat))


    return {
      success: errors.length === 0,
      errors
    }
  }

  /**
   * Checks given Customer's validateEmail to be a valid format.
   * @param customer - The customer to check.
   * @returns An object containing a boolean success value and an array of error messages.
   */
  validateEmail(customer: Customer): IValidatorResponse {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const errors = []

    if (customer.email && !emailRegex.test(customer.email))
      errors.push(this.messageGenerator('email', ValidatorTypes.ValidFormat))

    return {
      success: errors.length === 0,
      errors
    }
  }

  /**
   * Generates an error message based on the validator type.
   * @param field - The field to generate the message for.
   * @param type - The validator type.
   * @returns An error message.
   */
  messageGenerator(field: string, type: ValidatorTypes): string {

    switch (type) {
      case ValidatorTypes.Required:
        return `${field} is required.`
      case ValidatorTypes.Unique:
        return `${field} should be unique.`
      case ValidatorTypes.ValidFormat:
        return `${field} is not in a valid format.`

      default:
        return ''
    }

  }
}