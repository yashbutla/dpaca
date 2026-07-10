// src/components/campus-carousel.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { Building2, Tv, Bed, ShieldCheck, Heart, Users, School, Cpu, Sprout, Award, Trophy, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  title: string;
  desc: string;
  imageUrl: string;
  category: string;
  icon: any;
}

export default function CampusCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const facilities: CarouselItem[] = [
    // Boys Section
    {
      title: "Boys' Welfare Home",
      desc: "The Boys' Child Care Institution is a spacious and secure campus surrounded by natural greenery. It is meticulously maintained to provide a safe and nurturing environment for the children's overall well-being and growth. Every boy deserves a safe space to outgrow his past and step boldly into his purpose.",
      imageUrl: "/images/boys-home.png",
      category: "Boys' Section",
      icon: Building2
    },
    {
      title: "Boys' TV Hall",
      desc: "Here, stories on the screen inspire big dreams, and shared laughter heals quiet worries. Your support ensures our boys always have a warm and lively space to relax, connect, and just be kids.",
      imageUrl: "/images/boys-tv-hall.png",
      category: "Boys' Section",
      icon: Tv
    },
    {
      title: "Boys' Dormitory",
      desc: "This room provides the boys with a clean bed, personal storage space, and a structured daily routine. Your donation helps us cover the cost of utilities, fresh linens, and the everyday upkeep of their living quarters.",
      imageUrl: "/images/boys-dormitory.png",
      category: "Boys' Section",
      icon: Bed
    },
    {
      title: "Locker Room",
      desc: "The facility provides individual, secure steel storage lockers for the residents to ensure their personal belongings and clothes are kept safely and organized in a dedicated, private space.",
      imageUrl: "/images/boys-locker.png",
      category: "Boys' Section",
      icon: ShieldCheck
    },
    {
      title: "Boys' Sports & Cricket",
      desc: "On the pitch, these young men learn the profound values of teamwork, discipline, and the simple, healing joy of a shared victory. With your support, we can keep fueling their passion, ensuring they always have the resources to play, grow, and win at life.",
      imageUrl: "/images/boys-sports.png",
      category: "Boys' Section",
      icon: Trophy
    },
    // Girls Section
    {
      title: "Girls' Dormitory",
      desc: "The spacious residential hall is meticulously set up with structured bunk beds and ample floor space to guarantee a neat, well-ventilated, and dignified sleeping environment for the girls.",
      imageUrl: "/images/girls-dormitory.png",
      category: "Girls' Section",
      icon: Bed
    },
    {
      title: "Locker Room",
      desc: "The center provides individual, securely lockable steel wardrobes to help the residents store their clothing and personal items neatly, promoting personal responsibility and privacy.",
      imageUrl: "/images/girls-locker.png",
      category: "Girls' Section",
      icon: ShieldCheck
    },
    {
      title: "Girls' Higher Secondary School",
      desc: "This sanctuary of learning stands as a promise of empowerment, a place where young women cultivate the strength to reshape their destinies. Your investment in their education unlocks a future filled with dignity, opportunity, and the resilience to flourish.",
      imageUrl: "/images/girls-higher-secondary.png",
      category: "Girls' Section",
      icon: School
    },
    {
      title: "Girls' Cricket",
      desc: "With determination in their eyes and bats in hand, our young women are breaking barriers and rewriting their own narratives of strength. Your investment helps protect their right to joy and builds an unwavering confidence that will guide them long after the game is over.",
      imageUrl: "/images/girls-cricket.png",
      category: "Girls' Section",
      icon: Trophy
    },
    // Shared Facilities
    {
      title: "Dining Hall",
      desc: "Beyond this doorway, we provide the essential nourishment that builds strong bodies and resilient spirits, one shared meal at a time. Help us continue to serve hope and stability, ensuring no child here — boy or girl — hungers for sustenance or the warmth of community.",
      imageUrl: "/images/girls-dining.png",
      category: "Shared Facility",
      icon: Heart
    },
    {
      title: "Classroom & Active Learning",
      desc: "Beyond these simple classroom walls, our children garner knowledge, their eager hands turning basic lessons into stepping stones of hope. We invite you to join us in sustaining this vibrant learning landscape, ensuring that every mind here can dream without limits.",
      imageUrl: "/images/classroom-learning.png",
      category: "Shared Facility",
      icon: BookOpen
    },
    {
      title: "Specialized Child Care Unit (SAA)",
      desc: "In this quiet sanctuary, our tiniest souls are held with the gentle care which turns fragile beginnings into stories of survival. Your love and support provide the warmth, nutrition, and safety these innocent babies need to grow strong and feel protected.",
      imageUrl: "/images/special-care.png",
      category: "Shared Facility",
      icon: Heart
    },
    {
      title: "Institution's Meeting Hall",
      desc: "The institution utilizes its spacious assembly grounds and meeting halls to host essential community collaborations, such as programs with the Rotary Club, ensuring the children receive valuable social exposure, mentorship, and support.",
      imageUrl: "/images/meeting-hall.png",
      category: "Shared Facility",
      icon: Users
    },
    // Skills & Empowerment
    {
      title: "School Facility",
      desc: "Adorned with playful, vibrant murals and equipped with modern learning tools like a television, this shared classroom turns daily lessons into a colorful adventure for all children. Your support ensures we can keep this joyful space thriving, giving these young minds the well-rounded and engaging education they deserve.",
      imageUrl: "/images/school-facility.png",
      category: "Skills & Education",
      icon: School
    },
    {
      title: "Sewing & Embroidery Class",
      desc: "With every careful stitch and beautifully embroidered bag, these girls are weaving the fabric of their own independence and financial security. The earnings from their creations are deposited directly into their personal accounts, ensuring that when they step out into the world, they carry both a valuable life skill and the seed of a self-reliant future.",
      imageUrl: "/images/sewing-class.png",
      category: "Skills & Education",
      icon: Award
    },
    {
      title: "The Computer Lab",
      desc: "Digital literacy is the gateway to the modern world. It empowers our youth to bridge gaps and unlock a universe of professional opportunities, training them in essential typing, software tools, and IT basics.",
      imageUrl: "/images/computer-lab.png",
      category: "Skills & Education",
      icon: Cpu
    },
    {
      title: "Organic Farming & Gardening",
      desc: "By tending to this soil with their own hands, our children learn that patience, hard work, and care can yield an abundant harvest. These homegrown fruits and vegetables feed our kitchen daily, cultivating vital life skills and self-reliance.",
      imageUrl: "/images/organic-farming.png",
      category: "Skills & Education",
      icon: Sprout
    },
    {
      title: "The Boys’ High School",
      desc: "Here, amidst the history of these halls, a new story of second chances and quiet ambition is being written every day. By partnering with us, you guide these young men toward a future of leadership and purpose.",
      imageUrl: "/images/boys-school.png",
      category: "Skills & Education",
      icon: School
    },
    {
      title: "Martial Arts Training",
      desc: "Learning martial arts instills our youth with an invaluable sense of self-discipline, focus, and inner confidence. Your generosity helps provide the coaching and guidance they need to channel their energy into remarkable achievements and life-long resilience.",
      imageUrl: "/images/martial-arts.png",
      category: "Skills & Education",
      icon: Trophy
    },
    {
      title: "Community Stage Events",
      desc: "Standing proudly on a larger stage, our children experience the profound joy of being recognized and celebrated by the wider community. With your partnership, we can continue to open doors to these incredible events, giving them moments of pure pride and a true sense of belonging.",
      imageUrl: "/images/community-stage.png",
      category: "Skills & Education",
      icon: Award
    },
    {
      title: "Chess & Kabaddi",
      desc: "From the quiet focus of a chessboard to the high-energy teamwork of Kabaddi, our children learn both strategy and strength through sports. Your support ensures they have access to a variety of activities that build sharp minds, strong bodies, and a healthy spirit of collaboration.",
      imageUrl: "/images/chess-kabaddi.png",
      category: "Skills & Education",
      icon: Trophy
    }
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Scroll by approximately one card width plus gap (e.g., 350px)
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Boys' Section":
        return "bg-blue-500/10 text-blue-600 border-blue-200/55";
      case "Girls' Section":
        return "bg-rose-500/10 text-rose-600 border-rose-200/55";
      case "Shared Facility":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-200/55";
      default:
        return "bg-purple-500/10 text-purple-600 border-purple-200/55";
    }
  };

  return (
    <section className="section-padding bg-soft border-t border-slate-200/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex flex-col gap-4">
            <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
              Virtual Tour
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-navy leading-tight tracking-tight">
              A Tour Inside Our Campus
            </h2>
            <div className="w-12 h-[3px] bg-accent-blue rounded-full"></div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              className="p-3 bg-white hover:bg-slate-50 text-navy border border-slate-200 rounded-full shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-3 bg-white hover:bg-slate-50 text-navy border border-slate-200 rounded-full shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Card Scroller Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide py-4 -my-4 px-2 -mx-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {facilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="w-[290px] sm:w-[330px] shrink-0 bg-white rounded-card overflow-hidden shadow-md hover:shadow-lg border border-slate-100 flex flex-col snap-start group transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Image frame */}
                <div className="relative w-full h-[220px] shrink-0 bg-slate-50 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 330px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
                  {/* Category Badge at bottom-left */}
                  <div className="absolute bottom-4 left-4 bg-primary-blue text-white text-[10px] font-bold tracking-widest uppercase py-1.5 px-3.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Icon className="w-3.5 h-3.5 text-accent-blue" />
                    {item.category}
                  </div>
                </div>

                {/* Content block */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-navy text-lg sm:text-xl mb-3 group-hover:text-accent-blue transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-grow line-clamp-4">
                    {item.desc}
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
