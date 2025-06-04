import { Customer } from "~/domain/customer"
import { Trash2, Pencil, Check } from "lucide-react"
import { useEffect, useState } from "react"
import { useCustomer } from '~/infrastructure/hooks/useCustomer'

interface CustomerCardProps {
  customer: Customer
  index: number
}

const CustomerCard: React.FC<CustomerCardProps> = ({customer, index}) => {
  const { saveCustomer, deleteCustomer } = useCustomer()
  const [editableCustomer, setEditableCustomer] = useState<Customer>(customer)
  const [isReadonly, setIsReadonly] = useState(customer.readonly)

  useEffect(() => {
    setEditableCustomer(customer)
    setIsReadonly(customer.readonly)
  }, [customer])

  const handleInputChange = (field: keyof Customer, value: string) => {
    setEditableCustomer(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    const result = saveCustomer(editableCustomer, index)
    if(result.success)
      setIsReadonly(true)
  }

  const handleEdit = () => {
    setIsReadonly(false)
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 text-slate-100 shadow-sm transition-all hover:shadow-md hover:border-slate-700" data-test={`customerCard-${index}`}>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-6 flex-1">
            {isReadonly ? (
              <h3 className="text-2xl font-semibold tracking-tight text-slate-100" data-test="fullName">
                {editableCustomer.firstName} {editableCustomer.lastName}
              </h3>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-slate-300">First Name</label>
                    <input
                      type="text"
                      value={editableCustomer.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      data-test="firstName"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-slate-300">Last Name</label>
                    <input
                      type="text"
                      value={editableCustomer.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      data-test="lastName"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-slate-300">Email</label>
                {isReadonly ? (
                  <p className="text-sm text-slate-400" data-test="emailReadonly">{editableCustomer.email}</p>
                ) : (
                  <input
                    type="email"
                    value={editableCustomer.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    data-test="email"
                    placeholder="Enter email"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-slate-300">Phone</label>
                {isReadonly ? (
                  <p className="text-sm text-slate-400" data-test="phoneNumberReadonly">{editableCustomer.phoneNumber}</p>
                ) : (
                  <input
                    type="text"
                    value={editableCustomer.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    data-test="phoneNumber"
                    placeholder="Enter phone number"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-slate-300">Bank Account</label>
                {isReadonly ? (
                  <p className="text-sm text-slate-400" data-test="bankAccountNumberReadonly">{editableCustomer.bankAccountNumber}</p>
                ) : (
                  <input
                    type="text"
                    value={editableCustomer.bankAccountNumber}
                    onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    data-test="bankAccountNumber"
                    placeholder="Enter bank account number"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-slate-300">Birth Date</label>
                {isReadonly ? (
                  <p className="text-sm text-slate-400" data-test="dateOfBirthReadonly">
                    {new Date(editableCustomer.dateOfBirth).toLocaleDateString()}
                  </p>
                ) : (
                  <input
                    type="date"
                    value={editableCustomer.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    min="1900-01-01"
                    max="2099-12-31"
                    className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    data-test="dateOfBirth"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => deleteCustomer(customer.id)}
              className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-100 h-9 w-9"
              data-test="deleteBtn"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            {isReadonly ? (
              <button
                onClick={handleEdit}
                className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-100 h-9 w-9"
                data-test="editBtn"
              >
                <Pencil className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-100 h-9 w-9"
                data-test="saveBtn"
              >
                <Check className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerCard