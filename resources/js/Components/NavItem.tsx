import { useState } from 'react';
import { NavItemProps } from '../types';
import { Link } from '@inertiajs/react';
import { ChevronDownIcon, ChevronRightIcon } from '../../js/Components/Icons';

interface NavItemExtendedProps extends NavItemProps {
  onClick?: () => void;
}

const NavItem: React.FC<NavItemExtendedProps> = ({ item, sidebarOpen, level = 0, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const toggleExpanded = () => {
    if (hasSubItems) setExpanded(!expanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) {
        onClick();
      } else {
        toggleExpanded();
      }
    }
  };

  if (hasSubItems) {
    return (
      <div className={`${level > 0 ? 'pl-2' : ''}`}>
        <div
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          aria-haspopup="true"
          className={`flex items-center justify-between px-6 py-3 ${
            item.active ? 'bg-brandYellow' : 'hover:bg-yellow-500'
          } transition-colors duration-200 cursor-pointer select-none`}
          onClick={onClick ? () => onClick() : toggleExpanded}
          onKeyDown={handleKeyDown}
        >
          <div className="flex items-center">
            <span className="flex-shrink-0">{item.icon}</span>
            {sidebarOpen && <span className="ml-4 font-medium">{item.text}</span>}
          </div>

          {sidebarOpen && (
            <span>
              {expanded ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronRightIcon className="w-4 h-4" />
              )}
            </span>
          )}
        </div>

        {sidebarOpen && expanded && (
          <div className="bg-brandYellow">
            {item.subItems!.map((subItem) => (
              <NavItem
                key={subItem.path || subItem.text}
                item={subItem}
                sidebarOpen={sidebarOpen}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render clickable div if onClick is passed (for Logout)
  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className={`flex items-center px-6 py-3 cursor-pointer ${
          item.active ? 'bg-brandYellow' : 'hover:bg-yellow-500'
        } transition-colors duration-200 ${level > 0 ? 'pl-8' : ''}`}
      >
        <span className="flex-shrink-0">{item.icon}</span>
        {sidebarOpen && <span className="ml-4 font-medium">{item.text}</span>}
      </div>
    );
  }

  // Default render Link for normal navigation items
  return (
    <Link
      href={item.path || '#'}
      className={`flex items-center px-6 py-3 ${
        item.active ? 'bg-brandYellow' : 'hover:bg-yellow-500'
      } transition-colors duration-200 ${level > 0 ? 'pl-8' : ''}`}
    >
      <span className="flex-shrink-0">{item.icon}</span>
      {sidebarOpen && <span className="ml-4 font-medium">{item.text}</span>}
    </Link>
  );
};

export default NavItem;
