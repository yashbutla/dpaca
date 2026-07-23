// src/app/get-involved/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PublicNav from "@/components/public-nav";
import PublicFooter from "@/components/public-footer";
import SponsorshipSection from "@/components/sponsorship-section";
import {
  Heart,
  ShieldCheck,
  Landmark,
  CheckCircle,
  Mail,
  Phone,
  QrCode,
  ArrowRight,
  Users,
  Building2,
  HandHeart,
  BadgeIndianRupee,
  Smartphone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Get Involved | DPACA – Support Child Welfare in Ahilyanagar",
  description:
    "Support the District Probation and After Care Association through donations, corporate CSR partnerships, or volunteering. Every rupee directly funds child welfare, education and rehabilitation.",
};

// ─── HOW TO SUPPORT cards ─────────────────────────────────────────────────────
const supportWays = [
  {
    icon: HandHeart,
    title: "Donate Directly",
    desc: "Give one-time or monthly to fund meals, books, uniforms, and healthcare for children living at the Observation Home.",
    color: "text-accent-blue",
    bg: "bg-accent-blue/10",
  },
  {
    icon: Building2,
    title: "Corporate CSR",
    desc: "Partner under Section 135 of the Companies Act, 2013 with full 80G exemption, audits, and quarterly impact reports.",
    color: "text-primary-blue",
    bg: "bg-primary-blue/10",
  },
  {
    icon: Users,
    title: "Volunteer & Skills",
    desc: "Offer professional skills – legal aid, medical camps, computer coaching, counseling – to directly serve our children.",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
];

// ─── INDIVIDUAL DONATION TIERS ────────────────────────────────────────────────
const donationTiers = [
  {
    label: "Daily Meals",
    amount: "₹2,500",
    period: "per day",
    desc: "Funds nutritious meals for all children in the Observation Home for one full day.",
  },
  {
    label: "Child Education",
    amount: "₹3,000",
    period: "per child/year",
    desc: "Covers textbooks, notebooks, school uniforms, and stationery for one child.",
  },
  {
    label: "Shishugruha Care",
    amount: "₹5,000",
    period: "per toddler",
    desc: "Supports infant nursery care, diapers, formula, and medical check-ups.",
  },
  {
    label: "Health Camp",
    amount: "₹12,000",
    period: "one-time",
    desc: "Sponsors a full medical & dental health camp for 30+ children at the home.",
  },
];

// ─── CORPORATE BENEFITS ───────────────────────────────────────────────────────
const corporateBenefits = [
  "Official 80G tax exemption certificates issued immediately upon donation.",
  "Ex-officio oversight by the District Magistrate / Collector ensures transparent fund utilisation.",
  "Quarterly written impact reports with photographs, beneficiary counts and fund deployment breakdowns.",
  "Full compliance with Section 135 of the Indian Companies Act, 2013.",
  "Dedicated Project Completion Certificate with engineering layouts (for infrastructure CSR).",
  "Branding & acknowledgment in all DPACA publications and annual reports.",
];

export default function GetInvolvedPage() {
  return (
    <div className="flex flex-col min-h-screen bg-soft">
      <PublicNav />

      <main className="flex-grow">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            1. HERO BANNER
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative w-full h-[340px] lg:h-[440px] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/get-involved-banner.jpg"
            alt="DPACA – Get Involved and Make an Impact"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.35]"
          />
          {/* Blue overlay tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-blue/50 to-navy/70 z-0" />

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 bg-accent-blue/20 border border-accent-blue/30 text-accent-blue font-heading text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
              <Heart className="w-3.5 h-3.5 fill-accent-blue" />
              Support Our Mission
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Get Involved — Change a Child&apos;s Future
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Established in 1942, DPACA has been a lifeline for vulnerable children across
              Ahilyanagar. Your support — big or small — powers this mission every single day.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              <a
                href="#for-individuals"
                className="bg-accent-blue hover:bg-blue-700 text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 px-7 rounded-xl shadow-md transition-colors"
              >
                Donate Now
              </a>
              <a
                href="#for-corporates"
                className="border border-white/30 hover:bg-white/10 text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 px-7 rounded-xl transition-colors"
              >
                CSR Partnerships
              </a>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            2. HOW TO SUPPORT
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="how-to-support" className="section-padding bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section heading */}
            <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center gap-3">
              <span className="font-heading text-[10px] uppercase font-extrabold tracking-widest text-accent-blue">
                Ways to Help
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-primary-blue leading-tight tracking-tight">
                How to Support DPACA
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg">
                Choose the path that fits you best. Every form of support — financial, professional,
                or time — creates measurable impact for our children.
              </p>
              <div className="w-12 h-[3px] bg-accent-blue rounded-full" />
            </div>

            {/* 3-card grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportWays.map((way) => {
                const Icon = way.icon;
                return (
                  <div
                    key={way.title}
                    className="group bg-soft rounded-card border border-slate-100 p-8 flex flex-col gap-5 hover:shadow-md hover:border-slate-200 transition-all"
                  >
                    <span className={`p-4 ${way.bg} ${way.color} rounded-2xl w-fit`}>
                      <Icon className="w-6 h-6" />
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-primary-blue">
                      {way.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-grow">
                      {way.desc}
                    </p>
                    <div className={`w-8 h-[2px] ${way.bg.replace("/10", "")} rounded-full opacity-60 group-hover:w-16 transition-all duration-300`} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            3. FOR INDIVIDUALS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="for-individuals" className="section-padding bg-soft border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section heading */}
            <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center gap-3">
              <span className="inline-flex items-center gap-2 font-heading text-[10px] uppercase font-extrabold tracking-widest text-accent-blue">
                <Heart className="w-3.5 h-3.5 fill-accent-blue" />
                Individual Donors
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-primary-blue leading-tight tracking-tight">
                For Individuals
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg">
                Your contribution directly funds meals, education, and healthcare for children at
                the Observation Home. Receive a detailed receipt for every donation.
              </p>
              <div className="w-12 h-[3px] bg-accent-blue rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left — Donation tiers */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <h3 className="font-heading font-bold text-primary-blue text-lg">
                  Choose a Sponsorship Category
                </h3>
                <SponsorshipSection donationTiers={donationTiers} />

                {/* Bank Account Details */}
                <div className="bg-white rounded-card border border-slate-100 p-6 sm:p-8 flex flex-col gap-4 mt-2">
                  <p className="text-xs font-extrabold text-primary-blue uppercase tracking-wider flex items-center gap-2 font-heading">
                    <Landmark className="w-4 h-4 text-accent-blue" />
                    Bank Transfer Details
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {[
                      ["Account Name", "Dist. Probation & After Care Association"],
                      ["Bank Name", "AHMEDNAGAR MERCHANT CO-OP BANK LTD. AHMEDNAGAR"],
                      ["Branch", "CHOUPATI KARANJA, CHITALE ROAD, A.NAGAR"],
                      ["Account No.", "005002100006192"],
                      ["IFSC Code", "AMDN0000105"],
                      ["Account Type", "Savings – NGO Trust Account"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex flex-col gap-0.5">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400">
                          {label}
                        </span>
                        <span className="font-mono text-xs text-primary-blue font-semibold">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-100 pt-3 mt-1">
                    All donations are eligible for 80G tax deductions. A receipt will be mailed
                    within 48 hours of fund confirmation. Contact{" "}
                    <span className="inline-block gap-1">
                      <a href="mailto:dpaca1942@rediffmail.com" className="text-accent-blue underline">dpaca1942@rediffmail.com</a>
                      {" / "}
                      <a href="mailto:dpaca1977@gmail.com" className="text-accent-blue underline">dpaca1977@gmail.com</a>
                    </span>{" "}
                    for any queries.
                  </p>
                </div>
              </div>

              {/* Right — UPI QR payment demo */}
              <div className="lg:col-span-5 flex flex-col items-center gap-6 lg:sticky lg:top-24">
                <div className="bg-white rounded-card border border-slate-100 shadow-lg p-6 sm:p-8 w-full flex flex-col items-center gap-5">
                  {/* Header */}
                  <div className="flex items-center gap-2 self-start">
                    <span className="p-2 bg-accent-blue/10 text-accent-blue rounded-lg">
                      <Smartphone className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="font-heading font-extrabold text-sm text-primary-blue">
                        Instant UPI Payment
                      </p>
                      <p className="text-[10px] text-slate-400">Scan with any UPI app</p>
                    </div>
                  </div>

                  {/* QR Code image */}
                  <div className="relative w-52 h-52 rounded-2xl overflow-hidden border-2 border-accent-blue/20 shadow-sm">
                    <Image
                      src="/images/NGO%20QR%20CODE.png"
                      alt="DPACA UPI QR Code for donations"
                      fill
                      sizes="208px"
                      className="object-contain p-2"
                    />
                  </div>

                  {/* UPI app icons row */}
                  <div className="flex flex-col items-center gap-2 w-full">
                    <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400">
                      Accepted on
                    </p>
                    <div className="flex gap-3 flex-wrap justify-center">
                      {["GPay", "PhonePe", "Paytm", "BHIM", "Amazon Pay"].map((app) => (
                        <span
                          key={app}
                          className="text-[9px] font-bold text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-2.5 py-1 rounded-full"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  </div>

                {/* Contact for large donations */}
                <div className="bg-light-blue border border-accent-blue/20 text-slate-700 rounded-card p-6 w-full flex flex-col gap-3">
                  <p className="font-heading font-extrabold text-sm uppercase tracking-wide text-primary-blue">
                    Large Donation? Contact Us Directly
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    For donations above ₹50,000 or project-specific sponsorship, our team will
                    coordinate personally to provide custom documentation and acknowledgment.
                  </p>
                  <div className="flex flex-col gap-2 mt-1">
                    <a
                      href="tel:0241-2345229"
                      className="flex items-center gap-2 text-xs text-primary-blue font-semibold hover:text-accent-blue transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-accent-blue" />
                      0241-2345229
                    </a>
                    <div className="flex flex-col gap-1 mt-0.5">
                      <a
                        href="mailto:dpaca1942@rediffmail.com"
                        className="flex items-center gap-2 text-xs text-primary-blue font-semibold hover:text-accent-blue transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-accent-blue" />
                        dpaca1942@rediffmail.com
                      </a>
                      <a
                        href="mailto:dpaca1977@gmail.com"
                        className="flex items-center gap-2 text-xs text-primary-blue font-semibold hover:text-accent-blue transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-accent-blue" />
                        dpaca1977@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            4. FOR CORPORATES
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="for-corporates" className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section heading */}
            <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center gap-3">
              <span className="inline-flex items-center gap-2 font-heading text-[10px] uppercase font-extrabold tracking-widest text-accent-blue">
                <Building2 className="w-3.5 h-3.5" />
                Corporate Giving
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-primary-blue leading-tight tracking-tight">
                For Corporates
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg">
                Partner with DPACA under the Companies Act CSR framework — a fully compliant,
                audited and transparent channel for meaningful community impact.
              </p>
              <div className="w-12 h-[3px] bg-accent-blue rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left — Benefits list */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                <div className="bg-soft border border-slate-200 text-slate-700 rounded-card p-8 sm:p-10 relative overflow-hidden">
                  <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <span className="p-3.5 bg-accent-blue/10 text-accent-blue rounded-2xl w-fit">
                        <ShieldCheck className="w-6 h-6" />
                      </span>
                      <div>
                        <h3 className="font-heading font-extrabold text-xl text-navy">
                          CSR Partnership Benefits
                        </h3>
                        <p className="text-xs text-slate-500">Section 135 — Companies Act, 2013</p>
                      </div>
                    </div>

                    <ul className="flex flex-col gap-4">
                      {corporateBenefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          <CheckCircle className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className="mt-2 inline-flex items-center gap-2 bg-accent-blue hover:bg-blue-700 text-white font-heading font-bold text-xs uppercase tracking-wider py-4 px-7 rounded-xl shadow-md transition-colors w-fit"
                    >
                      <Mail className="w-4 h-4" />
                      Initiate CSR Collaboration
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right — 80G & Process panel */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* 80G highlight */}
                <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-card p-6 sm:p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="p-3 bg-accent-blue text-white rounded-xl w-fit">
                      <ShieldCheck className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-heading font-extrabold text-primary-blue text-sm">
                        80G Tax Exemption
                      </p>
                      <p className="text-[10px] text-slate-500">Certified by Income Tax Dept.</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    DPACA is registered under the Income Tax Act Section 80G. Companies contributing
                    to DPACA&apos;s welfare activities can claim deductions as per applicable provisions.
                    Exemption certificates are issued within 7 working days.
                  </p>
                </div>

                {/* Process Steps */}
                <div className="bg-soft rounded-card border border-slate-100 p-6 sm:p-8 flex flex-col gap-5">
                  <h4 className="font-heading font-extrabold text-primary-blue text-sm uppercase tracking-wide">
                    Partnership Process
                  </h4>
                  <ol className="flex flex-col gap-5">
                    {[
                      { step: "01", title: "Initial Inquiry", desc: "Write to us via the contact form or email with your CSR interest and budget range." },
                      { step: "02", title: "Proposal & MOU", desc: "Our team prepares a tailored project proposal with MOU, scope, and fund utilisation plan." },
                      { step: "03", title: "Fund Transfer", desc: "Transfer directly to our SBI Trust Account. Official receipt issued within 48 hours." },
                      { step: "04", title: "Impact Reporting", desc: "Quarterly progress reports and a final Project Completion Certificate issued." },
                    ].map((item) => (
                      <li key={item.step} className="flex gap-4 items-start">
                        <span className="font-heading font-extrabold text-accent-blue text-sm shrink-0 mt-0.5">
                          {item.step}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <p className="font-heading font-bold text-primary-blue text-xs">{item.title}</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <Link
                  href="/contact"
                  className="bg-primary-blue hover:bg-blue-800 text-white font-heading font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl text-center shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  Contact for CSR Partnership
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            FINAL CTA STRIP
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="py-16 bg-soft border-t border-slate-100 text-center">
          <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-5">
            <Heart className="w-10 h-10 text-accent-blue fill-accent-blue" />
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary-blue tracking-tight">
              Every Contribution Counts
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
              Whether ₹500 or ₹5,00,000 — your generosity directly feeds, educates, and protects
              real children in Ahilyanagar. Join 80 years of compassionate community action.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              <a
                href="#for-individuals"
                className="bg-accent-blue hover:bg-blue-700 text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 px-7 rounded-xl shadow-md transition-colors"
              >
                Donate Today
              </a>
              <Link
                href="/contact"
                className="border border-primary-blue/30 hover:border-primary-blue hover:bg-primary-blue/5 text-primary-blue font-heading font-bold text-xs uppercase tracking-wider py-3.5 px-7 rounded-xl transition-all"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
