import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, doc, deleteDoc, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Pencil, Search, ChefHat, TrendingUp, Package, Star, Inbox, CheckCircle2 } from 'lucide-react';
import MenuItemForm from '../../components/admin/MenuItemForm';
import { DEFAULT_MENU_ITEMS, FALLBACK_IMAGE } from '../../data/menu';

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-card flex items-center gap-4`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="font-body text-2xl font-bold text-charcoal">{value}</p>
        <p className="font-body text-xs text-charcoal/45 font-medium">{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [messages, setMessages]   = useState([]);

  useEffect(() => {
    let unsub = () => {};
    try {
      if (!db) {
        setItems(DEFAULT_MENU_ITEMS);
        setLoading(false);
        return unsub;
      }
      const q = query(collection(db, 'menu_items'), orderBy('category'));
      unsub = onSnapshot(q, snap => {
        const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setItems(arr.length ? arr : DEFAULT_MENU_ITEMS);
        setLoading(false);
      }, () => { setItems(DEFAULT_MENU_ITEMS); setLoading(false); });
    } catch { setItems(DEFAULT_MENU_ITEMS); setLoading(false); }
    return unsub;
  }, []);

  useEffect(() => {
    let unsub = () => {};
    try {
      if (!db) return unsub;
      const q = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
      unsub = onSnapshot(q, snap => {
        setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      }, () => setMessages([]));
    } catch {
      setMessages([]);
    }
    return unsub;
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this item permanently?')) return;
    try {
      if (!db) throw new Error('Firebase is not configured.');
      await deleteDoc(doc(db, 'menu_items', id));
    }
    catch { setItems(p => p.filter(i => i.id !== id)); }
  };

  const toggleAvailability = async (item) => {
    const next = item.available === false;
    setItems(p => p.map(i => i.id === item.id ? { ...i, available: next } : i));
    try {
      if (db) await updateDoc(doc(db, 'menu_items', item.id), { available: next, updatedAt: new Date().toISOString() });
    } catch (error) {
      console.warn('Unable to update item availability.', error);
    }
  };

  const markMessageDone = async (message) => {
    setMessages(p => p.map(m => m.id === message.id ? { ...m, status: 'done' } : m));
    try {
      if (db) await updateDoc(doc(db, 'contact_messages', message.id), { status: 'done' });
    } catch (error) {
      console.warn('Unable to update message status.', error);
    }
  };

  const openAdd  = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setModalOpen(true); };

  const categories = [...new Set(items.map(i => i.category))];
  const availableCount = items.filter(i => i.available !== false).length;
  const unreadMessages = messages.filter(m => m.status !== 'done').length;
  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-charcoal">Menu Dashboard</h1>
          <p className="font-body text-sm text-charcoal/45 mt-1">Manage your menu items in real-time</p>
        </div>
        <button
          onClick={openAdd}
          className="btn-primary gap-2 shadow-glow"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Item
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Package}   label="Total Items"    value={items.length}       color="bg-spice" />
        <StatCard icon={ChefHat}   label="Categories"     value={categories.length}  color="bg-gold" />
        <StatCard icon={TrendingUp} label="Available"      value={availableCount}     color="bg-green-500" />
        <StatCard icon={Inbox}     label="New Messages"    value={unreadMessages}     color="bg-blue-500" />
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        {/* Table toolbar */}
        <div className="flex items-center gap-4 p-5 border-b border-gray-100">
          <div className="relative flex-grow max-w-xs">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/35" />
            <input
              type="text"
              placeholder="Search menu items…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 font-body text-sm text-charcoal placeholder-charcoal/35 outline-none focus:border-spice focus:ring-2 focus:ring-spice/10 transition-all duration-200"
            />
          </div>
          <span className="font-body text-xs text-charcoal/40 ml-auto">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-spice rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50/70 text-left">
                  {['Item', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3.5 font-body text-[11px] font-semibold text-charcoal/40 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-5 py-12 text-center font-body text-sm text-charcoal/40">
                      No items found. Try a different search or add a new item.
                    </td>
                  </tr>
                )}
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-cream/50 transition-colors duration-150 group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={e => { e.target.src = FALLBACK_IMAGE; }} />
                        </div>
                        <div>
                          <p className="font-body font-semibold text-sm text-charcoal leading-tight">{item.name}</p>
                          <p className="font-body text-xs text-charcoal/40 mt-0.5 max-w-[200px] truncate">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="badge">{item.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-display font-bold text-lg text-spice">₹{item.price}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleAvailability(item)}
                        className={`rounded-full px-3 py-1 font-body text-xs font-semibold transition-colors ${item.available === false ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                      >
                        {item.available === false ? 'Hidden' : 'Live'}
                      </button>
                      {item.featured && <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-spice-muted px-2 py-1 font-body text-[11px] font-semibold text-spice"><Star size={11} /> Featured</span>}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-body text-xs font-medium transition-colors duration-150"
                        >
                          <Pencil size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg font-body text-xs font-medium transition-colors duration-150"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <MenuItemForm
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          item={editing}
        />
      )}

      <div className="mt-8 bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between gap-4 p-5 border-b border-gray-100">
          <div>
            <h2 className="font-display text-xl font-bold text-charcoal">Customer Messages</h2>
            <p className="font-body text-xs text-charcoal/45 mt-1">Messages submitted from the public contact form</p>
          </div>
          <span className="font-body text-xs text-charcoal/40">{messages.length} total</span>
        </div>
        <div className="divide-y divide-gray-100">
          {messages.length === 0 ? (
            <div className="px-5 py-12 text-center font-body text-sm text-charcoal/40">
              No customer messages yet.
            </div>
          ) : messages.slice(0, 8).map(message => (
            <div key={message.id} className="p-5 flex flex-col lg:flex-row lg:items-start gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-body font-semibold text-sm text-charcoal">{message.name || 'Guest'}</p>
                  {message.phone && <a href={`tel:${message.phone}`} className="font-body text-xs text-spice">{message.phone}</a>}
                  {message.email && <a href={`mailto:${message.email}`} className="font-body text-xs text-charcoal/45">{message.email}</a>}
                </div>
                <p className="font-body text-sm text-charcoal/60 mt-2 leading-relaxed">{message.message}</p>
              </div>
              <button
                onClick={() => markMessageDone(message)}
                disabled={message.status === 'done'}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-2 font-body text-xs font-semibold text-green-600 transition-colors hover:bg-green-100 disabled:opacity-50"
              >
                <CheckCircle2 size={14} />
                {message.status === 'done' ? 'Handled' : 'Mark handled'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
