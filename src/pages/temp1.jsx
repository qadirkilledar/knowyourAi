import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronDown,
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Square,
  TrendingUp,
  Award,
  Users,
  Zap,
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
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Maximize,
  Minimize,
  Grid,
  List,
  SlidersHorizontal,
  Plus,
  Sparkles,
} from "lucide-react";

const Studio = () => {
  const [activeStudio, setActiveStudio] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [filterOpen, setFilterOpen] = useState(false);
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

  const studios = [
    {
      id: 1,
      name: "The Atelier",
      location: "Shoreditch",
      fullLocation: "12 Rivington Street, Shoreditch, London EC2A 3DT",
      price: "Inquire",
      size: 450,
      beds: 1,
      baths: 1,
      type: "Loft",
      category: "industrial",
      featured: true,
      available: "Immediate",
      description:
        "An industrial masterpiece combining raw architectural elements with refined modern living. Soaring 15-foot ceilings, exposed steel beams, and original brick walls create a dramatic backdrop for contemporary urban life.",
      longDescription:
        "This exceptional loft studio represents the pinnacle of industrial-chic living in East London. Originally part of a Victorian textile factory, the space has been meticulously transformed while preserving its authentic character. The open-plan layout maximizes the dramatic ceiling height, while oversized steel-framed windows flood the interior with natural light throughout the day. Premium concrete flooring provides both aesthetic appeal and practical durability. The custom-designed mezzanine adds versatility, perfect for a bedroom or home office. State-of-the-art climate control and acoustic insulation ensure year-round comfort, while the location places you at the heart of London's most creative neighborhood.",
      features: [
        "Smart Home System",
        "Exposed Brick",
        "Steel Beams",
        "Concrete Floors",
        "Mezzanine Level",
        "Floor-to-ceiling Windows",
      ],
      amenities: [
        "High-speed Fiber",
        "Climate Control",
        "Security System",
        "Bike Storage",
      ],
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&h=1200&fit=crop",
      ],
      video: "https://example.com/video1.mp4",
      virtualTour: "https://example.com/tour1",
      floorPlan: "https://example.com/plan1.pdf",
    },
    {
      id: 2,
      name: "River Residency",
      location: "Canary Wharf",
      fullLocation: "28 Marsh Wall, Canary Wharf, London E14 9TP",
      price: "Inquire",
      size: 380,
      beds: 1,
      baths: 1,
      type: "Modern",
      category: "minimalist",
      featured: true,
      available: "Feb 2024",
      description:
        "Minimalist luxury with breathtaking Thames views. This contemporary studio epitomizes refined urban living with premium finishes and intelligent space planning.",
      longDescription:
        "Perched on the 22nd floor, this stunning studio offers uninterrupted views across the River Thames and London's dynamic skyline. The interior showcases Japanese-inspired minimalism with a warm, sophisticated palette. Engineered oak flooring, integrated lighting systems, and handleless cabinetry create seamless visual flow. The compact kitchen features premium Miele appliances and Caesarstone countertops. Full-height glazing can be tinted electronically for privacy and climate control. The marble bathroom includes a rainfall shower and heated floors. Building amenities include a 24-hour concierge, residents' gym, and private cinema.",
      features: [
        "River Views",
        "Smart Glass",
        "Miele Appliances",
        "Marble Bath",
        "Oak Flooring",
        "Integrated Lighting",
      ],
      amenities: [
        "24/7 Concierge",
        "Residents Gym",
        "Private Cinema",
        "Rooftop Terrace",
      ],
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1600&h=1200&fit=crop",
      ],
      video: "https://example.com/video2.mp4",
      virtualTour: "https://example.com/tour2",
      floorPlan: "https://example.com/plan2.pdf",
    },
    {
      id: 3,
      name: "Garden Oasis",
      location: "Notting Hill",
      fullLocation: "45 Portobello Road, Notting Hill, London W11 3DB",
      price: "Inquire",
      size: 520,
      beds: 1,
      baths: 1,
      type: "Garden",
      category: "luxury",
      featured: true,
      available: "Immediate",
      description:
        "A rare garden studio in prestigious Notting Hill. Private outdoor space meets elegant interior design in this exceptional ground-floor residence.",
      longDescription:
        "This unique ground-floor studio offers the rare luxury of a private garden in one of London's most sought-after postcodes. French doors open onto a beautifully landscaped patio and garden area, creating a seamless indoor-outdoor living experience. The interior features herringbone parquet flooring, decorative cornicing, and a working fireplace. The bespoke kitchen includes Smeg appliances and marble worktops. Custom built-in wardrobes maximize storage while maintaining the elegant aesthetic. The bathroom showcases Victorian-style fixtures with modern functionality. Period features blend harmoniously with contemporary comforts including underfloor heating and USB charging points throughout.",
      features: [
        "Private Garden",
        "French Doors",
        "Period Features",
        "Fireplace",
        "Herringbone Floors",
        "Custom Storage",
      ],
      amenities: [
        "Garden Access",
        "Period Building",
        "Bike Storage",
        "Residents Lounge",
      ],
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1600&h=1200&fit=crop",
      ],
      video: "https://example.com/video3.mp4",
      virtualTour: "https://example.com/tour3",
      floorPlan: "https://example.com/plan3.pdf",
    },
    {
      id: 4,
      name: "Skyline Suite",
      location: "London Bridge",
      fullLocation: "The Shard, 32 London Bridge Street, London SE1 9SG",
      price: "Inquire",
      size: 500,
      beds: 1,
      baths: 1,
      type: "Penthouse",
      category: "luxury",
      featured: true,
      available: "Mar 2024",
      description:
        "Penthouse living at its finest. Panoramic city views from the 35th floor of London's most iconic building.",
      longDescription:
        "Experience London from a new perspective in this breathtaking penthouse studio. Floor-to-ceiling windows on three sides provide 270-degree views encompassing Tower Bridge, St Paul's Cathedral, and beyond. The interior is finished to the highest specification with Italian marble, brushed brass fixtures, and motorized blinds. The designer kitchen features Gaggenau appliances and a wine fridge. The spa-style bathroom includes a deep soaking tub positioned to enjoy the views. Smart home technology controls lighting, heating, and entertainment systems. Building services include a private residents' lounge, spa, and fine dining restaurant.",
      features: [
        "Panoramic Views",
        "Smart Home",
        "Gaggenau Kitchen",
        "Spa Bathroom",
        "Marble Finishes",
        "Wine Fridge",
      ],
      amenities: [
        "Private Lounge",
        "Spa Facilities",
        "Fine Dining",
        "Valet Parking",
      ],
      images: [
        "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=1200&fit=crop",
      ],
      video: "https://example.com/video4.mp4",
      virtualTour: "https://example.com/tour4",
      floorPlan: "https://example.com/plan4.pdf",
    },
    {
      id: 5,
      name: "Heritage Studio",
      location: "Covent Garden",
      fullLocation: "8 Neal's Yard, Covent Garden, London WC2H 9DP",
      price: "Inquire",
      size: 420,
      beds: 1,
      baths: 1,
      type: "Conversion",
      category: "industrial",
      featured: false,
      available: "Immediate",
      description:
        "Characterful warehouse conversion in the cultural heart of London. Original features meet contemporary design.",
      longDescription:
        "This stunning conversion showcases the best of London's architectural heritage. Set within a Grade II listed Victorian warehouse, the studio retains original cast iron columns, exposed brickwork, and large arched windows. Modern interventions include a sleek mezzanine level, contemporary kitchen with stainless steel appliances, and a luxurious bathroom with rainfall shower. The high ceilings and open layout create a loft-like atmosphere, while thoughtful lighting design highlights the building's historic features. Located steps from the Royal Opera House and surrounded by world-class dining and entertainment.",
      features: [
        "Listed Building",
        "Cast Iron Columns",
        "Arched Windows",
        "Mezzanine",
        "Heritage Features",
        "Modern Kitchen",
      ],
      amenities: [
        "Secure Entry",
        "Bike Storage",
        "Central Location",
        "Period Building",
      ],
      images: [
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1565183928294-7d22f2d8b633?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1600&h=1200&fit=crop",
      ],
      video: "https://example.com/video5.mp4",
      virtualTour: "https://example.com/tour5",
      floorPlan: "https://example.com/plan5.pdf",
    },
    {
      id: 6,
      name: "Nordic Haven",
      location: "Camden",
      fullLocation: "155 Regent's Park Road, Camden, London NW1 8BB",
      price: "Inquire",
      size: 460,
      beds: 1,
      baths: 1,
      type: "Scandi",
      category: "minimalist",
      featured: false,
      available: "Immediate",
      description:
        "Scandinavian design principles create a serene sanctuary. Natural materials, abundant light, and thoughtful details.",
      longDescription:
        "Embrace Nordic living in this beautifully designed studio that exemplifies Scandinavian simplicity and functionality. Whitewashed oak floors, soft grey walls, and abundant natural light create a calm, welcoming atmosphere. The open-plan layout incorporates clever storage solutions that maintain clean lines and uncluttered spaces. The kitchen features handleless cabinetry in matte white with integrated appliances. Large windows on two aspects ensure excellent daylight, complemented by a sophisticated lighting scheme for cozy evenings. The bathroom includes underfloor heating and premium fittings. Eco-friendly materials and energy-efficient systems reflect sustainable design principles.",
      features: [
        "Oak Flooring",
        "Dual Aspect",
        "Eco-Friendly",
        "Underfloor Heating",
        "Integrated Storage",
        "Natural Light",
      ],
      amenities: [
        "Bike Storage",
        "Communal Garden",
        "Green Building",
        "Package Room",
      ],
      images: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1600&h=1200&fit=crop",
        "https://images.unsplash.com/photo-1615875221248-e7278eeff406?w=1600&h=1200&fit=crop",
      ],
      video: "https://example.com/video6.mp4",
      virtualTour: "https://example.com/tour6",
      floorPlan: "https://example.com/plan6.pdf",
    },
  ];

  const filteredStudios =
    selectedCategory === "all"
      ? studios
      : studios.filter((s) => s.category === selectedCategory);

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
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-black tracking-tighter text-white">
              R—STUDIO
            </div>
            <div className="hidden lg:flex items-center gap-12">
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

      {/* Hero Section - Full Screen Video-like */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Parallax Background */}
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
          {/* Noise Texture */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)" /%3E%3C/svg%3E")',
            }}
          ></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-5xl">
              {/* Animated Tag */}
              <div className="mb-8 overflow-hidden">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2 animate-slide-in-down">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-semibold tracking-wide">
                    6 EXCLUSIVE STUDIOS AVAILABLE
                  </span>
                </div>
              </div>

              {/* Main Title - Staggered Animation */}
              <div className="mb-8 space-y-4">
                <div className="overflow-hidden">
                  <h1 className="text-[18vw] lg:text-[10rem] font-black leading-none text-white tracking-tighter animate-slide-in-left">
                    LIVE
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <h1 className="text-[18vw] lg:text-[10rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 tracking-tighter animate-slide-in-right animation-delay-200">
                    BOLD
                  </h1>
                </div>
              </div>

              {/* Description */}
              <div className="max-w-xl mb-12 animate-fade-in animation-delay-400">
                <p className="text-xl lg:text-2xl text-white/80 leading-relaxed mb-8">
                  Discover London's most exceptional studio apartments. Where
                  architectural innovation meets refined living.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#properties"
                    className="group relative px-8 py-4 bg-white text-[#3D4C3A] rounded-full font-bold text-lg overflow-hidden"
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
                    className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-bold text-lg backdrop-blur-sm hover:bg-white/10 transition-all text-center"
                  >
                    Schedule Viewing
                  </a>
                </div>
              </div>

              {/* Stats Ticker */}
              <div className="grid grid-cols-3 gap-8 animate-fade-in animation-delay-600">
                {[
                  { value: "06", label: "Premium Studios" },
                  { value: "100%", label: "Verified" },
                  { value: "24/7", label: "Support" },
                ].map((stat, idx) => (
                  <div key={idx} className="group">
                    <div className="text-5xl lg:text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-white/60 text-sm uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3 animate-bounce-smooth">
            <span className="text-white/60 text-xs tracking-[0.3em] uppercase">
              Scroll
            </span>
            <ChevronDown className="text-white/60" size={24} />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-12 w-32 h-32 border border-white/10 rounded-full animate-spin-slow hidden lg:block"></div>
        <div className="absolute bottom-1/4 left-12 w-20 h-20 border border-white/10 rotate-45 animate-float hidden lg:block"></div>
      </section>

      {/* Marquee Section */}
      <div className="py-8 bg-black overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-white/20 text-2xl lg:text-4xl font-black mx-8">
                LONDON
              </span>
              <span className="text-white/20 text-2xl lg:text-4xl font-black mx-8">
                •
              </span>
              <span className="text-white/20 text-2xl lg:text-4xl font-black mx-8">
                PREMIUM
              </span>
              <span className="text-white/20 text-2xl lg:text-4xl font-black mx-8">
                •
              </span>
              <span className="text-white/20 text-2xl lg:text-4xl font-black mx-8">
                STUDIOS
              </span>
              <span className="text-white/20 text-2xl lg:text-4xl font-black mx-8">
                •
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Section - Diagonal Split */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        {/* Diagonal Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white transform -skew-y-3 origin-top-left"></div>
        </div>

        <div className="relative container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 bg-[#3D4C3A] text-white text-xs font-bold tracking-wider rounded-full mb-6">
                  WHY CHOOSE US
                </span>
                <h2 className="text-5xl lg:text-7xl font-black text-[#3D4C3A] leading-[0.9] mb-6">
                  Curated
                  <br />
                  Excellence
                </h2>
                <p className="text-xl text-[#3D4C3A]/70 leading-relaxed">
                  Every studio in our collection has been personally selected
                  and verified. We represent only the finest properties in
                  London's most desirable locations.
                </p>
              </div>

              {/* Feature Cards - Stacked */}
              <div className="space-y-4">
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
                    className="group flex items-start gap-4 p-6 bg-[#F0F0F0] rounded-2xl hover:bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <item.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#3D4C3A] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#3D4C3A]/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image Grid */}
            <div className="relative">
              {/* Overlapping Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="aspect-square rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=600&fit=crop"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=800&fit=crop"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=800&fit=crop"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&h=600&fit=crop"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 bg-black text-white p-8 rounded-3xl shadow-2xl">
                <div className="text-5xl font-black mb-2">5+</div>
                <div className="text-sm opacity-80">
                  Years
                  <br />
                  Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studios Section - Stacked Cards */}
      <section id="properties" className="py-24 lg:py-40 bg-[#F0F0F0]">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <span className="inline-block px-4 py-2 bg-black text-white text-xs font-bold tracking-wider rounded-full mb-6">
                COLLECTION
              </span>
              <h2 className="text-5xl lg:text-7xl font-black text-[#3D4C3A] leading-[0.9]">
                Featured
                <br />
                Studios
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {[
                { id: "all", label: "All" },
                { id: "luxury", label: "Luxury" },
                { id: "minimalist", label: "Minimalist" },
                { id: "industrial", label: "Industrial" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
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

          {/* Masonry Grid - Desktop / Stack - Mobile */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {filteredStudios.map((studio, idx) => (
              <div
                key={studio.id}
                className="group cursor-pointer"
                onClick={() => setActiveStudio(studio)}
              >
                <div className="relative bg-white rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-700">
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
                    <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                      <div className="space-y-2">
                        {studio.featured && (
                          <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                            <span className="text-[#3D4C3A] text-xs font-black tracking-wider">
                              FEATURED
                            </span>
                          </div>
                        )}
                        <div className="px-4 py-2 bg-black/80 backdrop-blur-sm rounded-full">
                          <span className="text-white text-xs font-bold">
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
                          className="w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          <Heart
                            size={18}
                            className={
                              likedStudios.includes(studio.id)
                                ? "fill-red-500 text-red-500"
                                : "text-[#3D4C3A]"
                            }
                          />
                        </button>
                        <button className="w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                          <Share2 size={18} className="text-[#3D4C3A]" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-black text-white mb-2">
                        {studio.name}
                      </h3>
                      <div className="flex items-center gap-2 text-white/90 mb-4">
                        <MapPin size={16} />
                        <span className="font-medium">{studio.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                          <span className="text-white text-sm font-bold">
                            {studio.size} sq ft
                          </span>
                        </div>
                        <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                          <span className="text-white text-sm font-bold">
                            {studio.beds} Bed
                          </span>
                        </div>
                        <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                          <span className="text-white text-sm font-bold">
                            {studio.baths} Bath
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#3D4C3A]/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="text-center text-white space-y-4">
                        <Eye size={48} className="mx-auto" />
                        <div className="text-2xl font-bold">View Details</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 space-y-4">
                    <p className="text-[#3D4C3A]/70 line-clamp-2 leading-relaxed">
                      {studio.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E0E0E0]">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-[#3D4C3A]">
                          Available {studio.available}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-black font-bold group-hover:gap-4 transition-all">
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

      {/* Studio Detail Modal - Fullscreen Immersive */}
      {activeStudio && (
        <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => setActiveStudio(null)}
            className="fixed top-6 right-6 lg:top-12 lg:right-12 z-50 w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl group"
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

                  <div className="grid grid-cols-3 gap-3">
                    <button className="py-4 border-2 border-[#E0E0E0] text-[#3D4C3A] rounded-xl font-bold hover:border-[#3D4C3A] transition-all flex items-center justify-center gap-2">
                      <Play size={18} />
                      Tour
                    </button>
                    <button className="py-4 border-2 border-[#E0E0E0] text-[#3D4C3A] rounded-xl font-bold hover:border-[#3D4C3A] transition-all flex items-center justify-center gap-2">
                      <Download size={18} />
                      PDF
                    </button>
                    <button className="py-4 border-2 border-[#E0E0E0] text-[#3D4C3A] rounded-xl font-bold hover:border-[#3D4C3A] transition-all flex items-center justify-center gap-2">
                      <Share2 size={18} />
                      Share
                    </button>
                  </div>
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

                <div className="grid grid-cols-3 gap-2">
                  <button className="py-3 border-2 border-[#E0E0E0] text-[#3D4C3A] rounded-xl font-bold text-sm flex items-center justify-center gap-1">
                    <Play size={14} />
                    Tour
                  </button>
                  <button className="py-3 border-2 border-[#E0E0E0] text-[#3D4C3A] rounded-xl font-bold text-sm flex items-center justify-center gap-1">
                    <Download size={14} />
                    PDF
                  </button>
                  <button className="py-3 border-2 border-[#E0E0E0] text-[#3D4C3A] rounded-xl font-bold text-sm flex items-center justify-center gap-1">
                    <Share2 size={14} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section - Multi-Step Form */}
      <section id="contact" className="py-24 lg:py-40 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-[#3D4C3A] text-white text-xs font-bold tracking-wider rounded-full mb-6">
                GET IN TOUCH
              </span>
              <h2 className="text-5xl lg:text-7xl font-black text-[#3D4C3A] leading-[0.9] mb-6">
                Schedule Your
                <br />
                Private Viewing
              </h2>
              <p className="text-xl text-[#3D4C3A]/70">
                Complete the form below and our team will contact you within 24
                hours
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <CheckCircle size={48} className="text-white" />
                </div>
                <h3 className="text-4xl font-black text-[#3D4C3A] mb-4">
                  Thank You!
                </h3>
                <p className="text-xl text-[#3D4C3A]/70 max-w-md mx-auto">
                  We've received your inquiry and will be in touch shortly to
                  arrange your viewing.
                </p>
              </div>
            ) : (
              <div className="bg-[#F0F0F0] rounded-[2rem] p-8 lg:p-12">
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-12">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all ${
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
                          className={`w-16 lg:w-24 h-1 mx-2 transition-all ${
                            formStep > step ? "bg-[#3D4C3A]" : "bg-white"
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-8">
                  {/* Step 1: Personal Info */}
                  {formStep === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-black text-[#3D4C3A] mb-2">
                          Personal Information
                        </h3>
                        <p className="text-[#3D4C3A]/60">
                          Let us know who you are
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
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
                            className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A]"
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
                            className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A]"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
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
                            className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A]"
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
                            className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A]"
                            placeholder="+44 20 1234 5678"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={nextStep}
                        className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-[#3D4C3A] transition-all flex items-center justify-center gap-3 group"
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
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-black text-[#3D4C3A] mb-2">
                          Your Preferences
                        </h3>
                        <p className="text-[#3D4C3A]/60">
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
                          className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A] appearance-none cursor-pointer"
                        >
                          <option value="">Select a studio...</option>
                          {studios.map((studio) => (
                            <option key={studio.id} value={studio.name}>
                              {studio.name} - {studio.location}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-[#3D4C3A] mb-3">
                            Preferred Move Date
                          </label>
                          <input
                            type="date"
                            name="moveDate"
                            value={formData.moveDate}
                            onChange={handleFormChange}
                            className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A]"
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
                            className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-[#3D4C3A] outline-none transition-all text-[#3D4C3A] appearance-none cursor-pointer"
                          >
                            <option value="">Select range...</option>
                            <option value="1000-2000">£1,000 - £2,000</option>
                            <option value="2000-3000">£2,000 - £3,000</option>
                            <option value="3000-4000">£3,000 - £4,000</option>
                            <option value="4000+">£4,000+</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 py-5 border-2 border-[#E0E0E0] text-[#3D4C3A] rounded-2xl font-bold text-lg hover:border-[#3D4C3A] transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex-1 py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-[#3D4C3A] transition-all flex items-center justify-center gap-3 group"
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
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-black text-[#3D4C3A] mb-2">
                          Additional Information
                        </h3>
                        <p className="text-[#3D4C3A]/60">
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
                          className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-[#3D4C3A] outline-none transition-all resize-none text-[#3D4C3A]"
                          placeholder="Tell us more about your requirements..."
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 py-5 border-2 border-[#E0E0E0] text-[#3D4C3A] rounded-2xl font-bold text-lg hover:border-[#3D4C3A] transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-[#3D4C3A] transition-all flex items-center justify-center gap-3 group"
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
              <div className="grid md:grid-cols-3 gap-6 mt-12">
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
                    className="group flex items-center gap-4 p-6 bg-[#F0F0F0] rounded-2xl hover:bg-white hover:shadow-xl transition-all"
                  >
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#3D4C3A]/60 mb-1">
                        {item.label}
                      </div>
                      <div className="font-bold text-[#3D4C3A]">
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

      {/* Footer - Minimal & Bold */}
      <footer className="bg-black text-white py-16 lg:py-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            {/* Left */}
            <div className="space-y-8">
              <div className="text-6xl lg:text-8xl font-black tracking-tighter">
                R—STUDIO
              </div>
              <p className="text-xl text-white/60 max-w-md leading-relaxed">
                Exceptional studio living spaces in London's most desirable
                locations.
              </p>
              <div className="flex gap-4">
                {[Instagram, Linkedin, Twitter, Facebook].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="font-black text-lg mb-6">Navigation</h4>
                <ul className="space-y-3">
                  {["Properties", "About", "Contact", "Blog"].map(
                    (link, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-black text-lg mb-6">Legal</h4>
                <ul className="space-y-3">
                  {["Privacy", "Terms", "Cookies"].map((link, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
            © 2024 Rstudio London. All rights reserved.
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
