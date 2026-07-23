// src/app/what-we-do/page.tsx
import Image from "next/image";
import PublicNav from "@/components/public-nav";
import PublicFooter from "@/components/public-footer";
import CampusFacilities from "@/components/campus-facilities";
import { Scale, ShieldCheck, HeartHandshake, BookOpen, ClipboardList, HelpingHand, Gavel, Megaphone, ShieldAlert, FileHeart, GraduationCap, Cpu, Sparkles } from "lucide-react";

export default function WhatWeDoPage() {
  const adoptionServices = [
    {
      title: "Child Placement",
      desc: "Legally matching and placing eligible infants and young children into loving, verified families under the SAA framework.",
      icon: HelpingHand,
    },
    {
      title: "Screening & Assessment",
      desc: "Conducting rigorous prospective adoptive parent (PAP) evaluations and home study reports (HSR) to ensure child safety.",
      icon: ClipboardList,
    },
    {
      title: "Counseling",
      desc: "Providing professional emotional counseling for biological parents, children, and adoptive families during transition phases.",
      icon: HeartHandshake,
    },
    {
      title: "Legal Assistance",
      desc: "Navigating legal petitions, courtroom certifications, and processing official birth certificates post-adoption approval.",
      icon: Gavel,
    },
    {
      title: "Awareness Programs",
      desc: "Organizing public awareness campaigns to encourage legal adoption and prevent illegal child abandonment or trafficking.",
      icon: Megaphone,
    },
    {
      title: "Post Adoption Support",
      desc: "Conducting mandatory follow-up checks and home visits to ensure healthy adjustment and support the child's long-term integration.",
      icon: FileHeart,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-soft">
      <PublicNav />

      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative w-full h-[320px] lg:h-[400px] flex items-center justify-center overflow-hidden bg-primary-blue">
          <Image
            src="/images/meeting-hall.png"
            alt="DPACA Care Services Banner"
            fill
            priority
            className="object-cover object-center brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-primary-blue/40 z-0"></div>
          <div className="relative max-w-4xl mx-auto px-6 text-center z-10 text-white flex flex-col gap-4">
            <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
              Active Programs
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Empowering Through Rehabilitation & Care
            </h1>
          </div>
        </section>

        {/* Node 1: Overview of Main Work Areas */}
        <section className="section-padding bg-white border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              {/* Left Column: Image framework */}
              <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[450px] rounded-card overflow-hidden shadow-lg border border-slate-100 group bg-slate-100">
                <Image
                  src="/images/lodging-boarding-eductaion.png"
                  alt="Overview of main work areas"
                  fill
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary-blue text-white text-[10px] font-bold tracking-widest uppercase py-1.5 px-3.5 rounded-full shadow-md flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-blue" />
                  Statutory Guidelines
                </div>
              </div>

              {/* Right Column: Text details */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="flex items-center gap-2 text-accent-blue">
                  <Scale className="w-5 h-5" />
                  <span className="font-heading text-xs uppercase font-extrabold tracking-widest">
                    Operational Framework
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary-blue">
                  Overview of Main Work Areas
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  DPACA operates as a pioneering social service organization catering to destitute children and juvenile care across Maharashtra. Guided by the **Juvenile Justice Act, 2015 (Amended 2022)**, we secure custody, institutional protection, and systematic reform setups.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our core functions span three vital social pillars: delivering full boarding nutrition and primary schooling, acting as the legally accredited district child observation home, and managing specialized under-6 infant adoption services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Node 2: Shishugruha Adoption Center */}
        <section className="section-padding bg-soft border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
              <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
                Specialized SAA Agency
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-primary-blue">
                Shishugruha Adoption Center
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg leading-relaxed">
                Licensed under Registration Number **AHN-37/SAA/2020/037**, this specialized facility houses and protects abandoned infants under 6 years, matching them into verified homes in accordance with CARA guidelines.
              </p>
              <div className="w-12 h-[3px] bg-accent-blue rounded-full mt-2"></div>
            </div>

            {/* Grid of 6 services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {adoptionServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="bg-white p-6 sm:p-8 rounded-card border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow"
                  >
                    <span className="p-3 bg-accent-blue/10 text-accent-blue rounded-xl w-fit">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="font-heading font-bold text-primary-blue text-base sm:text-lg">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Node 3: Education Support */}
        <section className="section-padding bg-white border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              {/* Left Column: Education Text */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="flex items-center gap-2 text-accent-blue">
                  <GraduationCap className="w-5 h-5" />
                  <span className="font-heading text-xs uppercase font-extrabold tracking-widest">
                    Academic Development
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary-blue">
                  Institutional Education Support
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We believe schooling is non-negotiable for child development. Every child of school-going age residing within the Observation Home is registered in primary and secondary schools in the vicinity.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Within our compound, we operate quiet study halls, arrange private tutoring, and supply textbooks, reference libraries, and computers, ensuring that underprivileged children receive equal academic guidance and succeed in national exams.
                </p>
              </div>

              {/* Right Column: Education photo */}
              <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[450px] rounded-card overflow-hidden shadow-lg border border-slate-100 group bg-slate-100">
                <Image
                  src="/images/classroom-learning.png"
                  alt="Education Support study classroom"
                  fill
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary-blue text-white text-[10px] font-bold tracking-widest uppercase py-1.5 px-3.5 rounded-full shadow-md">
                  Study Halls
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Node 4: Skill Development */}
        <section className="section-padding bg-soft border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              {/* Left Column: Skill development photo */}
              <div className="lg:col-span-6 lg:order-last relative w-full h-[320px] sm:h-[450px] rounded-card overflow-hidden shadow-lg border border-slate-100 group bg-slate-100">
                <Image
                  src="/images/sewing-class.png"
                  alt="Skill Development vocational workshop"
                  fill
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary-blue text-white text-[10px] font-bold tracking-widest uppercase py-1.5 px-3.5 rounded-full shadow-md">
                  Vocational Labs
                </div>
              </div>

              {/* Right Column: Skill Development text */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="flex items-center gap-2 text-accent-blue">
                  <Cpu className="w-5 h-5" />
                  <span className="font-heading text-xs uppercase font-extrabold tracking-widest">
                    Economic Independence
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary-blue">
                  Vocational & Skill Development
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We prepare older children for self-sustainability through vocational courses. Our program guides boys and girls in practical trades that have immediate local industrial and service market relevance.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Trades taught inside our vocational block include basic electrical wiring, tailoring/garment cutting, and IT literacy (office suites and typing). These skills give orphans and rehabilitated youth a path to secure honorable salaries post-release.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Node 5: Juvenile Care Center */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              {/* Left Column: Image */}
              <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[450px] rounded-card overflow-hidden shadow-lg border border-slate-100 group bg-slate-100">
                <Image
                  src="/images/Juvenile-care-observation.jpeg"
                  alt="Juvenile Care Center correction hall"
                  fill
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary-blue text-white text-[10px] font-bold tracking-widest uppercase py-1.5 px-3.5 rounded-full shadow-md flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-accent-blue" />
                  Correction Welfare
                </div>
              </div>

              {/* Right Column: Care details */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="flex items-center gap-2 text-accent-blue">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-heading text-xs uppercase font-extrabold tracking-widest">
                    Restorative Justice
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary-blue">
                  Juvenile Care Center
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our observation home functions as a temporary custody care center for juveniles during legal trial proceedings. Under judicial oversight, we maintain separate dormitories for boys and girls to ensure secure lodging.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Rehabilitation is centered around psychological healing. Our counselors lead therapeutic assessments, group bonding sessions, and moral lessons, guiding conflict-ridden children to correct their pathways and peacefully return to their families.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Campus Facilities Interactive Browser */}
        <CampusFacilities />

      </main>

      <PublicFooter />
    </div>
  );
}
