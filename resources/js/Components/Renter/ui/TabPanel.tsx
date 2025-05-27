import React from 'react'

interface ITabPanel {
    tabPanels: string[];
    activeTab: "Upcoming" | "Past" | "All Bookings";
    setActiveTab: (value: "Upcoming" | "Past" | "All Bookings") => void;
}

const TabPanel = ({ tabPanels, activeTab, setActiveTab } : ITabPanel) => {

  return (
    <div className="border-b border-gray-200">
        <div className="flex">
            {tabPanels.map((tabPanel, index) => (
                <button
                    key={index}
                    onClick={() => setActiveTab(tabPanel)}
                    className={`px-6 py-4 text-sm font-medium ${
                        tabPanel === activeTab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    >
                {tabPanel}
                </button>
            ))}
            
            {/* <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'past'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            >
            Past
            </button>
            <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'all'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            >
            All Bookings
            </button> */}
        </div>
    </div>
  )
}

export default TabPanel