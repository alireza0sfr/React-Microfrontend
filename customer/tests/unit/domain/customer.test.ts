import { it, describe, expect } from 'vitest'
import { Customer } from '~/domain/customer'
import { BaseModel } from '~/domain/base'

describe('Base Model', () => {

  it('Check Customer property types', () => {

    const baseModel = new BaseModel()

    expect(baseModel.id).toBeTypeOf('string')
    expect(baseModel.createdDate).toBeTypeOf('string')
  })

})

describe('Customer Model', () => {

  it('Check Customer property types', () => {

    const customer = new Customer()

    expect(customer.id).toBeTypeOf('string')
    expect(customer.createdDate).toBeTypeOf('string')

    expect(customer.firstName).toBeTypeOf('string')
    expect(customer.lastName).toBeTypeOf('string')
    expect(customer.phoneNumber).toBeTypeOf('string')
    expect(customer.email).toBeTypeOf('string')
    expect(customer.bankAccountNumber).toBeTypeOf('string')
    expect(customer.dateOfBirth).toBeTypeOf('string')
  })

})