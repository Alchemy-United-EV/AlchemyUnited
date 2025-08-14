import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle, Building, DollarSign, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StructuredData, hostPageSchema } from "@/components/StructuredData";

const hostApplicationSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  contactFirstName: z.string().min(2, "First name must be at least 2 characters"),
  contactLastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  propertyType: z.string().min(1, "Please select property type"),
  propertyAddress: z.string().min(10, "Please enter complete address"),
  parkingSpaces: z.string().min(1, "Please specify number of parking spaces"),
  electricalCapacity: z.string().min(1, "Please select electrical capacity"),
  expectedTraffic: z.string().min(1, "Please estimate daily traffic"),
  operatingHours: z.string().min(1, "Please specify operating hours"),
  currentAmenities: z.string().optional(),
  partnershipInterest: z.string().min(1, "Please select partnership type"),
  timeline: z.string().min(1, "Please select desired timeline"),
  additionalInfo: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to terms"),
});

type HostApplicationForm = z.infer<typeof hostApplicationSchema>;

export default function HostApplication() {
  // Set SEO meta tags for Host Application page
  React.useEffect(() => {
    document.title = "Become a Host Partner - Alchemy United EV Charging Network";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Partner with Alchemy United to host premium EV charging stations. Earn passive income while providing luxury charging experiences. Full insurance, security, and maintenance included.');
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Become a Host Partner - Alchemy United EV Charging Network');
    }
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<HostApplicationForm>({
    resolver: zodResolver(hostApplicationSchema),
  });

  const onSubmit = async (data: HostApplicationForm) => {
    try {
      const response = await fetch('/api/host-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit application');
      }
      
      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and contact you within 48 hours.",
      });
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
            Application <span className="text-gold">Submitted</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Thank you for your interest in hosting an Alchemy United charging station. Our partnership team will review your application and contact you within 48 hours.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <DollarSign className="w-8 h-8 text-gold mx-auto mb-2" />
              <p className="text-sm font-medium">Revenue Potential</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Shield className="w-8 h-8 text-gold mx-auto mb-2" />
              <p className="text-sm font-medium">Full Insurance</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Zap className="w-8 h-8 text-gold mx-auto mb-2" />
              <p className="text-sm font-medium">Premium Tech</p>
            </div>
          </div>
          
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

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 font-display">
              <span className="text-gold">Host</span> Application
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Join our network of premium charging station hosts
            </p>
            
            {/* Benefits Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                <Building className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Premium Locations</p>
              </div>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                <DollarSign className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Passive Revenue</p>
              </div>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                <Shield className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Full Protection</p>
              </div>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                <Zap className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Latest Tech</p>
              </div>
            </div>
          </div>

          <form 
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 space-y-8 animate-fade-in-up"
          >
            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gold">Business Information</h3>
              
              <div>
                <Label htmlFor="businessName" className="text-white font-medium">Business/Property Name</Label>
                <Input
                  id="businessName"
                  {...register("businessName")}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Enter business or property name"
                />
                {errors.businessName && (
                  <p className="text-red-400 text-sm mt-1">{errors.businessName.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactFirstName" className="text-white font-medium">Contact First Name</Label>
                  <Input
                    id="contactFirstName"
                    {...register("contactFirstName")}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                    placeholder="First name"
                  />
                  {errors.contactFirstName && (
                    <p className="text-red-400 text-sm mt-1">{errors.contactFirstName.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="contactLastName" className="text-white font-medium">Contact Last Name</Label>
                  <Input
                    id="contactLastName"
                    {...register("contactLastName")}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Last name"
                  />
                  {errors.contactLastName && (
                    <p className="text-red-400 text-sm mt-1">{errors.contactLastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                    placeholder="business@example.com"
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
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gold">Property Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="propertyType" className="text-white font-medium">Property Type</Label>
                  <Select onValueChange={(value) => setValue("propertyType", value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="shopping-center">Shopping Center</SelectItem>
                      <SelectItem value="office-building">Office Building</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="gym-fitness">Gym/Fitness Center</SelectItem>
                      <SelectItem value="apartment-complex">Apartment Complex</SelectItem>
                      <SelectItem value="retail-store">Retail Store</SelectItem>
                      <SelectItem value="gas-station">Gas Station</SelectItem>
                      <SelectItem value="hospital-medical">Hospital/Medical</SelectItem>
                      <SelectItem value="entertainment">Entertainment Venue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.propertyType && (
                    <p className="text-red-400 text-sm mt-1">{errors.propertyType.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="parkingSpaces" className="text-white font-medium">Available Parking Spaces</Label>
                  <Select onValueChange={(value) => setValue("parkingSpaces", value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Number of spaces" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 spaces</SelectItem>
                      <SelectItem value="3-5">3-5 spaces</SelectItem>
                      <SelectItem value="6-10">6-10 spaces</SelectItem>
                      <SelectItem value="11-20">11-20 spaces</SelectItem>
                      <SelectItem value="21-50">21-50 spaces</SelectItem>
                      <SelectItem value="50+">50+ spaces</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.parkingSpaces && (
                    <p className="text-red-400 text-sm mt-1">{errors.parkingSpaces.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="propertyAddress" className="text-white font-medium">Property Address</Label>
                <Input
                  id="propertyAddress"
                  {...register("propertyAddress")}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Full address including city, state, ZIP"
                />
                {errors.propertyAddress && (
                  <p className="text-red-400 text-sm mt-1">{errors.propertyAddress.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="electricalCapacity" className="text-white font-medium">Current Electrical Capacity</Label>
                  <Select onValueChange={(value) => setValue("electricalCapacity", value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unsure">Not sure</SelectItem>
                      <SelectItem value="residential">Residential (200A service)</SelectItem>
                      <SelectItem value="commercial-small">Small Commercial (400A)</SelectItem>
                      <SelectItem value="commercial-medium">Medium Commercial (800A)</SelectItem>
                      <SelectItem value="commercial-large">Large Commercial (1200A+)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.electricalCapacity && (
                    <p className="text-red-400 text-sm mt-1">{errors.electricalCapacity.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="expectedTraffic" className="text-white font-medium">Expected Daily Traffic</Label>
                  <Select onValueChange={(value) => setValue("expectedTraffic", value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Daily visitors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (10-50 people)</SelectItem>
                      <SelectItem value="medium">Medium (50-200 people)</SelectItem>
                      <SelectItem value="high">High (200-500 people)</SelectItem>
                      <SelectItem value="very-high">Very High (500+ people)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.expectedTraffic && (
                    <p className="text-red-400 text-sm mt-1">{errors.expectedTraffic.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Partnership Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gold">Partnership Preferences</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="operatingHours" className="text-white font-medium">Operating Hours</Label>
                  <Select onValueChange={(value) => setValue("operatingHours", value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24-7">24/7</SelectItem>
                      <SelectItem value="business-hours">Business Hours Only</SelectItem>
                      <SelectItem value="extended">Extended Hours (6 AM - 11 PM)</SelectItem>
                      <SelectItem value="custom">Custom Schedule</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.operatingHours && (
                    <p className="text-red-400 text-sm mt-1">{errors.operatingHours.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="partnershipInterest" className="text-white font-medium">Partnership Type Interest</Label>
                  <Select onValueChange={(value) => setValue("partnershipInterest", value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select partnership" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue-share">Revenue Share</SelectItem>
                      <SelectItem value="lease-agreement">Lease Agreement</SelectItem>
                      <SelectItem value="co-branding">Co-branding Opportunity</SelectItem>
                      <SelectItem value="exclusive-partnership">Exclusive Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.partnershipInterest && (
                    <p className="text-red-400 text-sm mt-1">{errors.partnershipInterest.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="timeline" className="text-white font-medium">Preferred Timeline</Label>
                <Select onValueChange={(value) => setValue("timeline", value)}>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white">
                    <SelectValue placeholder="When would you like to launch?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP</SelectItem>
                    <SelectItem value="1-3-months">1-3 months</SelectItem>
                    <SelectItem value="3-6-months">3-6 months</SelectItem>
                    <SelectItem value="6-12-months">6-12 months</SelectItem>
                    <SelectItem value="12-months">12+ months</SelectItem>
                  </SelectContent>
                </Select>
                {errors.timeline && (
                  <p className="text-red-400 text-sm mt-1">{errors.timeline.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="currentAmenities" className="text-white font-medium">Current Amenities (Optional)</Label>
                <Textarea
                  id="currentAmenities"
                  {...register("currentAmenities")}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 min-h-[80px]"
                  placeholder="WiFi, restrooms, food service, valet, etc."
                />
              </div>

              <div>
                <Label htmlFor="additionalInfo" className="text-white font-medium">Additional Information (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  {...register("additionalInfo")}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 min-h-[100px]"
                  placeholder="Tell us more about your property, goals, or any specific questions..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                onCheckedChange={(checked) => setValue("agreeToTerms", !!checked)}
                className="border-white/30 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
              />
              <Label htmlFor="agreeToTerms" className="text-white text-sm">
                I agree to the partnership terms and conditions, privacy policy, and authorize Alchemy United to contact me regarding this application.
              </Label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-400 text-sm">{errors.agreeToTerms.message}</p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 font-display"
            >
              {isSubmitting ? "Submitting Application..." : "Submit Host Application"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}