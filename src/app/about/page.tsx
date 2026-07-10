// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/db";
import PublicNav from "@/components/public-nav";
import PublicFooter from "@/components/public-footer";
import { 
  Eye, 
  Rocket, 
  Compass, 
  Heart, 
  Users, 
  ShieldAlert, 
  Award, 
  Calendar, 
  Trophy, 
  Sparkles, 
  Clock, 
  Scale 
} from "lucide-react";

export const revalidate = 0;

export default async function AboutPage() {
  // Query all timeline events from database for the dynamic timeline component
  const timelineEvents = await prisma.timelineEvent.findMany({
    orderBy: { date: "desc" },
  });

  // Query all board members from database
  const boardMembers = await prisma.boardMember.findMany({
    orderBy: { order: "asc" },
  });

  // Query all founders from database
  const founders = await prisma.founder.findMany({
    orderBy: { order: "asc" },
  });

  const coreValues = [
    { name: "Perceptive", desc: "Understanding the complex needs and emotional traumas of children to provide tailored care.", icon: Eye },
    { name: "Progressive", desc: "Implementing forward-looking educational tools and vocational training programs.", icon: Rocket },
    { name: "Responsive", desc: "Acting immediately to safeguard vulnerable children placed in emergency custody.", icon: Compass },
    { name: "Respectful", desc: "Restoring self-worth and treating every child, donor, and official with absolute dignity.", icon: Heart },
    { name: "Prudent", desc: "Maintaining transparent and cautious management of donations and trust resources.", icon: Users },
    { name: "Fair", desc: "Upholding impartial, law-abiding justice as an accredited child observation home.", icon: ShieldAlert },
  ];

  const awards = [
    {
      title: "State Child Welfare Excellence Award",
      issuer: "Department of Women & Child Development, Govt of Maharashtra",
      year: "2018",
      detail: "Conferred for exemplary services in the rehabilitation and lodging support of undernourished children.",
    },
    {
      title: "District NGO Transparency Citation",
      issuer: "Ahilyanagar District Collectorate & District Magistrate office",
      year: "2021",
      detail: "Awarded for outstanding compliance, resource management, and administrative transparency.",
    },
    {
      title: "CARA Compliance Certification",
      issuer: "Central Adoption Resource Authority (CARA), Govt of India",
      year: "2023",
      detail: "Official recognition as a top-performing Specialized Adoption Agency (SAA) in Maharashtra.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-soft">
      <PublicNav />

      <main className="flex-grow">
        {/* Section 1 — Hero Banner */}
        <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-navy text-white py-20 lg:py-32">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/OFFICE PHOTO.jpeg"
              alt="DPACA Eight Decades of Legacy Background"
              fill
              priority
              className="object-cover object-center brightness-[0.3]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-blue/40 via-navy/70 to-navy/95"></div>
          </div>
          <div className="relative max-w-5xl mx-auto px-6 text-center z-10 flex flex-col gap-6 items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue/20 border border-accent-blue/30 text-accent-blue text-xs uppercase font-extrabold tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              Founded 1942
            </div>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight max-w-4xl">
              Our Legacy: Over Eight Decades of Social Welfare
            </h1>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
              A historic sanctuary dedicated to child protection, vocational empowerment, and juvenile rehabilitation under the direction of the Ahilyanagar district administration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a
                href="#our-story"
                className="px-8 py-3.5 bg-accent-blue hover:bg-accent-blue/90 text-white rounded-full font-heading text-xs uppercase font-extrabold tracking-wider transition-all shadow-lg hover:shadow-accent-blue/20 hover:scale-[1.02]"
              >
                Our Story
              </a>
              <a
                href="#trustees"
                className="px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-full font-heading text-xs uppercase font-extrabold tracking-wider transition-all backdrop-blur-sm hover:scale-[1.02]"
              >
                Meet Our Trustees
              </a>
            </div>
          </div>
        </section>

        {/* Section 2 — Our Story */}
        <section id="our-story" className="section-padding bg-white relative scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              {/* Left Column - Narratives */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center gap-2 text-accent-blue">
                  <Clock className="w-5 h-5" />
                  <span className="font-heading text-xs uppercase font-extrabold tracking-widest">
                    Since World War II Era
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
                  Founding & Historical Legacy
                </h2>
                <div className="w-12 h-[3px] bg-accent-blue rounded-full"></div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  The District Probation and After Care Association was established in the historic year of 1942, during a period of massive social change in India. It was set up with a visionary purpose to provide protective custody, compassionate care, active protection, and complete rehabilitation to juveniles and distressed children.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  The organization was founded by pioneering visionaries <strong className="text-navy">Late Sardar R. G. Mirikar</strong>, <strong className="text-navy">Late D. Y. Chaudhari</strong>, and <strong className="text-navy">Late Prof. M. V. Ghaskadbi</strong>, who recognized the desperate need to rescue destitute children. This noble effort was carried out with the active assistance and sanction of the then British Collector of Ahmednagar, establishing a long-standing tradition of ex-officio chairmanship by the district administration.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  With a sustained commitment spanning more than 80 years, DPACA has emerged as a trusted institution in the field of social welfare in Ahilyanagar. Its interventions have positively impacted many lives (18,555 boys, 8,210 girls, 376 adopted children, and many juvenile offenders in the aftercare support) by creating opportunities for rehabilitation, empowerment, and social inclusion.
                </p>
                <div className="p-5 border-l-4 border-accent-blue bg-light-blue rounded-r-xl">
                  <p className="text-xs sm:text-sm italic font-medium text-slate-700">
                    &ldquo;Our founders combined public administration authority with civilian empathy to build a haven of hope during times of extreme deprivation.&rdquo;
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-soft border border-slate-100 text-xs font-semibold text-slate-500">
                    Est. 1942
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-soft border border-slate-100 text-xs font-semibold text-slate-500">
                    Public Trust Reg. E-87
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-soft border border-slate-100 text-xs font-semibold text-slate-500">
                    Maharashtra, India
                  </span>
                </div>
              </div>

              {/* Right Column - Styled Image */}
              <div className="lg:col-span-5 relative w-full h-[350px] sm:h-[450px] rounded-card overflow-hidden shadow-2xl border border-slate-100 group">
                <Image
                  src="/images/OFFICE%20PHOTO.jpeg"
                  alt="DPACA Historical Administrative Building"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/20 shadow-lg text-navy">
                  <p className="font-heading font-extrabold text-xs uppercase tracking-wider text-accent-blue">Institutional Headquarters</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Ahilyanagar, Maharashtra</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Mission & Vision */}
        <section className="section-padding bg-soft border-y border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6">
            {/* Mission & Vision split cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {/* Mission Card */}
              <div className="bg-white p-8 sm:p-12 rounded-card shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col gap-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/5 rounded-bl-full group-hover:scale-110 transition-transform duration-500"></div>
                <span className="p-4 bg-accent-blue/10 text-accent-blue rounded-2xl w-fit flex items-center justify-center shrink-0">
                  <Eye className="w-8 h-8" />
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-navy">
                  Our Mission
                </h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  To provide comprehensive care, secure shelter, quality education, and professional psychological rehabilitation to children in need of protection, empowering them to reintegrate into society as independent, productive, and respected citizens.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-white p-8 sm:p-12 rounded-card shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col gap-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-blue/5 rounded-bl-full group-hover:scale-110 transition-transform duration-500"></div>
                <span className="p-4 bg-primary-blue/10 text-primary-blue rounded-2xl w-fit flex items-center justify-center shrink-0">
                  <Rocket className="w-8 h-8" />
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-navy">
                  Our Vision
                </h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  A compassionate society where every child, regardless of social background, experiences a safe, nurturing upbringing, free from deprivation and abuse, and is equipped to lead an honorable, self-reliant life.
                </p>
              </div>
            </div>

            {/* Core Objectives */}
            <div className="mt-16 bg-white p-8 sm:p-12 rounded-card border border-slate-100 shadow-md flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="font-heading font-extrabold text-2xl text-navy">Our Core Objectives</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
                  To realize our mission, the District Probation and After Care Association focuses on six vital operational objectives:
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "A Safe Haven", desc: "Running dedicated Observation homes to provide a secure and nurturing environment for boys and girls under the age of 18 who are brought before the Juvenile Justice Board and Child Welfare Committee." },
                  { title: "Guidance & Supervision", desc: "Closely monitoring children navigating the legal system while providing the required counseling, guidance, and support to their parents through such difficult times." },
                  { title: "Advocacy & Awareness", desc: "Building public awareness and community support for initiatives aimed at the welfare, rehabilitation, and protection of young children and juvenile youth." },
                  { title: "Rehabilitation & Reintegration", desc: "Supervising and safely reintegrating children into mainstream society after their release from state-certified schools under specific care programs." },
                  { title: "Empowerment Through Education", desc: "Ensuring every child receives a quality education while empowering them to become informed, responsible, and compassionate citizens." },
                  { title: "Sustaining the Cause", desc: "Raising the vital funds required to keep these critical programs running and ensuring every resource goes directly toward a child’s well-being." },
                ].map((obj, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="p-1.5 bg-accent-blue/10 text-accent-blue rounded-lg mt-0.5 font-mono text-xs font-bold w-6 h-6 flex items-center justify-center shrink-0">
                      0{i+1}
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-navy text-sm leading-snug">{obj.title}</h4>
                      <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{obj.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values Section */}
            <div className="text-center max-w-2xl mx-auto mb-16 mt-20 flex flex-col items-center gap-4">
              <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
                Cornerstone Principles
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy">
                Our 6 Core Values
              </h3>
              <div className="w-12 h-[3px] bg-accent-blue rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.name}
                    className="bg-white p-6 sm:p-8 rounded-card border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col gap-4 group"
                  >
                    <span className="p-3 bg-primary-blue/5 text-primary-blue rounded-xl w-fit group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h4 className="font-heading font-bold text-navy text-lg">
                      {value.name}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4 — Founders */}
        <section id="founders" className="section-padding bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
              <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
                The Pioneers (Est. 1942)
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
                Our Illustrious Founders
              </h2>
              <div className="w-12 h-[3px] bg-accent-blue rounded-full"></div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Paying homage to the visionaries whose compassion and governance created a legacy of social safety.
              </p>
            </div>

            <div className="flex flex-col gap-8 max-w-5xl mx-auto mb-16">
              {founders.map((founder, index) => (
                <div
                  key={founder.id}
                  className={`flex flex-col md:flex-row ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  } items-center gap-8 md:gap-12 p-6 sm:p-8 rounded-[32px] bg-slate-50/40 hover:bg-white border border-slate-100/80 hover:border-accent-blue/30 shadow-sm hover:shadow-md transition-all duration-300 group`}
                >
                  {/* Photo Container */}
                  <div className="w-64 h-64 md:w-72 md:h-72 shrink-0 relative overflow-hidden rounded-[24px] bg-slate-100 border border-slate-200/60 shadow-inner group-hover:ring-4 group-hover:ring-accent-blue/10 transition-all duration-500">
                    {founder.imageUrl ? (
                      <Image
                        src={founder.imageUrl}
                        alt={founder.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 group-hover:scale-105 rounded-[24px]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-blue to-accent-blue flex flex-col items-center justify-center text-white relative rounded-[24px] shadow-inner">
                        <span className="font-heading font-extrabold text-5xl tracking-widest opacity-25 select-none">
                          {founder.initials}
                        </span>
                        <span className="absolute bottom-4 text-[9px] uppercase font-bold tracking-widest text-white/50">
                          Historical Pioneer
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Biography Content */}
                  <div className="flex-grow flex flex-col gap-4 text-center md:text-left">
                    <div className="flex flex-col gap-2 items-center md:items-start">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-[9px] font-extrabold uppercase tracking-widest">
                        Pioneer Founder
                      </span>
                      <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy group-hover:text-accent-blue transition-colors duration-300">
                        {founder.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                        {founder.title}
                      </p>
                      <div className="w-12 h-[2.5px] bg-accent-blue/30 rounded-full mt-1 group-hover:w-20 transition-all duration-300"></div>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Bottom quote strip */}
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-blue/5 to-accent-blue/5 border border-accent-blue/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
              <span className="p-3.5 bg-accent-blue/10 text-accent-blue rounded-full shrink-0">
                <Heart className="w-6 h-6" />
              </span>
              <div className="flex-grow text-center md:text-left">
                <p className="text-slate-700 italic text-sm sm:text-base font-medium">
                  &ldquo;Our founders believed that every child, regardless of birth or circumstance, deserves the protection of the state and the warmth of a family.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 — Current Trustees & Directors */}
        <section id="trustees" className="section-padding bg-soft border-b border-slate-200/50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
              <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
                Governing Body
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
                Administrative Leadership
              </h2>
              <div className="w-12 h-[3px] bg-accent-blue rounded-full"></div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Guided by experienced administrative, legal, and medical professionals working in coordination with government child welfare authorities.
              </p>
            </div>

            {/* Clean, Uniform Grid of Board Members */}
            {(() => {
              const getInitials = (name: string) => {
                const cleanName = name
                  .replace(/^(Dr\.|Adv\.|Smt\.|Mr\.|Mrs\.)\s+/i, "")
                  .replace(/(\(.*?\))/g, "")
                  .trim();
                const parts = cleanName.split(/\s+/);
                return parts.length >= 2 
                  ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
                  : (parts[0]?.[0] || "BM").toUpperCase();
              };

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {boardMembers.map((member) => (
                    <div
                      key={member.id}
                      className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-accent-blue/20 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center group h-full cursor-default"
                    >
                      {/* Image or Initials Fallback */}
                      {member.imageUrl ? (
                        <div className="relative w-32 h-32 rounded-full overflow-hidden shrink-0 border border-slate-200/80 shadow-inner mb-5 group-hover:scale-105 group-hover:ring-4 group-hover:ring-accent-blue/10 transition-all duration-300">
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            sizes="128px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-slate-50 text-slate-500 border border-slate-200/60 flex items-center justify-center font-heading font-bold text-2xl shrink-0 shadow-inner mb-5 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-primary-blue/10 group-hover:to-accent-blue/10 group-hover:text-accent-blue group-hover:border-accent-blue/20 group-hover:scale-105 group-hover:ring-4 group-hover:ring-accent-blue/10">
                          {getInitials(member.name)}
                        </div>
                      )}

                      {/* Details */}
                      <div className="flex flex-col gap-2 flex-grow justify-between items-center w-full">
                        <div className="flex flex-col items-center">
                          <h4 className="font-heading font-bold text-navy text-sm sm:text-base leading-snug group-hover:text-accent-blue transition-colors duration-200">
                            {member.name}
                          </h4>
                          <div className="w-0 h-[2px] bg-accent-blue/30 mt-2 group-hover:w-8 transition-all duration-300 rounded-full"></div>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-normal mt-3">
                          {member.position}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>

        {/* Section 6 — Impact Metrics */}
        <section className="section-padding bg-white border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
              <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
                Our Footprint
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
                Impact & Facilities
              </h2>
              <div className="w-12 h-[3px] bg-accent-blue rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  value: "80+",
                  label: "Years of Service",
                  desc: "Uninterrupted operation since inception in 1942.",
                  icon: Calendar,
                },
                {
                  value: "300+",
                  label: "Children Served Daily",
                  desc: "Receiving food, education, shelter, and full care.",
                  icon: Sparkles,
                },
                {
                  value: "18,555",
                  label: "Boys Assisted",
                  desc: "Empowered through lodging, boarding, and education.",
                  icon: Users,
                },
                {
                  value: "8,210",
                  label: "Girls Assisted",
                  desc: "Supported with care, safety, and rehabilitation.",
                  icon: Users,
                },
                {
                  value: "376",
                  label: "Adopted Children",
                  desc: "Placed in loving families under CARA compliance.",
                  icon: Heart,
                },
                {
                  value: "3",
                  label: "Licensed Facilities",
                  desc: "Remand Home, Observation Home, and Shishugruha.",
                  icon: Award,
                },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="p-8 rounded-card bg-soft border border-slate-100 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow duration-300 group"
                  >
                    <span className="p-3 bg-accent-blue/10 text-accent-blue rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="font-heading font-extrabold text-4xl sm:text-5xl text-accent-blue">
                      {stat.value}
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-navy text-base">
                        {stat.label}
                      </h4>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 7 — Awards & Recognitions */}
        <section className="section-padding bg-soft border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
              <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
                Accreditations
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
                Awards & Recognitions
              </h2>
              <div className="w-12 h-[3px] bg-accent-blue rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-card border border-slate-100 shadow-md hover:shadow-lg hover:border-slate-200 transition-all duration-300 flex flex-col gap-5 relative group"
                >
                  <span className="p-3 bg-accent-blue/10 text-accent-blue rounded-xl w-fit group-hover:bg-accent-blue group-hover:text-white transition-colors duration-300">
                    <Trophy className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                      Conferred {award.year}
                    </span>
                    <h3 className="font-heading font-bold text-navy text-lg mt-1 mb-2 leading-snug">
                      {award.title}
                    </h3>
                    <p className="text-[10px] text-accent-blue font-bold uppercase tracking-wider mb-3 leading-snug">
                      {award.issuer}
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {award.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7.5 — Statistical Case Review Report */}
        <section className="section-padding bg-white scroll-mt-20 border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
              <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
                Transparency & Statistics
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
                Annual CWC & JJB Case Review (2024-2025)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed text-center">
                Annual statistical overview of Child Welfare Committee (CWC) and Juvenile Justice Board (JJB) cases managed by the District Probation and After Care Association, Ahilyanagar.
              </p>
              <div className="w-12 h-[3px] bg-accent-blue rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column: Annual Attendance & Case Resolutions */}
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-blue"></span>
                    Annual Statistical Report
                  </h3>
                  <div className="bg-soft border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100/80 border-b border-slate-200 text-primary-blue font-bold text-[10px] uppercase tracking-wider">
                          <th className="p-3 w-12 text-center">S.No.</th>
                          <th className="p-3">Details</th>
                          <th className="p-3 text-center">Boys</th>
                          <th className="p-3 text-center">Girls</th>
                          <th className="p-3 text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-700 font-medium">
                        <tr>
                          <td className="p-3 text-center font-mono">1</td>
                          <td className="p-3">Previous Pending Cases (up to 31/03/2023)</td>
                          <td className="p-3 text-center">42</td>
                          <td className="p-3 text-center">48</td>
                          <td className="p-3 text-center font-bold">90</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center font-mono">2</td>
                          <td className="p-3">Newly Admitted (from 01/04/2023 to 31/03/2024)</td>
                          <td className="p-3 text-center">102</td>
                          <td className="p-3 text-center">96</td>
                          <td className="p-3 text-center font-bold">198</td>
                        </tr>
                        <tr className="bg-slate-50/50 font-bold border-y border-slate-200 text-navy">
                          <td className="p-3"></td>
                          <td className="p-3 uppercase text-[10px] tracking-wider text-slate-400">Total Active Cases</td>
                          <td className="p-3 text-center text-primary-blue">144</td>
                          <td className="p-3 text-center text-primary-blue">144</td>
                          <td className="p-3 text-center text-accent-blue">288</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center font-mono">3</td>
                          <td className="p-3">Cases Resolved in Year 2023 - 2024</td>
                          <td className="p-3 text-center">98</td>
                          <td className="p-3 text-center">100</td>
                          <td className="p-3 text-center font-bold">198</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center font-mono">4</td>
                          <td className="p-3">Pending Cases as of 31/03/2024</td>
                          <td className="p-3 text-center">46</td>
                          <td className="p-3 text-center">44</td>
                          <td className="p-3 text-center font-bold">90</td>
                        </tr>
                        <tr className="bg-slate-50/50 font-bold border-t border-slate-200 text-navy">
                          <td className="p-3"></td>
                          <td className="p-3 uppercase text-[10px] tracking-wider text-slate-400">Total Accounted</td>
                          <td className="p-3 text-center text-primary-blue">144</td>
                          <td className="p-3 text-center text-primary-blue">144</td>
                          <td className="p-3 text-center text-accent-blue">288</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-blue"></span>
                    A) Classification of Resolved Cases
                  </h3>
                  <div className="bg-soft border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100/80 border-b border-slate-200 text-primary-blue font-bold text-[10px] uppercase tracking-wider">
                          <th className="p-3 w-12 text-center">S.No.</th>
                          <th className="p-3">Details</th>
                          <th className="p-3 text-center">Boys</th>
                          <th className="p-3 text-center">Girls</th>
                          <th className="p-3 text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-700 font-medium">
                        {[
                          { no: 1, name: "Handed over to parents", b: "90", g: "90", t: "180" },
                          { no: 2, name: "Transferred / Sent on Transfer", b: "10", g: "10", t: "20" },
                          { no: 3, name: "Absconded / Run away", b: "—", g: "—", t: "—" },
                          { no: 4, name: "Deceased", b: "—", g: "—", t: "—" },
                          { no: 5, name: "Released", b: "2", g: "—", t: "2" },
                          { no: 6, name: "Names Removed", b: "—", g: "—", t: "—" },
                        ].map((row) => (
                          <tr key={row.no}>
                            <td className="p-3 text-center font-mono">{row.no}</td>
                            <td className="p-3">{row.name}</td>
                            <td className="p-3 text-center">{row.b}</td>
                            <td className="p-3 text-center">{row.g}</td>
                            <td className="p-3 text-center font-bold">{row.t}</td>
                          </tr>
                        ))}
                        <tr className="bg-slate-50/50 font-bold border-t border-slate-200 text-navy">
                          <td className="p-3"></td>
                          <td className="p-3 uppercase text-[10px] tracking-wider text-slate-400">Total Resolved</td>
                          <td className="p-3 text-center text-primary-blue">102</td>
                          <td className="p-3 text-center text-primary-blue">100</td>
                          <td className="p-3 text-center text-accent-blue">202</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column: Admissions Origins & Reasons */}
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-blue"></span>
                    B) Classification of Newly Admitted Cases (By Origin)
                  </h3>
                  <div className="bg-soft border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100/80 border-b border-slate-200 text-primary-blue font-bold text-[10px] uppercase tracking-wider">
                          <th className="p-3 w-12 text-center">S.No.</th>
                          <th className="p-3">Admissions by Region</th>
                          <th className="p-3 text-center">Boys</th>
                          <th className="p-3 text-center">Girls</th>
                          <th className="p-3 text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-700 font-medium">
                        {[
                          { no: 1, name: "Ahmednagar City", b: "22", g: "19", t: "41" },
                          { no: 2, name: "Ahmednagar District", b: "43", g: "45", t: "88" },
                          { no: 3, name: "Other Districts", b: "16", g: "16", t: "32" },
                          { no: 4, name: "Other States", b: "15", g: "16", t: "31" },
                        ].map((row) => (
                          <tr key={row.no}>
                            <td className="p-3 text-center font-mono">{row.no}</td>
                            <td className="p-3">{row.name}</td>
                            <td className="p-3 text-center">{row.b}</td>
                            <td className="p-3 text-center">{row.g}</td>
                            <td className="p-3 text-center font-bold">{row.t}</td>
                          </tr>
                        ))}
                        <tr className="bg-slate-50/50 font-bold border-t border-slate-200 text-navy">
                          <td className="p-3"></td>
                          <td className="p-3 uppercase text-[10px] tracking-wider text-slate-400">Total Admitted</td>
                          <td className="p-3 text-center text-primary-blue">96</td>
                          <td className="p-3 text-center text-primary-blue">96</td>
                          <td className="p-3 text-center text-accent-blue">192</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-blue"></span>
                    C) Reasons for New Case Admissions
                  </h3>
                  <div className="bg-soft border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100/80 border-b border-slate-200 text-primary-blue font-bold text-[10px] uppercase tracking-wider">
                          <th className="p-3 w-12 text-center">S.No.</th>
                          <th className="p-3">Admission Category Details</th>
                          <th className="p-3 text-center">Boys</th>
                          <th className="p-3 text-center">Girls</th>
                          <th className="p-3 text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-700 font-medium">
                        {[
                          { no: 1, name: "Orphaned, Destitute, Abandoned, Runaway", b: "51", g: "96", t: "147" },
                          { no: 2, name: "Intellectually Disabled", b: "—", g: "—", t: "—" },
                          { no: 3, name: "Juvenile Delinquents", b: "45", g: "—", t: "45" },
                        ].map((row) => (
                          <tr key={row.no}>
                            <td className="p-3 text-center font-mono">{row.no}</td>
                            <td className="p-3">{row.name}</td>
                            <td className="p-3 text-center">{row.b}</td>
                            <td className="p-3 text-center">{row.g}</td>
                            <td className="p-3 text-center font-bold">{row.t}</td>
                          </tr>
                        ))}
                        <tr className="bg-slate-50/50 font-bold border-t border-slate-200 text-navy">
                          <td className="p-3"></td>
                          <td className="p-3 uppercase text-[10px] tracking-wider text-slate-400">Total Admitted</td>
                          <td className="p-3 text-center text-primary-blue">96</td>
                          <td className="p-3 text-center text-primary-blue">96</td>
                          <td className="p-3 text-center text-accent-blue">192</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8 — History & Milestone Timeline */}
        <section id="timeline" className="section-padding bg-white scroll-mt-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16 flex flex-col items-center gap-4">
              <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
                Milestones & Updates
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
                History & Milestone Updates
              </h2>
              <div className="w-12 h-[3px] bg-accent-blue rounded-full"></div>
            </div>

            {/* Vertical timeline line container */}
            <div className="relative border-l-2 border-slate-300/80 ml-4 md:ml-32 flex flex-col gap-12">
              {/* Static Foundation Milestone */}
              <div className="relative pl-8 md:pl-12">
                {/* Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary-blue border-4 border-white shadow-md"></div>
                {/* Date tag for desktop */}
                <div className="hidden md:block absolute -left-36 top-1 text-right w-24">
                  <span className="font-heading font-extrabold text-sm text-primary-blue uppercase tracking-wider">1942</span>
                  <p className="text-[9px] text-slate-400 font-bold">Foundation</p>
                </div>
                {/* Content Card */}
                <div className="bg-soft p-6 rounded-2xl border border-slate-100 shadow-md">
                  <span className="md:hidden text-xs font-bold text-primary-blue block mb-1">1942 &bull; Foundation</span>
                  <h3 className="font-heading font-bold text-primary-blue text-base sm:text-lg mb-2">
                    Established in Ahmednagar
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Rescued children during the war emergency. The Remand Home was officially set up under local leadership, sanctioned by the British District Collector.
                  </p>
                </div>
              </div>

              {/* Dynamic Database Timelines */}
              {timelineEvents.map((event) => (
                <div key={event.id} className="relative pl-8 md:pl-12 animate-fade-up">
                  {/* Dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary-blue border-4 border-white shadow-md"></div>
                  {/* Date tag for desktop */}
                  <div className="hidden md:block absolute -left-36 top-1 text-right w-24">
                    <span className="font-heading font-extrabold text-sm text-primary-blue uppercase tracking-wider">
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                      })}
                    </span>
                    <p className="text-[9px] text-slate-400 font-bold">Milestone</p>
                  </div>
                  {/* Content Card */}
                  <div className="bg-soft p-6 rounded-2xl border border-slate-100 shadow-md flex flex-col md:flex-row gap-6">
                    {event.imageUrl && (
                      <div className="relative w-full md:w-36 h-28 shrink-0 rounded-xl overflow-hidden shadow-sm">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 150px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <span className="md:hidden text-xs font-bold text-primary-blue block mb-1">
                        {new Date(event.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <h3 className="font-heading font-bold text-primary-blue text-base sm:text-lg mb-2">
                        {event.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {event.summary}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
