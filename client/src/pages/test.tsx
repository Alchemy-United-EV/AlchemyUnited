export default function Test() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Page</h1>
        <p className="text-gray-600">React is working correctly!</p>
        <div className="mt-8">
          <a href="/" className="text-blue-600 hover:text-blue-800">← Back to Home</a>
        </div>
        <div className="mt-4">
          <a href="/dashboard" className="text-green-600 hover:text-green-800">Go to Dashboard →</a>
        </div>
      </div>
    </div>
  );
}