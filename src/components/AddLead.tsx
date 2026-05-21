import React from 'react'
import type { Lead } from './LeadManagement'

type AddLeadModalProps = {
  showModal: boolean

  setShowModal: React.Dispatch<
    React.SetStateAction<boolean>
  >

  leads: Lead[]

  setLeads: React.Dispatch<
    React.SetStateAction<Lead[]>
  >

  addLead: Partial<Lead>

  setAddLead: React.Dispatch<
    React.SetStateAction<
      Partial<Lead>
    >
  >
}

function AddLead({
  showModal,
  setShowModal,
  leads,
  setLeads,
  addLead,
  setAddLead,
}: AddLeadModalProps) {

  if (!showModal) return null

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setAddLead({
      ...addLead,
      [e.target.name]:
        e.target.value,
    })
  }

  const addNewLead = () => {

    const newLead: Lead = {
      id: Date.now(),

      customerName:
        addLead.customerName || '',

      phone:
        addLead.phone || '',

      leadSource:
        addLead.leadSource || '',

      assignedStaff:
        addLead.assignedStaff || '',

      priority:
        addLead.priority || 'Low',

      createdDate:
        new Date().toLocaleDateString(),

      stage: 'New Lead',
    }

    setLeads([
      ...leads,
      newLead,
    ])

    setAddLead({})

    setShowModal(false)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white w-[400px] p-5 rounded-2xl">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Add Lead
          </h2>

          <button
            onClick={() =>
              setShowModal(false)
            }
            className="text-red-500 text-xl"
          >
            ✕
          </button>

        </div>

        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          className="w-full border p-2 rounded-lg mb-3"
          value={
            addLead.customerName ||
            ''
          }
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 rounded-lg mb-3"
          value={
            addLead.phone || ''
          }
          onChange={handleChange}
        />

        <input
          type="text"
          name="leadSource"
          placeholder="Lead Source"
          className="w-full border p-2 rounded-lg mb-3"
          value={
            addLead.leadSource ||
            ''
          }
          onChange={handleChange}
        />

        <input
          type="text"
          name="assignedStaff"
          placeholder="Assigned Staff"
          className="w-full border p-2 rounded-lg mb-3"
          value={
            addLead.assignedStaff ||
            ''
          }
          onChange={handleChange}
        />

        <select
          name="priority"
          className="w-full border p-2 rounded-lg mb-3"
          value={
            addLead.priority || ''
          }
          onChange={handleChange}
        >

          <option value="">
            Select Priority
          </option>

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>

        </select>

        <button
          onClick={addNewLead}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Save Lead
        </button>

      </div>
    </div>
  )
}

export default AddLead