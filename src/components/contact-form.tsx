// src/components/contact-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitContactForm } from "@/actions/cms";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// Form validation schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Provide a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  message: z.string().min(10, { message: "Message details must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await submitContactForm(data);
      if (response.error) {
        setSubmitError(response.error);
      } else {
        setSubmitSuccess(true);
        reset();
      }
    } catch (err: any) {
      setSubmitError("Failed to submit. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-card shadow-lg border border-slate-100 relative">
      {submitSuccess && (
        <div className="mb-6 p-5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-start gap-3 animate-fade-up">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold">Inquiry Submitted Successfully!</p>
            <p className="text-xs text-emerald-600 mt-1 leading-normal">
              Thank you for reaching out to DPACA. A social worker or trustee will evaluate your inquiry and respond shortly.
            </p>
          </div>
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-start gap-3 animate-fade-up">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold">Submission Failed</p>
            <p className="text-xs text-rose-600 mt-1">{submitError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Name input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs font-bold text-primary-blue uppercase tracking-wider">
            Full Name / Corporate contact
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Rajesh Kumar"
            {...register("name")}
            className="w-full bg-soft rounded-xl border border-slate-200/80 px-4 py-3 text-sm focus:outline-none focus:border-accent-blue focus:bg-white transition-all text-primary-blue"
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="text-xs text-rose-600 font-semibold">{errors.name.message}</span>
          )}
        </div>

        {/* Email input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-bold text-primary-blue uppercase tracking-wider">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="e.g. rajesh@company.com"
            {...register("email")}
            className="w-full bg-soft rounded-xl border border-slate-200/80 px-4 py-3 text-sm focus:outline-none focus:border-accent-blue focus:bg-white transition-all text-primary-blue"
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="text-xs text-rose-600 font-semibold">{errors.email.message}</span>
          )}
        </div>

        {/* Phone input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-xs font-bold text-primary-blue uppercase tracking-wider">
            Contact Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="e.g. +91 98765 43210"
            {...register("phone")}
            className="w-full bg-soft rounded-xl border border-slate-200/80 px-4 py-3 text-sm focus:outline-none focus:border-accent-blue focus:bg-white transition-all text-primary-blue"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <span className="text-xs text-rose-600 font-semibold">{errors.phone.message}</span>
          )}
        </div>

        {/* Message input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-xs font-bold text-primary-blue uppercase tracking-wider">
            Message details
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Describe your inquiry, donation intention, or partnership project..."
            {...register("message")}
            className="w-full bg-soft rounded-xl border border-slate-200/80 px-4 py-3 text-sm focus:outline-none focus:border-accent-blue focus:bg-white transition-all text-primary-blue resize-none"
            disabled={isSubmitting}
          />
          {errors.message && (
            <span className="text-xs text-rose-600 font-semibold">{errors.message.message}</span>
          )}
        </div>

        {/* Submit action button */}
        <button
          type="submit"
          className="bg-accent-blue hover:bg-blue-700 disabled:bg-slate-300 text-white font-heading font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl shadow-md hover:-translate-y-[1px] active:translate-y-[0px] disabled:translate-y-0 disabled:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Inquiry
            </>
          )}
        </button>
      </form>
    </div>
  );
}
