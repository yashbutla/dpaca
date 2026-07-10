// src/components/campus-facilities.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, Tv, Bed, ShieldCheck, Heart, Users, School, Cpu, Sprout, Award, Trophy, BookOpen } from "lucide-react";

interface FacilityItem {
  title: string;
  desc: string;
  imageUrl: string;
  icon: any;
}

export default function CampusFacilities() {
  const [activeTab, setActiveTab] = useState<"boys" | "girls" | "special" | "skills">("boys");

  const boysFacilities: FacilityItem[] = [
    {
      title: "Boys' Welfare Home",
      desc: "The Boys' Child Care Institution is a spacious and secure campus surrounded by natural greenery. It is meticulously maintained to provide a safe and nurturing environment for the children's overall well-being and growth. Every boy deserves a safe space to outgrow his past and step boldly into his purpose.",
      imageUrl: "/images/boys-home.png",
      icon: Building2
    },
    {
      title: "Boys' TV Hall",
      desc: "Here, stories on the screen inspire big dreams, and shared laughter heals quiet worries. Your support ensures our boys always have a warm and lively space to relax, connect, and just be kids.",
      imageUrl: "/images/boys-tv-hall.png",
      icon: Tv
    },
    {
      title: "Boys' Dormitory",
      desc: "This room provides the boys with a clean bed, personal storage space, and a structured daily routine. Your donation helps us cover the cost of utilities, fresh linens, and the everyday upkeep of their living quarters.",
      imageUrl: "/images/boys-dormitory.png",
      icon: Bed
    },
    {
      title: "Locker Room",
      desc: "The facility provides individual, secure steel storage lockers for the residents to ensure their personal belongings and clothes are kept safely and organized in a dedicated, private space.",
      imageUrl: "/images/boys-locker.png",
      icon: ShieldCheck
    },
    {
      title: "Boys' Sports & Cricket",
      desc: "On the pitch, these young men learn the profound values of teamwork, discipline, and the simple, healing joy of a shared victory. With your support, we can keep fueling their passion, ensuring they always have the resources to play, grow, and win at life.",
      imageUrl: "/images/boys-sports.png",
      icon: Trophy
    }
  ];

  const girlsFacilities: FacilityItem[] = [
    {
      title: "Girls' Dormitory",
      desc: "The spacious residential hall is meticulously set up with structured bunk beds and ample floor space to guarantee a neat, well-ventilated, and dignified sleeping environment for the girls.",
      imageUrl: "/images/girls-dormitory.png",
      icon: Bed
    },
    {
      title: "Locker Room",
      desc: "The center provides individual, securely lockable steel wardrobes to help the residents store their clothing and personal items neatly, promoting personal responsibility and privacy.",
      imageUrl: "/images/girls-locker.png",
      icon: ShieldCheck
    },
    {
      title: "Girls' Higher Secondary School",
      desc: "This sanctuary of learning stands as a promise of empowerment, a place where young women cultivate the strength to reshape their destinies. Your investment in their education unlocks a future filled with dignity, opportunity, and the resilience to flourish.",
      imageUrl: "/images/girls-higher-secondary.png",
      icon: School
    },
    {
      title: "Girls' Cricket",
      desc: "With determination in their eyes and bats in hand, our young women are breaking barriers and rewriting their own narratives of strength. Your investment helps protect their right to joy and builds an unwavering confidence that will guide them long after the game is over.",
      imageUrl: "/images/girls-cricket.png",
      icon: Trophy
    },
  ];

  const specialFacilities: FacilityItem[] = [
    {
      title: "Dining Hall",
      desc: "Beyond this doorway, we provide the essential nourishment that builds strong bodies and resilient spirits, one shared meal at a time. Help us continue to serve hope and stability, ensuring no child here — boy or girl — hungers for sustenance or the warmth of community.",
      imageUrl: "/images/girls-dining.png",
      icon: Heart
    },
    {
      title: "Classroom & Active Learning",
      desc: "Beyond these simple classroom walls, our children garner knowledge, their eager hands turning basic lessons into stepping stones of hope. We invite you to join us in sustaining this vibrant learning landscape, ensuring that every mind here can dream without limits.",
      imageUrl: "/images/classroom-learning.png",
      icon: BookOpen
    },
    {
      title: "Specialized Child Care Unit (SAA)",
      desc: "In this quiet sanctuary, our tiniest souls are held with the gentle care which turns fragile beginnings into stories of survival. Your love and support provide the warmth, nutrition, and safety these innocent babies need to grow strong and feel protected.",
      imageUrl: "/images/special-care.png",
      icon: Heart
    },
    {
      title: "Institution's Meeting Hall",
      desc: "The institution utilizes its spacious assembly grounds and meeting halls to host essential community collaborations, such as programs with the Rotary Club, ensuring the children receive valuable social exposure, mentorship, and support.",
      imageUrl: "/images/meeting-hall.png",
      icon: Users
    }
  ];

  const skillFacilities: FacilityItem[] = [
    {
      title: "School Facility",
      desc: "Adorned with playful, vibrant murals and equipped with modern learning tools like a television, this shared classroom turns daily lessons into a colorful adventure for all children. Your support ensures we can keep this joyful space thriving, giving these young minds the well-rounded and engaging education they deserve.",
      imageUrl: "/images/school-facility.png",
      icon: School
    },
    {
      title: "Sewing & Embroidery Class",
      desc: "With every careful stitch and beautifully embroidered bag, these girls are weaving the fabric of their own independence and financial security. The earnings from their creations are deposited directly into their personal accounts, ensuring that when they step out into the world, they carry both a valuable life skill and the seed of a self-reliant future.",
      imageUrl: "/images/sewing-class.png",
      icon: Award
    },
    {
      title: "The Computer Lab",
      desc: "Digital literacy is the gateway to the modern world. It empowers our youth to bridge gaps and unlock a universe of professional opportunities, training them in essential typing, software tools, and IT basics.",
      imageUrl: "/images/computer-lab.png",
      icon: Cpu
    },
    {
      title: "Organic Farming & Gardening",
      desc: "By tending to this soil with their own hands, our children learn that patience, hard work, and care can yield an abundant harvest. These homegrown fruits and vegetables feed our kitchen daily, cultivating vital life skills and self-reliance.",
      imageUrl: "/images/organic-farming.png",
      icon: Sprout
    },
    {
      title: "The Boys’ High School",
      desc: "Here, amidst the history of these halls, a new story of second chances and quiet ambition is being written every day. By partnering with us, you guide these young men toward a future of leadership and purpose.",
      imageUrl: "/images/boys-school.png",
      icon: School
    },
    {
      title: "Martial Arts Training",
      desc: "Learning martial arts instills our youth with an invaluable sense of self-discipline, focus, and inner confidence. Your generosity helps provide the coaching and guidance they need to channel their energy into remarkable achievements and life-long resilience.",
      imageUrl: "/images/martial-arts.png",
      icon: Trophy
    },
    {
      title: "Community Stage Events",
      desc: "Standing proudly on a larger stage, our children experience the profound joy of being recognized and celebrated by the wider community. With your partnership, we can continue to open doors to these incredible events, giving them moments of pure pride and a true sense of belonging.",
      imageUrl: "/images/community-stage.png",
      icon: Award
    },
    {
      title: "Chess & Kabaddi",
      desc: "From the quiet focus of a chessboard to the high-energy teamwork of Kabaddi, our children learn both strategy and strength through sports. Your support ensures they have access to a variety of activities that build sharp minds, strong bodies, and a healthy spirit of collaboration.",
      imageUrl: "/images/chess-kabaddi.png",
      icon: Trophy
    }
  ];

  const getActiveFacilities = () => {
    switch (activeTab) {
      case "girls": return girlsFacilities;
      case "special": return specialFacilities;
      case "skills": return skillFacilities;
      default: return boysFacilities;
    }
  };

  const tabs = [
    { id: "boys", label: "Boys' Section" },
    { id: "girls", label: "Girls' Section" },
    { id: "special", label: "Shared Facilities" },
    { id: "skills", label: "Empowerment & Skills" }
  ];

  return (
    <section className="section-padding bg-soft border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center gap-4">
          <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
            Campus Life
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
            Inside Our Campus: Facilities & Daily Life
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg leading-relaxed text-center">
            Explore the secure accommodation, nutritional facilities, educational centers, and developmental activities that help our children thrive.
          </p>
          <div className="w-12 h-[3px] bg-accent-blue rounded-full"></div>
        </div>

        {/* Tab pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`font-heading text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-full transition-all duration-200 cursor-pointer ${
                activeTab === t.id
                  ? "bg-accent-blue text-white shadow-md shadow-blue-500/20 scale-105"
                  : "bg-white text-primary-blue border border-slate-200/80 hover:border-slate-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Dynamic Facility Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getActiveFacilities().map((facility, idx) => {
            const Icon = facility.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-card overflow-hidden shadow-md hover:shadow-lg border border-slate-100 flex flex-col group transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Image frame */}
                <div className="relative w-full h-[220px] shrink-0 bg-slate-50 overflow-hidden">
                  <Image
                    src={facility.imageUrl}
                    alt={facility.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
                  {/* Category Badge at bottom-left */}
                  <div className="absolute bottom-4 left-4 bg-primary-blue text-white text-[10px] font-bold tracking-widest uppercase py-1.5 px-3.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Icon className="w-3.5 h-3.5 text-accent-blue" />
                    {tabs.find(t => t.id === activeTab)?.label}
                  </div>
                </div>

                {/* Text Block */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-navy text-lg sm:text-xl mb-3 group-hover:text-accent-blue transition-colors leading-tight">
                    {facility.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-grow">
                    {facility.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
