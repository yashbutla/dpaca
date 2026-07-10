// src/app/admin/page.tsx
import { cookies } from "next/headers";
import prisma from "@/lib/db";
import AdminWorkspace from "@/components/admin-workspace";
import AdminLoginForm from "@/components/admin-login-form";
import { getSettingsDict } from "@/actions/cms";

export const revalidate = 0;

export default async function AdminPage() {
  // 1. Session verification on server
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  
  let isAuthenticated = false;
  if (sessionToken) {
    const dbToken = await prisma.systemSetting.findUnique({
      where: { key: "admin_session_token" },
    });
    if (dbToken && dbToken.value === sessionToken && dbToken.value.trim() !== "") {
      isAuthenticated = true;
    }
  }

  // 2. Return login form if not authenticated (zero database queries for CMS objects)
  if (!isAuthenticated) {
    return <AdminLoginForm />;
  }

  // 3. Query all system models for CMS display only if fully authenticated
  const slides = await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
  });

  const gallery = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  const timeline = await prisma.timelineEvent.findMany({
    orderBy: { date: "desc" },
  });

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  const csr = await prisma.csrProject.findMany({
    orderBy: { createdAt: "asc" },
  });

  const inquiries = await prisma.contactEnquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: "asc" },
  });

  const boardMembers = await prisma.boardMember.findMany({
    orderBy: { order: "asc" },
  });

  const founders = await prisma.founder.findMany({
    orderBy: { order: "asc" },
  });

  const settings = await getSettingsDict();

  return (
    <AdminWorkspace
      initialSlides={slides}
      initialGallery={gallery}
      initialTimeline={timeline}
      initialTestimonials={testimonials}
      initialCsr={csr}
      initialInquiries={inquiries}
      initialPartners={partners}
      initialBoardMembers={boardMembers}
      initialFounders={founders}
      initialSettings={settings}
    />
  );
}

