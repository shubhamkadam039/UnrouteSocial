import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const MenuItems = ({ setSidebarOpen }) => {
  return (
    <div className="text-gray-600 space-y-2 font-medium">
      {menuItemsData.map(({ to, label, Icon }) => (
        
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all 
            ${isActive 
              ? 'bg-orange-50 text-orange-700' 
              : 'hover:bg-gray-100'
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </NavLink>

      ))}
    </div>
  )
}

export default MenuItems
