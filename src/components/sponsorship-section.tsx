// src/components/sponsorship-section.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Copy,
  CheckCheck,
  BadgeIndianRupee,
  Landmark,
  QrCode,
  Heart,
  Loader2,
} from "lucide-react";
import { submitContactForm } from "@/actions/cms";

// Validation schema
const intimationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Provide a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  utr: z.string().min(6, { message: "Provide a valid Transaction Ref / UTR number." }),
  pan: z.string().optional(),
  amount: z.string().min(1, { message: "Amount is required." }),
  remarks: z.string().optional(),
});

type IntimationFormValues = z.infer<typeof intimationSchema>;

interface DonationTier {
  label: string;
  amount: string;
  period: string;
  desc: string;
}

interface SponsorshipSectionProps {
  donationTiers: DonationTier[];
}

export default function SponsorshipSection({ donationTiers }: SponsorshipSectionProps) {
  const [selectedTier, setSelectedTier] = useState<DonationTier | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IntimationFormValues>({
    resolver: zodResolver(intimationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      utr: "",
      pan: "",
      amount: "",
      remarks: "",
    },
  });

  const handleOpenModal = (tier: DonationTier) => {
    setSelectedTier(tier);
    setSuccess(false);
    setError(null);
    // Parse numeric value from amount (e.g. ₹2,500 -> 2500)
    const numericAmount = tier.amount.replace(/[^0-9]/g, "");
    reset({
      name: "",
      email: "",
      phone: "",
      utr: "",
      pan: "",
      amount: numericAmount,
      remarks: "",
    });
  };

  const handleCloseModal = () => {
    setSelectedTier(null);
  };

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const onSubmit = async (data: IntimationFormValues) => {
    if (!selectedTier) return;
    setIsSubmitting(true);
    setError(null);

    const formattedMessage = `[SPONSORSHIP INTIMATION]
Sponsorship Category: ${selectedTier.label}
Amount (₹): ${data.amount}
Transaction Reference / UTR: ${data.utr}
PAN Card (for 80G): ${data.pan || "Not provided"}

Remarks/Message:
${data.remarks || "No additional comments."}`;

    try {
      const response = await submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: formattedMessage,
      });

      if (response.error) {
        setError(response.error);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("Failed to submit inquiry. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 4-card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {donationTiers.map((tier) => (
          <div
            key={tier.label}
            onClick={() => handleOpenModal(tier)}
            className="bg-white rounded-card border border-slate-200/80 p-6 flex flex-col gap-4 hover:shadow-md hover:border-accent-blue/40 cursor-pointer transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent-blue font-heading font-bold">
                {tier.label}
              </span>
              <BadgeIndianRupee className="w-4 h-4 text-accent-blue/50 group-hover:text-accent-blue transition-colors" />
            </div>
            <div className="flex items-baseline gap-1.5 font-bold">
              <span className="font-heading text-2xl text-primary-blue">
                {tier.amount}
              </span>
              <span className="text-xs text-slate-400 font-medium font-sans">{tier.period}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed flex-grow font-medium">{tier.desc}</p>
            
            <div className="mt-2 w-full bg-slate-50 group-hover:bg-blue-50 text-slate-600 group-hover:text-accent-blue font-heading font-bold text-[10px] uppercase tracking-wider py-2.5 rounded-xl border border-slate-100/50 group-hover:border-blue-100 text-center transition-all">
              Sponsor Category
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {selectedTier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row z-10 border border-slate-200/50"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors z-20 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {success ? (
                /* Success Screen */
                <div className="w-full p-8 md:p-12 flex flex-col items-center justify-center text-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-primary-blue">
                      Sponsorship Intimation Submitted!
                    </h3>
                    <p className="text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you for your generous support of <strong>{selectedTier.label}</strong>. We will verify the transaction reference details and issue your <strong>80G tax exemption certificate</strong> to your registered email within 7 working days.
                    </p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="bg-accent-blue hover:bg-blue-700 text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  {/* Left Side: Payment Info */}
                  <div className="w-full md:w-1/2 p-6 md:p-8 bg-slate-50 border-r border-slate-100 flex flex-col gap-6 overflow-y-auto max-h-[45vh] md:max-h-[90vh]">
                    <div>
                      <span className="text-[9px] uppercase font-extrabold tracking-widest text-accent-blue font-heading bg-accent-blue/10 px-3 py-1 rounded-full">
                        Step 1: Direct Payment
                      </span>
                      <h3 className="font-heading font-extrabold text-xl text-primary-blue mt-3">
                        Sponsor {selectedTier.label}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Please initiate a bank transfer or UPI transfer of{" "}
                        <strong className="text-slate-800">{selectedTier.amount}</strong> using the details below.
                      </p>
                    </div>

                    {/* Bank transfer cards */}
                    <div className="flex flex-col gap-4">
                      {/* UPI Info */}
                      <div className="bg-white rounded-2xl border border-slate-200/60 p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-slate-400">UPI Payments</span>
                          <span className="flex gap-1.5">
                            <span className="text-[8px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">GPay</span>
                            <span className="text-[8px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">PhonePe</span>
                          </span>
                        </div>
                        {/* QR Code container */}
                        <div className="flex flex-col items-center gap-2 mt-1">
                          <div className="relative w-36 h-36 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                            <Image
                              src="/images/NGO%20QR%20CODE.png"
                              alt="DPACA UPI QR Code"
                              fill
                              sizes="144px"
                              className="object-contain p-1.5"
                            />
                          </div>
                          <span className="text-[9px] text-slate-400 font-semibold text-center">
                            Scan to pay via GPay / PhonePe / Paytm
                          </span>
                        </div>
                      </div>

                      {/* Bank Details */}
                      <div className="bg-white rounded-2xl border border-slate-200/60 p-4 flex flex-col gap-3.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-primary-blue uppercase tracking-wider">
                          <Landmark className="w-3.5 h-3.5 text-accent-blue" />
                          Bank Account
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3 text-xs">
                          {[
                            ["Account Name", "Dist. Probation & After Care Association"],
                            ["Account No.", "005002100006192", true],
                            ["IFSC Code", "AMDN0000105", true],
                            ["Bank Name", "AHMEDNAGAR MERCHANT CO-OP BANK"],
                          ].map(([label, val, copyable]) => (
                            <div key={label as string} className="flex flex-col gap-0.5 border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                              <span className="text-[8px] uppercase tracking-widest font-semibold text-slate-400">{label}</span>
                              <div className="flex items-center justify-between min-w-0">
                                <span className={`font-semibold truncate text-slate-700 ${copyable ? "font-mono font-bold text-primary-blue" : ""}`}>
                                  {val}
                                </span>
                                {copyable && (
                                  <button
                                    type="button"
                                    onClick={() => copyToClipboard(val as string, label as string)}
                                    className="text-slate-400 hover:text-accent-blue p-1 rounded transition-colors shrink-0 cursor-pointer"
                                  >
                                    {copiedField === label ? (
                                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Intimation Form */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full md:w-1/2 p-6 md:p-8 flex flex-col gap-4 overflow-y-auto max-h-[45vh] md:max-h-[90vh]"
                  >
                    <div>
                      <span className="text-[9px] uppercase font-extrabold tracking-widest text-accent-blue font-heading bg-accent-blue/10 px-3 py-1 rounded-full font-bold">
                        Step 2: Send Transaction Details
                      </span>
                      <h4 className="font-heading font-extrabold text-sm text-primary-blue mt-3 font-bold">
                        Donation Intimation Form
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                        Please provide transaction details so we can track and issue your 80G receipt.
                      </p>
                    </div>

                    {error && (
                      <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-xl font-medium">
                        {error}
                      </div>
                    )}

                    <div className="flex flex-col gap-3.5">
                      {/* Name */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold text-primary-blue uppercase tracking-wide">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Rajesh Kumar"
                          {...register("name")}
                          className="w-full bg-slate-50 focus:bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-accent-blue transition-all"
                        />
                        {errors.name && (
                          <span className="text-[10px] text-rose-600 font-semibold">{errors.name.message}</span>
                        )}
                      </div>

                      {/* Email & Phone grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-primary-blue uppercase tracking-wide">
                            Email
                          </label>
                          <input
                            type="email"
                            placeholder="rajesh@example.com"
                            {...register("email")}
                            className="w-full bg-slate-50 focus:bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-accent-blue transition-all"
                          />
                          {errors.email && (
                            <span className="text-[10px] text-rose-600 font-semibold">{errors.email.message}</span>
                          )}
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-primary-blue uppercase tracking-wide">
                            Phone
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 9876543210"
                            {...register("phone")}
                            className="w-full bg-slate-50 focus:bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-accent-blue transition-all"
                          />
                          {errors.phone && (
                            <span className="text-[10px] text-rose-600 font-semibold">{errors.phone.message}</span>
                          )}
                        </div>
                      </div>

                      {/* Amount & PAN grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-primary-blue uppercase tracking-wide">
                            Amount (₹)
                          </label>
                          <input
                            type="number"
                            placeholder="Amount in INR"
                            {...register("amount")}
                            className="w-full bg-slate-50 focus:bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-accent-blue transition-all font-mono font-semibold"
                          />
                          {errors.amount && (
                            <span className="text-[10px] text-rose-600 font-semibold">{errors.amount.message}</span>
                          )}
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-primary-blue uppercase tracking-wide">
                            PAN Number <span className="text-slate-400 font-normal">(Optional for 80G)</span>
                          </label>
                          <input
                            type="text"
                            placeholder="ABCDE1234F"
                            {...register("pan")}
                            className="w-full bg-slate-50 focus:bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-accent-blue transition-all font-mono uppercase"
                          />
                        </div>
                      </div>

                      {/* Transaction Reference / UTR */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold text-primary-blue uppercase tracking-wide">
                          Transaction Ref ID / UTR Number
                        </label>
                        <input
                          type="text"
                          placeholder="UTR / Txn ID from bank app"
                          {...register("utr")}
                          className="w-full bg-slate-50 focus:bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-accent-blue transition-all font-mono"
                        />
                        {errors.utr && (
                          <span className="text-[10px] text-rose-600 font-semibold">{errors.utr.message}</span>
                        )}
                      </div>

                      {/* Remarks */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold text-primary-blue uppercase tracking-wide">
                          Remarks <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Any specific note..."
                          {...register("remarks")}
                          className="w-full bg-slate-50 focus:bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-accent-blue transition-all resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 w-full bg-accent-blue hover:bg-blue-700 disabled:bg-blue-400 text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Submitting Intimation...
                        </>
                      ) : (
                        "Submit Intimation"
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
