import React, { useState } from "react";
import {
  X,
  MapPin,
  Home,
  Maximize2,
  Users,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  User,
  MessageSquare,
  Send,
} from "lucide-react";

const Studio = () => {
  const [expandedStudio, setExpandedStudio] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interestedStudio: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Studio Data
  const studios = [
    {
      id: 1,
      name: "Urban Loft Studio",
      thumbnail:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      location: "Shoreditch, London",
      size: "450 sq ft",
      capacity: "1-2 people",
      shortDesc: "Modern industrial loft in the heart of Shoreditch",
      description:
        "Step into this stunning urban loft studio where contemporary design meets industrial charm. Featuring exposed brick walls, high ceilings with original wooden beams, and floor-to-ceiling windows that flood the space with natural light. The open-plan layout seamlessly integrates living, working, and sleeping areas, making it perfect for creative professionals or couples seeking a sophisticated urban retreat. The polished concrete floors and minimalist fixtures create an atmosphere of refined simplicity, while the carefully curated neutral palette allows for personalization. Located in one of London's most vibrant creative districts, you'll be surrounded by world-class galleries, trendy cafes, and innovative startups.",
      amenities: ["High-speed WiFi", "Natural Light", "Open Plan"],
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=800&fit=crop",
      ],
    },
    {
      id: 2,
      name: "Riverside Minimal Studio",
      thumbnail:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      location: "Canary Wharf, London",
      size: "380 sq ft",
      capacity: "1 person",
      shortDesc: "Sleek minimalist space with stunning river views",
      description:
        "Experience tranquility in the city with this exquisitely designed minimalist studio overlooking the Thames. Every element has been thoughtfully considered to maximize space and light, creating a serene sanctuary above the bustling financial district. Floor-to-ceiling windows frame spectacular water views and provide an ever-changing backdrop throughout the day. The neutral color palette of warm greys and soft whites promotes calm and focus, while clever storage solutions maintain the clean lines and uncluttered aesthetic. Premium finishes include engineered oak flooring, designer lighting, and a modern kitchenette with integrated appliances. The studio's smart layout proves that less truly is more, offering everything you need without excess.",
      amenities: ["River Views", "Modern Kitchen", "Smart Storage"],
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&h=800&fit=crop",
      ],
    },
    {
      id: 3,
      name: "Garden View Sanctuary",
      thumbnail:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      location: "Notting Hill, London",
      size: "520 sq ft",
      capacity: "2 people",
      shortDesc: "Peaceful studio with private garden access",
      description:
        "Discover your personal oasis in this exceptional ground-floor studio with exclusive access to a beautifully maintained private garden. This rare gem combines the convenience of city living with the serenity of a green retreat. Large French doors open onto a charming patio area, creating a seamless indoor-outdoor living experience that's perfect for morning coffee or evening relaxation. Inside, the studio features elegant herringbone wood flooring, high ceilings with decorative cornicing, and a sophisticated color scheme of soft sage and warm neutrals that echoes the garden beyond. The generous layout accommodates distinct living and sleeping zones while maintaining an airy, open feel. Premium touches include marble countertops, designer bathroom fixtures, and custom built-in wardrobes.",
      amenities: ["Private Garden", "French Doors", "Premium Finishes"],
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1585821569331-f071db2abd8d?w=1200&h=800&fit=crop",
      ],
    },
    {
      id: 4,
      name: "Skyline Penthouse Studio",
      thumbnail:
        "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop",
      location: "The Shard, London Bridge",
      size: "500 sq ft",
      capacity: "2 people",
      shortDesc: "Luxury studio with panoramic London skyline",
      description:
        "Elevate your lifestyle in this prestigious penthouse studio offering breathtaking 360-degree views of London's iconic skyline. Situated on the 28th floor, this sophisticated space is a masterclass in contemporary luxury living. The open-plan design maximizes the stunning vistas through wrap-around floor-to-ceiling windows, while the interior features the finest materials and finishes throughout. Black-framed windows create striking architectural lines, complemented by polished porcelain tiles, brushed brass fixtures, and statement lighting. The studio includes a designer kitchen with top-tier appliances, a spa-inspired bathroom with rainfall shower, and custom joinery that provides ample storage without compromising the sleek aesthetic. Watch the sunset over the city from your private terrace, a rare amenity that makes this studio truly exceptional.",
      amenities: ["Panoramic Views", "Private Terrace", "Luxury Finishes"],
      images: [
        "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop",
      ],
    },
    {
      id: 5,
      name: "Heritage Brick Studio",
      thumbnail:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=600&fit=crop",
      location: "Covent Garden, London",
      size: "420 sq ft",
      capacity: "1-2 people",
      shortDesc: "Character-filled studio in converted heritage building",
      description:
        "Immerse yourself in London's rich history with this characterful studio in a beautifully converted Victorian warehouse. Original architectural features including exposed brick walls, cast iron columns, and large arched windows have been lovingly preserved and enhanced with contemporary interventions. The result is a unique space that honors the building's industrial past while providing all modern comforts. Soaring ceilings create dramatic volume, while the thoughtful layout ensures functionality without sacrificing the loft-like feel. Warm Edison bulb lighting, reclaimed wood accents, and a feature brick wall create an atmosphere that's both sophisticated and welcoming. The location is unbeatable – steps from world-class theatre, dining, and shopping in the heart of London's most vibrant cultural quarter.",
      amenities: ["Heritage Features", "High Ceilings", "Central Location"],
      images: [
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1565183928294-7d22f2d8b633?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
      ],
    },
    {
      id: 6,
      name: "Nordic Light Studio",
      thumbnail:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
      location: "Camden, London",
      size: "460 sq ft",
      capacity: "2 people",
      shortDesc: "Scandinavian-inspired bright and airy studio",
      description:
        "Find your hygge in this stunning Scandinavian-inspired studio that perfectly balances minimalism with warmth. Designed according to Nordic principles of light, functionality, and natural materials, this space is a haven of calm in the energetic Camden neighborhood. Whitewashed walls and pale oak flooring create a bright, airy foundation, while carefully chosen textiles and greenery add softness and life. Large windows on two sides ensure excellent natural light throughout the day, complemented by a thoughtfully designed lighting scheme for cozy evenings. The studio features clean-lined furniture, clever storage solutions, and a compact yet fully functional kitchen with matte white cabinetry. Every detail reflects the Scandinavian philosophy of intentional living – beautiful, practical, and promoting wellbeing.",
      amenities: ["Natural Materials", "Excellent Light", "Minimalist Design"],
      images: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1615875221248-e7278eeff406?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600573472556-e636c2acda9e?w=1200&h=800&fit=crop",
      ],
    },
  ];

  const handleExpandStudio = (studio) => {
    setExpandedStudio(studio);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const handleCloseExpanded = () => {
    setExpandedStudio(null);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === expandedStudio.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? expandedStudio.images.length - 1 : prev - 1
    );
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        interestedStudio: "",
      });
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3D4C3A] via-[#3D4C3A] to-[#5C6F59]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="transform hover:scale-105 transition-transform duration-500">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight">
              Rstudio
            </h1>
            <div className="h-1 w-24 bg-white mx-auto mb-8 transform hover:w-32 transition-all duration-300"></div>
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 font-light">
              Exceptional Studios in London
            </p>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-12">
              Discover thoughtfully designed spaces where modern aesthetics meet
              functional living
            </p>
          </div>

          <a
            href="#studios"
            className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-[#3D4C3A] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Explore Studios
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
        </div>

        {/* Floating 3D Elements */}
        <div className="absolute bottom-10 left-10 w-20 h-20 border-4 border-white/20 rounded-lg transform rotate-12 hover:rotate-45 transition-transform duration-700 hover:scale-110"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border-4 border-white/20 rounded-full transform hover:rotate-180 transition-transform duration-700 hover:scale-110"></div>
        <div className="absolute bottom-40 right-40 w-12 h-12 bg-white/10 backdrop-blur-sm transform rotate-45 hover:rotate-90 transition-transform duration-700 hover:scale-110"></div>
      </header>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold tracking-wider text-[#3D4C3A] uppercase border-b-2 border-black pb-1">
                About Rstudio
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D4C3A] leading-tight">
              Redefining Studio Living in London
            </h2>
            <p className="text-lg text-[#3D4C3A]/80 leading-relaxed">
              At Rstudio, we believe that exceptional living spaces aren't
              measured by size alone. Each of our carefully curated studios
              represents the perfect harmony of design, functionality, and
              location.
            </p>
            <p className="text-lg text-[#3D4C3A]/80 leading-relaxed">
              From the vibrant streets of Shoreditch to the serene riverside of
              Canary Wharf, our portfolio showcases London's finest studio
              apartments, each with its own unique character and charm.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center p-4 bg-[#E0E0E0] rounded-lg hover:bg-white transition-colors duration-300 transform hover:scale-105 hover:shadow-lg">
                <div className="text-3xl font-bold text-[#3D4C3A]">6</div>
                <div className="text-sm text-[#3D4C3A]/70 mt-1">
                  Premium Studios
                </div>
              </div>
              <div className="text-center p-4 bg-[#E0E0E0] rounded-lg hover:bg-white transition-colors duration-300 transform hover:scale-105 hover:shadow-lg">
                <div className="text-3xl font-bold text-[#3D4C3A]">100%</div>
                <div className="text-sm text-[#3D4C3A]/70 mt-1">
                  Satisfaction
                </div>
              </div>
              <div className="text-center p-4 bg-[#E0E0E0] rounded-lg hover:bg-white transition-colors duration-300 transform hover:scale-105 hover:shadow-lg">
                <div className="text-3xl font-bold text-[#3D4C3A]">24/7</div>
                <div className="text-sm text-[#3D4C3A]/70 mt-1">Support</div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#3D4C3A] to-[#5C6F59] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=800&fit=crop"
                alt="Modern London Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D4C3A]/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Studios Grid Section */}
      <section
        id="studios"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider text-[#3D4C3A] uppercase border-b-2 border-black pb-1 inline-block mb-4">
            Our Collection
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D4C3A] mb-6">
            Available Studios
          </h2>
          <p className="text-lg text-[#3D4C3A]/70 max-w-2xl mx-auto">
            Each studio has been meticulously selected and designed to offer a
            unique living experience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {studios.map((studio, index) => (
            <div
              key={studio.id}
              className="group cursor-pointer"
              onClick={() => handleExpandStudio(studio)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative bg-[#E0E0E0] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* 3D Card Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>

                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={studio.thumbnail}
                    alt={studio.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-full text-xs font-semibold transform group-hover:scale-110 transition-transform duration-300">
                    View Details
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-[#3D4C3A] group-hover:text-black transition-colors duration-300">
                    {studio.name}
                  </h3>

                  <p className="text-[#3D4C3A]/70 line-clamp-2">
                    {studio.shortDesc}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-[#3D4C3A]/60">
                    <MapPin size={16} />
                    <span>{studio.location}</span>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <div className="flex items-center gap-2 text-sm text-[#3D4C3A]/60">
                      <Maximize2 size={16} />
                      <span>{studio.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#3D4C3A]/60">
                      <Users size={16} />
                      <span>{studio.capacity}</span>
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="pt-4 flex items-center gap-2 text-black font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Explore Studio</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expanded Studio Modal */}
      {expandedStudio && (
        <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto backdrop-blur-sm">
          <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Close Button */}
              <button
                onClick={handleCloseExpanded}
                className="fixed top-6 right-6 z-50 bg-white text-[#3D4C3A] p-3 rounded-full hover:bg-[#E0E0E0] transition-all duration-300 transform hover:rotate-90 hover:scale-110 shadow-lg"
              >
                <X size={24} />
              </button>

              {/* Image Gallery */}
              <div className="relative aspect-video bg-[#E0E0E0] rounded-2xl overflow-hidden mb-8 shadow-2xl group">
                <img
                  src={expandedStudio.images[currentImageIndex]}
                  alt={`${expandedStudio.name} - Image ${
                    currentImageIndex + 1
                  }`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#3D4C3A] p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#3D4C3A] p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {expandedStudio.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                {expandedStudio.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-110 ${
                      currentImageIndex === idx
                        ? "ring-4 ring-white shadow-xl scale-105"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="bg-[#F0F0F0] rounded-2xl p-8 md:p-12 shadow-xl">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold text-[#3D4C3A] mb-4">
                        {expandedStudio.name}
                      </h2>
                      <div className="flex items-center gap-2 text-[#3D4C3A]/70">
                        <MapPin size={20} />
                        <span className="text-lg">
                          {expandedStudio.location}
                        </span>
                      </div>
                    </div>

                    <div className="h-px bg-[#3D4C3A]/20"></div>

                    <div>
                      <h3 className="text-xl font-bold text-[#3D4C3A] mb-4">
                        Description
                      </h3>
                      <p className="text-[#3D4C3A]/80 leading-relaxed text-lg">
                        {expandedStudio.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Specifications */}
                    <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                      <h3 className="text-lg font-bold text-[#3D4C3A] mb-4 flex items-center gap-2">
                        <Home size={20} />
                        Specifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-[#E0E0E0]">
                          <span className="text-[#3D4C3A]/70">Size</span>
                          <span className="font-semibold text-[#3D4C3A]">
                            {expandedStudio.size}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[#E0E0E0]">
                          <span className="text-[#3D4C3A]/70">Capacity</span>
                          <span className="font-semibold text-[#3D4C3A]">
                            {expandedStudio.capacity}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-[#3D4C3A]/70">Location</span>
                          <span className="font-semibold text-[#3D4C3A] text-right text-sm">
                            {expandedStudio.location.split(",")[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                      <h3 className="text-lg font-bold text-[#3D4C3A] mb-4">
                        Key Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {expandedStudio.amenities.map((amenity, idx) => (
                          <span
                            key={idx}
                            className="bg-[#E0E0E0] text-[#3D4C3A] px-3 py-1 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href="#contact"
                      onClick={handleCloseExpanded}
                      className="block w-full bg-black text-white text-center py-4 rounded-xl font-semibold hover:bg-[#3D4C3A] transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Inquire About This Studio
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#E0E0E0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider text-[#3D4C3A] uppercase border-b-2 border-black pb-1 inline-block mb-4">
              Get In Touch
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D4C3A] mb-6">
              Let's Find Your Perfect Studio
            </h2>
            <p className="text-lg text-[#3D4C3A]/70 max-w-2xl mx-auto">
              Fill out the form below and our team will get back to you within
              24 hours
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-[#F0F0F0] rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-black text-white p-3 rounded-xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3D4C3A] text-lg mb-2">
                      Email Us
                    </h3>
                    <a
                      href="mailto:hello@rstudio.london"
                      className="text-[#3D4C3A]/70 hover:text-black transition-colors"
                    >
                      hello@rstudio.london
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#F0F0F0] rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-black text-white p-3 rounded-xl">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3D4C3A] text-lg mb-2">
                      Call Us
                    </h3>
                    <a
                      href="tel:+442012345678"
                      className="text-[#3D4C3A]/70 hover:text-black transition-colors"
                    >
                      +44 20 1234 5678
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#F0F0F0] rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-black text-white p-3 rounded-xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3D4C3A] text-lg mb-2">
                      Visit Us
                    </h3>
                    <p className="text-[#3D4C3A]/70">
                      123 Design Street
                      <br />
                      London, EC1A 1BB
                      <br />
                      United Kingdom
                    </p>
                  </div>
                </div>
              </div>

              {/* 3D Decorative Element */}
              <div className="hidden md:block relative h-32">
                <div className="absolute inset-0 flex items-center justify-center gap-4">
                  <div className="w-20 h-20 bg-[#3D4C3A] rounded-xl transform rotate-12 hover:rotate-45 transition-transform duration-500"></div>
                  <div className="w-16 h-16 bg-black rounded-full transform -rotate-12 hover:rotate-180 transition-transform duration-500"></div>
                  <div className="w-24 h-24 border-4 border-[#3D4C3A] rounded-xl transform rotate-45 hover:rotate-90 transition-transform duration-500"></div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 animate-fade-in">
                  <div className="w-20 h-20 bg-[#3D4C3A] rounded-full flex items-center justify-center mb-6 transform scale-0 animate-bounce-in">
                    <Send size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#3D4C3A] mb-4">
                    Thank You!
                  </h3>
                  <p className="text-[#3D4C3A]/70 text-center">
                    We've received your inquiry and will get back to you
                    shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#3D4C3A] mb-2">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D4C3A]/40"
                        size={20}
                      />
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
                    <label className="block text-sm font-semibold text-[#3D4C3A] mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D4C3A]/40"
                        size={20}
                      />
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
                    <label className="block text-sm font-semibold text-[#3D4C3A] mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D4C3A]/40"
                        size={20}
                      />
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
                    <label className="block text-sm font-semibold text-[#3D4C3A] mb-2">
                      Interested Studio
                    </label>
                    <select
                      name="interestedStudio"
                      value={formData.interestedStudio}
                      onChange={handleFormChange}
                      className="w-full px-4 py-4 bg-[#F0F0F0] border-2 border-transparent rounded-xl focus:border-[#3D4C3A] focus:bg-white outline-none transition-all duration-300 text-[#3D4C3A]"
                    >
                      <option value="">Select a studio...</option>
                      {studios.map((studio) => (
                        <option key={studio.id} value={studio.name}>
                          {studio.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3D4C3A] mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare
                        className="absolute left-4 top-4 text-[#3D4C3A]/40"
                        size={20}
                      />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        rows="4"
                        className="w-full pl-12 pr-4 py-4 bg-[#F0F0F0] border-2 border-transparent rounded-xl focus:border-[#3D4C3A] focus:bg-white outline-none transition-all duration-300 resize-none text-[#3D4C3A]"
                        placeholder="Tell us about your requirements..."
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-[#3D4C3A] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group"
                  >
                    <span>Send Message</span>
                    <Send
                      size={20}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3D4C3A] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-4">Rstudio</h3>
              <p className="text-white/70 mb-4 max-w-md">
                Exceptional studio living spaces in London's most desirable
                locations. Where design meets functionality.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a
                    href="#studios"
                    className="hover:text-white transition-colors"
                  >
                    Our Studios
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
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
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © 2024 Rstudio London. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }

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

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
};

export default Studio;
