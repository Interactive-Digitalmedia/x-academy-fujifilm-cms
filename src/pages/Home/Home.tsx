const Home = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Welcome, Admin</h1>
        <div className="text-sm text-gray-600">kanishka@interactivedigitalmedia.in</div>
      </header>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-5 shadow">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">120</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Pending Invites</h2>
          <p className="text-3xl font-bold text-orange-500">8</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Active Sessions</h2>
          <p className="text-3xl font-bold text-green-600">5</p>
        </div>
      </div>
    </div>
  )
}

export default Home
