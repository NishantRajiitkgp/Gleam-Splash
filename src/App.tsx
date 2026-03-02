import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin, ChevronDown, Menu } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: "SARAH L.",
    initial: "S",
    text: "\"I had my interior detailing done at Gleam, and they did an incredible job! My car looks and smells like new again. The attention to detail and the level of cleanliness they achieved exceeded my expectations. Highly recommended!\"",
    car: "AUDI TT / Ceramic Coating",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "MICHAEL T.",
    initial: "M",
    text: "\"The paint correction service is absolutely phenomenal. My 5-year-old car looks like it just rolled out of the showroom. The team was professional and the results speak for themselves. Will definitely come back!\"",
    car: "BMW M4 / Paint Correction",
    image: "https://images.unsplash.com/photo-1555353540-64fd1b6226f7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "DAVID W.",
    initial: "D",
    text: "\"I've tried many detailing services in Colorado, but Gleam is by far the best. Their attention to detail is unmatched. The ceramic coating they applied has kept my car looking pristine for months.\"",
    car: "PORSCHE 911 / Full Detailing",
    image: "https://images.unsplash.com/photo-1503376712341-0048236723a6?auto=format&fit=crop&q=80&w=800"
  }
];

const vehiclePrices: Record<string, number> = {
  'Sedan': 229,
  'SUV': 259,
  'Pickup': 279,
  'Minivan': 289,
  'Large SUV': 319
};

export default function App() {
  const [currentReview, setCurrentReview] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState('Sedan');
  
  const collageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: collageRef,
    offset: ["start end", "center center"]
  });

  // Transform values for each image based on scroll progress
  // Image 1 (far left): starts at -200%, ends at -120%
  const x1 = useTransform(scrollYProgress, [0, 1], ["-200%", "-120%"]);
  // Image 2 (inner left): starts at -80%, ends at -40%
  const x2 = useTransform(scrollYProgress, [0, 1], ["-80%", "-40%"]);
  // Image 3 (inner right): starts at 80%, ends at 40%
  const x3 = useTransform(scrollYProgress, [0, 1], ["80%", "40%"]);
  // Image 4 (far right): starts at 200%, ends at 120%
  const x4 = useTransform(scrollYProgress, [0, 1], ["200%", "120%"]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="bg-white font-sans overflow-clip">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-white z-50 py-5 border-b border-gray-100">
        <div className="max-w-[1300px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center cursor-pointer">
            <svg width="80" height="16" viewBox="0 0 80 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1">
              <path d="M2 14 C 15 2, 35 -2, 55 4 C 65 7, 75 12, 78 14" stroke="#E23232" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="text-[#111] tracking-[0.4em] text-sm font-semibold ml-1">GLEAM</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            <a href="#" className="text-[#111] font-medium text-[1.05rem] hover:text-[#E23232] transition-colors">About Us</a>
            <a href="#" className="text-[#111] font-medium text-[1.05rem] hover:text-[#E23232] transition-colors">Services</a>
            <a href="#" className="text-[#111] font-medium text-[1.05rem] hover:text-[#E23232] transition-colors">Pricing</a>
            <a href="#" className="text-[#111] font-medium text-[1.05rem] hover:text-[#E23232] transition-colors">Join Us</a>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-[#111] font-medium text-[1.05rem] group-hover:text-[#E23232] transition-colors">All Pages</span>
              <ChevronDown className="w-5 h-5 text-[#111] group-hover:text-[#E23232] transition-colors mt-0.5" />
            </div>
          </div>

          {/* CTA Button */}
          <button className="hidden lg:block bg-transparent text-[#111] border border-[#E23232] font-['Anton'] text-xl uppercase tracking-wider py-2.5 px-8 rounded-full hover:bg-[#E23232] hover:text-white transition-colors">
            Request a quote
          </button>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-[#111]">
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-24">
        {/* Main Content Container */}
        <div className="relative z-20 max-w-[1300px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start">
          
          {/* Left Column */}
          <div className="lg:w-[55%] pt-4 lg:pr-20">
            <h1 className="text-[5.5rem] lg:text-[7.5rem] font-['Anton'] text-[#111] leading-[0.85] mb-10 uppercase tracking-normal">
              Get your car<br/>detailed
            </h1>
            
            <div className="flex flex-col gap-6 max-w-md">
              {/* Address Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <MapPin className="w-6 h-6 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Enter your address" 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-lg rounded-2xl pl-14 pr-6 py-4 outline-none focus:bg-white focus:ring-4 focus:ring-[#E23232]/10 focus:border-[#E23232] transition-all duration-300"
                />
              </div>

              {/* Vehicle Types */}
              <div className="flex flex-wrap gap-3">
                {Object.keys(vehiclePrices).map((vehicle) => (
                  <button 
                    key={vehicle}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`px-6 py-2.5 rounded-full font-medium text-sm transition-colors ${
                      selectedVehicle === vehicle 
                        ? 'bg-[#111] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {vehicle}
                  </button>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-gray-600 text-xl font-medium">Full Detail from</span>
                <span className="text-5xl font-['Anton'] text-[#E23232]">${vehiclePrices[selectedVehicle]}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-[45%] relative mt-16 lg:mt-0 w-full lg:-mb-48">
            {/* Red square decoration */}
            <div className="absolute top-0 right-[-24px] w-64 h-64 bg-[#E23232] -mt-8 z-0 hidden lg:block"></div>
            
            <div className="relative z-10 flex flex-col">
              {/* Image */}
              <img 
                src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1000" 
                alt="Car washing" 
                className="w-full h-[350px] lg:h-[450px] object-cover" 
              />
              
              {/* Dark Red Box */}
              <div className="bg-[#A42828] p-10 lg:p-12 text-white w-full">
                <h2 className="text-3xl lg:text-4xl font-['Anton'] mb-4 uppercase tracking-wide leading-[1.1]">
                  Drive clean. Drive proud.
                </h2>
                <p className="text-white/90 text-base lg:text-lg mb-8 leading-relaxed font-medium">
                  Your car deserves more than a wash — it deserves a transformation. Experience Colorado's best car detailing service today.
                </p>
                <a href="#" className="text-white font-['Anton'] text-lg lg:text-xl uppercase tracking-wider hover:text-gray-200 transition-colors">
                  Learn more about us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Image Section */}
      <section className="w-full h-[50vh] lg:h-[70vh] relative z-10">
        <img 
          src="https://images.unsplash.com/photo-1600661653561-629509216228?q=80&w=2000&auto=format&fit=crop" 
          alt="Car being washed" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </section>

      {/* Belief Section */}
      <section className="py-24 lg:py-32 bg-white text-center px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl lg:text-[4rem] font-['Anton'] uppercase leading-[1.1] text-[#111] mb-16 lg:mb-24">
            We believe car care should be<br />more than just a rinse.
          </h2>
          
          {/* Image Collage */}
          <div ref={collageRef} className="flex justify-center items-center h-[250px] lg:h-[350px] relative mb-16 lg:mb-24 w-full max-w-4xl mx-auto">
            <motion.img 
              style={{ x: x1 }}
              src="https://images.unsplash.com/photo-1600661653561-629509216228?q=80&w=400&auto=format&fit=crop" 
              alt="Wheel cleaning" 
              className="absolute w-[130px] lg:w-[220px] h-[180px] lg:h-[300px] object-cover border-[6px] lg:border-[8px] border-white shadow-xl -rotate-[15deg] z-10"
            />
            <motion.img 
              style={{ x: x2 }}
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=400&auto=format&fit=crop" 
              alt="Car back wash" 
              className="absolute w-[130px] lg:w-[220px] h-[180px] lg:h-[300px] object-cover border-[6px] lg:border-[8px] border-white shadow-xl -rotate-[5deg] z-20"
            />
            <motion.img 
              style={{ x: x3 }}
              src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=400&auto=format&fit=crop" 
              alt="Car front wash" 
              className="absolute w-[130px] lg:w-[220px] h-[180px] lg:h-[300px] object-cover border-[6px] lg:border-[8px] border-white shadow-xl rotate-[5deg] z-40"
            />
            <motion.img 
              style={{ x: x4 }}
              src="https://images.unsplash.com/photo-1587560699334-bea93391dcef?q=80&w=400&auto=format&fit=crop" 
              alt="Car side wash" 
              className="absolute w-[130px] lg:w-[220px] h-[180px] lg:h-[300px] object-cover border-[6px] lg:border-[8px] border-white shadow-xl rotate-[15deg] z-30"
            />
          </div>

          <p className="text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-medium mb-12">
            That's why we combine advanced detailing techniques, premium products, and a customer-first approach to deliver results that truly stand out.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="bg-[#E23232] text-white font-['Anton'] text-lg lg:text-xl uppercase tracking-wider py-4 px-10 rounded-full hover:bg-red-700 transition-colors w-full sm:w-auto">
              About us
            </button>
            <button className="bg-transparent text-[#111] border border-[#E23232] font-['Anton'] text-lg lg:text-xl uppercase tracking-wider py-4 px-10 rounded-full hover:bg-gray-50 transition-colors w-full sm:w-auto">
              Services
            </button>
          </div>
        </div>
      </section>

      {/* Complex Services Section */}
      <section className="py-24 lg:py-32 bg-white px-6 relative z-20">
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
          
          {/* Left Sticky Column */}
          <div className="lg:w-[35%] lg:sticky lg:top-32">
            <div className="flex gap-6">
              <div className="w-1.5 bg-[#E23232] h-24 mt-3 shrink-0"></div>
              <div>
                <h2 className="text-5xl lg:text-[5.5rem] font-['Anton'] uppercase leading-[0.9] text-[#111] mb-8">
                  Complex<br/>Services
                </h2>
                <p className="text-gray-600 text-lg lg:text-xl mb-10 font-medium leading-relaxed max-w-sm">
                  Gleam offers a range of customizable services to cater to your specific needs.
                </p>
                <button className="bg-transparent text-[#111] border border-[#E23232] font-['Anton'] text-lg uppercase tracking-wider py-3 px-8 rounded-full hover:bg-[#E23232] hover:text-white transition-colors">
                  View all services
                </button>
              </div>
            </div>
          </div>

          {/* Right Scrolling Column */}
          <div className="lg:w-[65%] flex flex-col gap-20 lg:gap-32">
            
            {/* Service 1 */}
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 items-center group cursor-pointer">
              <div className="w-full sm:w-1/2 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800" 
                  alt="Ceramic Coating" 
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="w-full sm:w-1/2">
                <h3 className="text-3xl lg:text-4xl font-['Anton'] uppercase text-[#E23232] group-hover:text-[#E23232] transition-colors mb-6">
                  Ceramic Coating
                </h3>
                <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10">
                  A protective liquid polymer applied to a vehicle's exterior, bonding with the paint to form a highly durable, hydrophobic shield that ensures long-lasting protection and a brilliant, glossy shine.
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-['Anton'] text-xl uppercase tracking-wider text-[#111]">View Details</span>
                  <div className="h-[2px] w-16 bg-[#E23232]"></div>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 items-center group cursor-pointer">
              <div className="w-full sm:w-1/2 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&q=80&w=800" 
                  alt="Paint Correction" 
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="w-full sm:w-1/2">
                <h3 className="text-3xl lg:text-4xl font-['Anton'] uppercase text-[#111] group-hover:text-[#E23232] transition-colors mb-6">
                  Paint Correction
                </h3>
                <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10">
                  A professional process that restores and enhances vehicle paint by carefully removing swirl marks, scratches, oxidation, and other imperfections using advanced tools and refined techniques.
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-['Anton'] text-xl uppercase tracking-wider text-[#111]">View Details</span>
                  <div className="h-[2px] w-16 bg-[#E23232] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 items-center group cursor-pointer">
              <div className="w-full sm:w-1/2 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800" 
                  alt="Exterior Wash" 
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="w-full sm:w-1/2">
                <h3 className="text-3xl lg:text-4xl font-['Anton'] uppercase text-[#111] group-hover:text-[#E23232] transition-colors mb-6">
                  Exterior Wash
                </h3>
                <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10">
                  This includes a thorough exterior cleaning of the car's body, removing dirt, dust, and grime. It typically involves careful hand washing, using high-quality car wash soap, and properly drying the vehicle.
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-['Anton'] text-xl uppercase tracking-wider text-[#111]">View Details</span>
                  <div className="h-[2px] w-16 bg-[#E23232] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mastered Art Section */}
      <section className="relative py-24 lg:py-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000&auto=format&fit=crop" 
            alt="Car detailing background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#3a1515]/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 max-w-[1300px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Column */}
          <div className="lg:w-1/2 text-white">
            <h2 className="text-5xl lg:text-[5.5rem] font-['Anton'] uppercase leading-[0.9] mb-8">
              We have<br/>mastered the<br/>art of detailing
            </h2>
            <p className="text-white/90 text-lg lg:text-xl font-medium leading-relaxed max-w-md">
              With years of dedication, we've perfected the craft of car detailing, delivering unmatched care and precision to every vehicle we service.
            </p>
          </div>

          {/* Right Column (Black Box) */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-[#111] p-10 lg:p-16 text-white">
              <div className="mb-12">
                <h3 className="text-5xl lg:text-6xl font-['Anton'] mb-2">12+</h3>
                <p className="text-white/80 font-medium">Years Experience</p>
              </div>

              <div className="flex gap-6 mb-12">
                <div className="w-1 bg-[#E23232] shrink-0"></div>
                <div>
                  <h4 className="text-2xl lg:text-3xl font-['Anton'] uppercase mb-4">Professional Services</h4>
                  <p className="text-white/70 text-sm lg:text-base leading-relaxed font-medium">
                    From exterior washes to full interior detailing, we proudly provide a wide range of premium services carefully designed to keep your car spotless, protected, and always looking like new.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 mb-12">
                <div className="w-1 bg-[#E23232] shrink-0"></div>
                <div>
                  <h4 className="text-2xl lg:text-3xl font-['Anton'] uppercase mb-4">High-End Equipment</h4>
                  <p className="text-white/70 text-sm lg:text-base leading-relaxed font-medium">
                    We use advanced tools, eco-friendly products, and modern techniques to ensure the absolute highest level of quality, efficiency, and reliable, long-lasting care for your vehicle
                  </p>
                </div>
              </div>

              <button className="bg-transparent text-white border border-[#E23232] font-['Anton'] text-lg uppercase tracking-wider py-3 px-8 rounded-full hover:bg-[#E23232] transition-colors">
                Learn more
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Select Services Section */}
      <section className="py-24 lg:py-32 bg-[#111] px-6">
        <div className="max-w-[1300px] mx-auto">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl lg:text-[5.5rem] font-['Anton'] uppercase leading-[0.9] text-white mb-6">
                Select Services
              </h2>
              <p className="text-white/80 text-lg lg:text-xl font-medium leading-relaxed">
                Choose from flexible packages with the perfect option for your car, from a quick wash to complete full detailing.
              </p>
            </div>
            <button className="bg-[#E23232] text-white font-['Anton'] text-lg uppercase tracking-wider py-3 px-10 rounded-full hover:bg-red-700 transition-colors shrink-0 mb-2">
              View all
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-10 lg:p-12 flex flex-col h-full">
              <h3 className="text-6xl lg:text-7xl font-['Anton'] text-[#E23232] mb-6">$229</h3>
              <h4 className="text-3xl lg:text-4xl font-['Anton'] uppercase text-[#111] mb-6">Ceramic Coating</h4>
              <p className="text-gray-600 text-base lg:text-lg font-medium leading-relaxed mb-12 flex-grow">
                Ceramic coating bonds with paint to create a durable, protective hydrophobic shield for lasting protection and glossy shine.
              </p>
              <button className="bg-transparent text-[#111] border border-[#E23232] font-['Anton'] text-lg uppercase tracking-wider py-3 px-8 rounded-full hover:bg-[#E23232] hover:text-white transition-colors self-start">
                Book now
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-[#E23232] p-10 lg:p-12 flex flex-col h-full">
              <h3 className="text-6xl lg:text-7xl font-['Anton'] text-white mb-6">$59</h3>
              <h4 className="text-3xl lg:text-4xl font-['Anton'] uppercase text-white mb-6">Gleam & Dash</h4>
              <p className="text-white/90 text-base lg:text-lg font-medium leading-relaxed mb-12 flex-grow">
                Protect your car's paint with durable ceramic coating that resists scratches, UV rays, and chemicals while boosting gloss.
              </p>
              <button className="bg-transparent text-white border border-white font-['Anton'] text-lg uppercase tracking-wider py-3 px-8 rounded-full hover:bg-white hover:text-[#E23232] transition-colors self-start">
                Book now
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-10 lg:p-12 flex flex-col h-full">
              <h3 className="text-6xl lg:text-7xl font-['Anton'] text-[#E23232] mb-6">$89</h3>
              <h4 className="text-3xl lg:text-4xl font-['Anton'] uppercase text-[#111] mb-6">Polish It</h4>
              <p className="text-gray-600 text-base lg:text-lg font-medium leading-relaxed mb-12 flex-grow">
                Renew your car's brilliance with expert polishing that clears swirl marks, scratches, and oxidation for a sleek glossy finish.
              </p>
              <button className="bg-transparent text-[#111] border border-[#E23232] font-['Anton'] text-lg uppercase tracking-wider py-3 px-8 rounded-full hover:bg-[#E23232] hover:text-white transition-colors self-start">
                Book now
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Client's Reviews Section */}
      <section className="py-24 lg:py-32 bg-white px-6">
        <div className="max-w-[1300px] mx-auto">
          
          {/* Header */}
          <div className="flex gap-6 mb-16 lg:mb-24">
            <div className="w-1.5 bg-[#E23232] h-16 lg:h-20 mt-2 shrink-0"></div>
            <h2 className="text-5xl lg:text-[5.5rem] font-['Anton'] uppercase leading-[0.9] text-[#111]">
              Client's Reviews
            </h2>
          </div>

          {/* Review Content */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            
            {/* Left Image */}
            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[500px]">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=800" 
                    alt="Client's car" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Red line decoration */}
                <div className="absolute top-16 -right-4 lg:-right-12 w-16 lg:w-24 h-1 bg-[#E23232]"></div>
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2 flex flex-col h-full justify-between min-h-[400px]">
              <div key={`text-${currentReview}`} className="animate-[fadeIn_0.5s_ease-in-out]">
                {/* User Info */}
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 rounded-full bg-[#E23232] flex items-center justify-center text-white font-['Anton'] text-3xl">
                    {reviews[currentReview].initial}
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-['Anton'] uppercase text-[#111]">
                    {reviews[currentReview].name}
                  </h3>
                </div>

                {/* Quote */}
                <p className="text-gray-600 text-lg lg:text-xl font-medium leading-relaxed mb-12">
                  {reviews[currentReview].text}
                </p>

                {/* Stars & Car Info */}
                <div className="mb-12">
                  <div className="flex gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-[#E23232] text-[#E23232]" />
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm uppercase tracking-wider font-medium">
                    {reviews[currentReview].car}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-end gap-4 mt-auto">
                <button 
                  onClick={prevReview}
                  className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#E23232] hover:text-[#E23232] transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextReview}
                  className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#E23232] hover:text-[#E23232] transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Book Appointment Section */}
      <section className="relative py-24 lg:py-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2000&auto=format&fit=crop" 
            alt="Car detailing background" 
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        <div className="relative z-10 max-w-[1300px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Column */}
          <div className="lg:w-1/2 text-white">
            <h2 className="text-5xl lg:text-[5.5rem] font-['Anton'] uppercase leading-[0.9] mb-8">
              Let's book an<br/>appointment
            </h2>
            <p className="text-white/90 text-lg lg:text-xl font-medium leading-relaxed max-w-md">
              Ready for a spotless ride? Book your appointment now and let our expert team take the best care of your car.
            </p>
          </div>

          {/* Right Column (Form) */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-white p-10 lg:p-14 w-full rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E23232] to-[#ff6b6b]"></div>
              
              <form className="flex flex-col gap-6">
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <label className="text-gray-700 text-sm font-semibold ml-1">Full name*</label>
                    <input 
                      type="text" 
                      placeholder="Sarah Johnson" 
                      className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-4 focus:ring-[#E23232]/10 focus:border-[#E23232] transition-all duration-300 w-full text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <label className="text-gray-700 text-sm font-semibold ml-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="johnson@email.com" 
                      className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-4 focus:ring-[#E23232]/10 focus:border-[#E23232] transition-all duration-300 w-full text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <label className="text-gray-700 text-sm font-semibold ml-1">Phone number*</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 123-4567" 
                      className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-4 focus:ring-[#E23232]/10 focus:border-[#E23232] transition-all duration-300 w-full text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <label className="text-gray-700 text-sm font-semibold ml-1">Vehicle type</label>
                    <input 
                      type="text" 
                      placeholder="Toyota Camry Sedan" 
                      className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-4 focus:ring-[#E23232]/10 focus:border-[#E23232] transition-all duration-300 w-full text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <label className="text-gray-700 text-sm font-semibold ml-1">Additional requests*</label>
                  <textarea 
                    placeholder="Let us know if you have any specific needs or concerns..." 
                    rows={4}
                    className="bg-gray-50 border border-gray-200 rounded-3xl px-6 py-5 outline-none focus:bg-white focus:ring-4 focus:ring-[#E23232]/10 focus:border-[#E23232] transition-all duration-300 w-full text-gray-800 placeholder-gray-400 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="button"
                  className="bg-[#E23232] text-white font-['Anton'] text-lg uppercase tracking-wider py-4 px-10 rounded-full hover:bg-red-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 self-start mt-2"
                >
                  Submit message
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#111] pt-24 pb-8 px-6 border-t border-white/10">
        <div className="max-w-[1300px] mx-auto">
          
          {/* Top CTA */}
          <div className="flex flex-col items-center text-center mb-24">
            <div className="flex flex-col items-center mb-10">
              <svg width="80" height="16" viewBox="0 0 80 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                <path d="M2 14 C 15 2, 35 -2, 55 4 C 65 7, 75 12, 78 14" stroke="#E23232" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
              <span className="text-white tracking-[0.4em] text-sm font-medium ml-1">GLEAM</span>
            </div>
            
            <h2 className="text-4xl lg:text-[4.5rem] font-['Anton'] uppercase leading-[1.1] text-white mb-12 max-w-4xl">
              TURN EVERY RIDE INTO A STATEMENT WITH<br/>A PERFECTLY MAINTAINED CAR
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#E23232] text-white font-['Anton'] text-lg uppercase tracking-wider py-4 px-10 rounded-full hover:bg-red-700 transition-colors">
                Get an appointment
              </button>
              <button className="bg-transparent text-white border border-white font-['Anton'] text-lg uppercase tracking-wider py-4 px-10 rounded-full hover:bg-white hover:text-[#111] transition-colors">
                Talk to support team
              </button>
            </div>
          </div>

          {/* Middle Links */}
          <div className="border-t border-b border-white/10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
            
            {/* Column 1 */}
            <div className="flex flex-col md:pr-12 lg:pr-24 md:border-r border-white/10">
              <div className="mb-12">
                <h3 className="text-[#E23232] font-['Anton'] text-2xl uppercase tracking-wide mb-6">Website Navigation</h3>
                <ul className="flex flex-col gap-4">
                  <li><a href="#" className="text-white/90 hover:text-white transition-colors font-medium">Explore Our Premium Services</a></li>
                  <li><a href="#" className="text-white/90 hover:text-white transition-colors font-medium">Learn More About Company</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#E23232] font-['Anton'] text-2xl uppercase tracking-wide mb-6">Kentucky Office</h3>
                <p className="text-white/90 font-medium leading-relaxed">
                  4517 Washington Ave. Manchester,<br/>Kentucky 39495
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col md:px-12 lg:px-24 md:border-r border-white/10">
              <div className="mb-12">
                <h3 className="text-[#E23232] font-['Anton'] text-2xl uppercase tracking-wide mb-6">Helpful Resources</h3>
                <ul className="flex flex-col gap-4">
                  <li><a href="#" className="text-white/90 hover:text-white transition-colors font-medium">Exclusive Package Deals</a></li>
                  <li><a href="#" className="text-white/90 hover:text-white transition-colors font-medium">Explore Our Blog Insights</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#E23232] font-['Anton'] text-2xl uppercase tracking-wide mb-6">Phone</h3>
                <ul className="flex flex-col gap-4">
                  <li className="text-white/90 font-medium">(406) 555-0120</li>
                  <li className="text-white/90 font-medium">(316) 555-0116</li>
                </ul>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col md:pl-12 lg:pl-24">
              <div className="mb-12">
                <h3 className="text-[#E23232] font-['Anton'] text-2xl uppercase tracking-wide mb-6">Customer Support</h3>
                <ul className="flex flex-col gap-4">
                  <li><a href="#" className="text-white/90 hover:text-white transition-colors font-medium">Meet Our Dedicated Team</a></li>
                  <li><a href="#" className="text-white/90 hover:text-white transition-colors font-medium">Get In Touch With Us Today</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#E23232] font-['Anton'] text-2xl uppercase tracking-wide mb-6">Opening Hours</h3>
                <ul className="flex flex-col gap-4">
                  <li className="text-white/90 font-medium">09:00 am - 06:00 pm</li>
                  <li className="text-white/90 font-medium">Monday - Friday</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 text-center">
            <p className="text-white/70 text-sm font-medium">
              Gleam®. All rights reserved. Designed by <span className="text-white">fourtwelve</span>.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
