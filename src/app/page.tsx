// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/db";
import PublicNav from "@/components/public-nav";
import PublicFooter from "@/components/public-footer";
import DynamicSlider from "@/components/dynamic-slider";
import ContactForm from "@/components/contact-form";
import CampusCarousel from "@/components/campus-carousel";
import { 
  ArrowUpRight, 
  Scale, 
  ShieldAlert, 
  Heart, 
  GraduationCap, 
  ChevronRight, 
  Award, 
  CheckCircle, 
  Building2, 
  Sparkles, 
  ShieldCheck
} from "lucide-react";

// Set dynamic rendering so database changes show up instantly
export const revalidate = 0;

export default async function HomePage() {
  // Fetch dynamic content from local SQLite database
  const heroSlides = await prisma.heroSlide.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  const timelineEvents = await prisma.timelineEvent.findMany({
    orderBy: { date: "desc" },
    take: 2, // Grab the latest two features
  });





  return (
    <div className="flex flex-col min-h-screen bg-soft">
      {/* Dynamic Header */}
      <PublicNav />

      <main className="flex-grow">
        {/* 1. Home Banner (Dynamic Slider) */}
        <DynamicSlider slides={heroSlides} />

        {/* Live Campus Capacity Stats Bar */}
        <div className="bg-white border-y border-slate-200/60 shadow-sm py-6 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center p-2">
                <span className="text-3xl font-extrabold text-navy font-heading">90</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Sheltered Children</span>
              </div>
              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center p-2">
                <span className="text-3xl font-extrabold text-accent-blue font-heading">40</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Boys' Section Residents</span>
                <span className="text-[9px] text-slate-500 font-semibold uppercase mt-0.5">(30 Children's, 10 Observation)</span>
              </div>
              {/* Stat 3 */}
              <div className="flex flex-col items-center text-center p-2">
                <span className="text-3xl font-extrabold text-accent-blue font-heading">50</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Girls' Section Residents</span>
                <span className="text-[9px] text-slate-500 font-semibold uppercase mt-0.5">(45 Children's, 05 Observation)</span>
              </div>
              {/* Stat 4 */}
              <div className="flex flex-col items-center text-center p-2">
                <span className="text-sm font-extrabold text-navy font-heading uppercase py-2">07 to 18 Years</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Primary Care Age Group</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Quick Introduction Section */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              {/* Left Asymmetric administrative building image */}
              <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[450px] rounded-card overflow-hidden shadow-xl border border-slate-100 group">
                <Image
                  src="/images/OFFICE PHOTO.jpeg"
                  alt="DPACA Remand Home Administrative Office"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary-blue text-white text-[10px] font-bold tracking-widest uppercase py-1.5 px-3.5 rounded-full shadow-md">
                  Institutional HQ
                </div>
              </div>

              {/* Right text layout with a legal vector badge */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="flex items-center gap-2 text-accent-blue">
                  <Scale className="w-5 h-5" />
                  <span className="font-heading text-xs uppercase font-extrabold tracking-widest">
                    Government Mandated Care
                  </span>
                </div>

                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-navy leading-tight tracking-tight">
                  The Remand Home of Ahilyanagar
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  District Probation and After Care Association is popularly referred to as the Remand Home of Ahilyanagar. The Collector/District Magistrate is the ex-officio Chairman of this NGO.
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Registered under the Public Trust Act (Registration No. E-87), this pioneer institution is known across Maharashtra for its dedicated work catering to underfed and undernourished children from poor and destitute families. The average strength is approximately 300 children (girls and boys).
                </p>

                {/* Badges block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="flex items-start gap-2.5 p-3.5 bg-soft rounded-xl border border-slate-100 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-navy">Ex-Officio Chairman</p>
                      <p className="text-[10px] text-accent-blue font-semibold uppercase tracking-wider">Collector / District Magistrate</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3.5 bg-soft rounded-xl border border-slate-100 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-navy">Public Trust Registry</p>
                      <p className="text-[10px] text-accent-blue font-semibold uppercase tracking-wider">Reg No. E-87 Maharashtra</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-wider text-accent-blue hover:text-primary-blue transition-colors"
                  >
                    Explore Our Legacy
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. What We Do (Overview Grid) */}
        <section className="section-padding bg-soft border-y border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
              <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
                Core Initiatives
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-navy leading-tight tracking-tight">
                Our Operational Focus Areas
              </h2>
              <div className="w-12 h-[3px] bg-accent-blue rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-card overflow-hidden shadow-md hover:shadow-lg border border-slate-100 flex flex-col group transition-all duration-300 hover:-translate-y-1.5">
                <div className="relative w-full h-[220px]">
                  <Image
                    src="/images/lodging-boarding-eductaion.png"
                    alt="Lodging, Boarding, and Well-being"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-primary-blue text-white text-[10px] font-bold tracking-widest uppercase py-1.5 px-3 rounded-full flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-accent-blue" />
                    Welfare & Growth
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-navy text-lg sm:text-xl mb-3">
                    Lodging, Boarding & Education
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-grow">
                    Securing the shelter, meals, schooling, vocational training, and comprehensive well-being of boys and girls living within the institution.
                  </p>
                  <Link
                    href="/what-we-do"
                    className="mt-6 inline-flex items-center gap-1 font-heading text-xs font-bold text-accent-blue hover:text-primary-blue transition-colors w-fit"
                  >
                    Learn More <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-card overflow-hidden shadow-md hover:shadow-lg border border-slate-100 flex flex-col group transition-all duration-300 hover:-translate-y-1.5">
                <div className="relative w-full h-[220px]">
                  <Image
                    src="/images/Shishugruha.png"
                    alt="SAA Infant Adoption Services"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-primary-blue text-white text-[10px] font-bold tracking-widest uppercase py-1.5 px-3 rounded-full flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-accent-blue" />
                    Licensed SAA
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-navy text-lg sm:text-xl mb-3">
                    Shishugruha Adoption Center
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-grow">
                    Accredited specialized agency providing nurseries and legal adoption facilities for abandoned infants under CARA regulatory compliance.
                  </p>
                  <Link
                    href="/what-we-do"
                    className="mt-6 inline-flex items-center gap-1 font-heading text-xs font-bold text-accent-blue hover:text-primary-blue transition-colors w-fit"
                  >
                    Learn More <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-card overflow-hidden shadow-md hover:shadow-lg border border-slate-100 flex flex-col group transition-all duration-300 hover:-translate-y-1.5">
                <div className="relative w-full h-[220px]">
                  <Image
                    src="/images/Juvenile-care-observation.jpeg"
                    alt="Juvenile Justice Observation Home"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-primary-blue text-white text-[10px] font-bold tracking-widest uppercase py-1.5 px-3 rounded-full flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-accent-blue" />
                    Restorative Justice
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-navy text-lg sm:text-xl mb-3">
                    Juvenile Observation Home
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-grow">
                    Securing protective custody, psychological counseling, and restorative reform schedules for trial-involved youth under the statutory guidelines.
                  </p>
                  <Link
                    href="/what-we-do"
                    className="mt-6 inline-flex items-center gap-1 font-heading text-xs font-bold text-accent-blue hover:text-primary-blue transition-colors w-fit"
                  >
                    Learn More <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rights of the Child Section */}
        <section className="section-padding bg-soft border-t border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
              <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
                Foundational Principles
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-navy leading-tight tracking-tight">
                Championing the Rights of the Child
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg leading-relaxed text-center">
                We firmly believe that every child deserves a fair chance at life. We actively uphold these fundamental rights:
              </p>
              <div className="w-12 h-[3px] bg-accent-blue rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-card border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                <span className="p-3.5 bg-accent-blue/10 text-accent-blue rounded-2xl w-fit">
                  <Scale className="w-6 h-6" />
                </span>
                <h3 className="font-heading font-bold text-navy text-lg">Equality for All</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Every child’s welfare must be protected without discrimination based on class, caste, gender, creed, or background. These rights belong to all children, unconditionally.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-card border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                <span className="p-3.5 bg-accent-blue/10 text-accent-blue rounded-2xl w-fit">
                  <Heart className="w-6 h-6" />
                </span>
                <h3 className="font-heading font-bold text-navy text-lg">A Sense of Belonging</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Every child deserves to be nurtured, cared for, and raised with the love and dignity they would normally receive from a family member.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-card border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                <span className="p-3.5 bg-accent-blue/10 text-accent-blue rounded-2xl w-fit">
                  <Sparkles className="w-6 h-6" />
                </span>
                <h3 className="font-heading font-bold text-navy text-lg">Holistic Growth</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Access to the resources necessary for a child’s complete development- mentally, culturally, physically, and morally.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-8 rounded-card border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                <span className="p-3.5 bg-accent-blue/10 text-accent-blue rounded-2xl w-fit">
                  <Building2 className="w-6 h-6" />
                </span>
                <h3 className="font-heading font-bold text-navy text-lg">Basic Needs & Protection</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  It is our collective duty to ensure that hungry children are fed, sick children receive medical care, and orphaned children are fiercely protected.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-white p-8 rounded-card border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                <span className="p-3.5 bg-accent-blue/10 text-accent-blue rounded-2xl w-fit">
                  <ShieldAlert className="w-6 h-6" />
                </span>
                <h3 className="font-heading font-bold text-navy text-lg">Immediate Relief</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  In times of crisis, distress, or social emergencies, a child must always be the very first to receive active protection, support, and help.
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-white p-8 rounded-card border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                <span className="p-3.5 bg-accent-blue/10 text-accent-blue rounded-2xl w-fit">
                  <ShieldCheck className="w-6 h-6" />
                </span>
                <h3 className="font-heading font-bold text-navy text-lg">A Secure Future</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Every child must benefit from safety and development initiatives that teach them self-reliance, strictly protecting them from exploitation, neglect, or abuse.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Latest Updates & News (Milestone Cards) */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="flex flex-col gap-4">
                <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
                  News & Events
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-navy leading-tight tracking-tight">
                  Updates from the Remand Home
                </h2>
              </div>
              <Link
                href="/about#timeline"
                className="inline-flex items-center gap-2 bg-accent-blue hover:bg-blue-700 text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-md transition-colors"
              >
                View Full Timeline
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Light themed updates list */}
            <div className="flex flex-col gap-6 max-w-5xl mx-auto">
              {timelineEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-card overflow-hidden shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row gap-6 p-6"
                >
                  {event.imageUrl && (
                    <div className="relative w-full md:w-56 h-40 shrink-0 rounded-xl overflow-hidden shadow-sm">
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 220px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 text-accent-blue text-xs font-bold uppercase tracking-wider mb-2">
                        <span className="w-2 h-2 bg-accent-blue rounded-full animate-pulse"></span>
                        {new Date(event.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <h3 className="font-heading font-extrabold text-xl text-navy leading-snug mb-3">
                        {event.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                        {event.summary}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <Link
                        href="/about#timeline"
                        className="inline-flex items-center gap-1 font-heading text-xs font-bold text-accent-blue hover:text-primary-blue transition-colors"
                      >
                        Read Full Story <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Facilities Carousel */}
        <CampusCarousel />



        {/* 6. Combined Contact & Get Involved (CTA) */}
        <section className="section-padding bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
              {/* Left Column: CTA text and interactive options */}
              <div className="lg:col-span-6 flex flex-col gap-8 lg:pt-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-accent-blue">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span className="font-heading text-xs uppercase font-extrabold tracking-widest">
                      Every Child Deserves a Future
                    </span>
                  </div>
                  <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy leading-tight tracking-tight">
                    Take Action Now. Your Generosity Makes a Lasting Difference.
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Every meal, lesson, and safe night&rsquo;s sleep we provide is made possible by people like you. Partner with DPACA to fund vital infrastructure, sponsor study programs, or contribute immediate resources.
                  </p>
                </div>

                {/* Sub cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/get-involved#for-individuals">
                    <div className="bg-light-blue p-5 rounded-2xl border border-accent-blue/15 hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer flex flex-col gap-2 group h-full">
                      <span className="p-3 bg-accent-blue text-white rounded-xl w-fit group-hover:scale-105 transition-transform">
                        <Heart className="w-5 h-5 fill-white" />
                      </span>
                      <h4 className="font-heading font-extrabold text-navy text-sm sm:text-base mt-2">
                        Sponsor & Donate
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Sponsor nutritious meals, boarding clothes, or study books for boys and girls.
                      </p>
                    </div>
                  </Link>

                  <Link href="/get-involved#for-corporates">
                    <div className="bg-soft p-5 rounded-2xl border border-slate-200 hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer flex flex-col gap-2 group h-full">
                      <span className="p-3 bg-primary-blue text-white rounded-xl w-fit group-hover:scale-105 transition-transform">
                        <Building2 className="w-5 h-5" />
                      </span>
                      <h4 className="font-heading font-extrabold text-navy text-sm sm:text-base mt-2">
                        CSR Partnerships
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Explore statutory Section 135 corporate partnerships for structural improvements.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Right Column: Client-side Contact Form */}
              <div className="lg:col-span-6 w-full">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>


      </main>

      {/* Structured SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NGO",
            "name": "District Probation and After Care Association (DPACA)",
            "alternateName": "Remand Home of Ahilyanagar",
            "url": "https://dpaca-ahilyanagar.org",
            "logo": "https://dpaca-ahilyanagar.org/images/logo.png",
            "foundingDate": "1942",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "District probation and after Care association observation home and children Home, zarekar lane near sabjail",
              "addressLocality": "ahilyanagar",
              "addressRegion": "Maharashtra",
              "postalCode": "414001",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "0241-2345229",
              "contactType": "Administrative Inquiries"
            }
          })
        }}
      />
      {/* Legal Footer */}
      <PublicFooter />
    </div>
  );
}
