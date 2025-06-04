import { useEffect, useMemo, useState } from 'react'
import { Customer } from '~/domain/customer'
import { useCustomerStore } from '~/infrastructure/stores/customer-store'

export const useCustomer = () => {

  const formErrors = useCustomerStore((state) => state.formErrors)
  const setFormErrors = useCustomerStore((state) => state.setFormErrors)
  const customers = useCustomerStore((state) => state.customers)
  const addCustomer = useCustomerStore((state) => state.addCustomer)
  const updateCustomer = useCustomerStore((state) => state.updateCustomer)
  const deleteCustomer = useCustomerStore((state) => state.deleteCustomer)
  const deleteAllCustomers = useCustomerStore((state) => state.deleteAllCustomers)
  const validator = useCustomerStore((state) => state.validate)

  const [localCustomers, setLocalCustomers] = useState<Customer[]>(customers)

  const fetchData = () => {
    setLocalCustomers(() => {
      return customers.map(customer => ({
        ...customer,
        readonly: true
      }))
    })
    setFormErrors('')
  }

  useEffect(() => {
    fetchData()
  }, [customers])

  const isEditing = useMemo(() => {
    return localCustomers.some(customer => !customer.readonly)
  }, [localCustomers])

  /**
   * Generates a human readable error message from an array of errors.
   * @param errors - The errors to generate a human readable message from.
   * @param index - The index of the customer.
   * @returns The human readable error message.
   */
  const generateHumanReadableErrors = (errors: string[], index: number) => {
    var base = `Row Number ${index + 1}: \n`

    for (var msg of errors) {
      base += ' - ' + msg + '\n'
    }
    setFormErrors(base)
  }

  /**
   * Adds a new customer to the store.
   */
  const handleAddCustomer = () => {
    if(!isEditing) {
      setLocalCustomers([...localCustomers, new Customer()])
    }
    else
      setFormErrors('You can only add one customer at a time')
  }

  /**
   * Saves a customer to the store.
   * @param customer - The customer to save.
   * @param index - The index of the customer.
   * @returns The validation response.
   */
  const handleSaveCustomer = (customer: Customer, index: number) => {
    const validateResponse = validator(customer)

    if (validateResponse.success) {
      if (customer.id)
        updateCustomer(customer)
      else
        addCustomer(customer)

      setFormErrors('')
    }
    else
      generateHumanReadableErrors(validateResponse.errors, index)

    return validateResponse
  }

  /**
   * Deletes a customer from the store.
   * @param id - The id of the customer to delete.
   * @returns The validation response.
   */
  const handleDeleteCustomer = (id: string) => {
    deleteCustomer(id)
    setFormErrors('')

    return {
      success: true,
      errors: []
    }
  }

  const handleDeleteAllCustomers = () => {
    deleteAllCustomers()
    setFormErrors('')
  }

  return {
    formErrors,
    isEditing,
    customers: localCustomers,
    addCustomer: handleAddCustomer,
    saveCustomer: handleSaveCustomer,
    deleteCustomer: handleDeleteCustomer,
    deleteAllCustomers: handleDeleteAllCustomers
  }

}