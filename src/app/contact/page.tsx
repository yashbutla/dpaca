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
            alt="DPACA Observation Home Compound Gates"
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
              Get in Touch with DPACA & Observation Home
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
                      { name: "Instagram", href: "https://www.instagram.com/dpaca.nagar/", color: "hover:text-pink-500", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                      { name: "Facebook", href: "https://www.facebook.com/district.probation.and.after.care.association", color: "hover:text-blue-600", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-xl bg-white border border-slate-200/80 hover:border-slate-300 text-slate-500 ${social.color} flex items-center justify-center transition-all shadow-sm`}
                        title={social.name}
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d={social.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>


                {/* Google Map Embed */}
                <div className="relative w-full h-[220px] rounded-card overflow-hidden shadow-md border border-slate-200/80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.3475674676542!2d74.72898627499045!3d19.092402382115594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcb1d30dc5f9e1%3A0xab5a443f228885b6!2sDistrict%20Probation%20And%20After%20Care%20Association%20Ahilyanagar!5e0!3m2!1sen!2sin!4v1784367776402!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="District Probation And After Care Association Ahilyanagar on Google Maps"
                  />
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
