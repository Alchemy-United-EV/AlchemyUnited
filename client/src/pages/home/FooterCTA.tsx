export default function FooterCTA() {
  return (
    <section className="bg-black py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <picture>
          <source srcSet="/assets/webp/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.webp" type="image/webp" />
          <img 
            src="/assets/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.png" 
            alt="Alchemy Network - Premium EV Charging Network Logo"
            className="h-10 w-auto mx-auto mb-6 filter brightness-125"
            width="40"
            height="40"
            loading="lazy"
          />
        </picture>
        
        <h2 className="text-3xl font-bold text-white mb-8">
          Ready for Fast, Reliable EV Charging?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => window.location.href = '/early-access'}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full transition-all duration-300"
          >
            Get Early Access
          </button>
          <button
            onClick={() => window.location.href = '/host'}
            className="border border-yellow-400 hover:bg-yellow-400 text-yellow-400 hover:text-black font-bold py-3 px-6 rounded-full transition-all duration-300"
          >
            Become a Host
          </button>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <p className="text-white/60 text-sm">
            © 2024 Alchemy Network. All rights reserved. | Premium EV charging network delivering reliable EV charging and profitable hosting solutions.
          </p>
        </div>
      </div>
    </section>
  );
}