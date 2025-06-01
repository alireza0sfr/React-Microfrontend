import { BaseModel } from './base'

export class Customer extends BaseModel {

  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  bankAccountNumber: string
  dateOfBirth: string
  readonly: boolean

  constructor(firstName: string = '', lastName: string = '', phoneNumber: string = '', email: string = '', bankAccountNumber: string = '', dateOfBirth: string = '') {
    super()

    this.firstName = firstName
    this.lastName = lastName
    this.phoneNumber = phoneNumber
    this.email = email
    this.bankAccountNumber = bankAccountNumber
    this.dateOfBirth = dateOfBirth
    this.readonly = false
  }
}