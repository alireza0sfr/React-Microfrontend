import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { CustomerState } from "~/application/interfaces/stores/customer-store"
import CustomerValidator from "~/infrastructure/plugins/validator"


export const useCustomerStore = create<CustomerState>()(
  persist(
    (set, get) => ({
      customers: [],
      /**
   * Adds a customer to the store.
   * @param customer - The customer to add.
   */
      addCustomer: (customer) =>
        set((state) => ({ customers: [...state.customers, customer] })),
      /**
       * Updates a customer in the store.
       * @param customer - The customer to update.
       */
      updateCustomer: (customer) =>
        set((state) => ({ customers: state.customers.map(c => c.id === customer.id ? customer : c) })),
      /**
       * Deletes a customer from the store.
       * @param id - The id of the customer to delete.
       */
      deleteCustomer: (id) =>
        set((state) => ({ customers: state.customers.filter(c => c.id !== id) })),
      /**
       * Gets a customer from the store by id.
       * @param id - The id of the customer to get.
       * @returns The customer or undefined if not found.
       */
      getCustomerById: (id) => {
        const { customers } = get()
        return customers.find(c => c.id === id)
      },
      /**
       * Validates a customer.
       * @param customer - The customer to validate.
       * @returns An object containing a boolean success value and an array of error messages.
       */
      validate(customer) {

        const { customers } = get()

        const validator = new CustomerValidator()
        let errors: string[] = []

        const validateNotEmpty = validator.validateNotEmpty(customer)

        if (!validateNotEmpty.success)
          return {
            success: false,
            errors: validateNotEmpty.errors
          }

        errors = errors.concat(validator.validateUnique(customers, customer).errors)
        errors = errors.concat(validator.validateEmail(customer).errors)
        errors = errors.concat(validator.validateBankAccount(customer).errors)
        errors = errors.concat(validator.validatePhoneNumber(customer).errors)

        return {
          success: errors.length === 0,
          errors: errors
        }
      },
      /**
      * Clears store states.
      */
      flush: () => set({ customers: [] })
    }),
    {
      name: "customer-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
)
