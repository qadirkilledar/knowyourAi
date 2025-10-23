import React, { useState } from "react";
import {
  MapPin,
  Square,
  Bath,
  Bed,
  Wifi,
  Tv,
  Coffee,
  Wind,
  X,
  ChevronLeft,
  ChevronRight,
  Building2,
  Phone,
  Mail,
  User,
  MessageSquare,
  Check,
} from "lucide-react";

const Studio = () => {
  const [expandedStudio, setExpandedStudio] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Studio data
  const studios = [
    {
      id: 1,
      name: "Modern Loft Studio",
      location: "Shoreditch, London",
      price: "£1,850/month",
      size: "450 sq ft",
      bedrooms: 1,
      bathrooms: 1,
      thumbnail:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
      ],
      description:
        "A beautifully designed modern loft studio in the heart of Shoreditch. Features industrial-style exposed brick walls, high ceilings, and floor-to-ceiling windows that flood the space with natural light. The open-plan layout maximizes space efficiency while maintaining a luxurious feel.",
      amenities: [
        "High-Speed WiFi",
        "Smart TV",
        "Coffee Machine",
        "Air Conditioning",
        "Fully Furnished",
        "Hardwood Floors",
      ],
      available: "Immediately",
      deposit: "£2,000",
    },
    {
      id: 2,
      name: "Elegant Garden Studio",
      location: "Kensington, London",
      price: "£2,200/month",
      size: "520 sq ft",
      bedrooms: 1,
      bathrooms: 1,
      thumbnail:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop",
      ],
      description:
        "Charming studio apartment with private garden access in prestigious Kensington. This elegant space combines classic London architecture with contemporary interiors. Perfect for professionals seeking tranquility in the city.",
      amenities: [
        "Private Garden",
        "WiFi",
        "Modern Kitchen",
        "Heating",
        "Washer/Dryer",
        "Secure Entry",
      ],
      available: "From 1st March",
      deposit: "£2,500",
    },
    {
      id: 3,
      name: "Contemporary Thames View",
      location: "Southwark, London",
      price: "£2,450/month",
      size: "480 sq ft",
      bedrooms: 1,
      bathrooms: 1,
      thumbnail:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
      ],
      description:
        "Stunning riverside studio with panoramic Thames views. Floor-to-ceiling windows showcase London's iconic skyline. Premium finishes throughout, including marble bathrooms and designer kitchen appliances.",
      amenities: [
        "River Views",
        "Concierge",
        "Gym Access",
        "WiFi",
        "Balcony",
        "Underground Parking",
      ],
      available: "From 15th March",
      deposit: "£2,800",
    },
    {
      id: 4,
      name: "Minimalist Urban Studio",
      location: "Camden, London",
      price: "£1,650/month",
      size: "400 sq ft",
      bedrooms: 1,
      bathrooms: 1,
      thumbnail:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
      ],
      description:
        "Sleek minimalist design meets urban living in vibrant Camden. This studio features smart storage solutions, modern appliances, and a sophisticated neutral color palette. Walking distance to Camden Market and Regent's Park.",
      amenities: [
        "Smart Home",
        "WiFi",
        "Netflix Ready",
        "Modern Kitchen",
        "Bike Storage",
        "Pet Friendly",
      ],
      available: "Immediately",
      deposit: "£1,800",
    },
    {
      id: 5,
      name: "Luxury Penthouse Studio",
      location: "Mayfair, London",
      price: "£3,200/month",
      size: "600 sq ft",
      bedrooms: 1,
      bathrooms: 1,
      thumbnail:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
      ],
      description:
        "Ultimate luxury in London's most exclusive neighborhood. Top-floor penthouse studio with private terrace, premium appliances, and bespoke interiors. Concierge service and residents' lounge included.",
      amenities: [
        "Private Terrace",
        "24/7 Concierge",
        "Spa & Gym",
        "Wine Cellar",
        "Cinema Room",
        "Valet Parking",
      ],
      available: "From 1st April",
      deposit: "£4,000",
    },
    {
      id: 6,
      name: "Industrial Chic Studio",
      location: "Hackney, London",
      price: "£1,750/month",
      size: "430 sq ft",
      bedrooms: 1,
      bathrooms: 1,
      thumbnail:
        "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
      ],
      description:
        "Converted warehouse studio in trendy Hackney. Authentic industrial features including exposed brickwork, steel beams, and concrete floors. Creative space perfect for artists and digital nomads.",
      amenities: [
        "High Ceilings",
        "Natural Light",
        "WiFi",
        "Open Plan",
        "Shared Courtyard",
        "Bike Storage",
      ],
      available: "From 10th March",
      deposit: "£1,900",
    },
  ];

  const handleStudioClick = (studioId) => {
    if (expandedStudio === studioId) {
      setExpandedStudio(null);
    } else {
      setExpandedStudio(studioId);
      setCurrentImageIndex(0);
      // Smooth scroll to expanded studio
      setTimeout(() => {
        document.getElementById(`studio-${studioId}`)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const handleNextImage = (studio) => {
    setCurrentImageIndex((prev) =>
      prev === studio.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = (studio) => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? studio.images.length - 1 : prev - 1
    );
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E0E0E0] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <Building2 className="w-8 h-8 md:w-10 md:h-10 text-[#3D4C3A] transform group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -inset-2 bg-[#3D4C3A] opacity-0 group-hover:opacity-10 rounded-full blur transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#3D4C3A] tracking-tight">
                  Rstudio
                </h1>
                <p className="text-xs md:text-sm text-[#3D4C3A]/60 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  London
                </p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#studios"
                className="text-[#3D4C3A] hover:text-black transition-colors duration-200 font-medium"
              >
                Studios
              </a>
              <a
                href="#contact"
                className="text-[#3D4C3A] hover:text-black transition-colors duration-200 font-medium"
              >
                Contact
              </a>
            </nav>
            <a
              href="#contact"
              className="bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-[#3D4C3A] transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium text-sm md:text-base"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F0F0F0] to-[#E0E0E0] py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#3D4C3A] opacity-5 rounded-full blur-3xl transform animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black opacity-5 rounded-full blur-3xl transform animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="inline-block">
                <span className="bg-black text-white px-4 py-2 rounded-full text-xs md:text-sm font-medium tracking-wide transform hover:scale-105 transition-transform duration-300 inline-block">
                  PREMIUM STUDIOS IN LONDON
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#3D4C3A] leading-tight">
                Your Perfect
                <span className="block mt-2 bg-gradient-to-r from-[#3D4C3A] to-black bg-clip-text text-transparent">
                  London Studio
                </span>
              </h2>
              <p className="text-lg md:text-xl text-[#3D4C3A]/70 leading-relaxed max-w-xl">
                Discover exceptional studio apartments in London's most
                desirable neighborhoods. Contemporary design meets urban living.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#studios"
                  className="bg-black text-white px-8 py-4 rounded-lg hover:bg-[#3D4C3A] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-medium text-center group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Explore Studios
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a
                  href="#contact"
                  className="bg-white text-[#3D4C3A] px-8 py-4 rounded-lg hover:bg-[#E0E0E0] transition-all duration-300 transform hover:scale-105 border-2 border-[#E0E0E0] font-medium text-center"
                >
                  Schedule Viewing
                </a>
              </div>
            </div>

            {/* 3D Card Showcase */}
            <div className="relative hidden lg:block">
              <div className="relative transform perspective-1000 hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3D4C3A] to-black opacity-20 rounded-3xl transform rotate-6 blur-xl"></div>
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl transform hover:rotate-2 transition-all duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=1000&fit=crop"
                    alt="Featured Studio"
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Featured Property
                    </h3>
                    <p className="text-white/80 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Prime London Location
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: "150+", label: "Properties" },
              { number: "98%", label: "Satisfaction" },
              { number: "12+", label: "Locations" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D4C3A] mb-2 group-hover:text-black transition-colors">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-[#3D4C3A]/60 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studios Section */}
      <section id="studios" className="py-16 md:py-24 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D4C3A] mb-4">
              Available Studios
            </h2>
            <p className="text-lg md:text-xl text-[#3D4C3A]/70 max-w-2xl mx-auto">
              Click on any studio to view detailed information and gallery
            </p>
          </div>

          <div className="space-y-6">
            {studios.map((studio) => (
              <div
                key={studio.id}
                id={`studio-${studio.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                {/* Studio Card Preview */}
                <div
                  onClick={() => handleStudioClick(studio.id)}
                  className="cursor-pointer"
                >
                  <div className="grid md:grid-cols-3 gap-6 p-4 md:p-6">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-xl group md:col-span-1">
                      <img
                        src={studio.thumbnail}
                        alt={studio.name}
                        className="w-full h-48 md:h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                        {studio.price}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#3D4C3A] mb-2 group-hover:text-black transition-colors">
                          {studio.name}
                        </h3>
                        <p className="text-[#3D4C3A]/60 flex items-center gap-2 mb-4">
                          <MapPin className="w-4 h-4" />
                          {studio.location}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-[#3D4C3A]/70">
                            <Square className="w-5 h-5" />
                            <span className="text-sm">{studio.size}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#3D4C3A]/70">
                            <Bed className="w-5 h-5" />
                            <span className="text-sm">
                              {studio.bedrooms} Bed
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[#3D4C3A]/70">
                            <Bath className="w-5 h-5" />
                            <span className="text-sm">
                              {studio.bathrooms} Bath
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[#3D4C3A]/70">
                            <Building2 className="w-5 h-5" />
                            <span className="text-sm">Studio</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-[#3D4C3A]/60">
                          Available:{" "}
                          <span className="font-medium text-[#3D4C3A]">
                            {studio.available}
                          </span>
                        </span>
                        <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-[#3D4C3A] transition-all duration-300 transform hover:scale-105 text-sm font-medium flex items-center gap-2">
                          {expandedStudio === studio.id
                            ? "Close Details"
                            : "View Details"}
                          <ChevronRight
                            className={`w-4 h-4 transform transition-transform duration-300 ${
                              expandedStudio === studio.id ? "rotate-90" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedStudio === studio.id && (
                  <div className="border-t border-[#E0E0E0] bg-[#F0F0F0] animate-fadeIn">
                    <div className="p-4 md:p-8 space-y-8">
                      {/* Image Gallery */}
                      <div className="relative">
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                          <img
                            src={studio.images[currentImageIndex]}
                            alt={`${studio.name} - Image ${
                              currentImageIndex + 1
                            }`}
                            className="w-full h-64 md:h-96 lg:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />

                          {/* Navigation Buttons */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePrevImage(studio);
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#3D4C3A] p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNextImage(studio);
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#3D4C3A] p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>

                          {/* Image Counter */}
                          <div className="absolute bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium">
                            {currentImageIndex + 1} / {studio.images.length}
                          </div>
                        </div>

                        {/* Thumbnail Navigation */}
                        <div className="grid grid-cols-4 gap-4 mt-4">
                          {studio.images.map((img, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(index);
                              }}
                              className={`relative overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-105 ${
                                currentImageIndex === index
                                  ? "ring-4 ring-[#3D4C3A] scale-105"
                                  : "opacity-70 hover:opacity-100"
                              }`}
                            >
                              <img
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-16 md:h-24 object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
                        <h4 className="text-2xl font-bold text-[#3D4C3A] mb-4">
                          Description
                        </h4>
                        <p className="text-[#3D4C3A]/70 leading-relaxed text-base md:text-lg">
                          {studio.description}
                        </p>
                      </div>

                      {/* Amenities */}
                      <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
                        <h4 className="text-2xl font-bold text-[#3D4C3A] mb-6">
                          Amenities
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {studio.amenities.map((amenity, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 bg-[#F0F0F0] p-4 rounded-lg transform hover:scale-105 hover:shadow-md transition-all duration-300"
                            >
                              <Check className="w-5 h-5 text-[#3D4C3A]" />
                              <span className="text-[#3D4C3A] font-medium">
                                {amenity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                          <h4 className="text-xl font-bold text-[#3D4C3A] mb-4">
                            Property Details
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center pb-3 border-b border-[#E0E0E0]">
                              <span className="text-[#3D4C3A]/60">
                                Monthly Rent
                              </span>
                              <span className="font-bold text-[#3D4C3A]">
                                {studio.price}
                              </span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-[#E0E0E0]">
                              <span className="text-[#3D4C3A]/60">Deposit</span>
                              <span className="font-bold text-[#3D4C3A]">
                                {studio.deposit}
                              </span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-[#E0E0E0]">
                              <span className="text-[#3D4C3A]/60">Size</span>
                              <span className="font-bold text-[#3D4C3A]">
                                {studio.size}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[#3D4C3A]/60">
                                Available From
                              </span>
                              <span className="font-bold text-[#3D4C3A]">
                                {studio.available}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#3D4C3A] to-black rounded-xl p-6 shadow-lg text-white">
                          <h4 className="text-xl font-bold mb-4">
                            Interested?
                          </h4>
                          <p className="mb-6 text-white/80">
                            Schedule a viewing or get more information about
                            this property.
                          </p>
                          <a
                            href="#contact"
                            className="block w-full bg-white text-[#3D4C3A] text-center px-6 py-3 rounded-lg hover:bg-[#F0F0F0] transition-all duration-300 transform hover:scale-105 font-medium"
                          >
                            Contact Us Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact"
        className="py-16 md:py-24 bg-gradient-to-br from-[#E0E0E0] to-[#F0F0F0] relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3D4C3A] opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D4C3A] mb-4">
              Get In Touch
            </h2>
            <p className="text-lg md:text-xl text-[#3D4C3A]/70 max-w-2xl mx-auto">
              Ready to find your perfect studio? Contact us and we'll get back
              to you within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-[#3D4C3A] p-4 rounded-xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#3D4C3A] mb-2">
                      Phone
                    </h4>
                    <p className="text-[#3D4C3A]/70">+44 20 1234 5678</p>
                    <p className="text-[#3D4C3A]/70">Mon-Fri 9am-6pm</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-black p-4 rounded-xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#3D4C3A] mb-2">
                      Email
                    </h4>
                    <p className="text-[#3D4C3A]/70">hello@rstudio.london</p>
                    <p className="text-[#3D4C3A]/70">
                      We reply within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-[#3D4C3A] p-4 rounded-xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#3D4C3A] mb-2">
                      Office
                    </h4>
                    <p className="text-[#3D4C3A]/70">
                      123 Shoreditch High Street
                    </p>
                    <p className="text-[#3D4C3A]/70">London, E1 6JE</p>
                  </div>
                </div>
              </div>

              {/* 3D Card Element */}
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3D4C3A] to-black opacity-20 rounded-2xl transform rotate-3 blur-lg"></div>
                <div className="relative bg-gradient-to-br from-[#3D4C3A] to-black text-white rounded-2xl p-8 transform hover:rotate-1 transition-all duration-500 shadow-2xl">
                  <h4 className="text-2xl font-bold mb-4">Visit Our Office</h4>
                  <p className="text-white/80 mb-6">
                    Walk-ins welcome! Our friendly team is ready to help you
                    find your perfect studio.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Open Daily</p>
                      <p className="text-sm text-white/70">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn">
                  <div className="w-20 h-20 bg-[#3D4C3A] rounded-full flex items-center justify-center">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#3D4C3A]">
                    Thank You!
                  </h3>
                  <p className="text-[#3D4C3A]/70 text-lg">
                    We've received your message and will get back to you within
                    24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[#3D4C3A] font-medium mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3D4C3A]/40" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-[#F0F0F0] border-2 border-transparent rounded-xl focus:border-[#3D4C3A] focus:bg-white outline-none transition-all duration-300 text-[#3D4C3A]"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#3D4C3A] font-medium mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3D4C3A]/40" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-[#F0F0F0] border-2 border-transparent rounded-xl focus:border-[#3D4C3A] focus:bg-white outline-none transition-all duration-300 text-[#3D4C3A]"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#3D4C3A] font-medium mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3D4C3A]/40" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full pl-12 pr-4 py-4 bg-[#F0F0F0] border-2 border-transparent rounded-xl focus:border-[#3D4C3A] focus:bg-white outline-none transition-all duration-300 text-[#3D4C3A]"
                        placeholder="+44 20 1234 5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#3D4C3A] font-medium mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-[#3D4C3A]/40" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        rows="5"
                        className="w-full pl-12 pr-4 py-4 bg-[#F0F0F0] border-2 border-transparent rounded-xl focus:border-[#3D4C3A] focus:bg-white outline-none transition-all duration-300 text-[#3D4C3A] resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-4 rounded-xl hover:bg-[#3D4C3A] transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-medium text-lg"
                  >
                    Send Message
                  </button>

                  <p className="text-sm text-[#3D4C3A]/60 text-center">
                    By submitting this form, you agree to our privacy policy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#3D4C3A] to-black text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="w-10 h-10" />
                <div>
                  <h3 className="text-2xl font-bold">Rstudio</h3>
                  <p className="text-sm text-white/60">London</p>
                </div>
              </div>
              <p className="text-white/70 mb-4 max-w-md">
                Premium studio apartments in London's most desirable locations.
                Find your perfect urban sanctuary with Rstudio.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a
                    href="#studios"
                    className="hover:text-white transition-colors"
                  >
                    Studios
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>
              © 2024 Rstudio London. All rights reserved. Crafted with
              excellence.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Studio;
