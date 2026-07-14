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
            Established in 1942, the District Probation and After Care Association (popularly known as the Remand Home of Ahilyanagar) is a pioneer social welfare trust under the leadership of the District Collector.
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
          <div className="flex gap-4">
            <Link href="/admin" className="text-slate-500 hover:text-accent-blue transition-colors">Administrative Panel Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
