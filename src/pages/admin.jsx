import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  Save,
  AlertCircle,
  CheckCircle,
  Loader,
  Star,
  MapPin,
  Square,
  Bed,
  Bath,
  Eye,
  Heart,
  Search,
  Filter,
  Menu,
  Home,
  Settings,
  LogOut,
  BarChart3,
} from "lucide-react";

const API_URL = "http://localhost:5001/api";

const Admin = () => {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingStudio, setEditingStudio] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    fullLocation: "",
    type: "Studio",
    size: "",
    beds: 1,
    baths: 1,
    description: "",
    longDescription: "",
    images: [],
    features: [],
    amenities: [],
    available: "Now",
    featured: false,
    status: "available",
  });

  const [newFeature, setNewFeature] = useState("");
  const [newAmenity, setNewAmenity] = useState("");

  // Fetch studios
  useEffect(() => {
    fetchStudios();
  }, []);

  const fetchStudios = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/studios`);
      const data = await response.json();
      if (data.success) {
        setStudios(data.data);
      }
    } catch (error) {
      showNotification("Error fetching studios", "error");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ImageKit Upload Function - Using V1 API
  const uploadToImageKit = async (file) => {
    try {
      // Step 1: Get authentication parameters from backend
      const authResponse = await fetch(`${API_URL}/imagekit-auth`);
      if (!authResponse.ok) {
        throw new Error("Failed to get authentication parameters");
      }
      const authData = await authResponse.json();

      // Step 2: Prepare form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", `studio_${Date.now()}_${file.name}`);
      formData.append("publicKey", authData.publicKey);
      formData.append("signature", authData.signature);
      formData.append("expire", authData.expire);
      formData.append("token", authData.token);
      formData.append("folder", "/studios");

      // Step 3: Upload to ImageKit using V1 API
      const uploadResponse = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const result = await uploadResponse.json();
      return result.url;
    } catch (error) {
      console.error("ImageKit upload error:", error);
      throw error;
    }
  };

  // Handle multiple file selection and upload
  const handleImageSelect = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadedUrls = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));

        const url = await uploadToImageKit(file);
        uploadedUrls.push(url);
      }

      // Add uploaded images to formData
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));

      showNotification(
        `${uploadedUrls.length} image(s) uploaded successfully!`,
        "success"
      );
    } catch (error) {
      showNotification(`Upload failed: ${error.message}`, "error");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      // Reset file input
      e.target.value = "";
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }));
      setNewAmenity("");
    }
  };

  const removeAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      showNotification("Please upload at least one image", "error");
      return;
    }

    setUploading(true);

    try {
      const dataToSend = {
        ...formData,
        features: JSON.stringify(formData.features),
        amenities: JSON.stringify(formData.amenities),
        images: JSON.stringify(formData.images),
      };

      const url = editingStudio
        ? `${API_URL}/studios/${editingStudio._id}`
        : `${API_URL}/studios`;

      const method = editingStudio ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (data.success) {
        showNotification(
          editingStudio
            ? "Studio updated successfully!"
            : "Studio created successfully!",
          "success"
        );
        fetchStudios();
        closeModal();
      } else {
        showNotification(data.message || "Error saving studio", "error");
      }
    } catch (error) {
      showNotification("Error saving studio", "error");
      console.error("Save error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (studio) => {
    setEditingStudio(studio);
    setFormData({
      name: studio.name,
      location: studio.location,
      fullLocation: studio.fullLocation,
      type: studio.type,
      size: studio.size,
      beds: studio.beds,
      baths: studio.baths,
      description: studio.description,
      longDescription: studio.longDescription,
      images: studio.images || [],
      features: studio.features || [],
      amenities: studio.amenities || [],
      available: studio.available,
      featured: studio.featured,
      status: studio.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this studio?")) return;

    try {
      const response = await fetch(`${API_URL}/studios/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        showNotification("Studio deleted successfully", "success");
        fetchStudios();
      } else {
        showNotification(data.message || "Error deleting studio", "error");
      }
    } catch (error) {
      showNotification("Error deleting studio", "error");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStudio(null);
    setFormData({
      name: "",
      location: "",
      fullLocation: "",
      type: "Studio",
      size: "",
      beds: 1,
      baths: 1,
      description: "",
      longDescription: "",
      images: [],
      features: [],
      amenities: [],
      available: "Now",
      featured: false,
      status: "available",
    });
    setUploadProgress(0);
  };

  const filteredStudios = studios.filter((studio) => {
    const matchesSearch =
      studio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studio.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || studio.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: studios.length,
    available: studios.filter((s) => s.status === "available").length,
    rented: studios.filter((s) => s.status === "rented").length,
    featured: studios.filter((s) => s.featured).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-slide-in ${
            notification.type === "success"
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
              : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <AlertCircle className="w-6 h-6" />
          )}
          <span className="font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-black tracking-tight">R—ADMIN</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {[
              { icon: Home, label: "Dashboard", active: true },
              { icon: BarChart3, label: "Analytics" },
              { icon: Settings, label: "Settings" },
            ].map((item, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold transition-all ${
                  item.active
                    ? "bg-white text-gray-900 shadow-xl"
                    : "hover:bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                <item.icon size={22} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-all">
            <LogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-12 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden w-12 h-12 flex items-center justify-center bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-colors"
                >
                  <Menu size={20} />
                </button>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                    Studio Management
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Manage your property listings
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Add Studio</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="px-4 sm:px-6 lg:px-12 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {[
              {
                label: "Total Studios",
                value: stats.total,
                color: "from-blue-500 to-blue-600",
                icon: Home,
              },
              {
                label: "Available",
                value: stats.available,
                color: "from-green-500 to-emerald-600",
                icon: CheckCircle,
              },
              {
                label: "Rented",
                value: stats.rented,
                color: "from-orange-500 to-orange-600",
                icon: AlertCircle,
              },
              {
                label: "Featured",
                value: stats.featured,
                color: "from-purple-500 to-purple-600",
                icon: Star,
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${stat.color} rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white shadow-xl hover:scale-105 transition-transform`}
              >
                <div className="flex items-start justify-between mb-4">
                  <stat.icon className="w-8 h-8 lg:w-10 lg:h-10 opacity-80" />
                </div>
                <div className="text-3xl lg:text-5xl font-black mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm lg:text-base font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-lg mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search studios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none"
                />
              </div>
              <div className="relative sm:w-48">
                <Filter
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                  <option value="rented">Rented</option>
                </select>
              </div>
            </div>
          </div>

          {/* Studios Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="w-12 h-12 animate-spin text-gray-900" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredStudios.map((studio) => (
                <div
                  key={studio._id}
                  className="group bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                    {studio.images && studio.images.length > 0 ? (
                      <img
                        src={studio.images[0]}
                        alt={studio.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-400" />
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      <div className="flex flex-col gap-2">
                        {studio.featured && (
                          <div className="px-3 py-1.5 bg-yellow-400 text-yellow-900 rounded-full text-xs font-black flex items-center gap-1">
                            <Star size={12} fill="currentColor" />
                            FEATURED
                          </div>
                        )}
                        <div
                          className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                            studio.status === "available"
                              ? "bg-green-500 text-white"
                              : studio.status === "pending"
                              ? "bg-orange-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {studio.status.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white rounded-full text-xs font-bold flex items-center gap-1">
                        <Eye size={12} />
                        {studio.views || 0}
                      </div>
                      <div className="px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white rounded-full text-xs font-bold flex items-center gap-1">
                        <Heart size={12} />
                        {studio.likes || 0}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-1">
                        {studio.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-500 mb-3">
                        <MapPin size={14} />
                        <span className="text-sm font-medium line-clamp-1">
                          {studio.location}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {studio.description}
                      </p>
                    </div>

                    {/* Specs */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1">
                        <Square size={12} />
                        {studio.size} sqft
                      </div>
                      <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1">
                        <Bed size={12} />
                        {studio.beds}
                      </div>
                      <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1">
                        <Bath size={12} />
                        {studio.baths}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleEdit(studio)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
                      >
                        <Edit2 size={16} />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(studio._id)}
                        className="px-4 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredStudios.length === 0 && !loading && (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                No Studios Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 sm:px-8 py-6 flex items-center justify-between rounded-t-3xl z-10">
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                  {editingStudio ? "Edit Studio" : "Add New Studio"}
                </h2>
                <button
                  onClick={closeModal}
                  disabled={uploading}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-2xl transition-colors disabled:opacity-50"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                {/* Images Section - Moved to top */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-gray-900">Images *</h3>

                  {/* Current Images */}
                  {formData.images.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-gray-700 mb-3">
                        Uploaded Images ({formData.images.length})
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {formData.images.map((img, index) => (
                          <div
                            key={index}
                            className="relative group aspect-square"
                          >
                            <img
                              src={img}
                              alt=""
                              className="w-full h-full object-cover rounded-xl"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              disabled={uploading}
                              className="absolute top-1 right-1 w-7 h-7 bg-red-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                            >
                              <X size={14} />
                            </button>
                            {index === 0 && (
                              <div className="absolute bottom-1 left-1 right-1 bg-black/70 text-white text-[10px] font-bold text-center py-1 rounded">
                                COVER
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload Progress */}
                  {uploading && uploadProgress > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div>
                    <label className="block w-full cursor-pointer">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageSelect}
                        disabled={uploading}
                        className="hidden"
                      />
                      <div
                        className={`flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-200 hover:border-gray-400 transition-all ${
                          uploading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {uploading ? (
                          <>
                            <Loader
                              className="animate-spin text-gray-600"
                              size={20}
                            />
                            <span className="font-bold text-gray-700">
                              Uploading to ImageKit...
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload size={20} className="text-gray-600" />
                            <span className="font-bold text-gray-700">
                              Upload Images
                            </span>
                          </>
                        )}
                      </div>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Upload multiple images. First image will be the cover.
                      Files are securely uploaded to ImageKit.
                    </p>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-gray-900">
                    Basic Information
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Studio Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={uploading}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none disabled:opacity-50"
                        placeholder="e.g., Modern Downtown Loft"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Type *
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                        disabled={uploading}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none disabled:opacity-50"
                      >
                        <option value="Studio">Studio</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Loft">Loft</option>
                        <option value="Penthouse">Penthouse</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        disabled={uploading}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none disabled:opacity-50"
                        placeholder="e.g., Shoreditch"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Full Location *
                      </label>
                      <input
                        type="text"
                        name="fullLocation"
                        value={formData.fullLocation}
                        onChange={handleInputChange}
                        required
                        disabled={uploading}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none disabled:opacity-50"
                        placeholder="e.g., 123 Main St, Shoreditch, London"
                      />
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-gray-900">
                    Specifications
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Size (sqft) *
                      </label>
                      <input
                        type="number"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        required
                        min="0"
                        disabled={uploading}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Bedrooms *
                      </label>
                      <input
                        type="number"
                        name="beds"
                        value={formData.beds}
                        onChange={handleInputChange}
                        required
                        min="0"
                        disabled={uploading}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Bathrooms *
                      </label>
                      <input
                        type="number"
                        name="baths"
                        value={formData.baths}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.5"
                        disabled={uploading}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Available *
                      </label>
                      <input
                        type="text"
                        name="available"
                        value={formData.available}
                        onChange={handleInputChange}
                        required
                        disabled={uploading}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none disabled:opacity-50"
                        placeholder="e.g., Now, Jan 2024"
                      />
                    </div>
                  </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-gray-900">
                    Descriptions
                  </h3>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Short Description * (500 chars max)
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      maxLength="500"
                      rows="3"
                      disabled={uploading}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none resize-none disabled:opacity-50"
                      placeholder="Brief description for card preview"
                    />
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {formData.description.length}/500
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Long Description * (2000 chars max)
                    </label>
                    <textarea
                      name="longDescription"
                      value={formData.longDescription}
                      onChange={handleInputChange}
                      required
                      maxLength="2000"
                      rows="6"
                      disabled={uploading}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none resize-none disabled:opacity-50"
                      placeholder="Detailed description for detail page"
                    />
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {formData.longDescription.length}/2000
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-gray-900">Features</h3>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addFeature())
                      }
                      disabled={uploading}
                      className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none disabled:opacity-50"
                      placeholder="Add a feature (press Enter)"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      disabled={uploading}
                      className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>

                  {formData.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl font-semibold"
                        >
                          <span>{feature}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            disabled={uploading}
                            className="w-5 h-5 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-gray-900">
                    Amenities
                  </h3>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAmenity}
                      onChange={(e) => setNewAmenity(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addAmenity())
                      }
                      disabled={uploading}
                      className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none disabled:opacity-50"
                      placeholder="Add an amenity (press Enter)"
                    />
                    <button
                      type="button"
                      onClick={addAmenity}
                      disabled={uploading}
                      className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>

                  {formData.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl font-semibold"
                        >
                          <span>{amenity}</span>
                          <button
                            type="button"
                            onClick={() => removeAmenity(index)}
                            disabled={uploading}
                            className="w-5 h-5 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status & Options */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-gray-900">
                    Status & Options
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                        disabled={uploading}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:border-gray-900 focus:bg-white transition-all outline-none disabled:opacity-50"
                      >
                        <option value="available">Available</option>
                        <option value="pending">Pending</option>
                        <option value="rented">Rented</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <label className="flex items-center gap-3 px-6 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-white transition-all w-full">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleInputChange}
                          disabled={uploading}
                          className="w-5 h-5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 disabled:opacity-50"
                        />
                        <span className="font-bold text-gray-700 flex items-center gap-2">
                          <Star size={18} className="text-yellow-500" />
                          Featured Studio
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={uploading}
                    className="flex-1 px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || formData.images.length === 0}
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <Loader className="animate-spin" size={20} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        {editingStudio ? "Update Studio" : "Create Studio"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Admin;
