import { useState } from 'react';
import { NavItemProps } from '../types';
import { Link } from '@inertiajs/react';
import { ChevronDownIcon, ChevronRightIcon } from '../../js/Components/Icons';

const NavItem: React.FC<NavItemProps> = ({ item, sidebarOpen, level = 0 }) => {
    const [expanded, setExpanded] = useState(false);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    if (hasSubItems) {
        return (
            <div className={`${level > 0 ? 'pl-2' : ''}`}>
                <div
                    className={`flex items-center justify-between px-6 py-3 ${item.active ? 'bg-indigo-700' : 'hover:bg-indigo-700'
                        } transition-colors duration-200 cursor-pointer`}
                    onClick={() => {
                        if (hasSubItems) setExpanded(!expanded);
                    }}
                >
                    <div className="flex items-center">
                        <span className="flex-shrink-0">{item.icon}</span>
                        {sidebarOpen && (
                            <span className="ml-4 font-medium">{item.text}</span>
                        )}
                    </div>

                    {sidebarOpen && hasSubItems && (
                        <span>
                            {expanded ? (
                                <ChevronDownIcon className="w-4 h-4" />
                            ) : (
                                <ChevronRightIcon className="w-4 h-4" />
                            )}
                        </span>
                    )}
                </div>

                {sidebarOpen && expanded && hasSubItems && (
                    <div className="bg-indigo-900">
                        {item.subItems?.map((subItem) => (
                            <NavItem
                                key={subItem.text}
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

    return (
    <Link
      href={item.path || '#'}
      className={`flex items-center px-6 py-3 ${
        item.active ? 'bg-indigo-700' : 'hover:bg-indigo-700'
      } transition-colors duration-200 ${level > 0 ? 'pl-8' : ''}`}
    >
      <span className="flex-shrink-0">{item.icon}</span>
      {sidebarOpen && <span className="ml-4 font-medium">{item.text}</span>}
    </Link>
  );
};

export default NavItem;
