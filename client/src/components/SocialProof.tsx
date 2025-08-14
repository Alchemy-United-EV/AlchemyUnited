import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  role: string;
  testimonial: string;
  rating: number;
}

function TestimonialCard({ name, location, role, testimonial, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">{rating} out of 5 stars</span>
      </div>
      
      <blockquote className="text-gray-700 text-sm leading-relaxed mb-4">
        "{testimonial}"
      </blockquote>
      
      <footer className="border-t border-gray-100 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <cite className="text-black font-semibold text-sm not-italic">{name}</cite>
            <p className="text-gray-500 text-xs">{role} • {location}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LogoBar() {
  const partnerLogos = [
    { name: 'Mercedes-Benz', text: 'MB' },
    { name: 'Tesla Network', text: 'Tesla' },
    { name: 'BMW Charging', text: 'BMW' },
    { name: 'Audi e-tron', text: 'Audi' },
    { name: 'Lucid Motors', text: 'Lucid' },
    { name: 'Rivian', text: 'Rivian' }
  ];

  return (
    <div className="mt-16">
      <p className="text-center text-gray-500 text-sm mb-8 font-medium">
        Trusted by premium EV manufacturers
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {partnerLogos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-20 h-12 bg-gray-100 rounded-lg border border-gray-200 hover:border-yellow-400 transition-colors duration-300"
            title={logo.name}
          >
            <span className="text-gray-600 font-semibold text-xs">
              {logo.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SocialProofProps {
  showLogos?: boolean;
}

export default function SocialProof({ showLogos = true }: SocialProofProps) {
  const testimonials: TestimonialCardProps[] = [
    {
      name: 'Sarah Chen',
      location: 'San Francisco, CA',
      role: 'Model S Owner',
      testimonial: 'Finally, a charging network that actually works. I can reserve my spot, know it will be available, and the stations never fail me. Worth every penny.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      location: 'Austin, TX',
      role: 'Host Partner',
      testimonial: 'Alchemy handles everything - insurance, maintenance, security. I just collect passive income from my property. No headaches, just profit.',
      rating: 5
    },
    {
      name: 'Jennifer Walsh',
      location: 'Seattle, WA',
      role: 'Lucid Air Driver',
      testimonial: 'The transparent pricing and guaranteed uptime changed everything. No more charging anxiety or surprise fees. This is how EV charging should be.',
      rating: 5
    },
    {
      name: 'David Kim',
      location: 'Los Angeles, CA',
      role: 'BMW iX Owner',
      testimonial: 'Premium experience from start to finish. Clean stations, fast charging, and customer service that actually cares. Finally found my charging home.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50" aria-labelledby="social-proof-heading">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-16">
          <h2 id="social-proof-heading" className="text-4xl sm:text-5xl font-black mb-6 text-black leading-tight">
            Trusted by EV drivers and hosts{' '}
            <span className="text-yellow-400">nationwide</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Join thousands of satisfied customers who've discovered the future of premium EV charging.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              location={testimonial.location}
              role={testimonial.role}
              testimonial={testimonial.testimonial}
              rating={testimonial.rating}
            />
          ))}
        </div>

        {showLogos && <LogoBar />}
      </div>
    </section>
  );
}