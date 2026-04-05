import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { MapPin, CheckCircle, Star, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export default function Checkout() {
  const { items, totalAmount, clearCart } = useCart();
  const { user, totalPoints, refreshPoints } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [address, setAddress] = useState({ fullname: '', street: '', city: '', state: '', zip_code: '' });
  const [savedAddressLoaded, setSavedAddressLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Points redemption
  const [pointToRs, setPointToRs] = useState(1); // 1 point = 1 rupee by default
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToRedeem, setPointsToRedeem] = useState(0);

  useEffect(() => {
    if (items.length === 0) navigate('/shop');
    if (!user) navigate('/login');
  }, [items, user, navigate]);

  useEffect(() => {
    // Fetch point_to_rs setting
    supabase.from('app_settings').select('value').eq('key', 'point_to_rs').single()
      .then(({ data }) => { if (data) setPointToRs(parseFloat(data.value)); });

    // Pre-fill from last saved address
    if (user) {
      supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
        .then(({ data }) => {
          if (data) {
            setAddress({
              fullname: data.fullname || '',
              street: data.street || '',
              city: data.city || '',
              state: data.state || '',
              zip_code: data.zip_code || '',
            });
            setSavedAddressLoaded(true);
          }
        });
    }
  }, [user]);

  // Max points user can use (can't exceed total order)
  const maxPointsDiscount = Math.min(totalPoints, Math.floor(totalAmount / pointToRs));
  const discountAmount = usePoints ? pointsToRedeem * pointToRs : 0;
  const finalAmount = Math.max(0, totalAmount - discountAmount);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // 1. Save Address
      const { data: addressData, error: addressError } = await supabase
        .from('user_addresses')
        .insert({ user_id: user.id, ...address })
        .select()
        .single();
      if (addressError) throw addressError;

      // 2. Create Order with final amount
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          address_id: addressData.id,
          total_amount: finalAmount,
          status: 'paid',
        })
        .select()
        .single();
      if (orderError) throw orderError;

      // 3. Create Order Items
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(items.map(item => ({
          order_id: orderData.id,
          product_id: item.product.id,
          quantity: item.quantity,
          price_at_time: item.product.price,
        })));
      if (itemsError) throw itemsError;

      // 4. Decrement stock for each product
      await Promise.all(items.map(async item => {
        const { data: prod } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.product.id)
          .single();
        if (prod && prod.stock > 0) {
          await supabase
            .from('products')
            .update({ stock: Math.max(0, prod.stock - item.quantity) })
            .eq('id', item.product.id);
        }
      }));

      // 5. Deduct points if used
      if (usePoints && pointsToRedeem > 0) {
        const { error: ledgerError } = await supabase
          .from('points_ledger')
          .insert({
            user_id: user.id,
            points_change: -pointsToRedeem,
            description: `Redeemed ${pointsToRedeem} pts for ₹${discountAmount.toFixed(2)} discount on Order #${orderData.id.substring(0, 8).toUpperCase()}`,
          });
        if (ledgerError) throw ledgerError;
        await refreshPoints(); // Update navbar/dashboard points live
      }

      clearCart();
      navigate(`/order-confirmation/${orderData.id}`);
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "input-glass";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 fade-in">
      {/* Progress Bar */}
      <div className="flex items-center gap-3 mb-10">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all ${step >= 1 ? 'bg-[#2e7d32] text-white shadow' : 'bg-[rgba(46,125,50,0.1)] text-[#5f7a60]'}`}>1</div>
        <div className={`h-1 flex-grow rounded-full transition-all ${step >= 2 ? 'bg-[#2e7d32]' : 'bg-[rgba(46,125,50,0.15)]'}`}></div>
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all ${step >= 2 ? 'bg-[#2e7d32] text-white shadow' : 'bg-[rgba(46,125,50,0.1)] text-[#5f7a60]'}`}>2</div>
      </div>

      {/* Step 1: Address */}
      {step === 1 && (
        <div className="glass-panel p-8">
          <h2 className="text-2xl font-bold text-[#1a3d1f] mb-6 flex items-center gap-2">
            <MapPin className="text-[#2e7d32]" /> Shipping Address
          </h2>
          {savedAddressLoaded && (
            <div className="flex items-center gap-2 bg-[rgba(46,125,50,0.07)] border border-[rgba(46,125,50,0.2)] text-[#2e7d32] text-xs font-semibold px-3 py-2 rounded-xl mb-4">
              <CheckCircle className="w-3.5 h-3.5" /> Last saved address pre-filled — update if needed
            </div>
          )}
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            {[
              { label: 'Full Name', key: 'fullname', type: 'text' },
              { label: 'Street Address', key: 'street', type: 'text' },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-sm font-bold text-[#2d4a30] mb-1.5">{label}</label>
                <input required type={type} value={(address as any)[key]}
                  onChange={e => setAddress({ ...address, [key]: e.target.value })}
                  className={inputClass} />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              {[{ label: 'City', key: 'city' }, { label: 'State', key: 'state' }].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-bold text-[#2d4a30] mb-1.5">{label}</label>
                  <input required value={(address as any)[key]}
                    onChange={e => setAddress({ ...address, [key]: e.target.value })}
                    className={inputClass} />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2d4a30] mb-1.5">ZIP / Postal Code</label>
              <input required value={address.zip_code}
                onChange={e => setAddress({ ...address, zip_code: e.target.value })}
                className={inputClass} />
            </div>
            <button type="submit" className="btn-accent w-full !py-3 flex items-center justify-center gap-2 mt-2">
              Continue to Payment
            </button>
          </form>
        </div>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="glass-panel p-6">
            <h3 className="font-bold text-[#1a3d1f] mb-3">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm text-[#5f7a60]">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span className="font-semibold">${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[rgba(46,125,50,0.1)] pt-3 flex justify-between">
              <span className="text-[#5f7a60] font-semibold">Subtotal</span>
              <span className="font-black text-[#1a3d1f]">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Points Redemption */}
          {totalPoints > 0 && (
            <div className="glass-panel p-6">
              <button
                onClick={() => { setUsePoints(!usePoints); if (usePoints) setPointsToRedeem(0); }}
                className="w-full flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-amber-50 border border-amber-200 p-2 rounded-xl">
                    <Star className="w-5 h-5 text-[#ffb300] fill-[#ffb300]" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-[#1a3d1f] text-sm">Redeem Green Points</p>
                    <p className="text-xs text-[#5f7a60]">You have <strong>{totalPoints} pts</strong> · 1 pt = ₹{pointToRs.toFixed(2)}</p>
                  </div>
                </div>
                {usePoints ? <ChevronUp className="w-4 h-4 text-[#5f7a60]" /> : <ChevronDown className="w-4 h-4 text-[#5f7a60]" />}
              </button>

              {usePoints && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={maxPointsDiscount}
                      value={pointsToRedeem}
                      onChange={e => setPointsToRedeem(parseInt(e.target.value))}
                      className="flex-grow accent-[#2e7d32]"
                    />
                    <span className="font-black text-[#2e7d32] text-sm w-16 text-right">{pointsToRedeem} pts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5f7a60]">Discount Applied</span>
                    <span className="font-bold text-green-700 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> −₹{discountAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setPointsToRedeem(0)} className="text-xs text-[#5f7a60] hover:text-[#2e7d32] cursor-pointer">Use 0</button>
                    <span className="text-[#5f7a60]">·</span>
                    <button onClick={() => setPointsToRedeem(maxPointsDiscount)} className="text-xs text-[#5f7a60] hover:text-[#2e7d32] cursor-pointer font-bold">Use Max ({maxPointsDiscount} pts)</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Total */}
          <div className="glass-panel p-6">
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm text-green-700 mb-2">
                <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Points Discount</span>
                <span className="font-bold">−₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-[#5f7a60] font-semibold">Total to Pay</span>
              <span className="text-3xl font-black text-[#1a3d1f]" style={{fontFamily:'Outfit,sans-serif'}}>${finalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Mock Payment Notice */}
          <div className="glass-panel p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1" style={{background:'linear-gradient(90deg, #2e7d32, #ffb300)'}}></div>
            <div className="flex gap-3 items-start">
              <CheckCircle className="text-[#2e7d32] w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1a3d1f] text-sm mb-1">Demo Mode Active</p>
                <p className="text-[#5f7a60] text-xs">No real payment is processed. Clicking confirm will complete the order and deduct any redeemed points from your balance.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 glass-panel !rounded-xl py-3 font-semibold text-[#2d4a30] hover:bg-[rgba(46,125,50,0.05)] transition-colors cursor-pointer text-sm">
              ← Back
            </button>
            <button onClick={handlePaymentSubmit} disabled={loading}
              className="flex-[2] btn-primary !py-3 flex items-center justify-center gap-2 disabled:opacity-50 text-sm">
              {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Processing...</> : `Confirm Payment · $${finalAmount.toFixed(2)}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
