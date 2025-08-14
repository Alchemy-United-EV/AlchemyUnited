import { useEffect } from 'react';

interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove the script when component unmounts
      document.head.removeChild(script);
    };
  }, [data]);

  return null; // This component doesn't render anything visible
}

// Pre-defined schema data for different pages
export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Alchemy Network",
  "url": "https://alchemy-united.replit.app",
  "logo": "/assets/webp/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.webp",
  "description": "Premium EV charging network delivering fast, reliable charging with guaranteed availability for drivers and profitable hosting for partners.",
  "foundingDate": "2024",
  "sameAs": [],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Innovation Drive",
    "addressLocality": "Electric City", 
    "addressRegion": "CA",
    "postalCode": "90210",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-ALCHEMY",
    "email": "contact@alchemyunited.com",
    "contactType": "customer service",
    "availableLanguage": "en"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "EV Charging Services",
    "itemListElement": [
      {
        "@type": "Service",
        "@id": "#premium-ev-charging",
        "name": "Premium EV Charging Service",
        "description": "High-speed DC fast charging with guaranteed availability, 99.9% uptime SLA, and premium amenities for luxury electric vehicles.",
        "category": "EV Charging Network",
        "provider": {
          "@type": "Organization",
          "name": "Alchemy Network"
        },
        "serviceType": "Electric Vehicle Charging",
        "areaServed": {
          "@type": "Country",
          "name": "United States"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Charging Plans",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "Early Access Membership",
              "description": "Exclusive access to premium charging locations with guaranteed availability",
              "category": "Membership"
            }
          ]
        }
      },
      {
        "@type": "Service", 
        "@id": "#host-partnership",
        "name": "EV Charging Host Partnership",
        "description": "Profitable hosting opportunity for property owners to generate passive income through premium EV charging stations.",
        "category": "Business Partnership",
        "provider": {
          "@type": "Organization",
          "name": "Alchemy Network"
        },
        "serviceType": "Business Partnership",
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": "Property Owners"
        }
      }
    ]
  }
};

export const earlyAccessPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Request Early Access - Alchemy Network",
  "description": "Get early access to Alchemy Network's exclusive luxury EV charging network. Be among the first to experience premium fast charging.",
  "url": "https://alchemy-united.replit.app/early-access",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Alchemy Network",
    "url": "https://alchemy-united.replit.app"
  },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "/assets/webp/hero-ev-charger.webp"
  },
  "mainEntity": {
    "@type": "Service",
    "name": "Early Access Application",
    "description": "Application process for early access to premium EV charging network",
    "provider": {
      "@type": "Organization",
      "name": "Alchemy Network"
    }
  }
};

export const hostPageSchema = {
  "@context": "https://schema.org", 
  "@type": "WebPage",
  "name": "Become a Host Partner - Alchemy Network",
  "description": "Partner with Alchemy Network to host premium EV charging stations. Earn passive income while providing luxury charging experiences.",
  "url": "https://alchemy-united.replit.app/host",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Alchemy Network",
    "url": "https://alchemy-united.replit.app"
  },
  "primaryImageOfPage": {
    "@type": "ImageObject", 
    "url": "/assets/webp/section5.webp"
  },
  "mainEntity": {
    "@type": "Service",
    "name": "Host Partnership Program",
    "description": "Business partnership program for property owners to host EV charging stations",
    "provider": {
      "@type": "Organization",
      "name": "Alchemy Network"
    },
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Property Owners"
    }
  }
};

export default StructuredData;