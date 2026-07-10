// src/app/gallery/page.tsx
import prisma from "@/lib/db";
import PublicNav from "@/components/public-nav";
import PublicFooter from "@/components/public-footer";
import GalleryView from "@/components/gallery-view";

export const revalidate = 0;

export default async function GalleryPage() {
  // Query gallery items from the database
  const galleryItems = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen bg-soft">
      <PublicNav />

      <main className="flex-grow">
        {/* Banner Section */}
        <section className="bg-light-blue text-slate-700 py-16 px-6 border-b border-slate-200 text-center">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <span className="font-heading text-xs uppercase font-extrabold tracking-widest text-accent-blue">
              Media Archives
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-navy">
              Life & Rehabilitation in Frames
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Explore classrooms, libraries, nurseries, and recreational programs at the Remand Home of Ahilyanagar through documented photographs.
            </p>
          </div>
        </section>

        {/* Masonry layout container */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto px-6">
            <GalleryView initialItems={galleryItems} />
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
