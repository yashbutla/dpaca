// src/components/admin-login-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/actions/cms";
import { Landmark, Loader2, ShieldAlert } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg("Both fields are required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await loginAdmin({ username, password });
      if (response.error) {
        setErrorMsg(response.error);
      } else {
        // Refresh page so server component re-runs cookie check and loads the workspace
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("Failed to connect to authentication server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
      {/* Container */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-lg p-8 sm:p-10 flex flex-col gap-6">
        
        {/* Header Title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 text-accent-blue flex items-center justify-center shadow-sm">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-primary-blue tracking-tight leading-tight">
              DPACA Admin Portal
            </h2>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
              Authorized Access Only
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold rounded-2xl flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-xs font-bold text-primary-blue uppercase tracking-wide">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 transition-all text-slate-800"
              disabled={isSubmitting}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-bold text-primary-blue uppercase tracking-wide">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 transition-all text-slate-800"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-blue hover:bg-blue-700 disabled:bg-blue-400 text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
      
      {/* Footer Info */}
      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-6">
        District Probation & After Care Association
      </p>
    </div>
  );
}
