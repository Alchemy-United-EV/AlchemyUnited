import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/ui/form-field";
import { useToast } from "@/hooks/use-toast";
import { submitWaitlist } from "@/lib/api";
import { waitlistFormSchema, type WaitlistFormData } from "@/lib/validationSchemas";
import { trackFormSubmission } from "@/lib/analytics";
import { useFormAbandonment } from "@/hooks/use-form-abandonment";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function WaitlistForm() {
  const { toast } = useToast();
  
  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      email: ''
    },
    mode: "onChange"
  });

  const { register, handleSubmit, formState: { errors, isValid, isDirty, isSubmitSuccessful }, reset } = form;
  
  // Track form abandonment
  useFormAbandonment('waitlist', { isSubmitSuccessful });

  const mutation = useMutation({
    mutationFn: submitWaitlist,
    onSuccess: (data) => {
      trackFormSubmission('waitlist', true);
      toast({
        title: "You're on the list!",
        description: data.message || "We'll notify you when early access opens.",
      });
      reset();
    },
    onError: (error: Error) => {
      trackFormSubmission('waitlist', false);
      console.error('Waitlist form submission error:', error);
      
      if (error.message.includes('Too many')) {
        toast({
          title: "Rate limit exceeded",
          description: "Please wait before submitting again.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Failed to join waitlist",
        description: error.message || "Please try again or contact support if the problem persists.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: WaitlistFormData) => {
    mutation.mutate(data);
  };

  const isSubmitDisabled = !isValid || !isDirty || mutation.isPending;

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
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              disabled={mutation.isPending}
              className={`flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 ${
                errors.email ? 'border-red-500 focus:border-red-500' : ''
              }`}
            />
            <Button
              type="submit"
              disabled={isSubmitDisabled}
              className="bg-gold hover:bg-gold/90 text-black font-bold px-8 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Join'
              )}
            </Button>
          </div>
          {errors.email && (
            <FormError message={errors.email.message} />
          )}
        </div>
      </form>
    </motion.div>
  );
}