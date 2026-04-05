import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Package, Home } from 'lucide-react';

export default function OrderConfirmation() {
  const { id } = useParams();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f1f8e9] p-4">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="bg-[#2e7d32] p-8 text-center text-white relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <CheckCircle2 className="w-20 h-20 mx-auto mb-4 text-[#ffb300]" />
          <h1 className="text-3xl font-black mb-2 relative z-10">Order Confirmed!</h1>
          <p className="text-[#c8e6c9] relative z-10">Thank you for your eco-friendly purchase.</p>
        </div>
        
        <div className="p-8">
          <div className="mb-8 border border-gray-100 bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-mono font-bold text-gray-800">{id?.substring(0, 8).toUpperCase()}</p>
            </div>
            <Package className="text-gray-400 w-8 h-8" />
          </div>

          <p className="text-gray-600 mb-8 text-center leading-relaxed">
            Your items are being expertly gathered and prepared for dispatch. We will notify you once they are on the way.
          </p>

          <div className="flex flex-col gap-3">
            <Link to="/shop" className="w-full bg-[#ffb300] hover:bg-opacity-90 text-black font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
              Continue Shopping <ChevronRight className="w-5 h-5"/>
            </Link>
            <Link to="/dashboard" className="w-full bg-white border-2 border-gray-200 text-gray-700 hover:border-[#2e7d32] font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2">
              <Home className="w-5 h-5"/> Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
