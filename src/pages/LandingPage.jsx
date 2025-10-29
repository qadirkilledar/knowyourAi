import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronDown,
  MapPin,
  Bed,
  Bath,
  Square,
  Award,
  Zap,
  Users,
  Eye,
  Heart,
  Share2,
  ArrowRight,
  Mail,
  Phone,
  MessageCircle,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { studiosData } from "./data";

const Studio = () => {
  const [activeStudio, setActiveStudio] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedStudios, setLikedStudios] = useState([]);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    studio: "",
    moveDate: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredStudios =
    selectedCategory === "all"
      ? studiosData
      : studiosData.filter((s) => s.category === selectedCategory);

  const toggleLike = (id) => {
    setLikedStudios((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        studio: "",
        moveDate: "",
        budget: "",
        message: "",
      });
    }, 4000);
  };

  const nextStep = () => {
    if (formStep < 3) setFormStep(formStep + 1);
  };

  const prevStep = () => {
    if (formStep > 1) setFormStep(formStep - 1);
  };

  return (
    <div className="bg-[#F0F0F0] min-h-screen">
      {/* Magnetic Cursor Effect - Desktop Only */}
      <div
        className="hidden lg:block fixed w-4 h-4 bg-[#3D4C3A] rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-200"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Floating Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 mix-blend-difference">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl sm:text-3xl font-black tracking-tighter text-white">
              R—STUDIO
            </div>
            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              <a
                href="#properties"
                className="text-white font-medium hover:opacity-60 transition-opacity"
              >
                Properties
              </a>
              <a
                href="#about"
                className="text-white font-medium hover:opacity-60 transition-opacity"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-white font-medium hover:opacity-60 transition-opacity"
              >
                Contact
              </a>
            </div>
            <button className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5">
              <span className="w-6 h-0.5 bg-white"></span>
              <span className="w-6 h-0.5 bg-white"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${mousePosition.y * 0.02}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#3D4C3A] via-[#2d3d2a] to-black"></div>
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=2000&h=1200&fit=crop"
              className="w-full h-full object-cover mix-blend-overlay"
              alt=""
            />
          </div>
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)" /%3E%3C/svg%3E")',
            }}
          ></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-5xl">
              {/* Main Title */}
              <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-4">
                <div className="overflow-hidden">
                  <h1 className="text-[18vw] sm:text-[15vw] lg:text-[10rem] font-black leading-none text-white tracking-tighter animate-slide-in-left">
                    LIVE
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <h1 className="text-[18vw] sm:text-[15vw] lg:text-[10rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 tracking-tighter animate-slide-in-right animation-delay-200">
                    BOLD
                  </h1>
                </div>
              </div>

              {/* Description */}
              <div className="max-w-xl mb-8 sm:mb-12 animate-fade-in animation-delay-400">
                <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-6 sm:mb-8">
                  Discover London's most exceptional studio apartments. Where
                  architectural innovation meets refined living.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="#properties"
                    className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#3D4C3A] rounded-full font-bold text-base sm:text-lg overflow-hidden text-center"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Explore Studios
                      <ArrowRight
                        className="group-hover:translate-x-1 transition-transform"
                        size={20}
                      />
                    </span>
                    <div className="absolute inset-0 bg-[#E0E0E0] translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  </a>
                  <a
                    href="#contact"
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white rounded-full font-bold text-base sm:text-lg backdrop-blur-sm hover:bg-white/10 transition-all text-center"
                  >
                    Schedule Viewing
                  </a>
                </div>
              </div>

              {/* Stats Ticker - Enhanced with darker background */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 animate-fade-in animation-delay-600">
                {[
                  { value: "06", label: "Premium Studios" },
                  { value: "100%", label: "Verified" },
                  { value: "24/7", label: "Support" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="group bg-black/40 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 hover:bg-black/60 transition-all"
                  >
                    <div className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-white/80 text-xs sm:text-sm uppercase tracking-wider font-bold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3 animate-bounce-smooth">
            <span className="text-white/60 text-xs tracking-[0.3em] uppercase">
              Scroll
            </span>
            <ChevronDown className="text-white/60" size={24} />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-12 w-20 sm:w-32 h-20 sm:h-32 border border-white/10 rounded-full animate-spin-slow hidden lg:block"></div>
        <div className="absolute bottom-1/4 left-12 w-16 sm:w-20 h-16 sm:h-20 border border-white/10 rotate-45 animate-float hidden lg:block"></div>
      </section>

      {/* Marquee Section */}
      <div className="py-6 sm:py-8 bg-black overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-white/20 text-xl sm:text-2xl lg:text-4xl font-black mx-6 sm:mx-8">
                LONDON
              </span>
              <span className="text-white/20 text-xl sm:text-2xl lg:text-4xl font-black mx-6 sm:mx-8">
                •
              </span>
              <span className="text-white/20 text-xl sm:text-2xl lg:text-4xl font-black mx-6 sm:mx-8">
                PREMIUM
              </span>
              <span className="text-white/20 text-xl sm:text-2xl lg:text-4xl font-black mx-6 sm:mx-8">
                •
              </span>
              <span className="text-white/20 text-xl sm:text-2xl lg:text-4xl font-black mx-6 sm:mx-8">
                STUDIOS
              </span>
              <span className="text-white/20 text-xl sm:text-2xl lg:text-4xl font-black mx-6 sm:mx-8">
                •
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <section className="relative py-16 sm:py-24 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white transform -skew-y-3 origin-top-left"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <span className="inline-block px-4 py-2 bg-[#3D4C3A] text-white text-xs font-bold tracking-wider rounded-full mb-4 sm:mb-6">
                  WHY CHOOSE US
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#3D4C3A] leading-[0.9] mb-4 sm:mb-6">
                  Curated
                  <br />
                  Excellence
                </h2>
                <p className="text-lg sm:text-xl text-[#3D4C3A]/70 leading-relaxed">
                  Every studio in our collection has been personally selected
                  and verified. We represent only the finest properties in
                  London's most desirable locations.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    icon: Award,
                    title: "Verified Premium",
                    desc: "All properties personally inspected",
                  },
                  {
                    icon: Zap,
                    title: "Instant Response",
                    desc: "Connect with us within hours",
                  },
                  {
                    icon: Users,
                    title: "Expert Guidance",
                    desc: "Dedicated property specialists",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-[#F0F0F0] rounded-xl sm:rounded-2xl hover:bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <item.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#3D4C3A] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#3D4C3A]/60">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4 sm:space-y-6">
                  <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=600&fit=crop"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=800&fit=crop"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                  <div className="aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=800&fit=crop"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&h=600&fit=crop"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 sm:-bottom-8 -left-4 sm:-left-8 bg-black text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl">
                <div className="text-4xl sm:text-5xl font-black mb-2">5+</div>
                <div className="text-xs sm:text-sm opacity-80">
                  Years
                  <br />
                  Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studios Section */}
      <section id="properties" className="py-16 sm:py-24 lg:py-40 bg-[#F0F0F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div>
              <span className="inline-block px-4 py-2 bg-black text-white text-xs font-bold tracking-wider rounded-full mb-4 sm:mb-6">
                COLLECTION
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#3D4C3A] leading-[0.9]">
                Featured
                <br />
                Studios
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                { id: "all", label: "All" },
                { id: "luxury", label: "Luxury" },
                { id: "minimalist", label: "Minimalist" },
                { id: "industrial", label: "Industrial" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold transition-all duration-300 text-sm sm:text-base ${
                    selectedCategory === cat.id
                      ? "bg-black text-white shadow-xl scale-105"
                      : "bg-white text-[#3D4C3A] hover:bg-[#E0E0E0]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {filteredStudios.map((studio, idx) => (
              <div
                key={studio.id}
                className="group cursor-pointer"
                onClick={() => setActiveStudio(studio)}
              >
                <div className="relative bg-white rounded-2xl sm:rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-700">
                  {/* Image */}
                  <div
                    className={`relative overflow-hidden ${
                      idx % 3 === 0 ? "aspect-[4/5]" : "aspect-square"
                    }`}
                  >
                    <img
                      src={studio.images[0]}
                      alt={studio.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Badges */}
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-start justify-between">
                      <div className="space-y-2">
                        {studio.featured && (
                          <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/90 backdrop-blur-sm rounded-full">
                            <span className="text-[#3D4C3A] text-[10px] sm:text-xs font-black tracking-wider">
                              FEATURED
                            </span>
                          </div>
                        )}
                        <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black/80 backdrop-blur-sm rounded-full">
                          <span className="text-white text-[10px] sm:text-xs font-bold">
                            {studio.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(studio.id);
                          }}
                          className="w-9 h-9 sm:w-11 sm:h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          <Heart
                            size={16}
                            className={
                              likedStudios.includes(studio.id)
                                ? "fill-red-500 text-red-500"
                                : "text-[#3D4C3A]"
                            }
                          />
                        </button>
                        <button className="w-9 h-9 sm:w-11 sm:h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                          <Share2 size={16} className="text-[#3D4C3A]" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                        {studio.name}
                      </h3>
                      <div className="flex items-center gap-2 text-white/90 mb-3 sm:mb-4">
                        <MapPin size={14} />
                        <span className="font-medium text-sm sm:text-base">
                          {studio.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                          <span className="text-white text-xs sm:text-sm font-bold">
                            {studio.size} sq ft
                          </span>
                        </div>
                        <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                          <span className="text-white text-xs sm:text-sm font-bold">
                            {studio.beds} Bed
                          </span>
                        </div>
                        <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                          <span className="text-white text-xs sm:text-sm font-bold">
                            {studio.baths} Bath
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#3D4C3A]/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="text-center text-white space-y-4">
                        <Eye size={40} className="mx-auto" />
                        <div className="text-xl sm:text-2xl font-bold">
                          View Details
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <p className="text-[#3D4C3A]/70 line-clamp-2 leading-relaxed text-sm sm:text-base">
                      {studio.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E0E0E0]">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm font-bold text-[#3D4C3A]">
                          Available {studio.available}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-black font-bold group-hover:gap-4 transition-all text-sm sm:text-base">
                        Details
                        <ArrowRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Detail Modal */}
      {activeStudio && (
        <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => setActiveStudio(null)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 lg:top-12 lg:right-12 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl group"
          >
            <X
              className="text-[#3D4C3A] group-hover:rotate-90 transition-transform duration-300"
              size={24}
            />
          </button>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 min-h-screen">
            {/* Left: Sticky Image Gallery */}
            <div className="sticky top-0 h-screen bg-[#E0E0E0] p-12 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-2xl space-y-6">
                  {/* Main Image */}
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group">
                    <img
                      src={activeStudio.images[currentSlide]}
                      alt={activeStudio.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Navigation */}
                    {currentSlide > 0 && (
                      <button
                        onClick={() => setCurrentSlide((prev) => prev - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                      >
                        <ChevronDown className="rotate-90" size={20} />
                      </button>
                    )}
                    {currentSlide < activeStudio.images.length - 1 && (
                      <button
                        onClick={() => setCurrentSlide((prev) => prev + 1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                      >
                        <ChevronDown className="-rotate-90" size={20} />
                      </button>
                    )}

                    {/* Counter */}
                    <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-full">
                      <span className="text-white text-sm font-bold">
                        {currentSlide + 1} / {activeStudio.images.length}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-6 gap-3">
                    {activeStudio.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`aspect-square rounded-xl overflow-hidden transition-all ${
                          currentSlide === idx
                            ? "ring-4 ring-white scale-110"
                            : "opacity-50 hover:opacity-100 hover:scale-105"
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Scrollable Content */}
            <div className="bg-white">
              <div className="p-12 max-w-3xl mx-auto space-y-10">
                {/* Header */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    {activeStudio.featured && (
                      <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-black tracking-wider">
                        FEATURED
                      </span>
                    )}
                    <span className="px-4 py-2 bg-[#F0F0F0] text-[#3D4C3A] rounded-full text-xs font-bold uppercase">
                      {activeStudio.type}
                    </span>
                  </div>

                  <h1 className="text-5xl lg:text-6xl font-black text-[#3D4C3A] leading-tight">
                    {activeStudio.name}
                  </h1>

                  <div className="flex items-center gap-3 text-[#3D4C3A]/70">
                    <MapPin size={24} />
                    <span className="text-lg font-medium">
                      {activeStudio.fullLocation}
                    </span>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      {
                        icon: Square,
                        label: "Size",
                        value: `${activeStudio.size} sq ft`,
                      },
                      {
                        icon: Bed,
                        label: "Bedrooms",
                        value: activeStudio.beds,
                      },
                      {
                        icon: Bath,
                        label: "Bathrooms",
                        value: activeStudio.baths,
                      },
                      {
                        icon: Calendar,
                        label: "Available",
                        value: activeStudio.available,
                      },
                    ].map((stat, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-[#F0F0F0] rounded-2xl text-center"
                      >
                        <stat.icon
                          className="mx-auto mb-2 text-[#3D4C3A]"
                          size={24}
                        />
                        <div className="text-2xl font-black text-[#3D4C3A] mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs text-[#3D4C3A]/60 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-[#E0E0E0]"></div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-[#3D4C3A]">
                    About This Studio
                  </h3>
                  <p className="text-lg text-[#3D4C3A]/70 leading-relaxed">
                    {activeStudio.longDescription}
                  </p>
                </div>

                <div className="h-px bg-[#E0E0E0]"></div>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-[#3D4C3A]">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {activeStudio.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-[#F0F0F0] rounded-xl"
                      >
                        <CheckCircle
                          size={20}
                          className="text-[#3D4C3A] flex-shrink-0"
                        />
                        <span className="text-[#3D4C3A] font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-[#E0E0E0]"></div>

                {/* Amenities */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-[#3D4C3A]">
                    Building Amenities
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {activeStudio.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2 bg-white border-2 border-[#E0E0E0] rounded-full text-[#3D4C3A] font-medium hover:border-[#3D4C3A] transition-colors"
                      >
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-[#E0E0E0]"></div>

                {/* CTAs */}
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setActiveStudio(null);
                      setTimeout(() => {
                        document
                          .getElementById("contact")
                          .scrollIntoView({ behavior: "smooth" });
                        setFormData((prev) => ({
                          ...prev,
                          studio: activeStudio.name,
                        }));
                      }, 300);
                    }}
                    className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-[#3D4C3A] transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    Book Viewing
                    <Calendar
                      className="group-hover:scale-110 transition-transform"
                      size={20}
                    />
                  </button>

                  <button className="w-full py-4 border-2 border-[#E0E0E0] text-[#3D4C3A] rounded-xl font-bold hover:border-[#3D4C3A] transition-all flex items-center justify-center gap-2">
                    <Share2 size={18} />
                    Share Property
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Image Gallery */}
            <div className="relative aspect-[4/5]">
              <img
                src={activeStudio.images[currentSlide]}
                alt={activeStudio.name}
                className="w-full h-full object-cover"
              />

              {/* Navigation */}
              {currentSlide > 0 && (
                <button
                  onClick={() => setCurrentSlide((prev) => prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <ChevronDown className="rotate-90" size={20} />
                </button>
              )}
              {currentSlide < activeStudio.images.length - 1 && (
                <button
                  onClick={() => setCurrentSlide((prev) => prev + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <ChevronDown className="-rotate-90" size={20} />
                </button>
              )}

              <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-full">
                <span className="text-white text-sm font-bold">
                  {currentSlide + 1} / {activeStudio.images.length}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide bg-black">
              {activeStudio.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                    currentSlide === idx
                      ? "ring-2 ring-white scale-105"
                      : "opacity-50"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="bg-white rounded-t-3xl -mt-8 relative z-10 p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {activeStudio.featured && (
                    <span className="px-3 py-1 bg-black text-white rounded-full text-xs font-black">
                      FEATURED
                    </span>
                  )}
                  <span className="px-3 py-1 bg-[#F0F0F0] text-[#3D4C3A] rounded-full text-xs font-bold uppercase">
                    {activeStudio.type}
                  </span>
                </div>

                <h1 className="text-3xl font-black text-[#3D4C3A]">
                  {activeStudio.name}
                </h1>

                <div className="flex items-center gap-2 text-[#3D4C3A]/70">
                  <MapPin size={18} />
                  <span className="text-sm">{activeStudio.fullLocation}</span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Size", value: `${activeStudio.size}` },
                    { label: "Beds", value: activeStudio.beds },
                    { label: "Baths", value: activeStudio.baths },
                    { label: "Type", value: activeStudio.type },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F0F0F0] rounded-xl text-center"
                    >
                      <div className="text-lg font-black text-[#3D4C3A]">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-[#3D4C3A]/60 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-[#3D4C3A]">About</h3>
                <p className="text-[#3D4C3A]/70 leading-relaxed">
                  {activeStudio.longDescription}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-[#3D4C3A]">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {activeStudio.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-3 bg-[#F0F0F0] rounded-lg"
                    >
                      <CheckCircle
                        size={14}
                        className="text-[#3D4C3A] flex-shrink-0"
                      />
                      <span className="text-xs text-[#3D4C3A] font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs  */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setActiveStudio(null);
                    setTimeout(() => {
                      document
                        .getElementById("contact")
                        .scrollIntoView({ behavior: "smooth" });
                      setFormData((prev) => ({
                        ...prev,
                        studio: activeStudio.name,
                      }));
                    }, 300);
                  }}
                  className="w-full py-4 bg-black text-white rounded-2xl font-bold"
                >
                  Book Viewing
                </button>

                <button className="w-full py-3 border-2 border-[#E0E0E0] text-[#3D4C3A] rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                  <Share2 size={16} />
                  Share Property
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 lg:py-40 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block px-4 py-2 bg-[#3D4C3A] text-white text-xs font-bold tracking-wider rounded-full mb-4 sm:mb-6">
                GET IN TOUCH
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#3D4C3A] leading-[0.9] mb-4 sm:mb-6">
                Schedule Your
                <br />
                Private Viewing
              </h2>
              <p className="text-lg sm:text-xl text-[#3D4C3A]/70">
                Complete the form below and our team will contact you within 24
                hours
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-16 sm:py-20">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <CheckCircle size={48} className="text-white" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-[#3D4C3A] mb-4">
                  Thank You!
                </h3>
                <p className="text-lg sm:text-xl text-[#3D4C3A]/70 max-w-md mx-auto">
                  We've received your inquiry and will be in touch shortly to
                  arrange your viewing.
                </p>
              </div>
            ) : (
              <div className="bg-[#F0F0F0] rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-12">
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8 sm:mb-12">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-base sm:text-lg transition-all ${
                          formStep === step
                            ? "bg-black text-white scale-110"
                            : formStep > step
                            ? "bg-[#3D4C3A] text-white"
                            : "bg-white text-[#3D4C3A]/40"
                        }`}
                      >
                        {formStep > step ? <CheckCircle size={20} /> : step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`w-12 sm:w-16 lg:w-24 h-1 mx-2 transition-all ${
                            formStep > step ? "bg-[#3D4C3A]" : "bg-white"
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* Step 1: Personal Info */}
                  {formStep === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="text-center mb-6 sm:mb-8">
                        <h3 className="text-xl sm:text-2xl font-black text-[#3D4C3A] mb-2">
                          Personal Information
                        </h3>
                        <p className="text-sm sm:text-base text-[#3D4C3A]/60">
                          Let us know who you are
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-bold text-[#3D4C3A] mb-3">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleFormChange}
                            required
                            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-transparent rounded-xl sm:rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A]"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-[#3D4C3A] mb-3">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleFormChange}
                            required
                            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-transparent rounded-xl sm:rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A]"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-bold text-[#3D4C3A] mb-3">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-transparent rounded-xl sm:rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A]"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-[#3D4C3A] mb-3">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            required
                            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-transparent rounded-xl sm:rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A]"
                            placeholder="+44 20 1234 5678"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={nextStep}
                        className="w-full py-4 sm:py-5 bg-black text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-[#3D4C3A] transition-all flex items-center justify-center gap-3 group"
                      >
                        Next Step
                        <ArrowRight
                          className="group-hover:translate-x-1 transition-transform"
                          size={20}
                        />
                      </button>
                    </div>
                  )}

                  {/* Step 2: Preferences */}
                  {formStep === 2 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="text-center mb-6 sm:mb-8">
                        <h3 className="text-xl sm:text-2xl font-black text-[#3D4C3A] mb-2">
                          Your Preferences
                        </h3>
                        <p className="text-sm sm:text-base text-[#3D4C3A]/60">
                          Tell us what you're looking for
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#3D4C3A] mb-3">
                          Interested Studio
                        </label>
                        <select
                          name="studio"
                          value={formData.studio}
                          onChange={handleFormChange}
                          className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-transparent rounded-xl sm:rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A] appearance-none cursor-pointer"
                        >
                          <option value="">Select a studio...</option>
                          {studiosData.map((studio) => (
                            <option key={studio.id} value={studio.name}>
                              {studio.name} - {studio.location}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-bold text-[#3D4C3A] mb-3">
                            Preferred Move Date
                          </label>
                          <input
                            type="date"
                            name="moveDate"
                            value={formData.moveDate}
                            onChange={handleFormChange}
                            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-transparent rounded-xl sm:rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-[#3D4C3A] mb-3">
                            Budget Range
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleFormChange}
                            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-transparent rounded-xl sm:rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A] appearance-none cursor-pointer"
                          >
                            <option value="">Select range...</option>
                            <option value="1000-2000">£1,000 - £2,000</option>
                            <option value="2000-3000">£2,000 - £3,000</option>
                            <option value="3000-4000">£3,000 - £4,000</option>
                            <option value="4000+">£4,000+</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-3 sm:gap-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 py-4 sm:py-5 border-2 border-[#E0E0E0] text-[#3D4C3A] rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:border-[#3D4C3A] transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex-1 py-4 sm:py-5 bg-black text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-[#3D4C3A] transition-all flex items-center justify-center gap-3 group"
                        >
                          Next Step
                          <ArrowRight
                            className="group-hover:translate-x-1 transition-transform"
                            size={20}
                          />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Message */}
                  {formStep === 3 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="text-center mb-6 sm:mb-8">
                        <h3 className="text-xl sm:text-2xl font-black text-[#3D4C3A] mb-2">
                          Additional Information
                        </h3>
                        <p className="text-sm sm:text-base text-[#3D4C3A]/60">
                          Any questions or special requirements?
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#3D4C3A] mb-3">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleFormChange}
                          rows="6"
                          className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-transparent rounded-xl sm:rounded-2xl focus:border-[#3D4C3A] outline-none transition-all resize-none text-[#3D4C3A]"
                          placeholder="Tell us more about your requirements..."
                        />
                      </div>

                      <div className="flex gap-3 sm:gap-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 py-4 sm:py-5 border-2 border-[#E0E0E0] text-[#3D4C3A] rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:border-[#3D4C3A] transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-4 sm:py-5 bg-black text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-[#3D4C3A] transition-all flex items-center justify-center gap-3 group"
                        >
                          Submit
                          <CheckCircle
                            className="group-hover:scale-110 transition-transform"
                            size={20}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Contact Info Cards */}
            {!submitted && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@rstudio.london",
                    href: "mailto:hello@rstudio.london",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+44 20 1234 5678",
                    href: "tel:+442012345678",
                  },
                  {
                    icon: MessageCircle,
                    label: "Chat",
                    value: "Live Chat Available",
                    href: "#",
                  },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-[#F0F0F0] rounded-xl sm:rounded-2xl hover:bg-white hover:shadow-xl transition-all"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <item.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#3D4C3A]/60 mb-1">
                        {item.label}
                      </div>
                      <div className="font-bold text-[#3D4C3A] text-sm sm:text-base">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer  */}
      <footer className="relative bg-gradient-to-br from-black via-[#1a1a1a] to-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#3D4C3A]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#3D4C3A]/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 mb-12 sm:mb-16">
            {/* Left */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  R—STUDIO
                </div>
                <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-[#3D4C3A] to-transparent rounded-full"></div>
              </div>

              <p className="text-lg sm:text-xl text-white/70 max-w-md leading-relaxed">
                Exceptional studio living spaces in London's most desirable
                locations. Where luxury meets lifestyle.
              </p>

              <div className="flex gap-3 sm:gap-4">
                {[Instagram, Linkedin, Twitter, Facebook].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="group w-12 h-12 sm:w-14 sm:h-14 border-2 border-white/20 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-[#3D4C3A] hover:to-[#2d3d2a] hover:border-[#3D4C3A] transition-all duration-300 hover:scale-110"
                  >
                    <Icon
                      size={20}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </a>
                ))}
              </div>

              <div className="pt-6 sm:pt-8 space-y-3">
                <a
                  href="mailto:hello@rstudio.london"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-[#3D4C3A] transition-colors">
                    <Mail size={18} />
                  </div>
                  <span className="font-medium">hello@rstudio.london</span>
                </a>
                <a
                  href="tel:+442012345678"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-[#3D4C3A] transition-colors">
                    <Phone size={18} />
                  </div>
                  <span className="font-medium">+44 20 1234 5678</span>
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
              <div>
                <h4 className="font-black text-base sm:text-lg mb-4 sm:mb-6 text-white/90">
                  Navigation
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {["Properties", "About", "Contact", "Blog"].map(
                    (link, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="text-sm sm:text-base text-white/60 hover:text-white transition-colors hover:translate-x-1 inline-block"
                        >
                          {link}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-black text-base sm:text-lg mb-4 sm:mb-6 text-white/90">
                  Legal
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {["Privacy", "Terms", "Cookies"].map((link, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-sm sm:text-base text-white/60 hover:text-white transition-colors hover:translate-x-1 inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-black text-base sm:text-lg mb-4 sm:mb-6 text-white/90">
                  Services
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {["Rentals", "Sales", "Management"].map((link, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-sm sm:text-base text-white/60 hover:text-white transition-colors hover:translate-x-1 inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
                © 2024 Rstudio London. All rights reserved. Designed with
                passion.
              </div>
              <div className="flex items-center gap-4 text-xs sm:text-sm text-white/40">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        @keyframes slide-in-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slide-in-left {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-smooth {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(45deg);
          }
          50% {
            transform: translateY(-20px) rotate(45deg);
          }
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-slide-in-down {
          animation: slide-in-down 0.6s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-bounce-smooth {
          animation: bounce-smooth 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background-color: #3d4c3a;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Studio;
