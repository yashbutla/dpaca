// src/app/contact/page.tsx
import prisma from "@/lib/db";
import PublicNav from "@/components/public-nav";
import PublicFooter from "@/components/public-footer";
import ContactForm from "@/components/contact-form";
import { getSettingsDict } from "@/actions/cms";
import { MapPin, Phone, Mail, Clock, Landmark, ShieldCheck } from "lucide-react";
import Image from "next/image";

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await getSettingsDict();

  return (
    <div className="flex flex-col min-h-screen bg-soft">
      <PublicNav />

      <main className="flex-grow">
        {/* Banner Section */}
        <section className="relative w-full h-[320px] lg:h-[400px] flex items-center justify-center overflow-hidden bg-primary-blue">
          <Image
            src="/images/contact-banner.jpg"
            alt="DPACA Remand Home Compound Gates"
            fill
            priority
            className="object-cover object-center brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-primary-blue/40 z-0"></div>
          <div className="relative max-w-4xl mx-auto px-6 text-center z-10 text-white flex flex-col gap-4">
            <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
              Connect With Us
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Get in Touch with DPACA & Remand Home
            </h1>
          </div>
        </section>

        {/* Form and Contact details body */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              {/* Left Column: Details & Map */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
                    Official Roster Contacts
                  </span>
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary-blue">
                    Administrative Offices
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    For official inquiries, court orders regarding juvenile transfers, adoption screenings, or corporate CSR compliance audits, please reach our administrative team during office hours.
                  </p>
                </div>

                {/* Vector details list */}
                <div className="flex flex-col gap-5 text-sm text-slate-600">
                  <div className="flex items-start gap-4">
                    <span className="p-3 bg-white text-accent-blue rounded-xl border border-slate-100 shadow-sm shrink-0">
                      <MapPin className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-bold text-primary-blue text-xs uppercase tracking-wider">Office Location</p>
                      <p className="text-xs sm:text-sm mt-0.5">{settings.address || "District probation and after Care association observation home and children Home, zarekar lane near sabjail, ahilyanagar."}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="p-3 bg-white text-accent-blue rounded-xl border border-slate-100 shadow-sm shrink-0">
                      <Phone className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-bold text-primary-blue text-xs uppercase tracking-wider">Phone Lines</p>
                      <p className="text-xs sm:text-sm mt-0.5">
                        <a href={`tel:${(settings.phone || "0241-2345229").replace(/\s+/g, "")}`} className="hover:underline">
                          {settings.phone || "0241-2345229"}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="p-3 bg-white text-accent-blue rounded-xl border border-slate-100 shadow-sm shrink-0">
                      <Mail className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-bold text-primary-blue text-xs uppercase tracking-wider">Official Email</p>
                      <p className="text-xs sm:text-sm mt-0.5">
                        {settings.email ? (
                          settings.email.split(",").map((email, idx) => (
                            <span key={idx} className="block">
                              <a href={`mailto:${email.trim()}`} className="hover:underline text-accent-blue">{email.trim()}</a>
                            </span>
                          ))
                        ) : (
                          <>
                            <span className="block"><a href="mailto:dpaca1942@rediffmail.com" className="hover:underline text-accent-blue">dpaca1942@rediffmail.com</a></span>
                            <span className="block"><a href="mailto:dpaca1977@gmail.com" className="hover:underline text-accent-blue">dpaca1977@gmail.com</a></span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="p-3 bg-white text-accent-blue rounded-xl border border-slate-100 shadow-sm shrink-0">
                      <Clock className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-bold text-primary-blue text-xs uppercase tracking-wider">Office Hours</p>
                      <p className="text-xs sm:text-sm mt-0.5">{settings.hours || "Monday - Saturday: 10:00 AM - 6:00 PM"}</p>
                    </div>
                  </div>
                </div>

                {/* Ex-officio trust credentials check block */}
                <div className="p-5 bg-white rounded-2xl border border-slate-200/50 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-primary-blue">
                    <ShieldCheck className="w-5 h-5 text-accent-blue shrink-0" />
                    <span className="font-heading font-extrabold text-xs uppercase tracking-wider">Trust Credentials</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Under the direct chairmanship of the Collector/District Magistrate of Ahilyanagar. All financial receipts qualify for Section 80G tax exemptions.
                  </p>
                </div>

                {/* Social Media Links Block */}
                <div className="p-5 bg-white rounded-2xl border border-slate-200/50 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-primary-blue">
                    <span className="font-heading font-extrabold text-xs uppercase tracking-wider">Connect With Us Online</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {[
                      { name: "Facebook", href: "https://facebook.com/dpaca-ahilyanagar", icon: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" },
                      { name: "Twitter", href: "https://twitter.com/dpaca-ahilyanagar", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                      { name: "LinkedIn", href: "https://linkedin.com/company/dpaca-ahilyanagar", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                      { name: "YouTube", href: "https://youtube.com/c/dpaca-ahilyanagar", icon: "M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.527 3.545 12 3.545 12 3.545s-7.527 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.022 0 12 0 12s0 3.978.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.86.508 9.388.508 9.388.508s7.527 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.978 24 12 24 12s0-3.978-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 hover:border-slate-300 text-slate-500 hover:text-accent-blue flex items-center justify-center transition-all shadow-sm"
                        title={social.name}
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d={social.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Google Map Placeholder canvas */}
                <div className="relative w-full h-[220px] rounded-card overflow-hidden shadow-md border border-slate-200/80 bg-slate-200 flex flex-col justify-center items-center text-center p-6 gap-2">
                  {/* Styled mock map illustration */}
                  <div className="absolute inset-0 bg-slate-100 opacity-55 pattern-grid-slate-300"></div>
                  <div className="w-12 h-12 bg-accent-blue text-white rounded-full flex items-center justify-center shadow-md animate-bounce z-10">
                    <MapPin className="w-6 h-6 fill-white" />
                  </div>
                  <h4 className="font-heading font-extrabold text-primary-blue text-xs z-10 mt-2 text-center px-4">District Probation & After Care Association</h4>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider z-10">Google Map Location Canvas</p>
                </div>
              </div>

              {/* Right Column: Contact form */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>

            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
