import Link from "next/link";
import { ShieldCheck, HeartHandshake, FileCheck, MapPin, Phone, Mail, Clock } from "lucide-react";
import prisma from "@/lib/db";


export default async function PublicFooter() {
  const dbPartners = await prisma.partner.findMany({
    orderBy: { createdAt: "asc" }
  });

  const dbSettings = await prisma.systemSetting.findMany();
  const settings: Record<string, string> = {};
  for (const s of dbSettings) {
    settings[s.key] = s.value;
  }

  const basePartners = dbPartners.length > 0 ? dbPartners : [
    { id: "1", name: "CSA – Catalysts for Social Action", logoUrl: null },
    { id: "2", name: "Cummins India", logoUrl: null },
    { id: "3", name: "Feeding India", logoUrl: null },
    { id: "4", name: "Shirdi Sansthan", logoUrl: null },
  ];

  // Repeat to ensure they scroll infinitely without visual gaps
  let partners = [...basePartners];
  while (partners.length < 12) {
    partners = [...partners, ...basePartners];
  }

  return (
    <footer className="w-full bg-white text-slate-600 font-sans mt-auto border-t border-slate-200">
      {/* Grayscale Partners Rail (Marquee) */}
      <div className="w-full bg-soft border-b border-slate-100 py-10 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <p className="text-center font-heading text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-6">
            Supported by Valued Partners & CSR Foundations
          </p>
          <div className="w-full overflow-hidden flex relative select-none">
            <div className="flex gap-20 md:gap-28 animate-marquee items-center">
              {/* Track 1 */}
              {partners.map((partner, idx) => {
                if (partner.logoUrl) {
                  return (
                    <div key={`logo1-${partner.id}-${idx}`} className="relative w-48 h-20 md:w-60 md:h-28 flex items-center justify-center shrink-0 opacity-95 hover:opacity-100 transition-all duration-300">
                      <img 
                        src={partner.logoUrl} 
                        alt={`${partner.name} logo`}
                        className="object-contain max-w-full max-h-full"
                      />
                    </div>
                  );
                }
                return (
                  <span 
                    key={`text1-${partner.id}-${idx}`} 
                    className="font-heading font-extrabold text-base sm:text-lg text-slate-500 tracking-tight shrink-0 opacity-80 hover:text-primary-blue hover:opacity-100 transition-colors cursor-default"
                  >
                    {partner.name}
                  </span>
                );
              })}
              
              {/* Track 2 (Duplicate for loop) */}
              {partners.map((partner, idx) => {
                if (partner.logoUrl) {
                  return (
                    <div key={`logo2-${partner.id}-${idx}`} className="relative w-48 h-20 md:w-60 md:h-28 flex items-center justify-center shrink-0 opacity-95 hover:opacity-100 transition-all duration-300">
                      <img 
                        src={partner.logoUrl} 
                        alt={`${partner.name} logo`}
                        className="object-contain max-w-full max-h-full"
                      />
                    </div>
                  );
                }
                return (
                  <span 
                    key={`text2-${partner.id}-${idx}`} 
                    className="font-heading font-extrabold text-base sm:text-lg text-slate-500 tracking-tight shrink-0 opacity-80 hover:text-primary-blue hover:opacity-100 transition-colors cursor-default"
                  >
                    {partner.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>


      {/* Main Footer Links & Information Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/Dpaca-logo.png"
              alt="DPACA Logo"
              className="w-20 h-20 object-contain"
            />
            <span className="font-heading font-bold text-navy text-base tracking-tight">
              DPACA AHILYANAGAR
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mt-2">
            Established in 1942, the District Probation and After Care Association (popularly known as the Observation Home of Ahilyanagar) is a pioneer social welfare trust under the leadership of the District Collector.
          </p>
          <p className="text-[11px] text-accent-blue font-semibold leading-normal mt-1">
            Registered under the Public Trust Act (Reg No. E-87)
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-heading font-bold text-navy text-xs uppercase tracking-widest mb-5">
            Quick Navigation
          </h4>
          <ul className="grid grid-cols-2 gap-3 text-xs">
            <li>
              <Link href="/" className="text-slate-600 hover:text-accent-blue transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/about" className="text-slate-600 hover:text-accent-blue transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/what-we-do" className="text-slate-600 hover:text-accent-blue transition-colors">What We Do</Link>
            </li>
            <li>
              <Link href="/gallery" className="text-slate-600 hover:text-accent-blue transition-colors">Gallery</Link>
            </li>
            <li>
              <Link href="/get-involved" className="text-slate-600 hover:text-accent-blue transition-colors">Get Involved</Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-600 hover:text-accent-blue transition-colors">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Institutional & Legal Badges */}
        <div>
          <h4 className="font-heading font-bold text-navy text-xs uppercase tracking-widest mb-5">
            Legal & Compliance
          </h4>
          <ul className="flex flex-col gap-4 text-xs text-slate-600">
            <li className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
              <div>
                <p className="text-navy font-semibold">Income Tax Exemption</p>
                <p className="text-[10px] text-slate-500">Under Section 80G of IT Act</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <FileCheck className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
              <div>
                <p className="text-navy font-semibold">Adoption License No</p>
                <p className="text-[10px] text-slate-500 font-mono">AHN-37/SAA/2020/037</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <HeartHandshake className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
              <div>
                <p className="text-navy font-semibold">CSR Partner Eligible</p>
                <p className="text-[10px] text-slate-500">Ready for Institutional CSR Audits</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Office details */}
        <div>
          <h4 className="font-heading font-bold text-navy text-xs uppercase tracking-widest mb-5">
            Get in Touch
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
              <span>{settings.address || "District probation and after Care association observation home and children Home, zarekar lane near sabjail, ahilyanagar."}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent-blue shrink-0" />
              <a href={`tel:${(settings.phone || "0241-2345229").replace(/\s+/g, "")}`} className="hover:underline">
                {settings.phone || "0241-2345229"}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
              <div className="flex flex-col">
                {settings.email ? (
                  settings.email.split(",").map((email, idx) => (
                    <a key={idx} href={`mailto:${email.trim()}`} className="hover:underline">
                      {email.trim()}
                    </a>
                  ))
                ) : (
                  <>
                    <a href="mailto:dpaca1942@rediffmail.com" className="hover:underline">dpaca1942@rediffmail.com</a>
                    <a href="mailto:dpaca1977@gmail.com" className="hover:underline">dpaca1977@gmail.com</a>
                  </>
                )}
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent-blue shrink-0" />
              <span>{settings.hours || "Mon - Sat: 10:00 AM - 6:00 PM"}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="w-full bg-soft text-slate-500 py-6 px-6 border-t border-slate-200 text-center text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} DPACA Ahilyanagar. All Rights Reserved. Designed in compliance with national child welfare standards.</p>
          <div className="flex items-center gap-5">
            {/* Social Links */}
            <a
              href="https://www.instagram.com/dpaca.nagar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow DPACA on Instagram"
              className="text-slate-500 hover:text-pink-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/district.probation.and.after.care.association"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow DPACA on Facebook"
              className="text-slate-500 hover:text-blue-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
