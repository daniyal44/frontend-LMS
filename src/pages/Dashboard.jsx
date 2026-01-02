

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Dynamic import for Chart.js


// Component imports (would normally be in separate files)
const StatsCard = ({ title, value, icon, color, change, subtitle, onClick }) => (
  <div 
    onClick={onClick}
    className="group stats-card bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg hover:shadow-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
        {change && (
          <div className="flex items-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              change >= 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <i className={`fas fa-arrow-${change >= 0 ? 'up' : 'down'} mr-1`}></i>
              {Math.abs(change)}%
            </span>
            {subtitle && (
              <span className="ml-2 text-sm text-gray-600">{subtitle}</span>
            )}
          </div>
        )}
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
        color === 'blue' ? 'bg-blue-500' :
        color === 'green' ? 'bg-green-500' :
        color === 'purple' ? 'bg-purple-500' :
        color === 'orange' ? 'bg-orange-500' :
        'bg-gray-500'
      } text-white`}>
        <i className={`${icon} text-xl`}></i>
      </div>
    </div>
  </div>
);

const ActivityTable = ({ activities, onEdit, onDelete, onView }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filter, setFilter] = useState('all');

  const sortedActivities = useMemo(() => {
    const sorted = [...activities];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted.filter(activity => 
      filter === 'all' || activity.status.toLowerCase() === filter.toLowerCase()
    );
  }, [activities, sortConfig, filter]);

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
      'inactive': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
      'sold out': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' }
    };
    
    const config = statusConfig[status.toLowerCase()] || statusConfig.inactive;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} ${config.border} border`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          <p className="text-sm text-gray-600">Latest products and transactions</p>
        </div>
        <div className="flex space-x-2">
          {['all', 'active', 'pending', 'inactive'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 text-sm rounded-full ${
                filter === filterType
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: 'id', label: 'ID', sortable: true },
                { key: 'name', label: 'Product', sortable: true },
                { key: 'category', label: 'Category', sortable: true },
                { key: 'price', label: 'Price', sortable: true },
                { key: 'sales', label: 'Sales', sortable: true },
                { key: 'revenue', label: 'Revenue', sortable: true },
                { key: 'status', label: 'Status', sortable: true },
                { key: 'date', label: 'Date', sortable: true },
                { key: 'actions', label: 'Actions', sortable: false }
              ].map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => column.sortable && requestSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {column.sortable && (
                      <i className={`ml-1 fas fa-sort${
                        sortConfig.key === column.key 
                          ? sortConfig.direction === 'asc' ? '-up' : '-down' 
                          : ''
                      } text-gray-400`}></i>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedActivities.map((activity, index) => (
              <tr key={activity.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{activity.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-lg" src={activity.image} alt={activity.name} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                      {activity.supplier && (
                        <div className="text-sm text-gray-500">By {activity.supplier}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {activity.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {activity.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (activity.sales / 100) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">{activity.sales}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {activity.revenue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(activity.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {activity.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView(activity)}
                      className="text-blue-600 hover:text-blue-900"
                      title="View"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      onClick={() => onEdit(activity)}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => onDelete(activity.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{sortedActivities.length}</span> of{' '}
          <span className="font-medium">{activities.length}</span> activities
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
            Previous
          </button>
          <button className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true' || false
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [chartsLoaded, setChartsLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('week');

  // Enhanced activities data
  const [activities, setActivities] = useState([
    {
      id: '#1234',
      name: 'Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=40&h=40&fit=crop',
      category: 'Electronics',
      price: '$89.99',
      status: 'Active',
      date: '2024-01-15',
      sales: 45,
      revenue: '$4,049.55',
      stock: 120,
      supplier: 'TechGear Inc.',
      description: 'Premium wireless headphones with noise cancellation'
    },
    {
      id: '#1235',
      name: 'Smart Watch Series 5',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=40&h=40&fit=crop',
      category: 'Electronics',
      price: '$299.99',
      status: 'Active',
      date: '2024-01-14',
      sales: 23,
      revenue: '$6,899.77',
      stock: 45,
      supplier: 'Wearable Tech',
      description: 'Latest smart watch with health monitoring'
    },
    {
      id: '#1236',
      name: 'Laptop Stand Pro',
      image: 'https://images.unsplash.com/photo-1586950012036-b957f2c7cbf3?w=40&h=40&fit=crop',
      category: 'Accessories',
      price: '$49.99',
      status: 'Pending',
      date: '2024-01-13',
      sales: 67,
      revenue: '$3,349.33',
      stock: 200,
      supplier: 'Office Essentials',
      description: 'Adjustable aluminum laptop stand'
    },
    {
      id: '#1237',
      name: 'Mechanical Keyboard',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=40&h=40&fit=crop',
      category: 'Electronics',
      price: '$129.99',
      status: 'Active',
      date: '2024-01-12',
      sales: 89,
      revenue: '$11,569.11',
      stock: 75,
      supplier: 'Gaming Gear Co.',
      description: 'RGB mechanical gaming keyboard'
    },
    {
      id: '#1238',
      name: 'Wireless Mouse',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=40&h=40&fit=crop',
      category: 'Accessories',
      price: '$39.99',
      status: 'Sold Out',
      date: '2024-01-11',
      sales: 150,
      revenue: '$5,998.50',
      stock: 0,
      supplier: 'Peripheral Masters',
      description: 'Ergonomic wireless mouse'
    }
  ]);

  // System metrics with trends
  const [systemMetrics, setSystemMetrics] = useState({
    totalUsers: 2543,
    activeUsers: 1892,
    totalRevenue: 45231,
    totalOrders: 1234,
    conversionRate: 3.24,
    avgOrderValue: 36.67,
    systemUptime: 99.9,
    serverLoad: 45,
    newUsersToday: 42,
    pendingOrders: 23,
    refunds: 5,
    avgResponseTime: '1.2s'
  });

  // Recent users data
  const [recentUsers, setRecentUsers] = useState([
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john@example.com', 
      role: 'Admin', 
      status: 'Active', 
      lastLogin: '2 hours ago',
      avatar: 'JS',
      signupDate: '2023-12-01'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      email: 'sarah@example.com', 
      role: 'User', 
      status: 'Active', 
      lastLogin: '4 hours ago',
      avatar: 'SJ',
      signupDate: '2024-01-10'
    },
    { 
      id: 3, 
      name: 'Mike Wilson', 
      email: 'mike@example.com', 
      role: 'User', 
      status: 'Inactive', 
      lastLogin: '2 days ago',
      avatar: 'MW',
      signupDate: '2023-11-15'
    },
    { 
      id: 4, 
      name: 'Emma Davis', 
      email: 'emma@example.com', 
      role: 'Premium', 
      status: 'Active', 
      lastLogin: '1 hour ago',
      avatar: 'ED',
      signupDate: '2024-01-05'
    }
  ]);

  // System alerts
  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      type: 'warning', 
      message: 'Server load is high (85%)', 
      time: '5 minutes ago',
      priority: 'high'
    },
    { 
      id: 2, 
      type: 'info', 
      message: 'New user registration: Emma Davis', 
      time: '10 minutes ago',
      priority: 'medium'
    },
    { 
      id: 3, 
      type: 'success', 
      message: 'Backup completed successfully', 
      time: '1 hour ago',
      priority: 'low'
    },
    { 
      id: 4, 
      type: 'error', 
      message: 'Payment gateway experiencing delays', 
      time: '2 hours ago',
      priority: 'high'
    }
  ]);

  // Performance metrics
  const [performanceData, setPerformanceData] = useState({
    dailyVisitors: [1200, 1900, 1500, 2100, 2300, 1800, 1400],
    revenueByCategory: [
      { category: 'Electronics', value: 45000, color: '#3B82F6' },
      { category: 'Accessories', value: 22000, color: '#10B981' },
      { category: 'Software', value: 18000, color: '#8B5CF6' },
      { category: 'Books', value: 12000, color: '#F59E0B' },
      { category: 'Other', value: 8000, color: '#EF4444' }
    ],
    topCountries: [
      { country: 'USA', visitors: 4500, percentage: 35 },
      { country: 'UK', visitors: 2800, percentage: 22 },
      { country: 'Germany', visitors: 1900, percentage: 15 },
      { country: 'Canada', visitors: 1200, percentage: 9 },
      { country: 'Australia', visitors: 900, percentage: 7 }
    ]
  });

  const revenueChartRef = useRef(null);
  const userChartRef = useRef(null);
  const performanceChartRef = useRef(null);
  const revenueChartInstance = useRef(null);
  const userChartInstance = useRef(null);
  const performanceChartInstance = useRef(null);

  // Filter activities based on search
  const filteredActivities = useMemo(() => {
    if (!searchTerm) return activities;
    return activities.filter(activity =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activities, searchTerm]);

  // Calculate dashboard metrics
  const dashboardStats = useMemo(() => [
    {
      title: 'Total Revenue',
      value: `$${systemMetrics.totalRevenue.toLocaleString()}`,
      icon: 'fas fa-dollar-sign',
      color: 'green',
      change: 12.5,
      subtitle: 'from last month'
    },
    {
      title: 'Active Users',
      value: systemMetrics.activeUsers.toLocaleString(),
      icon: 'fas fa-users',
      color: 'blue',
      change: 8.2,
      subtitle: 'from last week'
    },
    {
      title: 'Total Orders',
      value: systemMetrics.totalOrders.toLocaleString(),
      icon: 'fas fa-shopping-cart',
      color: 'purple',
      change: -3.1,
      subtitle: 'from last month'
    },
    {
      title: 'Conversion Rate',
      value: `${systemMetrics.conversionRate}%`,
      icon: 'fas fa-chart-line',
      color: 'orange',
      change: 1.8,
      subtitle: 'from last week'
    },
    {
      title: 'New Users Today',
      value: systemMetrics.newUsersToday,
      icon: 'fas fa-user-plus',
      color: 'green',
      change: 15.3,
      subtitle: 'daily growth'
    },
    {
      title: 'Pending Orders',
      value: systemMetrics.pendingOrders,
      icon: 'fas fa-clock',
      color: 'orange',
      change: -5.2,
      subtitle: 'awaiting processing'
    }
  ], [systemMetrics]);

  // Admin login handler
  const handleAdminLogin = useCallback((e) => {
    e.preventDefault();
    setLoginError('');
    
    if (adminCredentials.username === 'admin' && adminCredentials.password === 'admin') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      localStorage.setItem('adminToken', 'authenticated');
      showToastMessage('Admin login successful!', 'success');
    } else {
      setLoginError('Invalid credentials. Use admin/admin for demo.');
    }
  }, [adminCredentials]);

  // Admin logout handler
  const handleAdminLogout = useCallback(() => {
    setIsAdmin(false);
    setShowAdminLogin(true);
    localStorage.removeItem('adminToken');
    showToastMessage('Admin logged out successfully.', 'info');
  }, []);

  // Show toast message helper
  const showToastMessage = useCallback((message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  // Handle product actions
  const handleViewProduct = useCallback((product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  }, []);

  const handleEditProduct = useCallback((product) => {
    showToastMessage(`Editing ${product.name}`, 'info');
    // In a real app, you would open an edit form
  }, []);

  const handleDeleteProduct = useCallback((productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setActivities(prev => prev.filter(p => p.id !== productId));
      showToastMessage('Product deleted successfully', 'success');
    }
  }, []);

  // Handle form submission
  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newProduct = {
      id: `#${Math.floor(Math.random() * 9000) + 1000}`,
      name: formData.get('product-name'),
      image: `https://images.unsplash.com/photo-${Math.random().toString(36).substring(2)}?w=40&h=40&fit=crop`,
      category: formData.get('category'),
      price: `$${parseFloat(formData.get('price')).toFixed(2)}`,
      status: formData.get('status'),
      date: new Date().toISOString().split('T')[0],
      sales: 0,
      revenue: '$0.00',
      stock: parseInt(formData.get('quantity')) || 0,
      supplier: formData.get('supplier') || 'Unknown',
      description: formData.get('description') || ''
    };

    setActivities(prev => [newProduct, ...prev]);
    showToastMessage('Product added successfully!', 'success');
    e.target.reset();
  }, []);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  }, [darkMode]);

  // Initialize charts
  useEffect(() => {
    if (!isAdmin || !Chart) return;

    const initializeCharts = () => {
      // Destroy existing charts
      [revenueChartInstance, userChartInstance, performanceChartInstance].forEach(chart => {
        if (chart.current) chart.current.destroy();
      });

      // Revenue Chart
      if (revenueChartRef.current) {
        const revenueData = timeRange === 'week' 
          ? [12000, 19000, 15000, 21000, 23000, 18000, 14000]
          : [30000, 35000, 32000, 40000, 38000, 45231, 48000, 42000, 46000, 50000, 52000, 55000];
        
        const labels = timeRange === 'week' 
          ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        revenueChartInstance.current = new Chart(revenueChartRef.current, {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: 'Revenue',
              data: revenueData,
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#10B981',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                ticks: {
                  callback: value => '$' + value.toLocaleString()
                }
              },
              x: {
                grid: { color: 'rgba(0, 0, 0, 0.05)' }
              }
            }
          }
        });
      }

      // User Activity Chart
      if (userChartRef.current) {
        userChartInstance.current = new Chart(userChartRef.current, {
          type: 'bar',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Active Users',
              data: performanceData.dailyVisitors,
              backgroundColor: '#3B82F6',
              borderColor: '#1D4ED8',
              borderWidth: 1,
              borderRadius: 6,
              borderSkipped: false
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.05)' }
              },
              x: {
                grid: { color: 'rgba(0, 0, 0, 0.05)' }
              }
            }
          }
        });
      }

      // Performance Chart
      if (performanceChartRef.current) {
        performanceChartInstance.current = new Chart(performanceChartRef.current, {
          type: 'doughnut',
          data: {
            labels: performanceData.revenueByCategory.map(item => item.category),
            datasets: [{
              data: performanceData.revenueByCategory.map(item => item.value),
              backgroundColor: performanceData.revenueByCategory.map(item => item.color),
              borderWidth: 2,
              borderColor: '#fff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  padding: 20,
                  usePointStyle: true
                }
              },
              tooltip: {
                callbacks: {
                  label: context => {
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((context.raw / total) * 100);
                    return `${context.label}: $${context.raw.toLocaleString()} (${percentage}%)`;
                  }
                }
              }
            }
          }
        });
      }

      setChartsLoaded(true);
    };

    const timer = setTimeout(initializeCharts, 100);
    return () => {
      clearTimeout(timer);
      [revenueChartInstance, userChartInstance, performanceChartInstance].forEach(chart => {
        if (chart.current) chart.current.destroy();
      });
    };
  }, [isAdmin, timeRange, performanceData]);

  // Check admin authentication
  useEffect(() => {
    const checkAdminAccess = () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken === 'authenticated') {
          setIsAdmin(true);
        } else {
          setShowAdminLogin(true);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setShowAdminLogin(true);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(checkAdminAccess, 500);
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Loading Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Initializing admin panel...</p>
        </div>
      </div>
    );
  }

  // Admin login form
  if (showAdminLogin && !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <i className="fas fa-shield-alt text-white text-4xl"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  Admin Dashboard
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter admin credentials to access the management panel
                </p>
              </div>
              
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      value={adminCredentials.username}
                      onChange={(e) => setAdminCredentials(prev => ({...prev, username: e.target.value}))}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 dark:text-white"
                      placeholder="Enter admin username"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="password"
                      value={adminCredentials.password}
                      onChange={(e) => setAdminCredentials(prev => ({...prev, password: e.target.value}))}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 dark:text-white"
                      placeholder="Enter admin password"
                      required
                    />
                  </div>
                </div>
                
                {loginError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <div className="flex items-center">
                      <i className="fas fa-exclamation-circle text-red-500 dark:text-red-400 mr-3"></i>
                      <p className="text-red-700 dark:text-red-300 text-sm">{loginError}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    Forgot password?
                  </a>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Login as Admin
                </button>
              </form>
              
              
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <i className="fas fa-chart-line text-white"></i>
                </div>
                <div>
                  <h1 className="text-xl font-bold">Admin Dashboard</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, Admin</p>
                </div>
              </div>
              
              <div className="ml-10 hidden md:flex items-center space-x-1">
                <a href="#" className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg">Dashboard</a>
                <a href="#" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">Analytics</a>
                <a href="#" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">Reports</a>
                <a href="#" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">Settings</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
                <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
              </div>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative"
                >
                  <i className="fas fa-bell"></i>
                  {alerts.filter(a => a.priority === 'high').length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{alerts.length} unread</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {alerts.map(alert => (
                        <div key={alert.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0">
                          <div className="flex items-start">
                            <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                              alert.type === 'warning' ? 'bg-yellow-500' :
                              alert.type === 'error' ? 'bg-red-500' :
                              alert.type === 'success' ? 'bg-green-500' :
                              'bg-blue-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 dark:text-white">{alert.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center">
                <img
                  className="h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                  alt="Admin"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
              </div>
              
              <button
                onClick={handleAdminLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="p-6">
        {/* Stats Overview */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <p className="text-gray-600 dark:text-gray-400">Real-time metrics and analytics</p>
            </div>
            <div className="flex items-center space-x-2">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                <i className="fas fa-download mr-2"></i>Export
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {dashboardStats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold">Revenue Overview</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly revenue trends</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg">
                  Revenue
                </button>
              </div>
            </div>
            <div className="h-72">
              <canvas ref={revenueChartRef}></canvas>
            </div>
          </div>
          
          {/* Performance Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Revenue by Category</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Distribution across categories</p>
            </div>
            <div className="h-64">
              <canvas ref={performanceChartRef}></canvas>
            </div>
          </div>
        </div>
        
        {/* User Activity Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold">User Activity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Daily active users</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{systemMetrics.activeUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600 dark:text-green-400">+8.2% from last week</p>
              </div>
            </div>
            <div className="h-64">
              <canvas ref={userChartRef}></canvas>
            </div>
          </div>
          
          {/* Top Countries */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Top Countries</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visitor distribution by country</p>
            </div>
            <div className="space-y-4">
              {performanceData.topCountries.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium">{country.country.substring(0, 2)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{country.country}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {country.visitors.toLocaleString()} visitors
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{country.percentage}%</p>
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600"
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recent Activities */}
        <div className="mb-8">
          <ActivityTable
            activities={filteredActivities}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onView={handleViewProduct}
          />
        </div>
        
        {/* Recent Users & System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold">Recent Users</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Latest user registrations</p>
              </div>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.avatar}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'Active' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                    }`}>
                      {user.status}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user.lastLogin}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* System Health */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">System Health</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current system status</p>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Server Load</span>
                  <span className="text-sm font-medium">{systemMetrics.serverLoad}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-full rounded-full ${
                      systemMetrics.serverLoad > 80 ? 'bg-red-500' :
                      systemMetrics.serverLoad > 60 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${systemMetrics.serverLoad}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">System Uptime</span>
                  <span className="text-sm font-medium">{systemMetrics.systemUptime}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-full rounded-full bg-green-500"
                    style={{ width: `${systemMetrics.systemUptime}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Database Usage</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: '78%' }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-2xl font-bold">{systemMetrics.avgResponseTime}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-2xl font-bold">{systemMetrics.refunds}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Refunds Today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add Product Form */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Add New Product</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Add new products to your inventory</p>
          </div>
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <input
                name="product-name"
                type="text"
                required
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                name="category"
                required
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Software">Software</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Price ($) *</label>
              <input
                name="price"
                type="number"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
              <input
                name="quantity"
                type="number"
                required
                min="0"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Supplier</label>
              <input
                name="supplier"
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter supplier name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                name="status"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                rows="3"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter product description"
              ></textarea>
            </div>
            
            <div className="md:col-span-2 flex justify-end space-x-4">
              <button
                type="reset"
                className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </main>
      
      {/* Product Detail Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Product Details</h3>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProduct.image.replace('w=40&h=40', 'w=300&h=300')}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Product ID</label>
                      <p className="font-medium">{selectedProduct.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Added Date</label>
                      <p className="font-medium">{selectedProduct.date}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold mb-4">{selectedProduct.name}</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Category</label>
                      <p className="font-medium">{selectedProduct.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Price</label>
                      <p className="text-2xl font-bold text-green-600">{selectedProduct.price}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
                      <div className="inline-block">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedProduct.status === 'Active' 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' :
                            selectedProduct.status === 'Pending'
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300' :
                            'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                        }`}>
                          {selectedProduct.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Sales Performance</label>
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-2xl font-bold">{selectedProduct.sales}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Units Sold</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{selectedProduct.revenue}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Revenue Generated</p>
                        </div>
                      </div>
                    </div>
                    {selectedProduct.description && (
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</label>
                        <p className="mt-1">{selectedProduct.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    handleEditProduct(selectedProduct);
                    setShowProductModal(false);
                  }}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Edit Product
                </button>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Toast Notification */}
      <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 transform ${
        showToast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className={`px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 ${
          toastType === 'success' ? 'bg-green-500 text-white' :
          toastType === 'error' ? 'bg-red-500 text-white' :
          toastType === 'info' ? 'bg-blue-500 text-white' :
          'bg-gray-500 text-white'
        }`}>
          <i className={`fas ${
            toastType === 'success' ? 'fa-check-circle' :
            toastType === 'error' ? 'fa-exclamation-circle' :
            'fa-info-circle'
          }`}></i>
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => setShowToast(false)}
            className="ml-4 text-white hover:text-gray-200"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-8 p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400">© 2024 Admin Dashboard. All rights reserved.</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">v2.1.0</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Contact
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Support
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>Last updated: {new Date().toLocaleDateString()} | Server status: <span className="text-green-600 dark:text-green-400">Online</span></p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;