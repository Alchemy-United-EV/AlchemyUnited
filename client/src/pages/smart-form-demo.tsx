import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { SmartFormDemo } from '@/components/ui/smart-form-demo';

export default function SmartFormDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gold transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Smart Form Experience</h1>
              <p className="text-sm text-gray-600 mt-1">Advanced form intelligence and user experience</p>
            </div>
            <div className="w-20" /> {/* Spacer for center alignment */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SmartFormDemo />
        </motion.div>
      </main>

      {/* Features Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Smart User Experience Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our intelligent form system enhances user experience with real-time assistance, 
              smart suggestions, and comprehensive analytics tracking.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Smart Suggestions",
                description: "Intelligent autocomplete for locations, business types, and common formats",
                icon: "🧠"
              },
              {
                title: "Real-time Validation",
                description: "Instant feedback with helpful error messages and improvement suggestions",
                icon: "✨"
              },
              {
                title: "Progress Tracking",
                description: "Visual progress indicators and step navigation with completion tracking",
                icon: "📊"
              },
              {
                title: "Analytics Integration",
                description: "Comprehensive user behavior tracking and form abandonment analytics",
                icon: "📈"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-center p-6 bg-gray-50 rounded-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}