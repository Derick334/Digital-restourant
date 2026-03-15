import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, Search, Menu, User, Heart, Star, Bot, X, Send, 
  ChevronRight, ChevronLeft, Sparkles, Zap, Truck, ShieldCheck, 
  Phone, CreditCard, CheckCircle, Smartphone, Globe 
} from 'lucide-react';

// --- Types ---
type Product = {
  id: number
  name: string
  price: number
  oldPrice?: number
  category: string
  rating: number
  reviews: number
  image: string
  isAiPick: boolean
  tag: string | null
}

type CartItem = Product & { quantity: number }

// --- Mock Data ---
const CATEGORIES = [
  "All Categories", "Electronics", "Fashion", "Home & Living", "Phones", "Computing", "Groceries"
];

const PRODUCTS: Product[] = [
  { id:1, name:"Ultra Smart Watch Series 8", price:4500, oldPrice:8000, category:"Electronics", rating:4.8, reviews:120, image:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400", isAiPick:true, tag:"Best Seller" },
  { id:2, name:"Pro Noise Cancelling Headphones", price:12500, oldPrice:18000, category:"Electronics", rating:4.9, reviews:85, image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400", isAiPick:true, tag:"Flash Sale" },
  { id:3, name:"Men's Formal Oxford Shoes", price:3200, oldPrice:4500, category:"Fashion", rating:4.5, reviews:45, image:"https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=400", isAiPick:false, tag:null },
  { id:4, name:"4K AI Smart TV 55 Inch", price:45000, oldPrice:65000, category:"Home & Living", rating:4.7, reviews:310, image:"https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400", isAiPick:true, tag:"Free Shipping" },
  { id:5, name:"Gaming Laptop Ryzen 7", price:125000, oldPrice:150000, category:"Computing", rating:4.9, reviews:67, image:"https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400", isAiPick:true, tag:"Top Rated" },
  { id:6, name:"Smartphone X Pro 256GB", price:28000, oldPrice:35000, category:"Phones", rating:4.6, reviews:203, image:"https://images.unsplash.com/photo-1598327105666-5b89351aff70?auto=format&fit=crop&q=80&w=400", isAiPick:false, tag:"New Arrival" },
];

// --- AI Chatbot ---
const AIChatbot = ({ isOpen, toggleChat }: { isOpen: boolean, toggleChat: () => void }) => {
  const [messages, setMessages] = useState<{text:string, isUser:boolean}[]>([
    { text: "Hello! I'm Derick AI. How can I help you shop today?", isUser:false }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if(!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, isUser:true }]);
    setInput("");

    setTimeout(() => {
      let aiResponse = "I can help you find products! Try searching for 'laptops' or 'shoes'.";
      if(userMsg.toLowerCase().includes("laptop")) aiResponse = "We have some great gaming laptops on sale! Check out the 'Computing' category.";
      else if(userMsg.toLowerCase().includes("mpesa") || userMsg.toLowerCase().includes("pay")) aiResponse = "We accept M-Pesa! Just checkout, enter your phone number, and you'll get a prompt on your phone to pay.";
      else if(userMsg.toLowerCase().includes("hello") || userMsg.toLowerCase().includes("hi")) aiResponse = "Hi there! Looking for anything specific? I can recommend some trending electronics.";
      setMessages(prev => [...prev, { text: aiResponse, isUser:false }]);
    }, 1000)
  }

  if(!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2"><Bot size={20}/> <span className="font-bold">Derick AI Assistant</span></div>
        <button onClick={toggleChat} className="hover:bg-orange-700 p-1 rounded"><X size={18}/></button>
      </div>
      <div className="h-80 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.isUser ? 'bg-orange-500 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}/>
      </div>
      <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} onKeyPress={e=>e.key==='Enter' && handleSend()} placeholder="Ask AI..." className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/>
        <button onClick={handleSend} className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"><Send size={18}/></button>
      </div>
    </div>
  )
}

// --- Product Card ---
const ProductCard = ({ product, addToCart }: { product: Product, addToCart: (p: Product) => void }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 group">
    <div className="relative">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
      {product.tag && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">{product.tag}</span>}
      {product.isAiPick && <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1"><Sparkles size={10}/> AI Pick</span>}
    </div>
    <div className="p-4">
      <h3 className="text-gray-800 font-medium text-sm line-clamp-2 mb-2 h-10">{product.name}</h3>
      <div className="flex items-center gap-1 mb-2"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/><span className="text-xs text-gray-500">{product.rating} ({product.reviews})</span></div>
      <div className="flex items-end gap-2 mb-3">
        <span className="text-lg font-bold text-orange-600">KES {product.price.toLocaleString()}</span>
        {product.oldPrice && <span className="text-xs text-gray-400 line-through mb-1">KES {product.oldPrice.toLocaleString()}</span>}
      </div>
      <button onClick={()=>addToCart(product)} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium text-sm transition-colors flex items-center justify-center gap-2"><ShoppingCart size={16}/> Add To Cart</button>
    </div>
  </div>
);

// --- Checkout Modal ---
const CheckoutModal = ({
  isOpen,
  onClose,
  cart,
  total,
  clearCart
}: {
  isOpen: boolean, 
  onClose: () => void, 
  cart: CartItem[], 
  total: number,
  clearCart: () => void
}) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"mpesa"|"paypal"|null>(null);
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  if(!isOpen) return null;

  const handleMpesaPay = () => {
    if(!phone) { alert("Enter valid M-Pesa number"); return; }
    setIsProcessing(true); setStatusMessage("Sending STK Push...");
    setTimeout(()=>{setStatusMessage("Check your phone and enter PIN"); setTimeout(()=>{setIsProcessing(false); setStep(3); clearCart();},3000)},2000)
  }
  const handlePaypalPay = () => { setIsProcessing(true); setStatusMessage("Redirecting..."); setTimeout(()=>{setIsProcessing(false); setStep(3); clearCart();},2500)}

  const cartTotal = total;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Checkout</h2>
          <button onClick={onClose}><X size={24} className="text-gray-500 hover:text-red-500"/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {step===1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-700 mb-4">1. Shipping Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="border p-3 rounded w-full"/>
                <input type="text" placeholder="Last Name" className="border p-3 rounded w-full"/>
              </div>
              <input type="text" placeholder="Address / Location" className="border p-3 rounded w-full"/>
              <input type="text" placeholder="City / Town" className="border p-3 rounded w-full"/>
              <div className="bg-orange-50 border border-orange-200 p-4 rounded text-sm text-orange-800 mt-4">
                <p className="font-bold">Order Summary:</p>
                <p>Items: {cart.length}</p>
                <p className="font-bold text-lg">Total to Pay: KES {cartTotal.toLocaleString()}</p>
              </div>
              <button onClick={()=>setStep(2)} className="w-full bg-orange-600 text-white py-3 rounded font-bold hover:bg-orange-700 mt-4">Proceed to Payment</button>
            </div>
          )}
          {step===2 && (
            <div className="space-y-6">
              <button onClick={()=>setStep(1)} className="text-sm text-gray-500 hover:underline flex items-center gap-1"><ChevronLeft size={16}/> Back</button>
              <h3 className="text-lg font-bold text-gray-700">2. Select Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div onClick={()=>setPaymentMethod('mpesa')} className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 ${paymentMethod==='mpesa'?'border-green-500 bg-green-50':'border-gray-200'}`}>
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">M</div>
                  <span className="font-bold text-gray-800">M-Pesa</span>
                  <span className="text-xs text-gray-500 text-center">Prompt sent to phone</span>
                </div>
                <div onClick={()=>setPaymentMethod('paypal')} className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 ${paymentMethod==='paypal'?'border-blue-500 bg-blue-50':'border-gray-200'}`}>
                  <Globe className="text-blue-600 w-10 h-10"/>
                  <span className="font-bold text-gray-800">PayPal</span>
                  <span className="text-xs text-gray-500 text-center">Secure International</span>
                </div>
              </div>
              {paymentMethod==='mpesa' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-green-700 mb-2 flex items-center gap-2"><Smartphone size={18}/> M-Pesa Express</h4>
                  <div className="flex gap-2">
                    <span className="bg-gray-200 border border-gray-300 px-3 py-2 rounded flex items-center text-gray-600 font-medium">+254</span>
                    <input type="tel" placeholder="712 345 678" value={phone} onChange={e=>setPhone(e.target.value)} className="flex-1 border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"/>
                  </div>
                  {!isProcessing ? (
                    <button onClick={handleMpesaPay} className="w-full bg-green-600 text-white py-3 rounded mt-4 font-bold hover:bg-green-700 shadow-md transition-all">Pay KES {cartTotal.toLocaleString()} Now</button>
                  ) : (<div className="mt-4 text-center"><div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-2"></div><p className="text-green-700 font-medium animate-pulse">{statusMessage}</p></div>)}
                </div>
              )}
              {paymentMethod==='paypal' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                  <h4 className="font-bold text-blue-700 mb-2">PayPal Checkout</h4>
                  {!isProcessing ? (
                    <button onClick={handlePaypalPay} className="w-full bg-[#003087] text-white py-3 rounded font-bold hover:bg-[#001c64] flex items-center justify-center gap-2">PayPal</button>
                  ) : (<div className="mt-4 text-center"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div><p className="text-blue-700 font-medium">{statusMessage}</p></div>)}
                </div>
              )}
            </div>
          )}
          {step===3 && (
            <div className="text-center py-10">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48}/>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Successful!</h3>
              <p className="text-gray-600 mb-6">Thank you for shopping at Derick Shop. Your payment has been received.</p>
              <div className="bg-gray-100 p-4 rounded-lg max-w-sm mx-auto mb-6 text-sm">
                <p className="flex justify-between mb-2"><span>Order ID:</span> <span className="font-mono font-bold">#DRK-{Math.floor(Math.random()*10000)}</span></p>
                <p className="flex justify-between"><span>Amount Paid:</span> <span className="font-bold">KES {cartTotal.toLocaleString()}</span></p>
              </div>
              <button onClick={onClose} className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700">Continue Shopping</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// --- Main App ---
const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const filteredProducts = PRODUCTS.filter(p
