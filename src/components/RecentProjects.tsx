import React from 'react';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

const RecentProjects = () => {
  const projects = [
    {
      title: "Eliminating dengue with the World Mosquito Program",
      location: "Indonesia",
      date: "2024",
      image: "https://images.pexels.com/photos/5471954/pexels-photo-5471954.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "A biotechnology approach to reducing the impact of mosquito-borne diseases through innovative scientific solutions."
    },
    {
      title: "Clean Water Initiative",
      location: "Kenya",
      date: "2024",
      image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Installing sustainable water systems and training local technicians for long-term maintenance and community ownership."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent projects</h2>
            <p className="text-xl text-gray-600">
              Discover our latest initiatives making real change in communities worldwide.
            </p>
          </div>
          
          <div className="hidden md:flex space-x-4">
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              <ArrowRight className="h-5 w-5 rotate-180" />
            </button>
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-gray-900">{project.date}</span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.date}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center group">
                  Read full story
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;