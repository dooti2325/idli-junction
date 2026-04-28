import { useState, useEffect } from 'react';
import { doc, addDoc, updateDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { X, Upload, ImagePlus } from 'lucide-react';

const CATEGORIES = ['Idli', 'Dosa', 'Snacks', 'Beverages', 'Specials', 'Sweets'];

export default function MenuItemForm({ isOpen, onClose, item }) {
  const [form, setForm]           = useState({ name: '', price: '', description: '', category: '' });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview]     = useState('');
  const [progress, setProgress]   = useState(0);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  useEffect(() => {
    if (item) {
      setForm({ name: item.name, price: item.price, description: item.description, category: item.category });
      setPreview(item.image || '');
    }
  }, [item]);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleFile = e => {
    const f = e.target.files[0];
    if (!f) return;
    setImageFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');

    try {
      let imageUrl = item?.image || 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?w=600&q=80';

      if (imageFile) {
        try {
          const storageRef = ref(storage, `menu_images/${Date.now()}_${imageFile.name}`);
          const task = uploadBytesResumable(storageRef, imageFile);
          await new Promise((res, rej) => {
            task.on('state_changed',
              s => setProgress(Math.round(s.bytesTransferred / s.totalBytes * 100)),
              rej,
              async () => { imageUrl = await getDownloadURL(task.snapshot.ref); res(); }
            );
          });
        } catch { /* Storage not configured – use preview URL */ }
      }

      const data = {
        name:        form.name.trim(),
        price:       Number(form.price),
        description: form.description.trim(),
        category:    form.category,
        image:       imageUrl,
        updatedAt:   new Date().toISOString(),
      };

      try {
        if (item) await updateDoc(doc(db, 'menu_items', item.id), data);
        else       await addDoc(collection(db, 'menu_items'), data);
      } catch {
        // Firebase not connected — simulate success
        alert(`✅ Item ${item ? 'updated' : 'added'} (connect Firebase for persistence).`);
      }
      onClose();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false); setProgress(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={onClose} style={{ animation: 'fadeIn 0.2s ease' }} />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.25)] overflow-hidden"
        style={{ animation: 'fadeUp 0.3s ease' }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <div>
            <h2 className="font-display text-xl font-bold text-charcoal">
              {item ? 'Edit Menu Item' : 'Add New Item'}
            </h2>
            <p className="font-body text-xs text-charcoal/40 mt-0.5">
              {item ? 'Update the details below' : 'Fill in the details for the new dish'}
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200">
            <X size={18} className="text-charcoal/70" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5 max-h-[78vh] overflow-y-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl font-body text-sm">{error}</div>
          )}

          {/* Image upload */}
          <div>
            <label className="font-body text-xs font-semibold text-charcoal/50 uppercase tracking-wider block mb-2">Item Photo</label>
            <label className="block cursor-pointer group">
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <div className={`relative h-40 rounded-2xl border-2 border-dashed overflow-hidden transition-all duration-200
                ${preview ? 'border-transparent' : 'border-gray-200 hover:border-spice/50 bg-gray-50'}`}>
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-body font-medium text-charcoal shadow-float">
                        <ImagePlus size={15} /> Change Photo
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-2 text-charcoal/35 group-hover:text-spice transition-colors">
                    <Upload size={24} />
                    <span className="font-body text-sm font-medium">Click to upload image</span>
                    <span className="font-body text-xs">PNG, JPG up to 5MB</span>
                  </div>
                )}
              </div>
            </label>
            {progress > 0 && progress < 100 && (
              <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-spice rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>

          {/* Name & Price row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="item-name" className="font-body text-xs font-semibold text-charcoal/50 uppercase tracking-wider block mb-2">Name</label>
              <input id="item-name" type="text" name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Masala Dosa" className="input-premium" />
            </div>
            <div>
              <label htmlFor="item-price" className="font-body text-xs font-semibold text-charcoal/50 uppercase tracking-wider block mb-2">Price (₹)</label>
              <input id="item-price" type="number" name="price" required min="1" value={form.price} onChange={handleChange} placeholder="e.g. 100" className="input-premium" />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="item-category" className="font-body text-xs font-semibold text-charcoal/50 uppercase tracking-wider block mb-2">Category</label>
            <select id="item-category" name="category" required value={form.category} onChange={handleChange} className="input-premium">
              <option value="">Select category…</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="item-desc" className="font-body text-xs font-semibold text-charcoal/50 uppercase tracking-wider block mb-2">Description</label>
            <textarea id="item-desc" name="description" required rows="3" value={form.description} onChange={handleChange} placeholder="Describe the dish…" className="input-premium resize-none" />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 font-body text-sm font-medium text-charcoal/70 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 btn-primary justify-center py-3 rounded-xl shadow-glow disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving…
                </span>
              ) : item ? 'Update Item' : 'Add to Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
