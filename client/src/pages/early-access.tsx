import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StructuredData, earlyAccessPageSchema } from "@/components/StructuredData";
import { getAttributionData } from "@/components/UTMCapture";
import { useLocation } from "wouter";

const earlyAccessSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  vehicleType: z.string().min(1, "Please select your vehicle type"),
  chargingFrequency: z.string().min(1, "Please select charging frequency"),
  location: z.string().min(5, "Please enter your city and state"),
  referralCode: z.string().optional(),
  interests: z.string().optional(),
});

type EarlyAccessForm = z.infer<typeof earlyAccessSchema>;

export default function EarlyAccess() {
  const [, navigate] = useLocation();

  // Set SEO meta tags and structured data for Early Access page
  React.useEffect(() => {
    document.title = "Request Early Access | Alchemy Premium EV Charging Network";
    document.documentElement.setAttribute('lang', 'en');
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get early access to Alchemy\'s premium EV charging network. Experience guaranteed fast charging with 99.9% uptime and exclusive member benefits.');
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Request Early Access | Alchemy Premium EV Charging Network');
    }

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://alchemy-united.replit.app/early-access');
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://alchemy-united.replit.app/early-access';
      document.head.appendChild(link);
    }

    // Add robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'index, follow';
      document.head.appendChild(meta);
    }
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EarlyAccessForm>({
    resolver: zodResolver(earlyAccessSchema),
  });

  const onSubmit = async (data: EarlyAccessForm) => {
    try {
      // Add UTM and attribution data
      const attributionData = getAttributionData();
      const submissionData = {
        ...data,
        ...attributionData,
        submitted_at: new Date().toISOString(),
        page_source: window.location.pathname + window.location.search,
      };

      const response = await fetch('/api/early-access-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit application');
      }
      
      // Navigate to thank you page with type parameter
      navigate('/thank-you?type=early-access');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center text-white animate-fade-in-up">
          <div className="mb-8">
            <img 
              src="/assets/au-logo.png" 
              alt="Alchemy United Logo"
              className="h-16 w-auto mx-auto mb-6 filter brightness-125"
            />
            <CheckCircle className="w-20 h-20 text-gold mx-auto mb-6" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black mb-6 font-display">
            Welcome to the <span className="text-gold">Future</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Your early access application has been submitted successfully. We'll review your information and send you login credentials to access the exclusive Alchemy United platform.
          </p>
          
          <p className="text-lg text-gold font-semibold mb-8">
            Expect to hear from us within 7-14 business days.
          </p>
          
          <Link href="/">
            <Button 
              size="lg"
              className="bg-gold hover:bg-gold/90 text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 font-display"
            >
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <StructuredData data={earlyAccessPageSchema} />
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-gold text-black px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>
      <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-white hover:text-gold">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <img 
          src="/assets/au-logo.png" 
          alt="Alchemy United Logo"
          className="h-8 w-auto filter brightness-125"
        />
        <div></div>
      </nav>

      <main id="main-content" className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto animate-fade-in-up">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 font-display">
              Request <span className="text-gold">Early Access</span>
            </h1>
            <p className="text-xl text-white/80">
              Join the exclusive waitlist for premium EV charging
            </p>
          </div>

          <form 
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 space-y-6 animate-fade-in-up"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-white font-medium">First Name</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="lastName" className="text-white font-medium">Last Name</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="text-white font-medium">Phone Number</Label>
              <Input
                id="phone"
                {...register("phone")}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="location" className="text-white font-medium">Location</Label>
              <Input
                id="location"
                {...register("location")}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                placeholder="City, State"
              />
              {errors.location && (
                <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="vehicle-type-select" className="text-white font-medium">Current EV</Label>
                <Select onValueChange={(value) => setValue("vehicleType", value)}>
                  <SelectTrigger 
                    id="vehicle-type-select"
                    className="bg-white/10 border-white/30 text-white"
                    aria-label="Select your vehicle type"
                  >
                    <SelectValue placeholder="Select your vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tesla-model-s">Tesla Model S</SelectItem>
                    <SelectItem value="tesla-model-3">Tesla Model 3</SelectItem>
                    <SelectItem value="tesla-model-x">Tesla Model X</SelectItem>
                    <SelectItem value="tesla-model-y">Tesla Model Y</SelectItem>
                    <SelectItem value="bmw-i4">BMW i4</SelectItem>
                    <SelectItem value="bmw-ix">BMW iX</SelectItem>
                    <SelectItem value="audi-e-tron">Audi e-tron</SelectItem>
                    <SelectItem value="audi-e-tron-gt">Audi e-tron GT</SelectItem>
                    <SelectItem value="mercedes-eqc">Mercedes EQC</SelectItem>
                    <SelectItem value="mercedes-eqs">Mercedes EQS</SelectItem>
                    <SelectItem value="lucid-air">Lucid Air</SelectItem>
                    <SelectItem value="rivian-r1t">Rivian R1T</SelectItem>
                    <SelectItem value="rivian-r1s">Rivian R1S</SelectItem>
                    <SelectItem value="ford-mustang-mach-e">Ford Mustang Mach-E</SelectItem>
                    <SelectItem value="porsche-taycan">Porsche Taycan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.vehicleType && (
                  <p className="text-red-400 text-sm mt-1">{errors.vehicleType.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="charging-frequency-select" className="text-white font-medium">Charging Frequency</Label>
                <Select onValueChange={(value) => setValue("chargingFrequency", value)}>
                  <SelectTrigger 
                    id="charging-frequency-select"
                    className="bg-white/10 border-white/30 text-white"
                    aria-label="How often do you charge your vehicle"
                  >
                    <SelectValue placeholder="How often do you charge?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="few-times-week">A few times a week</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="few-times-month">A few times a month</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                {errors.chargingFrequency && (
                  <p className="text-red-400 text-sm mt-1">{errors.chargingFrequency.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="referralCode" className="text-white font-medium">Referral Code (Optional)</Label>
              <Input
                id="referralCode"
                {...register("referralCode")}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                placeholder="Enter referral code if you have one"
              />
            </div>

            <div>
              <Label htmlFor="interests" className="text-white font-medium">What interests you most about Alchemy? (Optional)</Label>
              <Textarea
                id="interests"
                {...register("interests")}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 min-h-[100px]"
                placeholder="Tell us what excites you about premium EV charging..."
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 font-display"
              data-cta="early-access-submit"
              data-cta-section="form"
              data-cta-variant="primary"
              aria-label="Submit Early Access Application"
            >
              {isSubmitting ? "Submitting..." : "Request Early Access"}
            </Button>
          </form>
        </div>
      </main>
    </div>
    </>
  );
}