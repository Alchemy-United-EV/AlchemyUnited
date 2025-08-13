import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitPartner, type PartnerSubmission } from "@/lib/api";
import { motion } from "framer-motion";

export default function PartnerForm() {
  const [formData, setFormData] = useState<PartnerSubmission>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: submitPartner,
    onSuccess: (data) => {
      toast({
        title: "Partnership inquiry sent!",
        description: data.message || "Thanks for your interest. Our team will contact you soon.",
      });
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Required fields missing",
        description: "Name and email are required.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gold/5 to-gold/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gold/20"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 font-display">Partner With Us</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            disabled={mutation.isPending}
            className="w-full"
            required
          />
          
          <Input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
            disabled={mutation.isPending}
            className="w-full"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            disabled={mutation.isPending}
            className="w-full"
          />
          
          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            disabled={mutation.isPending}
            className="w-full"
          />
        </div>
        
        <Textarea
          name="message"
          placeholder="Tell us about your partnership interest..."
          value={formData.message}
          onChange={handleChange}
          disabled={mutation.isPending}
          className="w-full min-h-[100px]"
        />
        
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-3 transition-all duration-300"
        >
          {mutation.isPending ? 'Sending...' : 'Submit Partnership Inquiry'}
        </Button>
      </form>
    </motion.div>
  );
}