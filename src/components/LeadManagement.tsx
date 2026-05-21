import React, { useState } from 'react'
import type { DropResult } from '@hello-pangea/dnd'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd'

import AddLead from './AddLead'

export interface Lead {
  id: number
  customerName: string
  phone: string
  leadSource: string
  assignedStaff: string
  priority: string
  createdDate: string
  stage: string
}

const priorityColor: Record<string, string> = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
}

const stages = [
  'New Lead',
  'Contacted',
  'Follow Up',
  'Converted',
]

function LeadManagement() {

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      customerName: 'Ahmed Ali',
      phone: '+91 9876543210',
      leadSource: 'Instagram',
      assignedStaff: 'Najiya',
      priority: 'High',
      createdDate: '21 May 2026',
      stage: 'New Lead',
    },
    {
      id: 2,
      customerName: 'Rahul Krishna',
      phone: '+91 9123456780',
      leadSource: 'Website',
      assignedStaff: 'Anzila',
      priority: 'Medium',
      createdDate: '19 May 2026',
      stage: 'Contacted',
    },
  ])

  const [showModal, setShowModal] = useState(false)

  const [addLead, setAddLead] =
    useState<Partial<Lead>>({})

  // FILTER STATES
  const [filterName, setFilterName] = useState('')
  const [filterSource, setFilterSource] =
    useState('')
  const [filterPriority, setFilterPriority] =
    useState('')
  const [filterStage, setFilterStage] =
    useState('')

  const [appliedFilter, setAppliedFilter] =
    useState({
      name: '',
      source: '',
      priority: '',
      stage: '',
    })

  const handleFilter = () => {
    setAppliedFilter({
      name: filterName.toLowerCase(),
      source: filterSource.toLowerCase(),
      priority: filterPriority.toLowerCase(),
      stage: filterStage.toLowerCase(),
    })
  }

  const handleReset = () => {
    setFilterName('')
    setFilterSource('')
    setFilterPriority('')
    setFilterStage('')

    setAppliedFilter({
      name: '',
      source: '',
      priority: '',
      stage: '',
    })
  }

  const filteredLeads = leads.filter(
    (lead) =>
      (!appliedFilter.name ||
        lead.customerName
          .toLowerCase()
          .includes(appliedFilter.name)) &&

      (!appliedFilter.source ||
        lead.leadSource
          .toLowerCase()
          .includes(appliedFilter.source)) &&

      (!appliedFilter.priority ||
        lead.priority
          .toLowerCase()
          .includes(appliedFilter.priority)) &&

      (!appliedFilter.stage ||
        lead.stage
          .toLowerCase()
          .includes(appliedFilter.stage))
  )

  // DRAG & DROP
  const onDragEnd = (
    result: DropResult
  ) => {

    const { destination, draggableId } =
      result

    if (!destination) return

    const targetStage =
      destination.droppableId

    const draggedLeadId =
      Number(draggableId)

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === draggedLeadId
          ? {
              ...lead,
              stage: targetStage,
            }
          : lead
      )
    )
  }

  return (
    <div className="p-5">

      {/* FILTER */}
      <div className="grid grid-cols-4 gap-3 mb-5">

        <input
          type="text"
          placeholder="Customer Name"
          className="border rounded-xl p-2"
          value={filterName}
          onChange={(e) =>
            setFilterName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Lead Source"
          className="border rounded-xl p-2"
          value={filterSource}
          onChange={(e) =>
            setFilterSource(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Priority"
          className="border rounded-xl p-2"
          value={filterPriority}
          onChange={(e) =>
            setFilterPriority(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Stage"
          className="border rounded-xl p-2"
          value={filterStage}
          onChange={(e) =>
            setFilterStage(e.target.value)
          }
        />

      </div>

      <div className="flex justify-end gap-2 mb-5">

        <button
          onClick={handleReset}
          className="border px-4 py-2 rounded-xl"
        >
          Reset
        </button>

        <button
          onClick={handleFilter}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          Filter
        </button>

      </div>

      {/* ADD BUTTON */}
      <div className="flex justify-end mb-5">

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          Add Lead
        </button>

      </div>

      {/* KANBAN */}
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className="grid grid-cols-4 gap-5">

          {stages.map((stage) => (

            <Droppable
              droppableId={stage}
              key={stage}
            >
              {(provided) => (

                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-slate-100 rounded-2xl p-4 min-h-screen"
                >

                  <h2 className="text-xl font-bold text-center mb-5">
                    {stage}
                  </h2>

                  <div className="space-y-4">

                    {filteredLeads
                      .filter(
                        (lead) =>
                          lead.stage === stage
                      )
                      .map(
                        (
                          lead,
                          index
                        ) => (

                          <Draggable
                            key={lead.id}
                            draggableId={String(
                              lead.id
                            )}
                            index={index}
                          >
                            {(provided) => (

                              <div
                                ref={
                                  provided.innerRef
                                }
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white rounded-2xl shadow-md p-5"
                              >

                                <div className="flex justify-between items-center mb-3">

                                  <h2 className="text-xl font-bold">
                                    {
                                      lead.customerName
                                    }
                                  </h2>

                                  <span
                                    className={`px-3 py-1 rounded-full text-sm ${
                                      priorityColor[
                                        lead.priority
                                      ]
                                    }`}
                                  >
                                    {
                                      lead.priority
                                    }
                                  </span>

                                </div>

                                <div className="space-y-2 text-sm">

                                  <p>
                                    <b>Phone:</b>{' '}
                                    {
                                      lead.phone
                                    }
                                  </p>

                                  <p>
                                    <b>Lead Source:</b>{' '}
                                    {
                                      lead.leadSource
                                    }
                                  </p>

                                  <p>
                                    <b>Assigned Staff:</b>{' '}
                                    {
                                      lead.assignedStaff
                                    }
                                  </p>

                                  <p>
                                    <b>Created Date:</b>{' '}
                                    {
                                      lead.createdDate
                                    }
                                  </p>

                                </div>

                              </div>
                            )}
                          </Draggable>
                        )
                      )}

                    {provided.placeholder}

                  </div>

                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>

      <AddLead
        showModal={showModal}
        setShowModal={setShowModal}
        leads={leads}
        setLeads={setLeads}
        addLead={addLead}
        setAddLead={setAddLead}
      />

    </div>
  )
}

export default LeadManagement