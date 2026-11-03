import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDiet } from '../context/DietContext';
import { isFirebaseConfigured, getStoredFirebaseConfig } from '../services/firebase';
import { getCloudinaryConfig } from '../services/cloudinary';
import { ConfirmModal } from '../components/common/ConfirmModal';
import {
  Settings,
  Database,
  Cloud,
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Info,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { profile } = useAuth();
  const { schedule, recipes, groceries, bringFromIndia, personalShopping, notes, todos, resetAllData } = useDiet();

  const isConnectedToFirebase = isFirebaseConfigured();
  const currentFbConfig = getStoredFirebaseConfig();
  const currentCloudinary = getCloudinaryConfig();

  // Cloudinary Form State
  const [cloudName, setCloudName] = useState(currentCloudinary.cloudName);
  const [uploadPreset, setUploadPreset] = useState(currentCloudinary.uploadPreset);
  const [cloudinarySaved, setCloudinarySaved] = useState(false);

  // Firebase Form State
  const [apiKey, setApiKey] = useState(currentFbConfig?.apiKey || '');
  const [projectId, setProjectId] = useState(currentFbConfig?.projectId || '');
  const [authDomain, setAuthDomain] = useState(currentFbConfig?.authDomain || '');
  const [fbSaved, setFbSaved] = useState(false);

  // Confirm Reset Modal
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleSaveCloudinary = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('mgd_cloudinary_cloud_name', cloudName.trim());
    localStorage.setItem('mgd_cloudinary_preset', uploadPreset.trim());
    setCloudinarySaved(true);
    setTimeout(() => setCloudinarySaved(false), 3000);
  };

  const handleSaveFirebase = (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      apiKey: apiKey.trim(),
      projectId: projectId.trim(),
      authDomain: authDomain.trim() || `${projectId.trim()}.firebaseapp.com`,
      storageBucket: `${projectId.trim()}.appspot.com`,
      messagingSenderId: '',
      appId: '',
    };
    localStorage.setItem('mgd_custom_firebase_config', JSON.stringify(config));
    setFbSaved(true);
    setTimeout(() => {
      setFbSaved(false);
      window.location.reload();
    }, 1500);
  };

  const handleExportData = () => {
    const backup = {
      profile,
      schedule,
      recipes,
      groceries,
      bringFromIndia,
      personalShopping,
      notes,
      todos,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my_gym_diet_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-2xl bg-[#12141C] p-6 sm:p-8 border border-white/5 relative overflow-hidden">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 w-fit">
            <Settings className="w-3.5 h-3.5" /> Platform Configuration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            System Settings & Integrations
          </h1>
          <p className="text-xs text-zinc-400 max-w-xl">
            Configure Firebase cloud synchronization, Cloudinary image upload presets, export complete nutrition data, or reset to initial defaults.
          </p>
        </div>
      </div>

      {/* Cloudinary Integration Section */}
      <div className="rounded-2xl bg-[#12141C] p-6 sm:p-8 border border-white/5 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <div className="p-2.5 rounded-2xl bg-cyan-500/15 text-cyan-400">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-['Outfit']">
              Cloudinary Media Storage
            </h2>
            <p className="text-xs text-zinc-400">
              Used for profile pictures, recipe food photographs, and kitchen item snapshots
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveCloudinary} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Cloudinary Cloud Name
              </label>
              <input
                type="text"
                placeholder="e.g. gym-diet-app"
                value={cloudName}
                onChange={(e) => setCloudName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs font-mono focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Unsigned Upload Preset
              </label>
              <input
                type="text"
                placeholder="e.g. diet_unsigned"
                value={uploadPreset}
                onChange={(e) => setUploadPreset(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs font-mono focus:border-[#22c55e] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-zinc-500 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              If empty, images will automatically use high-performance local base64 storage.
            </span>

            <div className="flex items-center gap-2">
              {cloudinarySaved && (
                <span className="text-xs text-[#22c55e] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Cloudinary settings saved!
                </span>
              )}
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs shadow-md transition-all"
              >
                Save Cloudinary
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Firebase Cloud Connection */}
      <div className="rounded-2xl bg-[#12141C] p-6 sm:p-8 border border-white/5 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-['Outfit']">
                Firebase Authentication & Cloud Firestore
              </h2>
              <p className="text-xs text-zinc-400">
                Synchronizes multi-user authentication, 30-day schedules, and kitchen records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            {isConnectedToFirebase ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/30 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                Firebase Cloud Connected
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-semibold">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Local High-Speed Storage Active
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSaveFirebase} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Firebase API Key
              </label>
              <input
                type="text"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Firebase Project ID
              </label>
              <input
                type="text"
                placeholder="my-gym-diet-123"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Auth Domain
              </label>
              <input
                type="text"
                placeholder="my-gym-diet.firebaseapp.com"
                value={authDomain}
                onChange={(e) => setAuthDomain(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-zinc-500">
              Keys are stored securely in local browser storage or configured via .env variables.
            </span>

            <div className="flex items-center gap-2">
              {fbSaved && (
                <span className="text-xs text-[#22c55e] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Firebase updated! Reloading...
                </span>
              )}
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs shadow-md transition-all"
              >
                Connect Firebase
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Backup and Data Maintenance */}
      <div className="rounded-2xl bg-[#12141C] p-6 sm:p-8 border border-white/5 space-y-4">
        <h2 className="text-lg font-bold text-white font-['Outfit'] border-b border-white/5 pb-3">
          Data Management & Recovery
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div>
            <h3 className="text-sm font-semibold text-white">Full JSON Nutrition Backup</h3>
            <p className="text-xs text-zinc-400">
              Download your 30-day schedule, custom recipes, water logs, and notes as a portable JSON file.
            </p>
          </div>

          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition-colors shrink-0"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download Backup</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
          <div>
            <h3 className="text-sm font-semibold text-rose-300">Reset to Initial Anand Profile</h3>
            <p className="text-xs text-zinc-400">
              Clears custom modifications and restores Anand Pinisetty's preconfigured 30-day 120g dairy-free plan.
            </p>
          </div>

          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 font-semibold text-xs border border-rose-500/30 transition-colors shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Platform</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={resetAllData}
        title="Reset Entire Platform?"
        message="This will reset all your schedules, custom recipes, notes, and water history back to the original Anand Pinisetty starting profile. Proceed?"
        confirmText="Yes, Reset Everything"
      />
    </div>
  );
};
