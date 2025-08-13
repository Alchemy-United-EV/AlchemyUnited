import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { useToast } from "@/hooks/use-toast";
import { submitPartner } from "@/lib/api";
import { partnerFormSchema, type PartnerFormData } from "@/lib/validationSchemas";
import { trackFormSubmission } from "@/lib/analytics";
import { useFormAbandonment } from "@/hooks/use-form-abandonment";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function PartnerForm() {
  const { toast } = useToast();
  
  const form = useForm<PartnerFormData>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: ''
    },
    mode: "onChange"
  });

  const { register, handleSubmit, formState: { errors, isValid, isDirty, isSubmitSuccessful }, reset, watch } = form;
  
  // Track form abandonment
  useFormAbandonment('partner', { isSubmitSuccessful });

  const messageValue = watch("message");

  const mutation = useMutation({
    mutationFn: submitPartner,
    onSuccess: (data) => {
      trackFormSubmission('partner', true);
      toast({
        title: "Partnership inquiry sent!",
        description: data.message || "Thanks for your interest. Our team will contact you soon.",
      });
      reset();
    },
    onError: (error: Error) => {
      trackFormSubmission('partner', false);
      console.error('Partner form submission error:', error);
      
      if (error.message.includes('Too many')) {
        toast({
          title: "Rate limit exceeded",
          description: "Please wait before submitting another inquiry.",
          variant: "destructive",
        });
        return;
      }
      
      if (error.message.includes('Validation failed')) {
        toast({
          title: "Please check your input",
          description: "Some fields contain invalid information.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Failed to send inquiry",
        description: error.message || "Please try again or contact support if the problem persists.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PartnerFormData) => {
    mutation.mutate(data);
  };

  const isSubmitDisabled = !isValid || !isDirty || mutation.isPending;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gold/5 to-gold/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gold/20"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 font-display">Partner With Us</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField error={errors.company?.message}>
            <Input
              type="text"
              placeholder="Company Name"
              {...register("company")}
              disabled={mutation.isPending}
              className={`w-full ${errors.company ? 'border-red-500 focus:border-red-500' : ''}`}
            />
          </FormField>
          
          <FormField error={errors.phone?.message}>
            <Input
              type="tel"
              placeholder="Phone Number"
              {...register("phone")}
              disabled={mutation.isPending}
              className={`w-full ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
            />
          </FormField>
        </div>
        
        <FormField error={errors.message?.message}>
          <Textarea
            placeholder="Tell us about your partnership interest..."
            {...register("message")}
            disabled={mutation.isPending}
            className={`w-full min-h-[100px] ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          {messageValue && (
            <div className="text-right text-sm text-gray-500 mt-1">
              {messageValue.length}/2000 characters
            </div>
          )}
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
            'Submit Partnership Inquiry'
          )}
        </Button>
      </form>
    </motion.div>
  );
}