import React from 'react';
import { FileText, Download, Phone, AlertTriangle, Book, HelpCircle } from 'lucide-react';

const ResourcesPage = () => {
  const resourceCategories = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Service Information",
      description: "Detailed brochures and guides about our programs",
      resources: [
        { name: "Settlement Support Guide", languages: ["English", "Arabic", "Mandarin", "Spanish"], size: "2.1 MB" },
        { name: "Aged Care Services Overview", languages: ["English", "Italian", "Greek", "Vietnamese"], size: "1.8 MB" },
        { name: "Family Support Programs", languages: ["English", "Tagalog", "Hindi", "Korean"], size: "1.5 MB" },
        { name: "Community Engagement Opportunities", languages: ["English", "French", "Farsi"], size: "1.2 MB" }
      ],
      color: "sky"
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: "Emergency Support",
      description: "Critical contacts and crisis support information",
      resources: [
        { name: "Emergency Contacts List", languages: ["English", "Arabic", "Mandarin", "Spanish", "Vietnamese"], size: "0.8 MB" },
        { name: "Domestic Violence Support", languages: ["English", "Tagalog", "Hindi"], size: "1.1 MB" },
        { name: "Mental Health Crisis Guide", languages: ["English", "Korean", "Farsi"], size: "1.3 MB" },
        { name: "Financial Crisis Support", languages: ["English", "Italian", "Greek"], size: "0.9 MB" }
      ],
      color: "earth"
    },
    {
      icon: <Book className="h-8 w-8" />,
      title: "Policies & Reports",
      description: "Organizational policies and annual impact reports",
      resources: [
        { name: "Annual Report 2024", languages: ["English"], size: "4.2 MB" },
        { name: "Privacy Policy", languages: ["English", "Arabic", "Mandarin"], size: "0.5 MB" },
        { name: "Cultural Competency Framework", languages: ["English"], size: "2.1 MB" },
        { name: "Volunteer Handbook", languages: ["English"], size: "1.8 MB" }
      ],
      color: "leaf"
    },
    {
      icon: <HelpCircle className="h-8 w-8" />,
      title: "Frequently Asked Questions",
      description: "Common questions and answers about our services",
      resources: [
        { name: "Settlement Support FAQ", languages: ["English", "Arabic", "Mandarin"], size: "0.7 MB" },
        { name: "Aged Care FAQ", languages: ["English", "Italian", "Greek"], size: "0.6 MB" },
        { name: "Volunteer FAQ", languages: ["English"], size: "0.4 MB" },
        { name: "General Services FAQ", languages: ["English", "Spanish", "Vietnamese"], size: "0.8 MB" }
      ],
      color: "sun"
    }
  ];

  const emergencyContacts = [
    { service: "Police, Fire, Ambulance", number: "000", available: "24/7" },
    { service: "Lifeline Crisis Support", number: "13 11 14", available: "24/7" },
    { service: "Domestic Violence Helpline", number: "1800 737 732", available: "24/7" },
    { service: "Mental Health Crisis Line", number: "1800 011 511", available: "24/7" },
    { service: "Mosaic Emergency Support", number: "(02) 4926 1300", available: "Business hours" },
    { service: "Translating & Interpreting Service", number: "131 450", available: "24/7" }
  ];

  // Resource quality stats matching the screenshot design
  const qualityStats = [
    { 
      number: "100%", 
      label: "Accuracy Verified",
      description: "All resources professionally reviewed",
      color: "sky"
    },
    { 
      number: "25+", 
      label: "Languages Available",
      description: "Multilingual resource access",
      color: "earth"
    },
    { 
      number: "24/7", 
      label: "Online Access",
      description: "Resources available anytime",
      color: "leaf"
    },
    { 
      number: "4", 
      label: "Office Locations",
      description: "Physical support across NSW",
      color: "sun"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      sky: "from-sky/10 to-sky/5 border-sky/20 text-sky bg-sky",
      earth: "from-earth/10 to-earth/5 border-earth/20 text-earth bg-earth",
      leaf: "from-leaf/10 to-leaf/5 border-leaf/20 text-leaf bg-leaf",
      sun: "from-sun/10 to-sun/5 border-sun/20 text-sun bg-sun"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.sky;
  };

  const getAccentColor = (color: string) => {
    const colorMap = {
      sky: "bg-sky",
      earth: "bg-earth", 
      leaf: "bg-leaf",
      sun: "bg-sun"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.sky;
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Glass morphism background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Resources</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">Resources & Support</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Access important information, emergency contacts, and downloadable resources in multiple languages.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Quality Stats - Premium Glass Morphism Design */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
        {/* Enhanced glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-leaf animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Quality Assurance</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">Resource Excellence</h2>
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto">
              Our commitment to providing reliable, accessible, and professionally maintained resources
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {qualityStats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative text-center transform transition-all duration-700"
              >
                {/* Premium glass morphism card */}
                <div className="relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-6 lg:p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15">
                  
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-4">
                      <div className="text-4xl lg:text-6xl font-bold mb-2 transition-all duration-300 text-gray-900 dark:text-white drop-shadow-lg">
                        {stat.number}
                      </div>
                      
                      {/* Animated accent line */}
                      <div className="w-12 h-1 mx-auto rounded-full overflow-hidden bg-gray-200 dark:bg-white/20">
                        <div 
                          className={`h-full transition-all duration-2000 ease-out rounded-full ${getAccentColor(stat.color)}`}
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2 drop-shadow-sm">
                      {stat.label}
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-white/80 leading-relaxed">
                      {stat.description}
                    </div>
                  </div>

                  {/* Subtle top accent */}
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-b-full ${getAccentColor(stat.color)} opacity-60`}></div>
                  
                  {/* Corner glow effect */}
                  <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${getAccentColor(stat.color)} opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-20 bg-gradient-to-br from-sun/10 to-sun/5 dark:from-sun/5 dark:to-sun/2 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sun rounded-full mb-6 shadow-lg">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Emergency Contacts</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Important phone numbers for crisis situations and immediate support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-lg p-6 shadow-lg border-l-4 border-sun border border-white/20 dark:border-slate-700/50">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{contact.service}</h3>
                <div className="text-2xl font-bold text-sun mb-2">
                  <a href={`tel:${contact.number.replace(/\s/g, '')}`} className="hover:underline">
                    {contact.number}
                  </a>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{contact.available}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-lg p-6 shadow-lg max-w-2xl mx-auto border border-white/20 dark:border-slate-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Need an Interpreter?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Call the Translating & Interpreting Service (TIS) on <strong>131 450</strong> for immediate language support during emergencies.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Available 24/7 in over 160 languages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Download Resources</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Access comprehensive information about our services and support programs in multiple languages.
            </p>
          </div>

          <div className="space-y-16">
            {resourceCategories.map((category, index) => (
              <div key={index} className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-slate-700/50">
                <div className={`bg-gradient-to-br ${getColorClasses(category.color)} p-8 border-b border-white/20 dark:border-slate-700/50`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                      <div className={category.color === 'sky' ? 'text-sky' : category.color === 'earth' ? 'text-earth' : category.color === 'leaf' ? 'text-leaf' : 'text-sun'}>
                        {category.icon}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{category.title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">{category.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.resources.map((resource, idx) => (
                      <div key={idx} className="backdrop-blur-md bg-white/50 dark:bg-slate-700/50 rounded-lg p-6 hover:shadow-lg transition-shadow border border-white/20 dark:border-slate-600/50">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg">{resource.name}</h3>
                          <span className="text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-800 px-2 py-1 rounded">
                            {resource.size}
                          </span>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Available in:</p>
                          <div className="flex flex-wrap gap-2">
                            {resource.languages.map((lang, langIdx) => (
                              <span key={langIdx} className="text-xs bg-white dark:bg-slate-800 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors group">
                          <Download className="h-4 w-4 mr-2 group-hover:translate-y-1 transition-transform" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Archive */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Newsletter Archive</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Catch up on past newsletters featuring community stories, program updates, and important announcements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "December 2024 - Year in Review", date: "December 2024", highlights: ["Annual statistics", "Success stories", "2025 preview"] },
              { title: "September 2024 - Community Celebrations", date: "September 2024", highlights: ["Cultural festivals", "New partnerships", "Volunteer spotlights"] },
              { title: "June 2024 - Service Expansions", date: "June 2024", highlights: ["New programs", "Staff updates", "Policy changes"] }
            ].map((newsletter, index) => (
              <div key={index} className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-lg p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{newsletter.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{newsletter.date}</p>
                <ul className="space-y-2 mb-6">
                  {newsletter.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-sky rounded-full mr-3"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
                <button className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Read Newsletter
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for More Resources */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold mb-6">Need Additional Resources?</h2>
            <p className="text-xl text-blue-200 dark:text-blue-300 mb-8 max-w-3xl mx-auto">
              Can't find what you're looking for? Our multilingual staff can help you access the information and support you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0249261300"
                className="bg-gradient-to-r from-earth to-earth/90 hover:from-earth/90 hover:to-earth text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (02) 4926 1300
              </a>
              <a
                href="mailto:info@mosaicmc.org.au"
                className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-lg font-semibold transition-colors hover:bg-white/10"
              >
                Email for Resources
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;