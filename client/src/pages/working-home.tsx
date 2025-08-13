export default function WorkingHome() {
  const handleJoinNetwork = () => {
    window.location.href = '/early-access';
  };

  const handleBecomeHost = () => {
    window.location.href = '/host';
  };

  const handleViewDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* AU Logo */}
          <div className="mb-8">
            <img 
              src="/attached_assets/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.png"
              alt="Alchemy United Logo"
              className="h-24 w-auto mx-auto drop-shadow-2xl"
            />
          </div>

          {/* Main Headlines */}
          <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-6">
            Smart. <span className="font-light text-gray-300">Stylish.</span>
          </h1>
          <h2 className="text-4xl md:text-6xl font-light tracking-wider mb-8">
            <span className="text-yellow-400">Built for EV Life.</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Alchemy United delivers high-performance EV charging that doubles as modern art — 
            a premium network for discerning drivers.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-yellow-400 text-2xl mb-2">⚡</div>
              <h3 className="text-lg font-medium mb-2">Fast Charging</h3>
              <p className="text-gray-400 text-sm">Ultra-rapid charging speeds</p>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 text-2xl mb-2">🖤</div>
              <h3 className="text-lg font-medium mb-2">Matte Black Finish</h3>
              <p className="text-gray-400 text-sm">Luxury aesthetic design</p>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 text-2xl mb-2">🏠</div>
              <h3 className="text-lg font-medium mb-2">Network Access</h3>
              <p className="text-gray-400 text-sm">Exclusive member network</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleJoinNetwork}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Join the Network
            </button>
            <button
              onClick={handleBecomeHost}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Become a Host
            </button>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 px-4 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-6">
              <img 
                src="/attached_assets/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.png"
                alt="AU Logo"
                className="h-16 w-auto mx-auto opacity-80"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Current Charging is <span className="text-red-600 font-medium">Broken</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-lg">⏰</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Long Lines</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Wait hours for a single charging port with no reservation system
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-lg">🔧</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Outdated Hardware</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Broken screens, slow charging speeds, unreliable connections
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-lg">❌</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Zero Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                No help when things go wrong, leaving you stranded
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-lg">👁️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Ugly Designs</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Eyesore stations that ruin the aesthetic of any location
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              The <span className="text-yellow-600 font-medium">Alchemy</span> Difference
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium charging stations that combine cutting-edge technology with luxury automotive design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-yellow-600 text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Reserved Access</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Guaranteed charging slots through our exclusive member network. No more waiting in lines.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-yellow-600 text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Ultra-Fast Technology</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Latest generation charging hardware delivering maximum speed and reliability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-yellow-600 text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">24/7 Support</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Premium customer service available around the clock for peace of mind.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-yellow-600 text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Luxury Design</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Sleek, architectural charging stations that enhance any environment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-yellow-600 text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Network Integration</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Seamless access across our growing network of premium locations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-yellow-600 text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Host Partnership</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Revenue-sharing opportunities for premium property owners and managers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="/attached_assets/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.png"
              alt="Alchemy United Logo"
              className="h-16 w-auto mx-auto"
            />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Join the Future of <span className="text-yellow-400">EV Charging</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Be part of an exclusive network that redefines the electric vehicle experience
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleJoinNetwork}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-10 py-4 rounded-lg font-semibold text-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Get Early Access
            </button>
            <button
              onClick={handleBecomeHost}
              className="border-2 border-yellow-400 text-yellow-400 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Partner With Us
            </button>
            <button
              onClick={handleViewDashboard}
              className="border border-gray-600 text-gray-300 px-6 py-4 rounded-lg font-medium text-sm hover:border-gray-400 hover:text-white transition-all duration-300"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <img 
              src="/attached_assets/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.png"
              alt="AU Logo"
              className="h-8 w-auto mx-auto opacity-60"
            />
          </div>
          <p className="text-sm">
            &copy; 2024 Alchemy United. Redefining the electric vehicle charging experience.
          </p>
        </div>
      </footer>
    </div>
  );
}