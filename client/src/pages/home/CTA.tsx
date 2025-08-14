export default function CTA() {
  return (
    <section className="bg-gradient-to-br from-black via-gray-900 to-black py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-yellow-400/5 to-transparent rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto text-center text-white relative z-10">
        <picture>
          <source srcSet="/assets/webp/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.webp" type="image/webp" />
          <img 
            src="/assets/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.png" 
            alt="Alchemy Network - Premium EV Charging Network Logo"
            className="h-16 w-auto mx-auto mb-8 filter brightness-125"
            width="160"
            height="64"
            loading="lazy"
          />
        </picture>
        
        <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight">
          Join Our Premium{' '}
          <span className="text-yellow-400">EV Charging Network</span>
        </h2>
        
        <p className="text-xl mb-12 text-white/90 max-w-3xl mx-auto">
          Experience reliable EV charging with guaranteed availability. Be first to access our premium network and maximize your EV host revenue potential.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.href = '/early-access'}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105"
          >
            Request Early Access
          </button>
          <button
            onClick={() => window.location.href = '/host'}
            className="border-2 border-yellow-400 hover:bg-yellow-400 text-yellow-400 hover:text-black font-bold py-4 px-8 rounded-full text-xl transition-all duration-300"
          >
            Partner With Us
          </button>
        </div>
      </div>
    </section>
  );
}