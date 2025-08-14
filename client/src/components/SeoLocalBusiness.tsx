export default function SeoLocalBusiness() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Alchemy United",
    "logo": "https://alchemy-united.replit.app/assets/webp/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.webp",
    "url": "https://alchemy-united.replit.app",
    "sameAs": [],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Innovation Drive",
      "addressLocality": "Electric City",
      "addressRegion": "CA",
      "postalCode": "90210",
      "addressCountry": "US"
    },
    "openingHours": [
      "Mo-Su 00:00-23:59"
    ],
    "description": "Premium EV charging network for luxury electric vehicles. Guaranteed reservations, 99.9% uptime, and transparent pricing.",
    "priceRange": "$$$$",
    "telephone": "+1-800-ALCHEMY",
    "email": "contact@alchemyunited.com"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}