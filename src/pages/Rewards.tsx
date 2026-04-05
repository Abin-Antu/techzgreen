import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { UploadCloud, CheckCircle2, Leaf, Clock, XCircle, Star } from 'lucide-react';
import type { Submission } from '../types';

export default function Rewards() {
  const { user, totalPoints, refreshPoints } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    if (user) {
      fetchSubmissions();
      refreshPoints(); // Ensure points are current on page load
    }
  }, [user]);

  const fetchSubmissions = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('waste_submissions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (data) setSubmissions(data as Submission[]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}_${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('waste-images').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('waste-images').getPublicUrl(filePath);

      const { error: dbError } = await supabase.from('waste_submissions').insert({
        user_id: user.id,
        image_url: publicUrl,
        status: 'pending',
      });
      if (dbError) throw dbError;

      setFile(null);
      setPreview(null);
      fetchSubmissions();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const totalEarned = submissions
    .filter((s: any) => s.status === 'approved')
    .reduce((sum: number, s: any) => sum + (s.points_awarded || 0), 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 fade-in">
      {/* Hero Banner */}
      <div className="glass-panel-dark p-10 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/leaves.png')]"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Leaf className="text-[#ffb300] w-8 h-8" />
              <h1 className="text-3xl font-black text-white">Earn Green Points</h1>
            </div>
            <p className="text-[rgba(200,230,201,0.85)] leading-relaxed max-w-lg">
              Deposit plastic waste into a designated bin, snap a clear photo, and upload it here. Our admins verify and reward your eco-actions!
            </p>
          </div>
          {/* Stats */}
          <div className="flex gap-3 flex-wrap">
            <div className="stat-box-dark px-6 py-4 text-center min-w-[130px]">
              <Star className="w-5 h-5 text-[#ffb300] mx-auto mb-1 fill-[#ffb300]" />
              <p className="stat-num">{totalEarned}</p>
              <p className="stat-label">Total Earned</p>
            </div>
            <div className="stat-box-dark px-6 py-4 text-center min-w-[130px]">
              <Star className="w-5 h-5 text-green-300 mx-auto mb-1 fill-green-300" />
              <p className="stat-num">{totalPoints}</p>
              <p className="stat-label">Available Balance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Card */}
        <div className="glass-panel p-8 h-fit">
          <h2 className="text-2xl font-bold text-[#1a3d1f] mb-6">Upload Evidence</h2>
          <form onSubmit={handleUpload} className="space-y-5">
            <label className="block cursor-pointer">
              <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all
                ${preview ? 'border-[#2e7d32] bg-[rgba(46,125,50,0.04)]' : 'border-[rgba(46,125,50,0.25)] hover:border-[#2e7d32] hover:bg-[rgba(46,125,50,0.03)]'}`}>
                {preview ? (
                  <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-xl object-cover" />
                ) : (
                  <>
                    <UploadCloud className="w-12 h-12 text-[rgba(46,125,50,0.4)] mx-auto mb-3" />
                    <p className="text-[#5f7a60] font-semibold">Click to browse or drag image here</p>
                    <p className="text-xs text-[#5f7a60] mt-1 opacity-70">JPG, PNG or WEBP accepted</p>
                  </>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>

            {file && (
              <p className="text-sm text-[#2e7d32] font-semibold bg-[rgba(46,125,50,0.08)] px-3 py-2 rounded-lg">
                ✓ {file.name}
              </p>
            )}

            <button
              type="submit"
              disabled={!file || uploading}
              className="btn-accent w-full flex items-center justify-center gap-2 !py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <><div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div> Uploading...</>
              ) : (
                <><UploadCloud className="w-4 h-4" /> Submit to Earn Points</>
              )}
            </button>
          </form>
        </div>

        {/* History */}
        <div>
          <h2 className="text-2xl font-bold text-[#1a3d1f] mb-6">Your History</h2>
          <div className="space-y-4">
            {submissions.length === 0 && (
              <div className="glass-panel p-8 text-center">
                <Leaf className="w-10 h-10 text-[rgba(46,125,50,0.25)] mx-auto mb-2" />
                <p className="text-[#5f7a60] font-medium">No submissions yet. Start earning!</p>
              </div>
            )}
            {submissions.map((sub: any) => (
              <div key={sub.id} className="glass-card p-4 flex gap-4 items-center">
                <img src={sub.image_url} alt="Waste" className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                <div className="flex-grow min-w-0">
                  <p className="text-xs text-[#5f7a60] mb-1">{new Date(sub.created_at).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {sub.status === 'pending' && (
                      <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-lg">
                        <Clock className="w-3 h-3"/>Pending Review
                      </span>
                    )}
                    {sub.status === 'approved' && (
                      <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-lg">
                        <CheckCircle2 className="w-3 h-3"/>Approved
                      </span>
                    )}
                    {sub.status === 'rejected' && (
                      <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg">
                        <XCircle className="w-3 h-3"/>Rejected
                      </span>
                    )}
                  </div>
                  {sub.status === 'approved' && (
                    <p className="text-sm font-black text-[#2e7d32] mt-1.5 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#ffb300] text-[#ffb300]" />+{sub.points_awarded} Points Earned
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
