import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadImageToCloudinary } from '../services/cloudinary';
import {
  User,
  Camera,
  Dumbbell,
  Scale,
  Ruler,
  ShieldAlert,
  Flame,
  Droplets,
  Save,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, resetPassword } = useAuth();

  const [displayName, setDisplayName] = useState(profile.displayName);
  const [username, setUsername] = useState(profile.username);
  const [age, setAge] = useState(profile.age);
  const [weight, setWeight] = useState(profile.weight);
  const [height, setHeight] = useState(profile.height);
  const [dailyProteinTarget, setDailyProteinTarget] = useState(profile.dailyProteinTarget);
  const [dailyCaloriesTarget, setDailyCaloriesTarget] = useState(profile.dailyCaloriesTarget);
  const [dietaryRestriction, setDietaryRestriction] = useState(profile.dietaryRestriction);
  const [fitnessGoal, setFitnessGoal] = useState(profile.fitnessGoal);
  const [dailyWaterTargetMl, setDailyWaterTargetMl] = useState(profile.dailyWaterTargetMl);
  const [photoURL, setPhotoURL] = useState(profile.photoURL || '');

  const [uploading, setUploading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [passwordSent, setPasswordSent] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const url = await uploadImageToCloudinary(file);
        setPhotoURL(url);
        await updateProfile({ photoURL: url });
      } catch (err) {
        console.error('Photo upload failed:', err);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      displayName,
      username,
      age: Number(age) || 21,
      weight: Number(weight) || 61,
      height,
      dailyProteinTarget: Number(dailyProteinTarget) || 120,
      dailyCaloriesTarget: Number(dailyCaloriesTarget) || 1950,
      dietaryRestriction,
      fitnessGoal,
      dailyWaterTargetMl: Number(dailyWaterTargetMl) || 2600,
      photoURL,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePasswordReset = async () => {
    if (profile.email) {
      await resetPassword(profile.email);
      setPasswordSent(true);
      setTimeout(() => setPasswordSent(false), 4000);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Profile Header Banner */}
      <div className="rounded-2xl bg-[#12141C] p-6 sm:p-8 border border-white/5 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          {/* Avatar with Upload Badge */}
          <div className="relative group shrink-0">
            <img
              src={photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={displayName}
              className="w-28 h-28 rounded-3xl object-cover ring-4 ring-[#22c55e]/30 shadow-2xl"
            />
            <label className="absolute -bottom-2 -right-2 p-2.5 rounded-2xl bg-[#22c55e] text-black cursor-pointer shadow-lg hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
            {uploading && (
              <div className="absolute inset-0 bg-black/60 rounded-3xl flex items-center justify-center text-xs text-white font-mono">
                Uploading...
              </div>
            )}
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#22c55e] px-2.5 py-0.5 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30">
                Active Athlete Profile
              </span>
              <span className="text-xs font-semibold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Strictly Zero Dairy
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              {displayName}
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-zinc-400">
              <span>@{username}</span>
              <span>•</span>
              <span>{profile.email}</span>
              <span>•</span>
              <span className="text-[#22c55e] font-bold">{weight} kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl bg-[#12141C] p-6 sm:p-8 border border-white/5 space-y-6">
          <h2 className="text-lg font-bold text-white font-['Outfit'] border-b border-white/5 pb-3">
            Personal & Anthropometric Data
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Full Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Age (Years)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5" /> Body Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-[#22c55e]/30 text-[#22c55e] font-bold text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5" /> Height
              </label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="5 ft 7 in (170 cm)"
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1">
                <Dumbbell className="w-3.5 h-3.5" /> Primary Fitness Goal
              </label>
              <input
                type="text"
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Nutritional & Dietary Targets */}
        <div className="rounded-2xl bg-[#12141C] p-6 sm:p-8 border border-white/5 space-y-6">
          <h2 className="text-lg font-bold text-white font-['Outfit'] border-b border-white/5 pb-3">
            Nutrition & Hydration Targets
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1">
                <Dumbbell className="w-3.5 h-3.5 text-[#22c55e]" /> Daily Protein Target (g) *
              </label>
              <input
                type="number"
                value={dailyProteinTarget}
                onChange={(e) => setDailyProteinTarget(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-[#22c55e]/40 text-[#22c55e] font-bold text-sm font-mono"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">Default target: 120 grams</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Daily Calories Target (kcal)
              </label>
              <input
                type="number"
                value={dailyCaloriesTarget}
                onChange={(e) => setDailyCaloriesTarget(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-amber-300 font-bold text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Daily Water Target (ml)
              </label>
              <input
                type="number"
                value={dailyWaterTargetMl}
                onChange={(e) => setDailyWaterTargetMl(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-cyan-300 font-bold text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Dietary Restriction
            </label>
            <input
              type="text"
              value={dietaryRestriction}
              onChange={(e) => setDietaryRestriction(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#161A24] border border-rose-500/30 text-rose-300 font-semibold text-xs"
            />
            <span className="text-[10px] text-zinc-500 mt-1 block">
              STRICT RULE: No milk, curd, yogurt, paneer, cheese, butter, whey, casein, cream, or ghee.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePasswordReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold border border-white/10 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Change Password via Email</span>
            </button>
            {passwordSent && (
              <span className="text-xs text-[#22c55e] font-semibold">
                Password reset link sent to your email!
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="text-xs text-[#22c55e] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
              </span>
            )}

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all hover:scale-102"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
