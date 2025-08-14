export default function Hero() {
  return (
    <section className="relative h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-l from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-yellow-400/5 via-transparent to-transparent"></div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-10"></div>
      
      <div className="relative z-20 text-center text-white px-4 sm:px-6 max-w-5xl animate-fade-in">
        <header>
          <div className="mb-8">
            <div className="inline-block p-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl mb-4 animate-shimmer">
              <div className="bg-black px-6 py-2 rounded-2xl">
                <span className="text-yellow-400 font-semibold text-sm tracking-wide">⚡ PREMIUM NETWORK</span>
              </div>
            </div>
            <div className="flex justify-center mb-6">
              <img 
                src="/assets/au-logo.png" 
                alt="Alchemy United winged AU logo" 
                className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="block text-white mb-2 animate-slide-up">Premium EV</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 block animate-slide-up delay-200">Charging Network</span>
          </h1>
          
          <p className="text-lg sm:text-xl font-light mb-8 max-w-3xl mx-auto leading-relaxed text-white/90 animate-slide-up delay-300">
            Experience fast, reliable EV charging with guaranteed availability. Join our premium network for drivers and profitable hosting partners.
          </p>
        </header>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-500">
          <button
            onClick={() => window.location.href = '/early-access'}
            className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25 w-full sm:w-auto"
          >
            <span className="relative z-10">Get Early Access</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
          </button>
          <button
            onClick={() => window.location.href = '/host'}
            className="group border-2 border-white/20 hover:border-yellow-400 bg-white/5 backdrop-blur-sm text-white hover:text-yellow-400 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:bg-yellow-400/10 w-full sm:w-auto"
          >
            Become a Host
          </button>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/60 text-sm animate-fade-in delay-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>99.9% Uptime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
            <span>Guaranteed Reservations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
            <span>Premium Locations</span>
          </div>
        </div>
      </div>
    </section>
  );
}