import { useRef } from 'react';
import { Notification } from '../types';
import useClickOutside from '../hooks/useClickOutside';

type NotificationPanelProps = {
    notifications: Notification[];
    onClose: () => void;
};

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onClose }) => {

    const panelRef = useRef<HTMLDivElement>(null);
    useClickOutside(panelRef, onClose);
    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
            <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">Notifications</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        ✕
                    </button>
                </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                            <div className="flex justify-between">
                                <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                                <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-500">No new notifications</div>
                )}
            </div>
            {notifications.length > 0 && (
                <div className="p-2 bg-gray-50 text-center">
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Mark all as read
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationPanel;
