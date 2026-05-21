import { useState } from 'react'
import Navbar from '../components/Navbar'
import LeadManagement from '../components/LeadManagement'

function Dashboard() {


    const [dashboardItems] = useState([
        {
            title: 'Total Leads',
            amount: 50
        },
        {
            title: 'Converted Leads',
            amount: 50
        },
        {
            title: 'Pending followup',
            amount: 50
        },
        {
            title: 'High priority lead',
            amount: 50
        }
    ])
    return (
        <div className="h-screen bg-slate-200">
            <Navbar />

            <div className="p-3">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    {dashboardItems?.map((item, index) => (
                        <div
                            key={index}
                            className="p-5 border border-slate-400 w-75 bg-white rounded-2xl flex justify-between gap-5 items-center shadow-md"
                        >
                            <h3 className="text-xl text-slate-600">
                                {item?.title}:
                            </h3>

                            <p className="text-2xl text-black">
                                {item?.amount}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
           <div>
            <LeadManagement/>
           </div>
        </div>
    )
}

export default Dashboard