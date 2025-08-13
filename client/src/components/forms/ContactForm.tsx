import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitContact, type ContactSubmission } from "@/lib/api";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: (data) => {
      toast({
        title: "Message Sent!",
        description: data.message || "Thanks for reaching out. We'll be in touch shortly.",
      });
      setFormData({ name: '', email: '', message: '' });
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Name, email, and message are required.",
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
      className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 font-display">Get in Touch</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            disabled={mutation.isPending}
            className="w-full"
            required
          />
        </div>
        
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            disabled={mutation.isPending}
            className="w-full"
            required
          />
        </div>
        
        <div>
          <Textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            disabled={mutation.isPending}
            className="w-full min-h-[120px]"
            required
          />
        </div>
        
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-3 transition-all duration-300"
        >
          {mutation.isPending ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </motion.div>
  );
}