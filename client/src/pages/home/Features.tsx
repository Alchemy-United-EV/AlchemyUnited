import { useState } from 'react';

export default function Features() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const problemSolutionPairs = [
    {
      problem: { icon: '⏰', title: 'No Reservation System', desc: 'Drive to stations only to find them occupied or broken. 78% success rate means wasted trips and time.' },
      solution: { icon: '📅', title: 'Guaranteed Reservations', desc: 'Book your charging slot in advance with guaranteed availability and premium locations' }
    },
    {
      problem: { icon: '⚡', title: 'Unreliable Stations', desc: '22% of charging attempts fail due to broken equipment, network issues, or payment system failures' },
      solution: { icon: '🔧', title: '99.9% Uptime Guarantee', desc: 'AI-powered maintenance and 24/7 monitoring ensure stations work when you need them' }
    },
    {
      problem: { icon: '💰', title: 'Wild West Pricing', desc: 'Unpredictable costs ranging $11-$50 for full charge with hidden fees and confusing billing' },
      solution: { icon: '💎', title: 'Transparent Premium Pricing', desc: 'Clear, consistent rates with no hidden fees. Premium service at honest prices' }
    },
    {
      problem: { icon: '🏢', title: 'Property Host Headaches', desc: 'Vandalism, theft, maintenance costs, and liability concerns make hosting charging stations risky' },
      solution: { icon: '🛡️', title: 'Full Host Protection', desc: 'We handle insurance, security, maintenance, and operations while you earn passive income' }
    }
  ];

  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-black mb-6 text-black leading-tight">
            Solving Real EV Problems
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We've identified the core issues plaguing today's EV charging experience and built solutions that actually work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problemSolutionPairs.map((pair, index) => (
            <div key={index} className="group h-80">
              <div 
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                  flippedCards.includes(index) ? 'rotate-y-180' : ''
                }`}
                onClick={() => toggleCard(index)}
              >
                {/* Problem Side (Front) */}
                <div className="absolute inset-0 w-full h-full bg-red-50 border border-red-200 rounded-xl p-6 backface-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-col h-full">
                    <div className="text-4xl mb-4">{pair.problem.icon}</div>
                    <h3 className="text-xl font-bold text-red-800 mb-4">{pair.problem.title}</h3>
                    <p className="text-red-700 flex-1 text-sm leading-relaxed">
                      {pair.problem.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <picture>
                          <source srcSet="/assets/webp/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.webp" type="image/webp" />
                          <img 
                            src="/assets/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.png" 
                            alt="AU"
                            className="h-6 w-auto"
                            width="24"
                            height="24"
                            loading="lazy"
                          />
                        </picture>
                        <span className="text-sm text-yellow-600 font-medium">The Alchemy Way</span>
                      </div>
                      <span className="text-xs text-gray-500">Tap ↻ for problem</span>
                    </div>
                  </div>
                </div>

                {/* Solution Side (Back) */}
                <div className="absolute inset-0 w-full h-full bg-green-50 border border-green-200 rounded-xl p-6 backface-hidden rotate-y-180 shadow-lg">
                  <div className="flex flex-col h-full">
                    <div className="text-4xl mb-4">{pair.solution.icon}</div>
                    <h3 className="text-xl font-bold text-green-800 mb-4">{pair.solution.title}</h3>
                    <p className="text-green-700 flex-1 text-sm leading-relaxed">
                      {pair.solution.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <picture>
                          <source srcSet="/assets/webp/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.webp" type="image/webp" />
                          <img 
                            src="/assets/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.png" 
                            alt="AU"
                            className="h-6 w-auto"
                            width="24"
                            height="24"
                            loading="lazy"
                          />
                        </picture>
                        <span className="text-sm text-yellow-600 font-medium">Alchemy Solution</span>
                      </div>
                      <span className="text-xs text-gray-500">Tap ↻ for problem</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}