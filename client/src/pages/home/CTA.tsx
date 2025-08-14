export default function CTA() {
  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-4xl mx-auto text-center text-white">
        <picture>
          <source srcSet="/assets/webp/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.webp" type="image/webp" />
          <img 
            src="/assets/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.png" 
            alt="Alchemy United Logo"
            className="h-16 w-auto mx-auto mb-8 filter brightness-125"
            width="160"
            height="64"
            loading="lazy"
          />
        </picture>
        
        <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight">
          Gain Early Access to the{' '}
          <span className="text-yellow-400">Alchemy Network</span>
        </h2>
        
        <p className="text-xl mb-12 text-white/90 max-w-3xl mx-auto">
          Be among the first to experience the future of EV charging. Reserve your spot in our exclusive beta program.
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