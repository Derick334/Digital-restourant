import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  User, 
  Heart, 
  Star, 
  Bot, 
  X, 
  Send, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Zap,
  Truck,
  ShieldCheck,
  Phone,
  CreditCard,
  CheckCircle,
  Smartphone,
  Globe
} from 'lucide-react';

// --- Mock Data ---

const CATEGORIES = [
  "All Categories", "Electronics", "Fashion", "Home & Living", "Phones", "Computing", "Groceries"
];

const PRODUCTS = [
  {
    id: 1,
    name: "Ultra Smart Watch Series 8",
    price: 4500,
    oldPrice: 8000,
    category: "Electronics",
    rating: 4.8,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400",
    isAiPick: true,
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Pro Noise Cancelling Headphones",
    price: 12500,
    oldPrice: 18000,
    category: "Electronics",
    rating: 4.9,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
    isAiPick: true,
    tag: "Flash Sale"
  },
  {
    id: 3,
    name: "Men's Formal Oxford Shoes",
    price: 3200,
    oldPrice: 4500,
    category: "Fashion",
    rating: 4.5,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=400",
    isAiPick: false,
    tag: null
  },
  {
    id: 4,
    name: "4K AI Smart TV 55 Inch",
    price: 45000,
    oldPrice: 65000,
    category: "Home & Living",
    rating: 4.7,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400",
    isAiPick: true,
    tag: "Free Shipping"
  },
  {
    id: 5,
    name: "Gaming Laptop Ryzen 7",
    price: 125000,
    oldPrice: 150000,
    category: "Computing",
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400",
    isAiPick: true,
    tag: "Top Rated"
  },
  {
    id: 6,
    name: "Smartphone X Pro 256GB",
    price: 28000,
    oldPrice: 35000,
    category: "Phones",
    rating: 4.6,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff70?auto=format&fit=crop&q=80&w=400",
    isAiPick: false,
    tag: "New Arrival"
  },
];

// --- Sub-Components ---

const AIChatbot = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Derick AI. How can I help you shop today?", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
    setInput("");

    // Simple AI Simulation
    setTimeout(() => {
      let aiResponse = "I can help you find products! Try searching for 'laptops' or 'shoes'.";
      if (userMsg.toLowerCase().includes("laptop")) {
        aiResponse = "We have some great gaming laptops on sale! Check out the 'Computing' category.";
      } else if (userMsg.toLowerCase().includes("mpesa") || userMsg.toLowerCase().includes("pay")) {
        aiResponse = "We accept M-Pesa! Just checkout, enter your phone number, and you'll get a prompt on your phone to pay.";
      } else if (userMsg.toLowerCase().includes("hello") || userMsg.toLowerCase().includes("hi")) {
        aiResponse = "Hi there! Looking for anything specific? I can recommend some trending electronics.";
      }
      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <span className="font-bold">Derick AI Assistant</span>
        </div>
        <button onClick={toggleChat} className="hover:bg-orange-700 p-1 rounded">
          <X size={18} />
        </button>
      </div>
      <div className="h-80 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.isUser ? 'bg-orange-500 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI..."
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button onClick={handleSend} className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ product, addToCart }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 group">
    <div className="relative">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
      {product.tag && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          {product.tag}
        </span>
      )}
      {product.isAiPick && (
        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
          <Sparkles size={10} /> AI Pick
        </span>
      )}
    </div>
    <div className="p-4">
      <h3 className="text-gray-800 font-medium text-sm line-clamp-2 mb-2 h-10">{product.name}</h3>
      <div className="flex items-center gap-1 mb-2">
        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
        <span className="text-xs text-gray-500">{product.rating} ({product.reviews})</span>
      </div>
      <div className="flex items-end gap-2 mb-3">
        <span className="text-lg font-bold text-orange-600">KES {product.price.toLocaleString()}</span>
        {product.oldPrice && (
          <span className="text-xs text-gray-400 line-through mb-1">KES {product.oldPrice.toLocaleString()}</span>
        )}
      </div>
      <button 
        onClick={() => addToCart(product)}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium text-sm transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingCart size={16} /> Add To Cart
      </button>
    </div>
  </div>
);

// --- Checkout Components ---

const CheckoutModal = ({ isOpen, onClose, cart, total, clearCart }) => {
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState(null); // 'mpesa' or 'paypal'
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  const handleMpesaPay = () => {
    if (!phone) {
      alert("Please enter a valid M-Pesa phone number");
      return;
    }
    setIsProcessing(true);
    setStatusMessage("Sending STK Push to " + phone + "...");
    
    // Simulate API Call
    setTimeout(() => {
      setStatusMessage("Please check your phone and enter your PIN.");
      setTimeout(() => {
        setIsProcessing(false);
        setStep(3); // Success
        clearCart();
      }, 3000);
    }, 2000);
  };

  const handlePaypalPay = () => {
    setIsProcessing(true);
    setStatusMessage("Redirecting to PayPal securely...");
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      clearCart();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Checkout</h2>
          <button onClick={onClose}><X size={24} className="text-gray-500 hover:text-red-500" /></button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold text-gray-700 mb-4">1. Shipping Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="border p-3 rounded w-full" />
                <input type="text" placeholder="Last Name" className="border p-3 rounded w-full" />
              </div>
              <input type="text" placeholder="Address / Location" className="border p-3 rounded w-full" />
              <input type="text" placeholder="City / Town" className="border p-3 rounded w-full" />
              <div className="bg-orange-50 border border-orange-200 p-4 rounded text-sm text-orange-800 mt-4">
                <p className="font-bold">Order Summary:</p>
                <p>Items: {cart.length}</p>
                <p className="font-bold text-lg">Total to Pay: KES {total.toLocaleString()}</p>
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full bg-orange-600 text-white py-3 rounded font-bold hover:bg-orange-700 mt-4"
              >
                Proceed to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:underline mb-2 flex items-center gap-1">
                <ChevronLeft size={16}/> Back to Address
              </button>
              
              <h3 className="text-lg font-bold text-gray-700">2. Select Payment Method</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* M-Pesa Option */}
                <div 
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-green-50 transition-all ${paymentMethod === 'mpesa' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                >
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">M</div>
                  <span className="font-bold text-gray-800">M-Pesa</span>
                  <span className="text-xs text-gray-500 text-center">Prompt sent to phone</span>
                </div>

                {/* PayPal Option */}
                <div 
                  onClick={() => setPaymentMethod('paypal')}
                  className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 transition-all ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                >
                  <Globe className="text-blue-600 w-10 h-10" />
                  <span className="font-bold text-gray-800">PayPal</span>
                  <span className="text-xs text-gray-500 text-center">Secure International</span>
                </div>
              </div>

              {/* M-Pesa Logic */}
              {paymentMethod === 'mpesa' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                    <Smartphone size={18}/> M-Pesa Express (STK Push)
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">Enter your M-Pesa number. We will send a payment prompt to your phone.</p>
                  <div className="flex gap-2">
                    <span className="bg-gray-200 border border-gray-300 px-3 py-2 rounded flex items-center text-gray-600 font-medium">+254</span>
                    <input 
                      type="tel" 
                      placeholder="712 345 678" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none" 
                    />
                  </div>
                  {!isProcessing ? (
                    <button 
                      onClick={handleMpesaPay}
                      className="w-full bg-green-600 text-white py-3 rounded mt-4 font-bold hover:bg-green-700 shadow-md transition-all"
                    >
                      Pay KES {total.toLocaleString()} Now
                    </button>
                  ) : (
                    <div className="mt-4 text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                      <p className="text-green-700 font-medium animate-pulse">{statusMessage}</p>
                    </div>
                  )}
                </div>
              )}

              {/* PayPal Logic */}
              {paymentMethod === 'paypal' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                  <h4 className="font-bold text-blue-700 mb-2">PayPal Checkout</h4>
                  <p className="text-sm text-gray-600 mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                   {!isProcessing ? (
                    <button 
                      onClick={handlePaypalPay}
                      className="w-full bg-[#003087] text-white py-3 rounded font-bold hover:bg-[#001c64] shadow-md flex items-center justify-center gap-2"
                    >
                      <span className="italic font-serif font-bold text-xl">Pay</span>Pal
                    </button>
                   ) : (
                    <div className="mt-4 text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                      <p className="text-blue-700 font-medium">{statusMessage}</p>
                    </div>
                   )}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Successful!</h3>
              <p className="text-gray-600 mb-6">Thank you for shopping at Derick Shop. Your payment has been received.</p>
              <div className="bg-gray-100 p-4 rounded-lg max-w-sm mx-auto mb-6 text-sm">
                <p className="flex justify-between mb-2"><span>Order ID:</span> <span className="font-mono font-bold">#DRK-{Math.floor(Math.random() * 10000)}</span></p>
                <p className="flex justify-between"><span>Amount Paid:</span> <span className="font-bold">KES {total.toLocaleString()}</span></p>
              </div>
              <button onClick={onClose} className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700">
                Continue Shopping
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};


const App = () => {
  const [cart, setCart] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Derived state
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handlers
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleStartCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* --- Top Bar --- */}
      <div className="bg-orange-600 text-white text-xs py-1 px-4 hidden md:flex justify-between">
        <p>Sell on Derick Shop | Download App</p>
        <p className="flex items-center gap-2"><Truck size={12} /> Free Shipping on Orders Over KES 5,000</p>
      </div>

      {/* --- Navbar --- */}
      <nav className="sticky top-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu & Logo */}
            <div className="flex items-center gap-3">
              <button 
                className="md:hidden text-gray-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu size={24} />
              </button>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-orange-600 tracking-tight leading-none">Derick<span className="text-gray-800">Shop</span></h1>
                <span className="text-[10px] text-gray-500 font-medium tracking-wider">DIGITAL COMMERCE AI</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl relative">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Search products, brands and categories..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-r-md font-medium hover:bg-orange-600 absolute right-0 top-0 bottom-0 rounded-l-none">
                Search
              </button>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6">
              <button className="hidden md:flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium">
                <User size={20} />
                <span>Account</span>
              </button>
              <button 
                className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium relative"
                onClick={() => setShowCart(true)}
              >
                <div className="relative">
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </div>
                <span className="hidden md:block">Cart</span>
              </button>
            </div>
          </div>
          
           {/* Mobile Search (visible only on small screens) */}
           <div className="mt-3 md:hidden relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-64 bg-white h-full shadow-lg p-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">Menu</h2>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
            </div>
            <div className="space-y-4">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left py-2 px-2 rounded ${selectedCategory === cat ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-700'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- Main Content --- */}
      <main className="container mx-auto px-4 py-6">
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Categories (Desktop) */}
          <aside className="hidden lg:block w-64 bg-white rounded-lg shadow-sm p-4 h-fit sticky top-24">
            <h3 className="font-bold text-gray-800 mb-3 px-2 flex items-center gap-2">
              <Menu size={16}/> Categories
            </h3>
            <ul className="space-y-1">
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-2 py-2 rounded-md text-sm transition-colors ${selectedCategory === cat ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Hero & Feed */}
          <div className="flex-1">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 md:p-10 text-white mb-8 relative overflow-hidden shadow-lg">
              <div className="relative z-10 max-w-lg">
                <span className="bg-orange-500 text-xs font-bold px-2 py-1 rounded mb-3 inline-block">AI POWERED DEALS</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">M-Pesa Express <br/>Is Here</h2>
                <p className="mb-6 text-blue-100">Shop effortlessly using M-Pesa or PayPal. Fast, Secure, and Reliable.</p>
                <button className="bg-white text-blue-900 px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center mix-blend-overlay"></div>
            </div>

            {/* AI Recommendations Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-orange-500" />
                <h2 className="text-xl font-bold text-gray-800">AI Recommended For You</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PRODUCTS.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </div>

            {/* Filtered Products Grid */}
            <div id="shop">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">{selectedCategory}</h2>
                <span className="text-sm text-gray-500">{filteredProducts.length} items found</span>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">No products found for your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-gray-300 mt-12 pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">DerickShop</h3>
              <p className="text-sm mb-4">The ultimate AI-powered shopping destination. Experience the future of e-commerce today.</p>
              <div className="flex gap-2">
                <div className="bg-white p-1 rounded w-12 h-8 flex items-center justify-center"><span className="text-xs font-bold text-blue-800">VISA</span></div>
                <div className="bg-white p-1 rounded w-12 h-8 flex items-center justify-center"><span className="text-xs font-bold text-green-600">M-PESA</span></div>
                <div className="bg-white p-1 rounded w-12 h-8 flex items-center justify-center"><span className="text-xs font-bold text-blue-600 italic">PayPal</span></div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">About Us</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-orange-500 cursor-pointer">Careers</li>
                <li className="hover:text-orange-500 cursor-pointer">Terms & Conditions</li>
                <li className="hover:text-orange-500 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-orange-500 cursor-pointer">Derick AI Tech</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-orange-500 cursor-pointer">Help Center</li>
                <li className="hover:text-orange-500 cursor-pointer">How to Buy</li>
                <li className="hover:text-orange-500 cursor-pointer">Returns & Refunds</li>
                <li className="hover:text-orange-500 cursor-pointer">Report a Product</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Newsletter</h4>
              <p className="text-sm mb-4">Subscribe to our AI curated weekly deals.</p>
              <div className="flex">
                <input type="email" placeholder="Your Email" className="bg-gray-800 border-none rounded-l-md px-4 py-2 text-sm w-full focus:ring-1 focus:ring-orange-500" />
                <button className="bg-orange-500 text-white px-4 py-2 rounded-r-md font-bold text-sm hover:bg-orange-600">JOIN</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm">
            <p>&copy; 2025 Derick Digital Shop. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* --- Cart Sidebar/Modal --- */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingCart size={20}/> Shopping Cart ({cart.length})
              </h2>
              <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-200 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">Your cart is empty.</p>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="mt-4 text-orange-600 font-medium hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-gray-50" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{item.name}</h4>
                      <p className="text-orange-600 font-bold text-sm mt-1">KES {item.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 border rounded px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-500 hover:text-orange-600">-</button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-500 hover:text-orange-600">+</button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-xs hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-lg">KES {cartTotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleStartCheckout}
                  className="w-full bg-orange-600 text-white py-3 rounded-md font-bold hover:bg-orange-700 transition-colors"
                >
                  CHECKOUT NOW
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Checkout Modal --- */}
      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        cart={cart} 
        total={cartTotal}
        clearCart={() => setCart([])}
      />

      {/* --- Floating AI Button --- */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-colors z-40 flex items-center justify-center gap-2 group"
      >
        {isChatOpen ? <X size={24} /> : <Bot size={28} />}
        {!isChatOpen && <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">Ask AI</span>}
      </button>

      {/* --- AI Chat Window --- */}
      <AIChatbot isOpen={isChatOpen} toggleChat={() => setIsChatOpen(false)} />

    </div>
  );
};

export default App;