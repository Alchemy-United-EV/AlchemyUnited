export default function Home() {
  return (
    <div className="min-h-screen bg-hero-gradient text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="/au-logo.png"
                alt="Alchemy United"
                className="h-8 w-auto glow-gold animate-float"
                loading="eager"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-gold-bright transition-colors duration-300">Features</a>
              <a href="#membership" className="text-gray-300 hover:text-gold-bright transition-colors duration-300">Membership</a>
              <a href="/early-access">
                <button className="bg-gold-gradient hover:glow-gold-intense text-black font-luxury px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-gold">
                  Join Network
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img 
            src="/hero-ev-charger.png" 
            alt="Premium EV Charger" 
            className="w-full h-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/90"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gold/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gold-bright/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-gold-deep/10 rounded-full blur-2xl animate-bounce-gentle"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-display mb-8 tracking-wide leading-tight">
            PLUG INTO THE
            <span className="block text-transparent bg-clip-text bg-gold-gradient animate-gradient-x text-gold-bright">
              FUTURE
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
            Revolutionary EV charging technology engineered for precision, efficiency, 
            and the future of electric mobility. Join the premium network that's redefining 
            what it means to charge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gold-gradient hover:glow-gold-intense text-black font-luxury py-4 px-12 text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-gold-lg">
              <a href="/early-access">Join the Network</a>
            </button>
            <button className="border-2 border-gold-bright text-gold-bright hover:bg-gold-bright hover:text-black font-luxury py-4 px-12 text-lg rounded-full transition-all duration-300 hover:glow-gold">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gold-bright animate-bounce-gentle text-2xl">
          ↓
        </div>
      </section>

      {/* Problem/Solution Cards */}
      <section id="features" className="py-24 px-4 bg-card-gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-display text-center mb-6 text-gold-bright">
            SOLVING REAL PROBLEMS
          </h2>
          <div className="w-32 h-1 bg-gold-gradient mx-auto mb-16 rounded-full"></div>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Click each card to see how we're transforming the EV charging experience
          </p>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Problem Card 1 */}
            <div className="group relative">
              <div className="bg-glass rounded-2xl p-8 border border-gold/20 hover:border-gold-bright/40 transition-all duration-500 hover:glow-gold transform hover:scale-105">
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="text-5xl mb-6 text-red-400 group-hover:animate-bounce-gentle">
                    🔋
                  </div>
                  <h3 className="text-xl font-luxury mb-4 text-red-300">
                    Range Anxiety
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    EV drivers constantly worry about finding reliable charging stations during long trips.
                  </p>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
                  <div className="mt-6 text-gold-bright font-luxury text-sm">
                    SOLVED WITH
                  </div>
                  <div className="text-gold text-lg font-bold">
                    Strategic Network Coverage
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Card 2 */}
            <div className="group relative">
              <div className="bg-glass rounded-2xl p-8 border border-gold/20 hover:border-gold-bright/40 transition-all duration-500 hover:glow-gold transform hover:scale-105">
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="text-5xl mb-6 text-orange-400 group-hover:animate-bounce-gentle">
                    ⏰
                  </div>
                  <h3 className="text-xl font-luxury mb-4 text-orange-300">
                    Slow Charging
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Traditional charging takes hours, disrupting busy schedules and travel plans.
                  </p>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
                  <div className="mt-6 text-gold-bright font-luxury text-sm">
                    SOLVED WITH
                  </div>
                  <div className="text-gold text-lg font-bold">
                    350kW Ultra-Fast Speed
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Card 3 */}
            <div className="group relative">
              <div className="bg-glass rounded-2xl p-8 border border-gold/20 hover:border-gold-bright/40 transition-all duration-500 hover:glow-gold transform hover:scale-105">
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="text-5xl mb-6 text-red-500 group-hover:animate-bounce-gentle">
                    💸
                  </div>
                  <h3 className="text-xl font-luxury mb-4 text-red-400">
                    Unpredictable Costs
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Varying pricing and hidden fees make charging expenses difficult to budget.
                  </p>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
                  <div className="mt-6 text-gold-bright font-luxury text-sm">
                    SOLVED WITH
                  </div>
                  <div className="text-gold text-lg font-bold">
                    Transparent Membership
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-display text-center mb-6 text-gold-bright">
            PREMIUM EXPERIENCE
          </h2>
          <div className="w-32 h-1 bg-gold-gradient mx-auto mb-16 rounded-full animate-shimmer"></div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center group">
              <div className="text-6xl mb-4 group-hover:animate-float transition-all duration-300">⚡</div>
              <h3 className="text-lg font-luxury mb-2 text-gold-bright">Ultra-Fast Charging</h3>
              <p className="text-white/80 text-sm">Premium speeds up to 350kW</p>
            </div>
            
            <div className="text-center group">
              <div className="text-6xl mb-4 group-hover:animate-float transition-all duration-300">🏙️</div>
              <h3 className="text-lg font-luxury mb-2 text-gold-bright">Prime Locations</h3>
              <p className="text-white/80 text-sm">Hotels, malls, offices & more</p>
            </div>
            
            <div className="text-center group">
              <div className="text-6xl mb-4 group-hover:animate-float transition-all duration-300">💼</div>
              <h3 className="text-lg font-luxury mb-2 text-gold-bright">Co-branded Revenue</h3>
              <p className="text-white/80 text-sm">Partner branding & revenue share</p>
            </div>
            
            <div className="text-center group">
              <div className="text-6xl mb-4 group-hover:animate-float transition-all duration-300">🧠</div>
              <h3 className="text-lg font-luxury mb-2 text-gold-bright">Smart Tracking</h3>
              <p className="text-white/80 text-sm">Intelligent energy optimization</p>
            </div>
          </div>
          
          <div className="text-center">
            <button className="bg-gold-gradient hover:glow-gold-intense text-black font-luxury py-8 px-16 rounded-full text-2xl transition-all duration-300 transform hover:scale-105 shadow-gold-lg">
              <a href="/early-access">Get On The List</a>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-glass border-y border-gold/20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-display mb-6 text-gold-bright">Ready to Join the Future?</h2>
          <p className="text-gray-300 mb-8 text-lg">Get early access to our premium charging network</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/early-access">
              <button className="bg-gold-gradient hover:glow-gold-intense text-black font-luxury py-4 px-12 text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-gold">
                Get Early Access
              </button>
            </a>
            <a href="/host">
              <button className="border-2 border-gold-bright text-gold-bright hover:bg-gold-bright hover:text-black font-luxury py-4 px-12 text-lg rounded-full transition-all duration-300 hover:glow-gold">
                Become a Host
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Performance Status */}
      <section className="py-16 bg-card-gradient">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-display mb-8 text-gold-bright">SYSTEM STATUS</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-glass p-6 rounded-xl border border-gold/20 hover:glow-gold transition-all duration-300">
              <div className="text-3xl font-bold text-green-400 mb-2">0.010s</div>
              <div className="text-sm text-gray-400 font-luxury">Response Time</div>
            </div>
            <div className="bg-glass p-6 rounded-xl border border-gold/20 hover:glow-gold transition-all duration-300">
              <div className="text-3xl font-bold text-green-400 mb-2">✓</div>
              <div className="text-sm text-gray-400 font-luxury">Security Headers</div>
            </div>
            <div className="bg-glass p-6 rounded-xl border border-gold/20 hover:glow-gold transition-all duration-300">
              <div className="text-3xl font-bold text-green-400 mb-2">✓</div>
              <div className="text-sm text-gray-400 font-luxury">Cache Optimization</div>
            </div>
            <div className="bg-glass p-6 rounded-xl border border-gold/20 hover:glow-gold transition-all duration-300">
              <div className="text-3xl font-bold text-green-400 mb-2">✓</div>
              <div className="text-sm text-gray-400 font-luxury">Image Compression</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gold/20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img
                src="/au-logo.png"
                alt="Alchemy United"
                className="h-12 mb-4 opacity-80 hover:opacity-100 transition-opacity duration-300 glow-gold"
              />
              <p className="text-gray-400 text-sm">
                Revolutionizing EV charging with premium technology and unmatched reliability.
              </p>
            </div>
            
            <div>
              <h4 className="text-gold-bright font-luxury mb-4">Network</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/early-access" className="hover:text-gold-bright transition-colors">Early Access</a></li>
                <li><a href="/host" className="hover:text-gold-bright transition-colors">Host Program</a></li>
                <li><a href="#features" className="hover:text-gold-bright transition-colors">Features</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gold-bright font-luxury mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/dashboard" className="hover:text-gold-bright transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-gold-bright transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gold-bright transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gold-bright font-luxury mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-gold-bright transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gold-bright transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-gold-bright transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-gray-500 border-t border-gold/20 pt-8">
            <p>© 2025 Alchemy United. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}