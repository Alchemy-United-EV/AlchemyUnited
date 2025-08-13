import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormError } from "@/components/ui/form-field";
import { useToast } from "@/hooks/use-toast";
import { submitContact } from "@/lib/api";
import { contactFormSchema, type ContactFormData } from "@/lib/validationSchemas";
import { trackFormSubmission } from "@/lib/analytics";
import { useFormAbandonment } from "@/hooks/use-form-abandonment";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    },
    mode: "onChange" // Enable real-time validation
  });

  const { register, handleSubmit, formState: { errors, isValid, isDirty, isSubmitSuccessful }, reset, watch } = form;
  
  // Track form abandonment
  useFormAbandonment('contact', { isSubmitSuccessful });

  // Watch form values for character counting
  const messageValue = watch("message");

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: (data) => {
      trackFormSubmission('contact', true);
      toast({
        title: "Message Sent!",
        description: data.message || "Thanks for reaching out. We'll be in touch shortly.",
      });
      reset();
    },
    onError: (error: Error) => {
      trackFormSubmission('contact', false);
      console.error('Contact form submission error:', error);
      
      // Handle rate limiting
      if (error.message.includes('Too many')) {
        toast({
          title: "Rate limit exceeded",
          description: "Please wait before submitting another message.",
          variant: "destructive",
        });
        return;
      }
      
      // Handle validation errors
      if (error.message.includes('Validation failed')) {
        toast({
          title: "Please check your input",
          description: "Some fields contain invalid information.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again or contact support if the problem persists.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  const isSubmitDisabled = !isValid || !isDirty || mutation.isPending;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 font-display">Get in Touch</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField error={errors.name?.message}>
          <Input
            type="text"
            placeholder="Your Name *"
            {...register("name")}
            disabled={mutation.isPending}
            className={`w-full ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
          />
        </FormField>
        
        <FormField error={errors.email?.message}>
          <Input
            type="email"
            placeholder="Your Email *"
            {...register("email")}
            disabled={mutation.isPending}
            className={`w-full ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
          />
        </FormField>
        
        <FormField error={errors.phone?.message}>
          <Input
            type="tel"
            placeholder="Your Phone (optional)"
            {...register("phone")}
            disabled={mutation.isPending}
            className={`w-full ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
          />
        </FormField>
        
        <FormField error={errors.message?.message}>
          <Textarea
            placeholder="Your Message *"
            {...register("message")}
            disabled={mutation.isPending}
            className={`w-full min-h-[120px] ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {messageValue?.length || 0}/2000 characters
          </div>
        </FormField>
        
        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>
    </motion.div>
  );
}