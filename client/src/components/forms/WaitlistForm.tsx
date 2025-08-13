import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { submitWaitlist, type WaitlistSubmission } from "@/lib/api";
import { motion } from "framer-motion";

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: submitWaitlist,
    onSuccess: (data) => {
      toast({
        title: "You're on the list!",
        description: data.message || "We'll notify you when early access opens.",
      });
      setEmail('');
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    mutation.mutate({ email });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gold/20"
    >
      <h3 className="text-2xl font-bold text-white mb-4 font-display">Join the Waitlist</h3>
      <p className="text-white/80 mb-6">Be the first to access our premium charging network.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={mutation.isPending}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            required
          />
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="bg-gold hover:bg-gold/90 text-black font-bold px-8 transition-all duration-300"
          >
            {mutation.isPending ? 'Adding...' : 'Join'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}