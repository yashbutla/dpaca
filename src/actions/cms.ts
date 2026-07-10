// src/actions/cms.ts
"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { uploadImage } from "@/lib/upload";
import { z } from "zod";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function verifyAdminAuth() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  if (!sessionToken) {
    throw new Error("Unauthorized: No session token found.");
  }

  const dbToken = await prisma.systemSetting.findUnique({
    where: { key: "admin_session_token" },
  });

  if (!dbToken || !dbToken.value || dbToken.value !== sessionToken) {
    throw new Error("Unauthorized: Invalid session token.");
  }
}

export async function loginAdmin(data: { username: string; password: string }) {
  try {
    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    const expectedPassword = process.env.ADMIN_PASSWORD || "Password123";

    if (data.username !== expectedUsername || data.password !== expectedPassword) {
      return { error: "Invalid username or password credentials." };
    }

    const sessionToken = crypto.randomUUID();

    // Store in DB settings
    await prisma.systemSetting.upsert({
      where: { key: "admin_session_token" },
      update: { value: sessionToken },
      create: { key: "admin_session_token", value: sessionToken },
    });

    // Set secure cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return { success: true };
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: "An error occurred during login." };
  }
}

export async function logoutAdmin() {
  try {
    // Clear from DB
    await prisma.systemSetting.upsert({
      where: { key: "admin_session_token" },
      update: { value: "" },
      create: { key: "admin_session_token", value: "" },
    });

    // Clear cookie
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");

    return { success: true };
  } catch (error: any) {
    console.error("Logout error:", error);
    return { error: "An error occurred during logout." };
  }
}

// Helper helper to get settings as a key-value dictionary
export async function getSettingsDict() {
  const settings = await prisma.systemSetting.findMany();
  const dict: Record<string, string> = {};

  for (const s of settings as Array<{ key: string; value: string }>) {
    dict[s.key] = s.value;
  }

  return dict;
}

// Global System Settings actions
export async function updateSystemSettings(settings: Record<string, string>) {
  await verifyAdminAuth();
  for (const [key, value] of Object.entries(settings)) {
    await prisma.systemSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  revalidatePath("/");
  revalidatePath("/contact");
  return { success: true };
}

// Module A: Home Hero Manager Actions
export async function getHeroSlides() {
  return await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createHeroSlide(formData: FormData) {
  try {
    await verifyAdminAuth();
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const imageFile = formData.get("image") as File;
    const orderStr = formData.get("order") as string;

    if (!title || !subtitle) {
      return { error: "Title and subtitle are required." };
    }

    let imageUrl = "/images/hero-classroom.jpg"; // Default fallback
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    }

    const order = orderStr ? parseInt(orderStr, 10) : 0;

    await prisma.heroSlide.create({
      data: {
        title,
        subtitle,
        imageUrl,
        order,
        published: true,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create hero slide:", error);
    return { error: error.message || "Failed to save slide." };
  }
}

export async function deleteHeroSlide(id: string) {
  await verifyAdminAuth();
  await prisma.heroSlide.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}

export async function toggleHeroSlidePublish(id: string, published: boolean) {
  await verifyAdminAuth();
  await prisma.heroSlide.update({
    where: { id },
    data: { published },
  });
  revalidatePath("/");
  return { success: true };
}

// Module B: Gallery Media Center Actions
export async function getGalleryItems(category?: string) {
  if (category && category !== "All") {
    return await prisma.galleryItem.findMany({
      where: { category },
      orderBy: { createdAt: "desc" },
    });
  }
  return await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createGalleryItem(formData: FormData) {
  try {
    await verifyAdminAuth();
    const caption = formData.get("caption") as string;
    const category = formData.get("category") as string;
    const subcategory = formData.get("subcategory") as string | null;
    const imageFile = formData.get("image") as File;
    const isFeatured = formData.get("isFeatured") === "true";

    if (!caption || !category || !imageFile || imageFile.size === 0) {
      return { error: "Caption, category and a valid image file are required." };
    }

    const imageUrl = await uploadImage(imageFile);

    await prisma.galleryItem.create({
      data: {
        caption,
        category,
        subcategory: subcategory || null,
        imageUrl,
        isFeatured,
      },
    });

    revalidatePath("/");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save gallery item:", error);
    return { error: error.message || "Failed to upload image." };
  }
}

export async function deleteGalleryItem(id: string) {
  await verifyAdminAuth();
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/gallery");
  return { success: true };
}

export async function bulkDeleteGalleryItems(ids: string[]) {
  try {
    await verifyAdminAuth();
    await prisma.galleryItem.deleteMany({
      where: {
        id: { in: ids }
      }
    });
    revalidatePath("/");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error: any) {
    console.error("Failed bulk deleting gallery items:", error);
    return { error: error.message || "Failed to delete items." };
  }
}

export async function bulkMoveGalleryItems(ids: string[], newCategory: string, newSubcategory: string | null) {
  try {
    await verifyAdminAuth();
    await prisma.galleryItem.updateMany({
      where: {
        id: { in: ids }
      },
      data: {
        category: newCategory,
        subcategory: newSubcategory || null
      }
    });
    revalidatePath("/");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error: any) {
    console.error("Failed bulk moving gallery items:", error);
    return { error: error.message || "Failed to move items." };
  }
}

export async function toggleGalleryItemFeature(id: string, isFeatured: boolean) {
  await verifyAdminAuth();
  await prisma.galleryItem.update({
    where: { id },
    data: { isFeatured },
  });
  revalidatePath("/");
  revalidatePath("/gallery");
  return { success: true };
}

// Module C: News, Updates & Timeline Engine Actions
export async function getTimelineEvents() {
  return await prisma.timelineEvent.findMany({
    orderBy: { date: "desc" },
  });
}

export async function createTimelineEvent(formData: FormData) {
  try {
    await verifyAdminAuth();
    const title = formData.get("title") as string;
    const dateStr = formData.get("date") as string;
    const summary = formData.get("summary") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !dateStr || !summary) {
      return { error: "Title, date, and summary description are required." };
    }

    let imageUrl = "/images/update-alumni.jpg"; // Fallback
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    }

    await prisma.timelineEvent.create({
      data: {
        title,
        date: new Date(dateStr),
        summary,
        imageUrl,
      },
    });

    revalidatePath("/");
    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save timeline event:", error);
    return { error: error.message || "Failed to create timeline event." };
  }
}

export async function deleteTimelineEvent(id: string) {
  await verifyAdminAuth();
  await prisma.timelineEvent.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/about");
  return { success: true };
}

// Module D: Testimonials Ledger Actions
export async function getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createTestimonial(formData: FormData) {
  try {
    await verifyAdminAuth();
    const alumniName = formData.get("alumniName") as string;
    const profession = formData.get("profession") as string;
    const story = formData.get("story") as string;
    const imageFile = formData.get("image") as File;

    if (!alumniName || !profession || !story) {
      return { error: "Alumni Name, profession/title, and quote story are required." };
    }

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    }

    await prisma.testimonial.create({
      data: {
        alumniName,
        profession,
        story,
        imageUrl,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create testimonial:", error);
    return { error: error.message || "Failed to create testimonial." };
  }
}

export async function deleteTestimonial(id: string) {
  await verifyAdminAuth();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}

// Module E: CSR & Infrastructure Demand Tracker Actions
export async function getCsrProjects() {
  return await prisma.csrProject.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export async function createCsrProject(formData: FormData) {
  try {
    await verifyAdminAuth();
    const name = formData.get("name") as string;
    const dimensions = formData.get("dimensions") as string;
    const cost = formData.get("cost") as string;
    const status = formData.get("status") as string;

    if (!name || !status) {
      return { error: "Project name and funding status are required." };
    }

    await prisma.csrProject.create({
      data: {
        name,
        dimensions,
        cost,
        status,
      },
    });

    revalidatePath("/get-involved");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create project:", error);
    return { error: error.message || "Failed to add infrastructure demands." };
  }
}

export async function deleteCsrProject(id: string) {
  await verifyAdminAuth();
  await prisma.csrProject.delete({ where: { id } });
  revalidatePath("/get-involved");
  return { success: true };
}

export async function updateCsrProjectStatus(id: string, status: string) {
  await verifyAdminAuth();
  await prisma.csrProject.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/get-involved");
  return { success: true };
}

// Module F: Contact Enquiries Actions
export async function getContactEnquiries() {
  await verifyAdminAuth();
  return await prisma.contactEnquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
}

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Provide a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  message: z.string().min(10, { message: "Message details must be at least 10 characters." }),
});

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    // Validate inputs
    const validated = contactFormSchema.parse(data);

    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        message: validated.message,
        resolved: false,
      },
    });

    return { success: true, id: enquiry.id };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0]?.message || "Validation failed." };
    }
    console.error("Enquiry submission error:", error);
    return { error: "Server error. Please try again later." };
  }
}

export async function toggleContactEnquiryResolved(id: string, resolved: boolean) {
  await verifyAdminAuth();
  await prisma.contactEnquiry.update({
    where: { id },
    data: { resolved },
  });
  return { success: true };
}

export async function deleteContactEnquiry(id: string) {
  await verifyAdminAuth();
  await prisma.contactEnquiry.delete({ where: { id } });
  return { success: true };
}

// Module G: Partners & CSR Supporters Actions
export async function getPartners() {
  return await prisma.partner.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export async function createPartner(formData: FormData) {
  try {
    await verifyAdminAuth();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const imageFile = formData.get("image") as File;

    if (!name) {
      return { error: "Partner name is required." };
    }

    let logoUrl = null;
    if (imageFile && imageFile.size > 0) {
      logoUrl = await uploadImage(imageFile);
    }

    if (id) {
      const updateData: any = { name };
      if (logoUrl) {
        updateData.logoUrl = logoUrl;
      }
      await prisma.partner.update({
        where: { id },
        data: updateData,
      });
    } else {
      await prisma.partner.create({
        data: {
          name,
          logoUrl,
        },
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save partner:", error);
    return { error: error.message || "Failed to save partner." };
  }
}

export async function deletePartner(id: string) {
  await verifyAdminAuth();
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}

// Module H: Board Members Actions
export async function getBoardMembers() {
  return await prisma.boardMember.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createBoardMember(formData: FormData) {
  try {
    await verifyAdminAuth();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const imageFile = formData.get("image") as File;
    const orderStr = formData.get("order") as string;

    if (!name || !position) {
      return { error: "Name and position are required." };
    }

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    }

    const order = orderStr ? parseInt(orderStr, 10) : 0;

    if (id) {
      const updateData: any = {
        name,
        position,
        order,
      };
      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      }
      await prisma.boardMember.update({
        where: { id },
        data: updateData,
      });
    } else {
      await prisma.boardMember.create({
        data: {
          name,
          position,
          imageUrl,
          order,
        },
      });
    }

    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save board member:", error);
    return { error: error.message || "Failed to save board member." };
  }
}

export async function deleteBoardMember(id: string) {
  await verifyAdminAuth();
  await prisma.boardMember.delete({ where: { id } });
  revalidatePath("/about");
  return { success: true };
}

// Module I: Founders Actions
export async function getFounders() {
  return await prisma.founder.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createFounder(formData: FormData) {
  try {
    await verifyAdminAuth();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const initials = formData.get("initials") as string;
    const bio = formData.get("bio") as string;
    const imageFile = formData.get("image") as File;
    const orderStr = formData.get("order") as string;

    if (!name || !title || !initials || !bio) {
      return { error: "Name, Title, Initials, and Bio are required." };
    }

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    }

    const order = orderStr ? parseInt(orderStr, 10) : 0;

    if (id) {
      const updateData: any = {
        name,
        title,
        initials,
        bio,
        order,
      };
      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      }
      await prisma.founder.update({
        where: { id },
        data: updateData,
      });
    } else {
      await prisma.founder.create({
        data: {
          name,
          title,
          initials,
          bio,
          imageUrl,
          order,
        },
      });
    }

    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save founder:", error);
    return { error: error.message || "Failed to save founder." };
  }
}

export async function deleteFounder(id: string) {
  await verifyAdminAuth();
  await prisma.founder.delete({ where: { id } });
  revalidatePath("/about");
  return { success: true };
}


