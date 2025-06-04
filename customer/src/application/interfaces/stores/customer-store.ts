import type { Customer } from "~/domain/customer"
import type { IValidatorResponse } from "~/application/interfaces/plugins/validator"

export interface CustomerState {
  customers: Customer[]
  formErrors: string
  setFormErrors: (errors: string) => void
  addCustomer: (customer: Customer) => void
  updateCustomer: (customer: Customer) => void
  deleteCustomer: (id: string) => void
  deleteAllCustomers: () => void
  getCustomerById: (id: string) => Customer | undefined
  validate: (customer: Customer) => IValidatorResponse
  flush: () => void
}
