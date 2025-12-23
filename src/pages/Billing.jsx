import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// --- Assets & Icons ---
function Spinner({ className = '' }) {
  return (
    <svg className={`animate-spin h-5 w-5 ${className}`} viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

function CreditCardIcons() {
  return (
    <div className="flex items-center space-x-1">
      {['VISA', 'MC', 'AMEX', 'DISC'].map((card) => (
        <div key={card} className="h-6 px-1 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
          <span className="text-[10px] font-bold text-gray-600">{card}</span>
        </div>
      ))}
    </div>
  );
}

// --- Constants ---
const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan",
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cambodia", "Cameroon", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia",
  "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
  "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "Gabon", "Gambia", "Georgia", "Ghana", "Greece",
  "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
  "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman",
  "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa",
  "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka",
  "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
  "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
  "Ukraine", "United Arab Emirates", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

// --- Sub-Components ---
function Toasts({ toasts, remove }) {
  return (
    <div aria-live="polite" className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className={`pointer-events-auto max-w-sm w-full px-4 py-3 rounded-lg shadow-xl border ${
          t.type === 'error' ? 'bg-white border-red-100 text-red-600' : 'bg-white border-gray-100 text-gray-800'
        } transform transition-all duration-300 ease-in-out`}>
          <div className="flex items-start">
            <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full mr-3 ${t.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`} />
            <div className="flex-1">
              <div className="font-semibold text-sm">{t.title}</div>
              <div className="text-sm opacity-90">{t.message}</div>
            </div>
            <button onClick={() => remove(t.id)} className="ml-2 text-gray-400 hover:text-gray-600">✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function OrderSummary({ order, loading }) {
  if (loading || !order) return <div className="animate-pulse h-32 bg-gray-800 rounded-lg"></div>;
  
  const currency = order.currency || 'USD';

  return (
    <div className="bg-gray-900 text-gray-300 p-6 lg:p-12 h-full min-h-[300px] flex flex-col">
      <div className="mb-8">
        <h2 className="text-white text-xl font-semibold flex items-center gap-2">
          <span className="bg-blue-600 w-8 h-8 rounded flex items-center justify-center text-sm">OS</span>
          Order Summary
        </h2>
        <p className="text-sm mt-1 opacity-70">ID: {String(order._id).slice(-8)}</p>
      </div>

      <div className="flex-1">
        {order.items && order.items.length > 0 ? (
          <ul className="space-y-4">
            {order.items.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center text-sm">
                <span className="text-gray-100">{item.name || 'Service Item'}</span>
                <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(item.price)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-100">Standard Service</span>
            <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(order.total)}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(order.total)}</span>
        </div>
        <div className="flex justify-between text-white text-2xl font-bold mt-4 pt-4">
          <span>Total</span>
          <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(order.total)}</span>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---
export default function Billing() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(1);

  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiration: '',
    cvc: '',
    cardName: '', // Added Cardholder Name
    country: 'United States',
    zip: ''
  });

  const [errors, setErrors] = useState({});
  const API_BASE = window._API_BASE || import.meta?.env?.VITE_API_BASE || 'http://localhost:5000';

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const ordRes = await fetch(`${API_BASE}/api/orders/${orderId}`);
        if (!mounted) return;
        
        const ordJson = await ordRes.json().catch(() => null);
        
        if (ordRes.ok && ordJson && ordJson.ok) {
          setOrder(ordJson.order);
        } else {
          setOrder(null);
          pushToast('Error', ordJson?.error || 'Unable to load order', 'error');
        }
      } catch (err) {
        console.error(err);
        pushToast('Error', 'Failed to load order', 'error');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [orderId, API_BASE]);

  // --- Helpers ---
  function pushToast(title, message, type = 'info') {
    const id = toastId.current++;
    setToasts((t) => [...t, { id, title, message, type }]);
    setTimeout(() => setToasts((t) => t.filter(x => x.id !== id)), 6000);
  }

  function removeToast(id) {
    setToasts((t) => t.filter(x => x.id !== id));
  }

  function formatCardNumber(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  }

  function formatExpiration(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) return v.substring(0, 2) + ' / ' + v.substring(2, 4);
    return v;
  }

  function validateForm() {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.cardName) newErrors.cardName = 'Name on card is required';
    
    const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
    if (!cleanCardNumber || cleanCardNumber.length < 13) newErrors.cardNumber = 'Valid card number is required';
    
    if (!formData.expiration) newErrors.expiration = 'Required';
    else {
        const [m, y] = formData.expiration.split(' / ');
        if (!m || !y || m > 12) newErrors.expiration = 'Invalid date';
    }
    
    if (!formData.cvc || formData.cvc.length < 3) newErrors.cvc = 'Valid CVC required';
    if (!formData.zip) newErrors.zip = 'ZIP code required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleInputChange(field, value) {
    let formattedValue = value;
    if (field === 'cardNumber') formattedValue = formatCardNumber(value);
    else if (field === 'expiration') formattedValue = formatExpiration(value);
    else if (field === 'cvc') formattedValue = value.replace(/\D/g, '').substring(0, 4);

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  }

  async function handlePaymentSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      pushToast('Action Required', 'Please fix the errors in the form', 'error');
      return;
    }

    setProcessing(true);
    
    // Simulate API Call for demo purposes
    try {
        // Prepare payload (keep existing logic structure)
        const payload = { 
            orderId, 
            methodId: paymentMethod,
            paymentData: { ...formData, cardNumber: formData.cardNumber.replace(/\s/g, '') }
        };
        
        // This is where you would await fetch(`${API_BASE}/api/payments/sessions`...
        // For visual demo, we simulate a delay
        await new Promise(r => setTimeout(r, 2000));
        
        pushToast('Success', 'Payment successful! Redirecting...', 'info');
        setTimeout(() => navigate('/services'), 2000);

    } catch (err) {
        pushToast('Error', 'Payment processing failed', 'error');
    } finally {
        setProcessing(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spinner className="text-blue-600 h-10 w-10 mx-auto" />
        <div className="mt-4 text-gray-500 font-medium">Preparing secure checkout...</div>
      </div>
    </div>
  );

  if (!order) return (
    <div className="p-12 text-center">
      <h3 className="text-xl font-bold text-gray-800">Order not found</h3>
      <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">Return Home</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <Toasts toasts={toasts} remove={removeToast} />

      {/* LEFT COLUMN: Order Summary (Dark Mode) */}
      <div className="lg:w-5/12 w-full bg-gray-900 order-1 lg:order-1 relative overflow-hidden">
         {/* Background pattern decorative */}
         <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
         </div>
         <OrderSummary order={order} loading={loading} />
      </div>

      {/* RIGHT COLUMN: Payment Form (Light Mode) */}
      <div className="lg:w-7/12 w-full bg-white order-2 lg:order-2">
        <div className="max-w-2xl mx-auto p-6 lg:p-12">
            
            {/* Header */}
            <div className="mb-8 border-b pb-6">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">Pay Invoice</h1>
                    <div className="flex items-center text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                        <LockIcon />
                        <span className="ml-1 font-semibold">Secure SSL</span>
                    </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <span>Client: {formData.email || 'Guest'}</span>
                </div>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-8">
                
                {/* Section 1: Contact Info */}
                <section>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact Information</h3>
                    <div className="relative">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="name@company.com"
                            className={`block w-full px-4 py-3 rounded-md border ${errors.email ? 'border-red-300 ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-4 transition-shadow outline-none`}
                        />
                         {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                </section>

                {/* Section 2: Payment Method */}
                <section>
                     <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Payment Method</h3>
                     <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`relative flex items-center justify-center p-4 border rounded-xl transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600 ring-offset-2' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                        >
                            <span className="font-semibold text-sm">Credit Card</span>
                            {paymentMethod === 'card' && <div className="absolute top-2 right-2 text-blue-600"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>}
                        </button>
                        <button
                            type="button"
                            disabled
                            className="flex items-center justify-center p-4 border border-gray-100 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed"
                        >
                            <span className="font-semibold text-sm">PayPal (Coming Soon)</span>
                        </button>
                     </div>

                    {paymentMethod === 'card' && (
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-5">
                            {/* Card Number */}
                            <div>
                                <label className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                                    <span>Card Number</span>
                                    <CreditCardIcons />
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.cardNumber}
                                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={23}
                                        className={`block w-full pl-4 pr-10 py-3 rounded-md border bg-white ${errors.cardNumber ? 'border-red-300' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-4 transition-shadow outline-none`}
                                    />
                                    <div className="absolute right-3 top-3 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                    </div>
                                </div>
                                {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                            </div>

                            {/* Name on Card */}
                             <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Name on Card</label>
                                <input
                                    type="text"
                                    value={formData.cardName}
                                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                                    placeholder="J. Smith"
                                    className={`block w-full px-4 py-3 rounded-md border bg-white ${errors.cardName ? 'border-red-300' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-4 transition-shadow outline-none`}
                                />
                                {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                            </div>

                            {/* Expiry & CVC */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Expiration (MM/YY)</label>
                                    <input
                                        type="text"
                                        value={formData.expiration}
                                        onChange={(e) => handleInputChange('expiration', e.target.value)}
                                        placeholder="MM / YY"
                                        maxLength={7}
                                        className={`block w-full px-4 py-3 rounded-md border bg-white ${errors.expiration ? 'border-red-300' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-4 transition-shadow outline-none`}
                                    />
                                    {errors.expiration && <p className="mt-1 text-sm text-red-600">{errors.expiration}</p>}
                                </div>
                                <div>
                                    <label className="flex items-center text-xs font-medium text-gray-700 mb-1">
                                        CVC 
                                        <span className="ml-1 text-gray-400 cursor-help" title="3 digits on back of card">?</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.cvc}
                                        onChange={(e) => handleInputChange('cvc', e.target.value)}
                                        placeholder="123"
                                        maxLength={4}
                                        className={`block w-full px-4 py-3 rounded-md border bg-white ${errors.cvc ? 'border-red-300' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-4 transition-shadow outline-none`}
                                    />
                                    {errors.cvc && <p className="mt-1 text-sm text-red-600">{errors.cvc}</p>}
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Section 3: Billing Address */}
                <section>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Billing Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                             <label className="block text-xs font-medium text-gray-700 mb-1">Country / Region</label>
                             <div className="relative">
                                <select
                                    value={formData.country}
                                    onChange={(e) => handleInputChange('country', e.target.value)}
                                    className="block w-full pl-4 pr-10 py-3 rounded-md border border-gray-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-shadow outline-none appearance-none"
                                >
                                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <div className="absolute right-3 top-3.5 pointer-events-none text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                             </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                            <input
                                type="text"
                                value={formData.zip}
                                onChange={(e) => handleInputChange('zip', e.target.value)}
                                placeholder="10001"
                                className={`block w-full px-4 py-3 rounded-md border ${errors.zip ? 'border-red-300' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-4 transition-shadow outline-none`}
                            />
                            {errors.zip && <p className="mt-1 text-sm text-red-600">{errors.zip}</p>}
                        </div>
                    </div>
                </section>

                {/* Additional Information (New Section) */}
                <section>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Additional Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Order Notes</label>
                            <textarea
                                value={formData.orderNotes}
                                onChange={(e) => handleInputChange('orderNotes', e.target.value)}
                                placeholder="Any special requests or instructions"
                                className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-shadow outline-none resize-none h-20"
                            />
                        </div>
                    </div>
                </section>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg disabled:opacity-50 disabled:transform-none disabled:shadow-none flex items-center justify-center gap-3"
                >
                    {processing ? (
                        <>
                            <Spinner className="text-white" />
                            <span className="text-blue-100">Processing Payment...</span>
                        </>
                    ) : (
                        <>
                            <span className="text-lg">Pay {new Intl.NumberFormat('en-US', { style: 'currency', currency: order?.currency || 'USD' }).format(order?.total || 0)}</span>
                            <ShieldIcon />
                        </>
                    )}
                </button>
                
                <p className="text-center text-xs text-gray-400 mt-4">
                    Your payments are securely processed. We do not store your credit card details.
                </p>
            </form>
        </div>
      </div>
    </div>
  );
}



