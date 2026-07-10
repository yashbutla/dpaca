// src/components/admin-workspace.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Sliders,
  Image as ImageIcon,
  Clock as TimelineIcon,
  Quote,
  TrendingUp,
  Mail,
  Settings,
  LogOut,
  Upload,
  Trash2,
  Check,
  Plus,
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Lock,
  Eye,
  AlertCircle,
  Award,
  HeartHandshake,
  Users
} from "lucide-react";
import {
  createHeroSlide,
  deleteHeroSlide,
  toggleHeroSlidePublish,
  createGalleryItem,
  deleteGalleryItem,
  bulkDeleteGalleryItems,
  bulkMoveGalleryItems,
  toggleGalleryItemFeature,
  createTimelineEvent,
  deleteTimelineEvent,
  createTestimonial,
  deleteTestimonial,
  createCsrProject,
  deleteCsrProject,
  updateCsrProjectStatus,
  toggleContactEnquiryResolved,
  deleteContactEnquiry,
  updateSystemSettings,
  createPartner,
  deletePartner,
  createBoardMember,
  deleteBoardMember,
  createFounder,
  deleteFounder,
  logoutAdmin
} from "@/actions/cms";

interface AdminWorkspaceProps {
  initialSlides: any[];
  initialGallery: any[];
  initialTimeline: any[];
  initialTestimonials: any[];
  initialCsr: any[];
  initialInquiries: any[];
  initialPartners: any[];
  initialBoardMembers: any[];
  initialFounders: any[];
  initialSettings: Record<string, string>;
}

const DEFAULT_CATEGORIES = ["Education", "Recreation", "Vocational", "Shishugruha", "Infrastructure"];

export default function AdminWorkspace({
  initialSlides,
  initialGallery,
  initialTimeline,
  initialTestimonials,
  initialCsr,
  initialInquiries,
  initialPartners,
  initialBoardMembers,
  initialFounders,
  initialSettings
}: AdminWorkspaceProps) {
  const router = useRouter();

  // CMS States
  const [activeTab, setActiveTab] = useState("overview");
  const [slides, setSlides] = useState(initialSlides);
  const [gallery, setGallery] = useState(initialGallery);
  const [timeline, setTimeline] = useState(initialTimeline);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [csr, setCsr] = useState(initialCsr);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [partners, setPartners] = useState(initialPartners);
  const [editingPartner, setEditingPartner] = useState<any>(null);
  const [boardMembers, setBoardMembers] = useState(initialBoardMembers);
  const [editingBoardMember, setEditingBoardMember] = useState<any>(null);
  const [founders, setFounders] = useState(initialFounders);
  const [editingFounder, setEditingFounder] = useState<any>(null);
  const [settings, setSettings] = useState(initialSettings);

  // New States for Gallery Bulk Management
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [uploadCategory, setUploadCategory] = useState("Education");
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [uploadSubcategory, setUploadSubcategory] = useState("");
  const [isNewSubcategory, setIsNewSubcategory] = useState(false);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadIsFeatured, setUploadIsFeatured] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    total: number;
    current: number;
    filename: string;
    percent: number;
    status: 'idle' | 'uploading' | 'completed' | 'error';
  } | null>(null);

  // Selection states for grid checkboxes
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  const [showMoveModal, setShowMoveModal] = useState(false);
  
  // Bulk Move action form states
  const [moveCategory, setMoveCategory] = useState("Education");
  const [isMoveNewCategory, setIsMoveNewCategory] = useState(false);
  const [moveNewCategoryName, setMoveNewCategoryName] = useState("");
  const [moveSubcategory, setMoveSubcategory] = useState("");
  const [isMoveNewSubcategory, setIsMoveNewSubcategory] = useState(false);
  const [moveNewSubcategoryName, setMoveNewSubcategoryName] = useState("");

  // Filters and pagination
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterSubcategory, setFilterSubcategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  // Crop states for Founder Image
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [cropZoom, setCropZoom] = useState(1.0);
  const [cropOffset, setCropOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cropImgRef = useRef<HTMLImageElement>(null);

  // Reset crop states when selected/editing founder changes
  useEffect(() => {
    setCropImageSrc(null);
    setCropZoom(1.0);
    setCropOffset({ x: 0, y: 0 });
  }, [editingFounder]);

  // Crop canvas renderer
  const getCroppedFile = async (): Promise<File | null> => {
    if (!cropImgRef.current || !cropImageSrc) return null;

    const img = cropImgRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    // Fill with white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 400, 400);

    const containerSize = 240; // preview box width/height in CSS
    const scaleX = 400 / containerSize;
    const scaleY = 400 / containerSize;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    let dw = containerSize;
    let dh = containerSize;
    if (imgRatio > 1) {
      dh = containerSize / imgRatio;
    } else {
      dw = containerSize * imgRatio;
    }

    // Apply translations and scale relative to canvas size
    ctx.translate(200, 200); 
    ctx.scale(cropZoom, cropZoom); 
    ctx.translate((cropOffset.x * scaleX) / cropZoom, (cropOffset.y * scaleY) / cropZoom); 

    // Draw image centered
    ctx.drawImage(img, (-dw * scaleX) / 2, (-dh * scaleY) / 2, dw * scaleX, dh * scaleY);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "founder-cropped.jpg", { type: "image/jpeg" });
          resolve(file);
        } else {
          resolve(null);
        }
      }, "image/jpeg", 0.9);
    });
  };

  // Sync props to state dynamically when server component refreshes data
  useEffect(() => { setSlides(initialSlides); }, [initialSlides]);
  useEffect(() => { setGallery(initialGallery); }, [initialGallery]);
  useEffect(() => { setTimeline(initialTimeline); }, [initialTimeline]);
  useEffect(() => { setTestimonials(initialTestimonials); }, [initialTestimonials]);
  useEffect(() => { setCsr(initialCsr); }, [initialCsr]);
  useEffect(() => { setInquiries(initialInquiries); }, [initialInquiries]);
  useEffect(() => { setPartners(initialPartners); }, [initialPartners]);
  useEffect(() => { setBoardMembers(initialBoardMembers); }, [initialBoardMembers]);
  useEffect(() => { setFounders(initialFounders); }, [initialFounders]);
  useEffect(() => { setSettings(initialSettings); }, [initialSettings]);

  // Form loading states
  const [loading, setLoading] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogout = async () => {
    await logoutAdmin();
    router.refresh();
  };

  // ---------------- MODULE ACTIONS handlers ----------------

  // Slide publish toggle
  const handleTogglePublish = async (id: string, currentVal: boolean) => {
    const newVal = !currentVal;
    // optimistic update
    setSlides(slides.map(s => s.id === id ? { ...s, published: newVal } : s));
    await toggleHeroSlidePublish(id, newVal);
  };

  // Delete Slide
  const handleDeleteSlide = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;
    setSlides(slides.filter(s => s.id !== id));
    await deleteHeroSlide(id);
  };

  // Add Slide
  const handleAddSlide = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("slide");
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const result = await createHeroSlide(fd);
    if (result.error) {
      setErrorMsg(result.error);
    } else {
      form.reset();
      router.refresh();
    }
    setLoading(null);
  };

  // Delete Gallery item
  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery image?")) return;
    setGallery(gallery.filter(g => g.id !== id));
    await deleteGalleryItem(id);
  };

  // Toggle Gallery feature
  const handleToggleFeatured = async (id: string, currentVal: boolean) => {
    const newVal = !currentVal;
    setGallery(gallery.map(g => g.id === id ? { ...g, isFeatured: newVal } : g));
    await toggleGalleryItemFeature(id, newVal);
  };

  // Bulk Upload Handler
  const handleBulkUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uploadFiles || uploadFiles.length === 0) {
      setErrorMsg("Please select at least one image file.");
      return;
    }

    setLoading("gallery_upload");
    setErrorMsg(null);

    const filesArray = Array.from(uploadFiles);
    const totalFiles = filesArray.length;

    setUploadProgress({
      total: totalFiles,
      current: 0,
      filename: "",
      percent: 0,
      status: 'uploading'
    });

    const categoryToSave = isNewCategory ? newCategoryName.trim() : uploadCategory;
    const subcategoryToSave = isNewSubcategory ? newSubcategoryName.trim() : uploadSubcategory;

    if (!categoryToSave) {
      setErrorMsg("Category is required.");
      setLoading(null);
      setUploadProgress(null);
      return;
    }

    let successCount = 0;
    let failedCount = 0;

    for (let i = 0; i < totalFiles; i++) {
      const file = filesArray[i];
      setUploadProgress({
        total: totalFiles,
        current: i + 1,
        filename: file.name,
        percent: Math.round((i / totalFiles) * 100),
        status: 'uploading'
      });

      try {
        const fd = new FormData();
        fd.append("image", file);
        // Default to file name without extension if caption is blank
        const fileBaseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        fd.append("caption", uploadCaption.trim() ? uploadCaption.trim() : fileBaseName);
        fd.append("category", categoryToSave);
        if (subcategoryToSave) {
          fd.append("subcategory", subcategoryToSave);
        }
        if (uploadIsFeatured) {
          fd.append("isFeatured", "true");
        }

        const result = await createGalleryItem(fd);
        if (result.error) {
          console.error(`Error uploading ${file.name}:`, result.error);
          failedCount++;
        } else {
          successCount++;
        }
      } catch (err) {
        console.error(`Exception uploading ${file.name}:`, err);
        failedCount++;
      }
    }

    setUploadProgress({
      total: totalFiles,
      current: totalFiles,
      filename: `Completed: ${successCount} uploaded successfully, ${failedCount} failed.`,
      percent: 100,
      status: 'completed'
    });

    // Reset inputs
    setUploadFiles(null);
    setUploadCaption("");
    setNewCategoryName("");
    setNewSubcategoryName("");
    setIsNewCategory(false);
    setIsNewSubcategory(false);
    
    // Clear progress status after 3 seconds
    setTimeout(() => {
      setUploadProgress(null);
      setLoading(null);
      router.refresh();
    }, 3000);
  };

  // Bulk Delete Handler
  const handleBulkDelete = async () => {
    if (selectedImageIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete the ${selectedImageIds.length} selected images?`)) return;

    setLoading("gallery_bulk");
    const result = await bulkDeleteGalleryItems(selectedImageIds);
    if (result.error) {
      setErrorMsg(result.error);
    } else {
      setGallery(gallery.filter(g => !selectedImageIds.includes(g.id)));
      setSelectedImageIds([]);
      router.refresh();
    }
    setLoading(null);
  };

  // Bulk Move Handler
  const handleBulkMove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedImageIds.length === 0) return;

    const categoryToSave = isMoveNewCategory ? moveNewCategoryName.trim() : moveCategory;
    const subcategoryToSave = isMoveNewSubcategory ? moveNewSubcategoryName.trim() : moveSubcategory;

    if (!categoryToSave) {
      alert("Please select or type a Category.");
      return;
    }

    setLoading("gallery_bulk");
    const result = await bulkMoveGalleryItems(selectedImageIds, categoryToSave, subcategoryToSave || null);
    if (result.error) {
      setErrorMsg(result.error);
    } else {
      // Optimistic update
      setGallery(gallery.map(g => selectedImageIds.includes(g.id) ? { ...g, category: categoryToSave, subcategory: subcategoryToSave || null } : g));
      setSelectedImageIds([]);
      setShowMoveModal(false);
      setMoveNewCategoryName("");
      setMoveNewSubcategoryName("");
      setIsMoveNewCategory(false);
      setIsMoveNewSubcategory(false);
      router.refresh();
    }
    setLoading(null);
  };

  // Delete event
  const handleDeleteTimeline = async (id: string) => {
    if (!confirm("Are you sure you want to delete this timeline event?")) return;
    setTimeline(timeline.filter(t => t.id !== id));
    await deleteTimelineEvent(id);
  };

  // Add Timeline Event
  const handleAddTimeline = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("timeline");
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const result = await createTimelineEvent(fd);
    if (result.error) {
      setErrorMsg(result.error);
    } else {
      form.reset();
      router.refresh();
    }
    setLoading(null);
  };

  // Delete testimonial
  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    setTestimonials(testimonials.filter(t => t.id !== id));
    await deleteTestimonial(id);
  };

  // Add Testimonial
  const handleAddTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("testimonial");
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const result = await createTestimonial(fd);
    if (result.error) {
      setErrorMsg(result.error);
    } else {
      form.reset();
      router.refresh();
    }
    setLoading(null);
  };

  // Delete CSR project
  const handleDeleteCsr = async (id: string) => {
    if (!confirm("Are you sure you want to delete this CSR demand?")) return;
    setCsr(csr.filter(c => c.id !== id));
    await deleteCsrProject(id);
  };

  // Add CSR
  const handleAddCsr = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("csr");
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const result = await createCsrProject(fd);
    if (result.error) {
      setErrorMsg(result.error);
    } else {
      form.reset();
      router.refresh();
    }
    setLoading(null);
  };

  // Update CSR status from spreadsheet dropdown
  const handleCsrStatusChange = async (id: string, status: string) => {
    setCsr(csr.map(c => c.id === id ? { ...c, status } : c));
    await updateCsrProjectStatus(id, status);
  };

  // Check Enquiry Resolved
  const handleToggleEnquiryResolved = async (id: string, currentVal: boolean) => {
    const newVal = !currentVal;
    setInquiries(inquiries.map(i => i.id === id ? { ...i, resolved: newVal } : i));
    await toggleContactEnquiryResolved(id, newVal);
  };

  // Delete enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry log?")) return;
    setInquiries(inquiries.filter(i => i.id !== id));
    await deleteContactEnquiry(id);
  };

  // Settings update
  const handleUpdateSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("settings");
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = {
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      address: fd.get("address") as string,
      hours: fd.get("hours") as string,
    };
    setSettings(payload);
    await updateSystemSettings(payload);
    setLoading(null);
    alert("System settings updated successfully!");
  };

  // Add Partner
  const handleAddPartner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("partner");
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const result = await createPartner(fd);
    if (result.error) {
      setErrorMsg(result.error);
    } else {
      form.reset();
      setEditingPartner(null);
      router.refresh();
    }
    setLoading(null);
  };

  // Delete Partner
  const handleDeletePartner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partner?")) return;
    setPartners(partners.filter(p => p.id !== id));
    await deletePartner(id);
  };

  // Delete Board Member
  const handleDeleteBoardMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this board member?")) return;
    setBoardMembers(boardMembers.filter(m => m.id !== id));
    await deleteBoardMember(id);
  };

  // Add / Update Board Member
  const handleSaveBoardMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("board");
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const result = await createBoardMember(fd);
    if (result.error) {
      setErrorMsg(result.error);
    } else {
      form.reset();
      setEditingBoardMember(null);
      router.refresh();
    }
    setLoading(null);
  };

  // Delete Founder
  const handleDeleteFounder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this founder?")) return;
    setFounders(founders.filter(f => f.id !== id));
    await deleteFounder(id);
  };

  // File input change handler for cropper
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropImageSrc(reader.result as string);
        setCropZoom(1.0);
        setCropOffset({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add / Update Founder
  const handleSaveFounder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("founder");
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);

    // If a cropped image exists, crop it first and replace the file in FormData
    if (cropImageSrc) {
      try {
        const croppedFile = await getCroppedFile();
        if (croppedFile) {
          fd.set("image", croppedFile);
        }
      } catch (err: any) {
        console.error("Failed to crop image:", err);
        setErrorMsg("Failed to process cropped image.");
        setLoading(null);
        return;
      }
    }

    const result = await createFounder(fd);
    if (result.error) {
      setErrorMsg(result.error);
    } else {
      form.reset();
      setEditingFounder(null);
      router.refresh();
    }
    setLoading(null);
  };



  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-soft">
      {/* Left Sidebar navigation */}
      <aside className="w-full lg:w-[300px] bg-primary-blue text-slate-300 border-r border-slate-300 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-300 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/Dpaca-logo.png"
              alt="DPACA Logo"
              className="w-16 h-16 object-contain rounded bg-white p-1"
            />
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-white text-xs tracking-tight">
                DPACA CMS Panel
              </span>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-none">
                System Console
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 hover:text-rose-400 rounded transition-colors lg:hidden"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation lists */}
        <nav className="flex-grow p-6 flex flex-col gap-2">
          {[
            { id: "overview", label: "Overview Metrics", icon: LayoutDashboard },
            { id: "slider", label: "Hero Slider Manager", icon: Sliders },
            { id: "gallery", label: "Gallery Media Center", icon: ImageIcon },
            { id: "timeline", label: "Timeline & News Manager", icon: TimelineIcon },
            { id: "testimonials", label: "Testimonials Ledger", icon: Quote },
            { id: "csr", label: "CSR & Infrastructure Tracker", icon: TrendingUp },
            { id: "partners", label: "Valued Partners & CSR", icon: HeartHandshake },
            { id: "board", label: "Board Members", icon: Users },
            { id: "founders", label: "Founders Manager", icon: Award },
            { id: "inquiries", label: "Contact Enquiries Logs", icon: Mail },
            { id: "settings", label: "System Parameters", icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isTabActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setErrorMsg(null);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all text-left ${
                  isTabActive
                    ? "bg-accent-blue text-white shadow-md shadow-blue-500/15"
                    : "hover:bg-primary-blue hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-6 border-t border-slate-300 flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white font-heading text-xs font-semibold py-3 rounded-xl transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Public Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 font-heading text-xs font-bold uppercase py-3 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main dashboard content canvas */}
      <main className="flex-grow p-6 lg:p-12 overflow-y-auto max-w-7xl">
        
        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ---------------- PANEL 1: OVERVIEW METRICS ---------------- */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-8 animate-fade-up">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-primary-blue">Overview Metrics</h2>
              <p className="text-xs text-slate-500">Live analytical counts queried from the database models.</p>
            </div>

            {/* Grid of stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-card border border-slate-100 shadow-sm flex items-center gap-4">
                <span className="p-4 bg-primary-blue/5 text-primary-blue rounded-2xl">
                  <ImageIcon className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-2xl font-extrabold text-primary-blue">{gallery.length}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Gallery Images</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-card border border-slate-100 shadow-sm flex items-center gap-4">
                <span className="p-4 bg-primary-blue/5 text-primary-blue rounded-2xl">
                  <TimelineIcon className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-2xl font-extrabold text-primary-blue">{timeline.length}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active News Timeline</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-card border border-slate-100 shadow-sm flex items-center gap-4">
                <span className="p-4 bg-primary-blue/5 text-primary-blue rounded-2xl">
                  <Quote className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-2xl font-extrabold text-primary-blue">{testimonials.length}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Testimonials</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-card border border-slate-100 shadow-sm flex items-center gap-4">
                <span className="p-4 bg-rose-50 text-rose-600 rounded-2xl">
                  <Mail className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-2xl font-extrabold text-rose-600">
                    {inquiries.filter((i) => !i.resolved).length}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Unresolved Enquiries</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-card border border-slate-100 shadow-sm flex items-center gap-4">
                <span className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
                  <TrendingUp className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-2xl font-extrabold text-amber-600">
                    {csr.filter((c) => c.status.toLowerCase().includes("seeking")).length}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Projects Seeking CSR</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-card border border-slate-100 shadow-sm flex items-center gap-4">
                <span className="p-4 bg-primary-blue/5 text-primary-blue rounded-2xl">
                  <HeartHandshake className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-2xl font-extrabold text-primary-blue">{partners.length}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Valued Partners</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- PANEL 2: HOME HERO SLIDER MANAGER ---------------- */}
        {activeTab === "slider" && (
          <div className="flex flex-col gap-8 animate-fade-up">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-primary-blue">Home Hero Manager</h2>
              <p className="text-xs text-slate-500">Configure slides displaying inside the public banner carousel.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Add form */}
              <div className="lg:col-span-4 bg-white p-6 rounded-card border border-slate-100 shadow-sm flex flex-col gap-5">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">Add New Banner Slide</h3>
                <form onSubmit={handleAddSlide} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Headline Title</label>
                    <input
                      name="title"
                      type="text"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Subtitle Description</label>
                    <textarea
                      name="subtitle"
                      rows={3}
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Display Image</label>
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      className="bg-soft border border-slate-200 rounded-lg p-2 text-xs text-primary-blue"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Slide Order Position</label>
                    <input
                      name="order"
                      type="number"
                      defaultValue={slides.length + 1}
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-accent-blue hover:bg-blue-700 text-white py-3 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-colors mt-2"
                    disabled={loading === "slide"}
                  >
                    {loading === "slide" ? "Saving..." : "Add Banner"}
                  </button>
                </form>
              </div>

              {/* List table */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">Active Slides List</h3>
                <div className="bg-white rounded-card overflow-hidden border border-slate-100 shadow-sm">
                  <table className="w-full text-left text-xs text-slate-500 border-collapse">
                    <thead className="bg-slate-50 text-[10px] uppercase font-bold text-primary-blue border-b border-slate-100">
                      <tr>
                        <th className="p-4">Preview</th>
                        <th className="p-4">Details</th>
                        <th className="p-4">Order</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slides.map((slide) => (
                        <tr key={slide.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-4">
                            <div className="relative w-16 h-12 rounded overflow-hidden border border-slate-200">
                              <img src={slide.imageUrl} className="object-cover w-full h-full" alt="slide preview" />
                            </div>
                          </td>
                          <td className="p-4 max-w-xs">
                            <p className="font-bold text-primary-blue line-clamp-1">{slide.title}</p>
                            <p className="text-[10px] text-slate-400 line-clamp-1">{slide.subtitle}</p>
                          </td>
                          <td className="p-4 font-mono">{slide.order}</td>
                          <td className="p-4 text-center">
                            <label className="inline-flex items-center cursor-pointer justify-center">
                              <input
                                type="checkbox"
                                checked={slide.published}
                                onChange={() => handleTogglePublish(slide.id, slide.published)}
                                className="sr-only peer"
                              />
                              <div className="relative w-7 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-accent-blue"></div>
                            </label>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteSlide(slide.id)}
                              className="text-rose-500 hover:text-rose-700 p-1.5 rounded hover:bg-rose-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- PANEL 3: GALLERY MEDIA CENTER ---------------- */}
        {activeTab === "gallery" && (() => {
          // Dynamic category listings
          const dbCategories = Array.from(new Set(gallery.map(g => g.category).filter(Boolean))) as string[];
          const allCategories = Array.from(new Set([...DEFAULT_CATEGORIES.filter(c => c !== "All"), ...dbCategories]));
          
          // Dynamic subcategories based on upload selection
          const dbSubcategories = Array.from(
            new Set(
              gallery
                .filter(g => g.category.toLowerCase() === uploadCategory.toLowerCase())
                .map(g => g.subcategory)
                .filter(Boolean)
            )
          ) as string[];

          // Dynamic subcategories based on filter selection
          const filterSubcategories = Array.from(
            new Set(
              gallery
                .filter(g => filterCategory === "All" || g.category.toLowerCase() === filterCategory.toLowerCase())
                .map(g => g.subcategory)
                .filter(Boolean)
            )
          ) as string[];

          // Filter grid items
          const displayedGallery = gallery.filter((g) => {
            const matchesCategory = filterCategory === "All" || g.category.toLowerCase() === filterCategory.toLowerCase();
            const matchesSubcategory = filterSubcategory === "All" || 
              (filterSubcategory === "Uncategorized" && (!g.subcategory || g.subcategory.trim() === "")) ||
              (g.subcategory?.toLowerCase() === filterSubcategory.toLowerCase());
            return matchesCategory && matchesSubcategory;
          });

          // Pagination calculations
          const totalItems = displayedGallery.length;
          const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
          const paginatedGallery = displayedGallery.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

          return (
            <div className="flex flex-col gap-8 animate-fade-up">
              <div className="flex flex-col gap-1">
                <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-primary-blue">Gallery Media Center</h2>
                <p className="text-xs text-slate-500">Upload multiple photos and organize them into categories and subcategories (tabs/folders).</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Form upload & Progress */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  {/* Upload Form */}
                  <div className="bg-white p-6 rounded-card border border-slate-100 shadow-sm flex flex-col gap-5">
                    <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">Bulk Upload Photos</h3>
                    <form onSubmit={handleBulkUpload} className="flex flex-col gap-4">
                      {/* Image selector */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Select Images</label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => setUploadFiles(e.target.files)}
                          className="bg-soft border border-slate-200 rounded-lg p-2 text-xs text-primary-blue w-full file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-primary-blue file:text-white"
                          required
                        />
                        {uploadFiles && (
                          <span className="text-[10px] text-emerald-600 font-bold mt-1">
                            {uploadFiles.length} file(s) selected
                          </span>
                        )}
                      </div>

                      {/* Default Caption */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">
                          Default Caption <span className="text-slate-400 capitalize">(optional - uses filename if blank)</span>
                        </label>
                        <input
                          type="text"
                          value={uploadCaption}
                          onChange={(e) => setUploadCaption(e.target.value)}
                          placeholder="e.g. Annual Function 2025"
                          className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                        />
                      </div>

                      {/* Category Selection */}
                      <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Category Tab</label>
                          <label className="text-[10px] font-bold text-accent-blue cursor-pointer flex items-center gap-1">
                            <input
                              type="checkbox"
                              checked={isNewCategory}
                              onChange={(e) => setIsNewCategory(e.target.checked)}
                              className="w-3.5 h-3.5 rounded"
                            />
                            Create New Category
                          </label>
                        </div>
                        {isNewCategory ? (
                          <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Type new category..."
                            className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                            required
                          />
                        ) : (
                          <select
                            value={uploadCategory}
                            onChange={(e) => setUploadCategory(e.target.value)}
                            className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                          >
                            {allCategories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        )}
                      </div>

                      {/* Subcategory Selection */}
                      <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Sub-Gallery Tab (Folder)</label>
                          <label className="text-[10px] font-bold text-accent-blue cursor-pointer flex items-center gap-1">
                            <input
                              type="checkbox"
                              checked={isNewSubcategory}
                              onChange={(e) => setIsNewSubcategory(e.target.checked)}
                              className="w-3.5 h-3.5 rounded"
                            />
                            Create New Folder
                          </label>
                        </div>
                        {isNewSubcategory ? (
                          <input
                            type="text"
                            value={newSubcategoryName}
                            onChange={(e) => setNewSubcategoryName(e.target.value)}
                            placeholder="Type new folder name..."
                            className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                            required
                          />
                        ) : (
                          <select
                            value={uploadSubcategory}
                            onChange={(e) => setUploadSubcategory(e.target.value)}
                            className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                          >
                            <option value="">-- No Folder (Loose Photos) --</option>
                            {dbSubcategories.map(sub => (
                              <option key={sub} value={sub}>{sub}</option>
                            ))}
                          </select>
                        )}
                      </div>

                      {/* Featured checkbox */}
                      <div className="flex items-center gap-2 py-2 border-t border-slate-100 mt-1">
                        <input
                          type="checkbox"
                          id="uploadIsFeatured"
                          checked={uploadIsFeatured}
                          onChange={(e) => setUploadIsFeatured(e.target.checked)}
                          className="w-4 h-4 rounded text-accent-blue accent-accent-blue"
                        />
                        <label htmlFor="uploadIsFeatured" className="text-xs text-primary-blue font-bold">Feature on Homepage</label>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="bg-accent-blue hover:bg-blue-700 text-white py-3 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-colors mt-2"
                        disabled={loading === "gallery_upload" || loading === "gallery_bulk"}
                      >
                        {loading === "gallery_upload" ? "Starting Upload..." : `Upload ${uploadFiles ? uploadFiles.length : ''} Photos`}
                      </button>
                    </form>
                  </div>

                  {/* Upload Progress Status Overlay */}
                  {uploadProgress && (
                    <div className="bg-white p-6 rounded-card border border-slate-200 shadow-lg flex flex-col gap-4 animate-fade-in">
                      <div className="flex justify-between items-center">
                        <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-primary-blue">Upload Progress</h4>
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          {uploadProgress.current} / {uploadProgress.total} Files
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-accent-blue h-full transition-all duration-300 rounded-full"
                          style={{ width: `${uploadProgress.percent}%` }}
                        ></div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-col gap-1">
                        <p className="text-[11px] text-slate-700 font-semibold truncate">
                          {uploadProgress.status === 'uploading' ? 'Uploading:' : ''} {uploadProgress.filename}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {uploadProgress.percent}% Completed
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: List & Filters & Bulk Actions */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                  {/* Filters Bar */}
                  <div className="bg-white p-4 rounded-card border border-slate-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-3 items-center">
                      {/* Filter Category */}
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Category</span>
                        <select
                          value={filterCategory}
                          onChange={(e) => {
                            setFilterCategory(e.target.value);
                            setFilterSubcategory("All");
                            setCurrentPage(1);
                          }}
                          className="bg-soft border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-primary-blue focus:outline-none"
                        >
                          <option value="All">All Categories</option>
                          {allCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      {/* Filter Subcategory */}
                      {filterCategory !== "All" && (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Sub-Gallery Tab (Folder)</span>
                          <select
                            value={filterSubcategory}
                            onChange={(e) => {
                              setFilterSubcategory(e.target.value);
                              setCurrentPage(1);
                            }}
                            className="bg-soft border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-primary-blue focus:outline-none"
                          >
                            <option value="All">All Folders</option>
                            <option value="Uncategorized">Uncategorized (Loose Images)</option>
                            {filterSubcategories.map(sub => (
                              <option key={sub} value={sub}>{sub}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Master Checkbox / Status info */}
                    <div className="flex items-center gap-4 text-xs font-bold text-primary-blue">
                      <span>Total: {totalItems} items</span>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-500">
                        <input
                          type="checkbox"
                          checked={paginatedGallery.length > 0 && paginatedGallery.every(g => selectedImageIds.includes(g.id))}
                          onChange={(e) => {
                            if (e.target.checked) {
                              const pageIds = paginatedGallery.map(g => g.id);
                              setSelectedImageIds(prev => Array.from(new Set([...prev, ...pageIds])));
                            } else {
                              const pageIds = paginatedGallery.map(g => g.id);
                              setSelectedImageIds(prev => prev.filter(id => !pageIds.includes(id)));
                            }
                          }}
                          className="w-4 h-4 rounded text-accent-blue accent-accent-blue"
                        />
                        Select All on Page
                      </label>
                    </div>
                  </div>

                  {/* Index grid */}
                  {totalItems > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {paginatedGallery.map((g) => {
                        const isSelected = selectedImageIds.includes(g.id);
                        return (
                          <div 
                            key={g.id} 
                            className={`bg-white rounded-xl overflow-hidden border shadow-sm relative group flex flex-col transition-all duration-200 ${
                              isSelected ? "ring-2 ring-accent-blue border-transparent" : "border-slate-100"
                            }`}
                          >
                            {/* Checkbox Overlay (Visible on hover or if selected) */}
                            <div className={`absolute top-2 left-2 z-25 transition-opacity ${
                              isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedImageIds(prev => [...prev, g.id]);
                                  } else {
                                    setSelectedImageIds(prev => prev.filter(id => id !== g.id));
                                  }
                                }}
                                className="w-4 h-4 rounded bg-white text-accent-blue accent-accent-blue border border-slate-300 shadow cursor-pointer"
                              />
                            </div>

                            <div className="relative w-full h-28 bg-slate-50">
                              <img src={g.imageUrl} className="object-cover w-full h-full" alt="gallery thumbnail" />
                              <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                                <span className="bg-primary-blue/85 text-[8px] font-bold text-white uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                                  {g.category}
                                </span>
                                {g.subcategory && (
                                  <span className="bg-slate-700/85 text-[8px] font-bold text-white uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                                    {g.subcategory}
                                  </span>
                                )}
                              </div>
                              
                              {/* Action controls */}
                              <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                                <button
                                  onClick={() => handleToggleFeatured(g.id, g.isFeatured)}
                                  className={`p-1.5 rounded text-white cursor-pointer ${g.isFeatured ? "bg-accent-blue" : "bg-slate-700 hover:bg-slate-600"}`}
                                  title="Feature on Homepage"
                                >
                                  <Award className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteGallery(g.id)}
                                  className="p-1.5 rounded bg-rose-600 text-white hover:bg-rose-500 cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <div className="p-3 bg-white flex-grow">
                              <p className="text-[10px] text-primary-blue font-bold leading-tight line-clamp-2">{g.caption}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-white border border-slate-100 rounded-card shadow-sm flex flex-col items-center gap-3">
                      <p className="text-slate-400 font-heading font-bold text-sm">No photos found matching the criteria.</p>
                      <button
                        onClick={() => {
                          setFilterCategory("All");
                          setFilterSubcategory("All");
                        }}
                        className="text-[10px] font-heading font-bold text-accent-blue uppercase tracking-wider cursor-pointer"
                      >
                        Reset filters
                      </button>
                    </div>
                  )}

                  {/* Pagination control footer */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 bg-white p-4 border border-slate-100 rounded-card shadow-sm mt-2 text-xs font-semibold">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1.5 py-1 px-3 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 cursor-pointer text-slate-600"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Prev
                      </button>
                      <span className="text-slate-500 font-mono">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1.5 py-1 px-3 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 cursor-pointer text-slate-600"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Bulk Actions overlay bar (Shows when items are selected) */}
              {selectedImageIds.length > 0 && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[80] bg-slate-900/90 border border-slate-800 text-white rounded-2xl py-3.5 px-6 flex items-center justify-between gap-6 shadow-2xl backdrop-blur-md animate-fade-in w-[90%] max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="bg-accent-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-extrabold">
                      {selectedImageIds.length}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Selected items
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        // Prefill moveCategory
                        setMoveCategory(allCategories[0] || "Education");
                        setShowMoveModal(true);
                      }}
                      className="bg-slate-700 hover:bg-slate-600 text-white py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Organize
                    </button>
                    <button
                      onClick={handleBulkDelete}
                      className="bg-rose-600 hover:bg-rose-700 text-white py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Delete ({selectedImageIds.length})
                    </button>
                    <button
                      onClick={() => setSelectedImageIds([])}
                      className="text-slate-400 hover:text-white py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {/* Move / Re-categorize Modal dialog */}
              {showMoveModal && (
                <div className="fixed inset-0 z-[120] bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
                    {/* Header */}
                    <div className="flex justify-between items-center p-5 border-b border-slate-100">
                      <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-primary-blue">
                        Reorganize {selectedImageIds.length} Image(s)
                      </h4>
                      <button 
                        onClick={() => setShowMoveModal(false)}
                        className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleBulkMove} className="p-5 flex flex-col gap-4">
                      {/* Move Category */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Target Category</label>
                          <label className="text-[10px] font-bold text-accent-blue cursor-pointer flex items-center gap-1">
                            <input
                              type="checkbox"
                              checked={isMoveNewCategory}
                              onChange={(e) => setIsMoveNewCategory(e.target.checked)}
                              className="w-3.5 h-3.5 rounded"
                            />
                            Create New
                          </label>
                        </div>
                        {isMoveNewCategory ? (
                          <input
                            type="text"
                            value={moveNewCategoryName}
                            onChange={(e) => setMoveNewCategoryName(e.target.value)}
                            placeholder="Type new category..."
                            className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                            required
                          />
                        ) : (
                          <select
                            value={moveCategory}
                            onChange={(e) => setMoveCategory(e.target.value)}
                            className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                          >
                            {allCategories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        )}
                      </div>

                      {/* Move Subcategory */}
                      <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Target Folder (Sub-Gallery)</label>
                          <label className="text-[10px] font-bold text-accent-blue cursor-pointer flex items-center gap-1">
                            <input
                              type="checkbox"
                              checked={isMoveNewSubcategory}
                              onChange={(e) => setIsMoveNewSubcategory(e.target.checked)}
                              className="w-3.5 h-3.5 rounded"
                            />
                            Create New
                          </label>
                        </div>
                        {isMoveNewSubcategory ? (
                          <input
                            type="text"
                            value={moveNewSubcategoryName}
                            onChange={(e) => setMoveNewSubcategoryName(e.target.value)}
                            placeholder="Type new folder..."
                            className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                            required
                          />
                        ) : (
                          <select
                            value={moveSubcategory}
                            onChange={(e) => setMoveSubcategory(e.target.value)}
                            className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                          >
                            <option value="">-- No Folder (Loose Images) --</option>
                            {Array.from(
                              new Set(
                                gallery
                                  .filter(g => g.category.toLowerCase() === moveCategory.toLowerCase())
                                  .map(g => g.subcategory)
                                  .filter(Boolean)
                              )
                            ).map((sub: any) => (
                              <option key={sub} value={sub}>{sub}</option>
                            ))}
                          </select>
                        )}
                      </div>

                      {/* Footer actions */}
                      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-2">
                        <button
                          type="button"
                          onClick={() => setShowMoveModal(false)}
                          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-accent-blue hover:bg-blue-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          disabled={loading === "gallery_bulk"}
                        >
                          {loading === "gallery_bulk" ? "Moving..." : "Save Changes"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* ---------------- PANEL 4: UPDATES & TIMELINE ---------------- */}
        {activeTab === "timeline" && (
          <div className="flex flex-col gap-8 animate-fade-up">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-primary-blue">Timeline & News Manager</h2>
              <p className="text-xs text-slate-500">Post community and rehabilitation milestones directly onto the About timeline page.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Add */}
              <div className="lg:col-span-4 bg-white p-6 rounded-card border border-slate-100 shadow-sm flex flex-col gap-5">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">Publish New Event</h3>
                <form onSubmit={handleAddTimeline} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Headline Title</label>
                    <input
                      name="title"
                      type="text"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Event Date</label>
                    <input
                      name="date"
                      type="date"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Brief Summary</label>
                    <textarea
                      name="summary"
                      rows={4}
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Featured Image</label>
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      className="bg-soft border border-slate-200 rounded-lg p-2 text-xs text-primary-blue"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-accent-blue hover:bg-blue-700 text-white py-3 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-colors mt-2"
                    disabled={loading === "timeline"}
                  >
                    {loading === "timeline" ? "Publishing..." : "Publish to Live Timeline"}
                  </button>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">Active Timeline Events</h3>
                <div className="bg-white rounded-card overflow-hidden border border-slate-100 shadow-sm">
                  <table className="w-full text-left text-xs text-slate-500 border-collapse">
                    <thead className="bg-slate-50 text-[10px] uppercase font-bold text-primary-blue border-b border-slate-100">
                      <tr>
                        <th className="p-4">Image</th>
                        <th className="p-4">Headline</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timeline.map((event) => (
                        <tr key={event.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-4">
                            <div className="relative w-16 h-12 rounded overflow-hidden border border-slate-200">
                              <img src={event.imageUrl} className="object-cover w-full h-full" alt="timeline preview" />
                            </div>
                          </td>
                          <td className="p-4 max-w-xs">
                            <p className="font-bold text-primary-blue line-clamp-1">{event.title}</p>
                            <p className="text-[10px] text-slate-400 line-clamp-1">{event.summary}</p>
                          </td>
                          <td className="p-4 font-semibold text-primary-blue">
                            {new Date(event.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteTimeline(event.id)}
                              className="text-rose-500 hover:text-rose-700 p-1.5 rounded hover:bg-rose-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- PANEL 5: TESTIMONIALS LEDGER ---------------- */}
        {activeTab === "testimonials" && (
          <div className="flex flex-col gap-8 animate-fade-up">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-primary-blue">Testimonials Ledger</h2>
              <p className="text-xs text-slate-500">Edit alumni stories and quotes rendered inside the homepage cinemascape slider.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form add */}
              <div className="lg:col-span-4 bg-white p-6 rounded-card border border-slate-100 shadow-sm flex flex-col gap-5">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">Add Testimonial Entry</h3>
                <form onSubmit={handleAddTestimonial} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Alumni Name</label>
                    <input
                      name="alumniName"
                      type="text"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Profession / Active Title</label>
                    <input
                      name="profession"
                      type="text"
                      placeholder="e.g. Police Officer, Police Inspector"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Quote Story</label>
                    <textarea
                      name="story"
                      rows={5}
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Cinematic Background</label>
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      className="bg-soft border border-slate-200 rounded-lg p-2 text-xs text-primary-blue"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-accent-blue hover:bg-blue-700 text-white py-3 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-colors mt-2"
                    disabled={loading === "testimonial"}
                  >
                    {loading === "testimonial" ? "Saving..." : "Save Testimonial"}
                  </button>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">Testimonials List</h3>
                <div className="flex flex-col gap-4">
                  {testimonials.map((t) => (
                    <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-start gap-4">
                      <div>
                        <p className="font-heading font-bold text-primary-blue text-sm">{t.alumniName}</p>
                        <p className="text-[10px] text-accent-blue uppercase font-bold tracking-wider leading-none mt-1">{t.profession}</p>
                        <p className="text-xs text-slate-500 mt-3 italic leading-relaxed">&ldquo;{t.story}&rdquo;</p>
                      </div>
                      <button
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="text-rose-500 hover:text-rose-700 p-2 rounded hover:bg-rose-50 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- PANEL 6: CSR & INFRASTRUCTURE DEMANDS ---------------- */}
        {activeTab === "csr" && (
          <div className="flex flex-col gap-8 animate-fade-up">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-primary-blue">CSR & Infrastructure Tracker</h2>
              <p className="text-xs text-slate-500">Edit dimensions, budget, and funding tags dynamically on a spreadsheet layout.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Add */}
              <div className="lg:col-span-4 bg-white p-6 rounded-card border border-slate-100 shadow-sm flex flex-col gap-5">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">Add Structural Project</h3>
                <form onSubmit={handleAddCsr} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Project Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="e.g. Computer Lab Teacher Salary"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Dimensions / Capacity</label>
                    <input
                      name="dimensions"
                      type="text"
                      placeholder="e.g. 1500 sq ft Shishu Gruha Block"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Estimate Cost Budget</label>
                    <input
                      name="cost"
                      type="text"
                      placeholder="e.g. ₹25,00,000"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Funding Status</label>
                    <select
                      name="status"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                    >
                      <option value="Seeking Funding">Seeking Funding</option>
                      <option value="Urgent Requirement">Urgent Requirement</option>
                      <option value="Fully Funded">Fully Funded</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-accent-blue hover:bg-blue-700 text-white py-3 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-colors mt-2"
                    disabled={loading === "csr"}
                  >
                    {loading === "csr" ? "Adding..." : "Add Project"}
                  </button>
                </form>
              </div>

              {/* Spreadsheet layout Table */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">Spreadsheet Ledger</h3>
                <div className="bg-white rounded-card overflow-hidden border border-slate-100 shadow-sm">
                  <table className="w-full text-left text-xs text-slate-500 border-collapse">
                    <thead className="bg-slate-50 text-[10px] uppercase font-bold text-primary-blue border-b border-slate-100">
                      <tr>
                        <th className="p-4">Demand Project</th>
                        <th className="p-4">Dimensions</th>
                        <th className="p-4">Est. Cost</th>
                        <th className="p-4">Status Selection</th>
                        <th className="p-4 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {csr.map((project) => (
                        <tr key={project.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-4 font-bold text-primary-blue">{project.name}</td>
                          <td className="p-4 text-slate-500 font-medium">{project.dimensions || "—"}</td>
                          <td className="p-4 text-primary-blue font-bold">{project.cost || "—"}</td>
                          <td className="p-4">
                            <select
                              value={project.status}
                              onChange={(e) => handleCsrStatusChange(project.id, e.target.value)}
                              className="bg-soft border border-slate-200 rounded p-1 text-[11px] font-semibold text-primary-blue focus:outline-none focus:border-accent-blue"
                            >
                              <option value="Seeking Funding">Seeking Funding</option>
                              <option value="Urgent Requirement">Urgent Requirement</option>
                              <option value="Fully Funded">Fully Funded</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteCsr(project.id)}
                              className="text-rose-500 hover:text-rose-700 p-1.5 rounded hover:bg-rose-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- PANEL 6.5: PARTNERS & CSR SUPPORTERS ---------------- */}
        {activeTab === "partners" && (
          <div className="flex flex-col gap-8 animate-fade-up">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-primary-blue">Valued Partners & CSR</h2>
              <p className="text-xs text-slate-500">Manage institutional partners, foundations, and corporate sponsors displayed on the site.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Add/Edit form */}
              <div className="lg:col-span-4 bg-white p-6 rounded-card border border-slate-100 shadow-sm flex flex-col gap-5">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">
                  {editingPartner ? "Edit Partner" : "Add New Partner"}
                </h3>
                <form onSubmit={handleAddPartner} className="flex flex-col gap-4">
                  {editingPartner && (
                    <input type="hidden" name="id" value={editingPartner.id} />
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Partner Name</label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={editingPartner ? editingPartner.name : ""}
                      placeholder="e.g. Cummins India"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Logo Image</label>
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      className="bg-soft border border-slate-200 rounded-lg p-2 text-xs text-primary-blue"
                    />
                    {editingPartner && editingPartner.logoUrl ? (
                      <p className="text-[9px] text-slate-400">Keep blank to retain current logo.</p>
                    ) : (
                      <p className="text-[9px] text-slate-400">If no logo is uploaded, their name will be displayed as stylized text.</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-grow bg-accent-blue hover:bg-blue-700 text-white py-3 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-colors mt-2"
                      disabled={loading === "partner"}
                    >
                      {loading === "partner" ? "Saving..." : editingPartner ? "Update Partner" : "Add Partner"}
                    </button>
                    {editingPartner && (
                      <button
                        type="button"
                        onClick={() => setEditingPartner(null)}
                        className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-colors mt-2"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">Valued Partners List</h3>
                <div className="bg-white rounded-card overflow-hidden border border-slate-100 shadow-sm">
                  <table className="w-full text-left text-xs text-slate-500 border-collapse">
                    <thead className="bg-slate-50 text-[10px] uppercase font-bold text-primary-blue border-b border-slate-100">
                      <tr>
                        <th className="p-4">Logo</th>
                        <th className="p-4">Partner Name</th>
                        <th className="p-4">Date Added</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partners.map((partner) => (
                        <tr key={partner.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-4">
                            {partner.logoUrl ? (
                              <div className="relative w-16 h-10 rounded overflow-hidden border border-slate-200 bg-slate-50 p-1 flex items-center justify-center">
                                <img src={partner.logoUrl} className="object-contain max-w-full max-h-full" alt={`${partner.name} logo`} />
                              </div>
                            ) : (
                              <div className="w-16 h-10 rounded border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 font-bold">
                                No Logo
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-primary-blue">{partner.name}</p>
                          </td>
                          <td className="p-4 font-semibold text-primary-blue">
                            {new Date(partner.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="p-4 text-right flex justify-end gap-2">
                            <button
                              onClick={() => setEditingPartner(partner)}
                              className="text-accent-blue hover:text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 hover:bg-blue-50 rounded transition-all"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePartner(partner.id)}
                              className="text-rose-500 hover:text-rose-700 p-1.5 rounded hover:bg-rose-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {partners.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-slate-400">
                            No partners found. Add a partner using the form.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- PANEL 7: CONTACT ENQUIRIES LOGS ---------------- */}
        {activeTab === "inquiries" && (
          <div className="flex flex-col gap-8 animate-fade-up">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-primary-blue">Contact Enquiries Logs</h2>
              <p className="text-xs text-slate-500">Inbound messaging logs submitted from the public contact page.</p>
            </div>

            <div className="bg-white rounded-card overflow-hidden border border-slate-100 shadow-sm">
              <table className="w-full text-left text-xs text-slate-500 border-collapse">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-primary-blue border-b border-slate-100">
                  <tr>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4">Sender Details</th>
                    <th className="p-4">Message Context</th>
                    <th className="p-4">Inbound Date</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className={`border-b border-slate-100 hover:bg-slate-50/50 ${inq.resolved ? "opacity-60 bg-slate-50/20" : ""}`}>
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={inq.resolved}
                          onChange={() => handleToggleEnquiryResolved(inq.id, inq.resolved)}
                          className="w-4 h-4 rounded text-accent-blue accent-accent-blue cursor-pointer"
                          title={inq.resolved ? "Mark Unresolved" : "Mark Resolved"}
                        />
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-primary-blue">{inq.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{inq.email}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{inq.phone}</p>
                      </td>
                      <td className="p-4 max-w-sm">
                        <p className="text-slate-600 leading-normal line-clamp-3">{inq.message}</p>
                      </td>
                      <td className="p-4 text-slate-500 font-medium whitespace-nowrap">
                        {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteEnquiry(inq.id)}
                          className="text-rose-500 hover:text-rose-700 p-1.5 rounded hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-slate-400 font-medium">
                        No contact inquiries found in database logs.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- PANEL: BOARD MEMBERS & LEADERSHIP ---------------- */}
        {activeTab === "board" && (
          <div className="flex flex-col gap-8 animate-fade-up">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-primary-blue">Board Members & Leadership</h2>
              <p className="text-xs text-slate-500">Manage administrative leadership, trustees, and board members displayed on the About page.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Add/Edit form */}
              <div className="lg:col-span-4 bg-white p-6 rounded-card border border-slate-100 shadow-sm flex flex-col gap-5">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">
                  {editingBoardMember ? "Edit Board Member" : "Add Board Member"}
                </h3>
                <form onSubmit={handleSaveBoardMember} className="flex flex-col gap-4">
                  {editingBoardMember && (
                    <input type="hidden" name="id" value={editingBoardMember.id} />
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={editingBoardMember ? editingBoardMember.name : ""}
                      placeholder="e.g. Adv. Achyut Digambar Chaudhary"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Position / Title</label>
                    <input
                      name="position"
                      type="text"
                      defaultValue={editingBoardMember ? editingBoardMember.position : ""}
                      placeholder="e.g. Vice President, DPACA"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">
                      Profile Image
                    </label>
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      className="bg-soft border border-slate-200 rounded-lg p-2 text-xs text-primary-blue"
                    />
                    {editingBoardMember && editingBoardMember.imageUrl && (
                      <p className="text-[9px] text-slate-400">Keep blank to retain current image.</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Sort Order</label>
                    <input
                      name="order"
                      type="number"
                      defaultValue={editingBoardMember ? editingBoardMember.order : boardMembers.length + 1}
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-grow bg-accent-blue hover:bg-blue-700 text-white py-3 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-colors"
                      disabled={loading === "board"}
                    >
                      {loading === "board" ? "Saving..." : editingBoardMember ? "Update Member" : "Add Member"}
                    </button>
                    {editingBoardMember && (
                      <button
                        type="button"
                        onClick={() => setEditingBoardMember(null)}
                        className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">Active Board Members</h3>
                <div className="bg-white rounded-card overflow-hidden border border-slate-100 shadow-sm">
                  <table className="w-full text-left text-xs text-slate-500 border-collapse">
                    <thead className="bg-slate-50 text-[10px] uppercase font-bold text-primary-blue border-b border-slate-100">
                      <tr>
                        <th className="p-4">Photo</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Position</th>
                        <th className="p-4">Order</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boardMembers.map((member) => (
                        <tr key={member.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-4">
                            {member.imageUrl ? (
                              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-50">
                                <img src={member.imageUrl} className="object-cover w-full h-full" alt={member.name} />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 font-bold">
                                No Photo
                              </div>
                            )}
                          </td>
                          <td className="p-4 font-bold text-primary-blue">{member.name}</td>
                          <td className="p-4 text-slate-500 font-semibold">{member.position}</td>
                          <td className="p-4 font-mono">{member.order}</td>
                          <td className="p-4 text-right flex justify-end gap-2">
                            <button
                              onClick={() => setEditingBoardMember(member)}
                              className="text-accent-blue hover:text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 hover:bg-blue-50 rounded transition-all"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBoardMember(member.id)}
                              className="text-rose-500 hover:text-rose-700 p-1.5 rounded hover:bg-rose-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {boardMembers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-400">
                            No board members found. Add a member using the form.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- PANEL: FOUNDERS MANAGER ---------------- */}
        {activeTab === "founders" && (
          <div className="flex flex-col gap-8 animate-fade-up">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-primary-blue">Founders Manager</h2>
              <p className="text-xs text-slate-500">Manage the historical founders of DPACA displayed in the About section.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Add/Edit form */}
              <div className="lg:col-span-4 bg-white p-6 rounded-card border border-slate-100 shadow-sm flex flex-col gap-5">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">
                  {editingFounder ? "Edit Founder" : "Add Founder"}
                </h3>
                <form onSubmit={handleSaveFounder} className="flex flex-col gap-4">
                  {editingFounder && (
                    <input type="hidden" name="id" value={editingFounder.id} />
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={editingFounder ? editingFounder.name : ""}
                      placeholder="e.g. Late Sardar R. G. Mirikar"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Title / Role</label>
                    <input
                      name="title"
                      type="text"
                      defaultValue={editingFounder ? editingFounder.title : ""}
                      placeholder="e.g. Co-Founder & Social Reformer"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Initials (2 letters)</label>
                    <input
                      name="initials"
                      type="text"
                      maxLength={2}
                      defaultValue={editingFounder ? editingFounder.initials : ""}
                      placeholder="e.g. RM"
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none uppercase"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Short Biography</label>
                    <textarea
                      name="bio"
                      rows={4}
                      defaultValue={editingFounder ? editingFounder.bio : ""}
                      placeholder="Short bio description..."
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none resize-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="bg-soft border border-slate-200 rounded-lg p-2 text-xs text-primary-blue cursor-pointer"
                    />
                    {editingFounder && editingFounder.imageUrl && (
                      <p className="text-[9px] text-slate-400">Keep blank to retain current image.</p>
                    )}
                  </div>

                  {/* Visual Drag & Zoom Cropper */}
                  {cropImageSrc && (
                    <div className="flex flex-col gap-3 border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                      <span className="text-[10px] font-extrabold text-primary-blue uppercase tracking-wider block">Crop Profile Photo</span>
                      
                      {/* Crop Window (1:1 Aspect ratio, matches our card profile layout) */}
                      <div 
                        className="w-[240px] h-[240px] mx-auto rounded-[24px] overflow-hidden bg-white border border-slate-200 shadow-inner relative cursor-grab select-none active:cursor-grabbing"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                          setDragStart({ x: e.clientX - cropOffset.x, y: e.clientY - cropOffset.y });
                        }}
                        onMouseMove={(e) => {
                          if (!isDragging) return;
                          setCropOffset({
                            x: e.clientX - dragStart.x,
                            y: e.clientY - dragStart.y
                          });
                        }}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}
                      >
                        <img
                          ref={cropImgRef}
                          src={cropImageSrc}
                          alt="Crop preview"
                          draggable={false}
                          style={{
                            transform: `translate(${cropOffset.x}px, ${cropOffset.y}px) scale(${cropZoom})`,
                            objectFit: "contain"
                          }}
                          className="absolute w-full h-full pointer-events-none origin-center"
                        />
                        
                        {/* Cropping Grid Helper Overlay */}
                        <div className="absolute inset-0 border-2 border-accent-blue/30 pointer-events-none rounded-[24px] grid grid-cols-3 grid-rows-3">
                          <div className="border-r border-b border-accent-blue/15"></div>
                          <div className="border-r border-b border-accent-blue/15"></div>
                          <div className="border-b border-accent-blue/15"></div>
                          <div className="border-r border-b border-accent-blue/15"></div>
                          <div className="border-r border-b border-accent-blue/15"></div>
                          <div className="border-b border-accent-blue/15"></div>
                          <div className="border-r border-accent-blue/15"></div>
                          <div className="border-r border-accent-blue/15"></div>
                          <div></div>
                        </div>
                      </div>

                      <p className="text-[9px] text-slate-500 text-center leading-tight">
                        Drag the photo inside the grid box to center the face, then zoom using the slider.
                      </p>

                      {/* Zoom Slider */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[9px] font-bold text-slate-400">
                          <span>ZOOM LEVEL</span>
                          <span>{Math.round(cropZoom * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="1.0"
                          max="3.0"
                          step="0.05"
                          value={cropZoom}
                          onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                          className="w-full accent-accent-blue cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setCropZoom(1.0);
                          setCropOffset({ x: 0, y: 0 });
                        }}
                        className="text-[9px] text-accent-blue font-bold hover:underline self-end"
                      >
                        Reset Position
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wide">Sort Order</label>
                    <input
                      name="order"
                      type="number"
                      defaultValue={editingFounder ? editingFounder.order : founders.length + 1}
                      className="bg-soft border border-slate-200 rounded-lg p-2.5 text-xs text-primary-blue focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-grow bg-accent-blue hover:bg-blue-700 text-white py-3 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-colors"
                      disabled={loading === "founder"}
                    >
                      {loading === "founder" ? "Saving..." : editingFounder ? "Update Founder" : "Add Founder"}
                    </button>
                    {editingFounder && (
                      <button
                        type="button"
                        onClick={() => setEditingFounder(null)}
                        className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <h3 className="font-heading font-bold text-primary-blue text-sm uppercase tracking-wider">Active Founders</h3>
                <div className="bg-white rounded-card overflow-hidden border border-slate-100 shadow-sm">
                  <table className="w-full text-left text-xs text-slate-500 border-collapse">
                    <thead className="bg-slate-50 text-[10px] uppercase font-bold text-primary-blue border-b border-slate-100">
                      <tr>
                        <th className="p-4">Photo</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Order</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {founders.map((founder) => (
                        <tr key={founder.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-4">
                            {founder.imageUrl ? (
                              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-50">
                                <img src={founder.imageUrl} className="object-cover w-full h-full" alt={founder.name} />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center font-heading font-extrabold text-sm border-2 border-white shadow-sm">
                                {founder.initials}
                              </div>
                            )}
                          </td>
                          <td className="p-4 font-bold text-primary-blue">{founder.name}</td>
                          <td className="p-4 text-slate-500 font-semibold">{founder.title}</td>
                          <td className="p-4 font-mono">{founder.order}</td>
                          <td className="p-4 text-right flex justify-end gap-2">
                            <button
                              onClick={() => setEditingFounder(founder)}
                              className="text-accent-blue hover:text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 hover:bg-blue-50 rounded transition-all"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteFounder(founder.id)}
                              className="text-rose-500 hover:text-rose-700 p-1.5 rounded hover:bg-rose-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {founders.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-400">
                            No founders found. Add a founder using the form.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- PANEL 8: SYSTEM SETTINGS ---------------- */}
        {activeTab === "settings" && (
          <div className="flex flex-col gap-8 animate-fade-up">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-primary-blue">System Parameters Settings</h2>
              <p className="text-xs text-slate-500">Configure global metadata parameters that synchronize instantly onto the header/footer.</p>
            </div>

            <div className="max-w-2xl bg-white p-8 rounded-card border border-slate-100 shadow-sm">
              <form onSubmit={handleUpdateSettings} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wider">Official Email Contact</label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={settings.email || ""}
                    className="w-full bg-soft border border-slate-200 rounded-xl px-4 py-3 text-sm text-primary-blue focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wider">Official Telephone Hotline</label>
                  <input
                    name="phone"
                    type="text"
                    defaultValue={settings.phone || ""}
                    className="w-full bg-soft border border-slate-200 rounded-xl px-4 py-3 text-sm text-primary-blue focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wider">Postal Compound Address</label>
                  <input
                    name="address"
                    type="text"
                    defaultValue={settings.address || ""}
                    className="w-full bg-soft border border-slate-200 rounded-xl px-4 py-3 text-sm text-primary-blue focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-primary-blue uppercase tracking-wider">Visitor Hours Details</label>
                  <input
                    name="hours"
                    type="text"
                    defaultValue={settings.hours || ""}
                    className="w-full bg-soft border border-slate-200 rounded-xl px-4 py-3 text-sm text-primary-blue focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-accent-blue hover:bg-blue-700 text-white font-heading font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-md transition-colors mt-2 cursor-pointer"
                  disabled={loading === "settings"}
                >
                  {loading === "settings" ? "Synchronizing Settings..." : "Save Parameters"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
