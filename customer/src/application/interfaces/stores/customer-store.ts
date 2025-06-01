import { Customer } from "~/domain/customer"

export interface CustomerState {
  customers: Customer[]
  addCustomer: (customer: Customer) => void
  updateCustomer: (customer: Customer) => void
  deleteCustomer: (id: string) => void
  getCustomerById: (id: string) => Customer | undefined
  flush: () => void
}
