import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// Navigation Component
export const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'areas', label: 'Areas of Practice' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-blue-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <span className="text-2xl font-bold text-white">Dash Appraisals</span>
          </motion.div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block px-3 py-2 text-base font-medium w-full text-left ${
                  currentPage === item.id
                    ? 'text-blue-400 bg-gray-700'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

// Interactive Tape Measure Component
export const TapeMeasure = ({ isActive, length = 100 }) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="h-8 bg-gradient-to-r from-yellow-400 to-yellow-300 border-2 border-yellow-600 relative overflow-hidden"
        style={{ width: `${length}px`, transformOrigin: 'left' }}
      >
        {/* Measurement markings */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: Math.floor(length / 10) }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-10 relative">
              <div className="absolute top-0 left-0 w-0.5 h-full bg-red-600"></div>
              <div className="absolute top-1 left-1 text-xs font-bold text-red-800">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
        
        {/* Tape measure end */}
        <motion.div
          animate={{ x: isActive ? 0 : -20 }}
          transition={{ delay: 0.5 }}
          className="absolute right-0 top-0 w-6 h-8 bg-gray-800 border-l-2 border-yellow-600"
        >
          <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-600"></div>
        </motion.div>
      </motion.div>
      
      {/* Measurement display */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm font-bold"
        >
          {Math.round(length / 10)} ft
        </motion.div>
      )}
    </div>
  );
};

// Hero Section
export const HeroSection = () => {
  const [measureActive, setMeasureActive] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914')`
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            {/* Large Letters */}
            <div className="text-8xl md:text-9xl font-bold text-blue-400 relative">
              <span className="inline-block transform -rotate-12">D</span>
              <span className="inline-block transform rotate-12">A</span>
            </div>
            
            {/* House Icon */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 transform rotate-12">
              <div className="w-full h-full relative">
                <div className="absolute top-2 left-2 w-12 h-8 bg-red-600"></div>
                <div className="absolute top-0 left-4 w-8 h-4 bg-red-700 transform -rotate-45 origin-bottom"></div>
                <div className="absolute bottom-2 left-6 w-2 h-4 bg-yellow-400"></div>
              </div>
            </div>
            
            {/* Tape Measure */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <TapeMeasure isActive={measureActive} length={300} />
            </div>
          </div>
        </motion.div>
        
        {/* Company Name */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6 tracking-wider"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
        >
          DASH APPRAISALS
        </motion.h1>
        
        {/* Tagline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl mb-8 text-gray-200"
        >
          Valuing What You Value
        </motion.p>
        
        {/* Description */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          With over 25+ years of experience, Dash Appraisal delivers reliable property valuations. 
          We've seen all market conditions and property types to provide fast and accurate appraisals.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMeasureActive(!measureActive)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg shadow-lg"
          >
            📏 Try Interactive Measure
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
          >
            Get Free Quote
          </motion.button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Services Section
export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const services = [
    {
      title: "Residential Appraisal",
      description: "Comprehensive property valuations for single-family homes, condos, and townhouses.",
      image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
      features: ["Market Analysis", "Property Inspection", "Detailed Reports"]
    },
    {
      title: "Commercial Appraisal",
      description: "Professional valuations for commercial properties and investment real estate.",
      image: "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg",
      features: ["Income Approach", "Market Comparison", "Cost Analysis"]
    },
    {
      title: "Property Consulting",
      description: "Expert consultation services for real estate decisions and market insights.",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
      features: ["Market Trends", "Investment Analysis", "Expert Advice"]
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional appraisal services tailored to your specific needs with accuracy and reliability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 80, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section
export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const team = [
    {
      name: "Michael Dash",
      title: "Certified Residential Real Estate Appraiser",
      experience: "25+ years",
      phone: "678-555-0123",
      image: "https://images.pexels.com/photos/7937208/pexels-photo-7937208.jpeg",
      specialties: ["Residential Properties", "Market Analysis", "Property Inspection"]
    },
    {
      name: "Sarah Johnson",
      title: "Certified Commercial Real Estate Appraiser", 
      experience: "15+ years",
      phone: "706-555-0456",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
      specialties: ["Commercial Properties", "Investment Analysis", "Consultation"]
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our certified appraisers bring decades of experience and expertise to every valuation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -80 : 80, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0"
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{member.title}</p>
                  <p className="text-gray-600 mb-3">{member.experience} of experience</p>
                  
                  <div className="mb-4">
                    <p className="text-gray-700 font-semibold mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {member.specialties.map((specialty, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`tel:${member.phone}`}
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                  >
                    📞 {member.phone}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Areas Section
export const AreasSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const counties = [
    "Henry County", "Newton County", "Butts County", "Spalding County",
    "Fayette County", "Clayton County", "Rockdale County", "Gwinnett County"
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1740479772666-2e431ea28711')`
        }}
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Areas We Serve</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We provide professional appraisal services across multiple counties south of Atlanta.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {counties.map((county, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20 hover:border-blue-400/50 transition-all duration-300"
            >
              <h3 className="text-lg font-bold">{county}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-300 mb-8">
            We have two offices strategically located in Henry County and Newton County to better serve our clients.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Find Your Area
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would normally send the data to your backend
  };

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to schedule your appraisal? Contact us for a fast and reliable property valuation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div 
              className="relative h-64 rounded-lg bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/4247733/pexels-photo-4247733.jpeg')`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-4">Professional Service</h3>
                  <p className="text-lg">Contact us today for your property appraisal needs</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center p-4 bg-white rounded-lg shadow-md"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Michael Dash</h4>
                  <p className="text-blue-600">678-555-0123</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center p-4 bg-white rounded-lg shadow-md"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-blue-600">706-555-0456</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center p-4 bg-white rounded-lg shadow-md"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">✉️</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email Us</h4>
                  <p className="text-blue-600">info@dashappraisals.com</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Property Address</label>
                <input
                  type="text"
                  name="property"
                  value={formData.property}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 text-lg"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Dash Appraisals</h3>
            <p className="text-gray-300 mb-4">
              Professional real estate appraisal services with over 25 years of experience.
            </p>
            <p className="text-gray-400">Valuing What You Value</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Areas We Serve</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>📞 678-555-0123</p>
              <p>📞 706-555-0456</p>
              <p>✉️ info@dashappraisals.com</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Dash Appraisals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};