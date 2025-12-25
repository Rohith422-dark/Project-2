import React from 'react';
import { 
  BarChart3, 
  FileText, 
  Droplets, 
  AlertTriangle, 
  Activity, 
  Users, 
  GraduationCap, 
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Heart,
  Globe,
  ChevronDown,
  LogOut
} from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'health-reports', label: 'Health Reports', icon: FileText },
  { id: 'water-quality', label: 'Water Quality', icon: Droplets },
  { id: 'active-alerts', label: 'Active Alerts', icon: AlertTriangle },
  { id: 'interventions', label: 'Interventions', icon: Activity },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  userData?: any;
  onLogout?: () => void;
}

export function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed, userData, onLogout }: SidebarProps) {
  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-40 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">HealthGuard</h1>
              <p className="text-xs text-gray-500">Smart Health Surveillance</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="px-3 py-4">
        {!collapsed && (
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-3">
            Main Navigation
          </div>
        )}
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'} ${
                  isActive ? 'text-blue-700' : 'text-gray-400'
                }`} />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* System Status */}
      {!collapsed && (
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            System Status
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">System Online</span>
            <ChevronDown className="w-3 h-3 text-gray-400 ml-auto" />
          </div>
        </div>
      )}

      {/* Language Selector */}
      {!collapsed && (
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Globe className="w-4 h-4" />
            <span>English</span>
            <ChevronDown className="w-3 h-3 text-gray-400 ml-auto" />
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className={`absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white ${
        collapsed ? 'p-2' : 'p-4'
      }`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-teal-600">
              {userData?.username ? userData.username.charAt(0).toUpperCase() : 'H'}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {userData?.username || 'Health Officer'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userData?.location || 'District Health Department'}
              </p>
            </div>
          )}
          {!collapsed && onLogout && (
            <button
              onClick={onLogout}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}