import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface FormFieldProps {
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ error, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  
  return (
    <div className="flex items-center gap-2 text-sm text-red-600 mt-2">
      <AlertCircle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}