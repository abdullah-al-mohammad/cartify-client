import { useState } from 'react';
import { LuMonitor, LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '../../provider/ThemeProvider';

export default function ThemeToggle() {
  const { theme, switchTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const items = [
    { id: 'light', icon: <LuSun size={18} />, label: 'Light' },
    { id: 'dark', icon: <LuMoon size={18} />, label: 'Dark' },
    { id: 'system', icon: <LuMonitor size={18} />, label: 'System' },
  ];

  return (
    <div className="relative text-left">
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 rounded-lg text-sm"
      >
        {items.find(i => i.id === theme)?.icon}
        {items.find(i => i.id === theme)?.label}
        <span className="ml-1">▾</span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {items.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  switchTheme(item.id);
                  setOpen(false);
                }}
                className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left transition
                  ${
                    theme === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
