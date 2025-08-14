export default function Hero() {
  return (
    <section className="relative h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      <div className="relative z-20 text-center text-white px-6 max-w-5xl">
        <header>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="block text-white mb-2">Premium EV</span>
            <span className="text-yellow-400 block">Charging Network</span>
          </h1>
          
          <p className="text-xl sm:text-2xl font-light mb-12 max-w-4xl mx-auto leading-relaxed text-white/90">
            Join Alchemy Network — an exclusive EV charging network delivering fast, reliable EV charging with guaranteed availability for drivers and profitable hosting for partners.
          </p>
        </header>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.location.href = '/early-access'}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105"
          >
            Request Early Access
          </button>
          <button
            onClick={() => window.location.href = '/host'}
            className="border-2 border-white/40 hover:border-yellow-400 text-white hover:text-yellow-400 font-bold py-4 px-8 rounded-full text-xl transition-all duration-300"
          >
            Become a Host
          </button>
        </div>
      </div>
    </section>
  );
}