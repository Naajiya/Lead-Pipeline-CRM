import { useState } from "react";

interface Lead {
    id: number;
    customerName: string;
    phone: string;
    leadSource: string;
    assignedStaff: string;
    priority: string;
    createdDate: string;
    stage: string;
}

export default function useLead() {
    const [leads, setLeads] = useState<Lead[]>([
        {
            id: 1,
            customerName: "Ahmed Ali",
            phone: "+91 9876543210",
            leadSource: "Instagram",
            assignedStaff: "Najiya",
            priority: "High",
            createdDate: "21 May 2026",
            stage: "New Lead",
        },
        {
            id: 2,
            customerName: "Rahul Krishna",
            phone: "+91 9123456780",
            leadSource: "Website",
            assignedStaff: "Anzila",
            priority: "Medium",
            createdDate: "19 May 2026",
            stage: "Contacted",
        },
        {
            id: 3,
            customerName: "Fathima Noor",
            phone: "+91 9988776655",
            leadSource: "WhatsApp",
            assignedStaff: "Ameen",
            priority: "Low",
            createdDate: "18 May 2026",
            stage: "Follow Up",
        },
        {
            id: 4,
            customerName: "Arjun Das",
            phone: "+91 9871234567",
            leadSource: "Facebook Ads",
            assignedStaff: "Najiya",
            priority: "High",
            createdDate: "17 May 2026",
            stage: "Converted",
        },
    ]);

    const [addLead, setAddLead] = useState<Partial<Lead>>({});

    function addNewLead() {
        const newLead: Lead = {
            id: Date.now(),

            customerName: addLead.customerName || "",

            phone: addLead.phone || "",

            leadSource: addLead.leadSource || "",

            assignedStaff: addLead.assignedStaff || "",

            priority: addLead.priority || "Low",

            createdDate: new Date().toLocaleDateString(),

            stage: "New Lead",
        };

        setLeads([...leads, newLead]);

        setAddLead({});
    }

    const handleDelete = (id: number) => {

        const confirmDelete =
            window.confirm(
                'Are you sure you want to delete this lead?'
            )

        if (!confirmDelete) return

        setLeads(
            leads.filter(
                (lead) => lead.id !== id
            )
        )
    }

    return {
        leads,
        setLeads,
        addLead,
        setAddLead,
        addNewLead,
        handleDelete
    };
}