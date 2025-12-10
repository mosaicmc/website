import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Feature {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  features?: string[];
  eligibility: string;
  link: string;
  color: 'sky' | 'earth' | 'leaf' | 'sun';
}

interface Features06Props {
  title: string;
  description: string;
  features: Feature[];
}

const Features06: React.FC<Features06Props> = ({ title, description, features }) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      sky: "bg-sky",
      earth: "bg-earth", 
      leaf: "bg-leaf",
      sun: "bg-sun"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.sky;
  };

  const getAccentColor = (color: string) => {
    const colorMap = {
      sky: "text-sky",
      earth: "text-earth",
      leaf: "text-leaf", 
      sun: "text-sun"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.sky;
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {/* First feature - spans 2 columns with fade animation */}
            <div className="flex flex-col lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-8 ring-1 ring-gray-200 dark:ring-gray-800 transition-all duration-500 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex items-center gap-x-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getColorClasses(features[0].color)} transition-transform duration-300 hover:scale-110`}>
                    <div className="text-white">
                      {features[0].icon}
                    </div>
                  </div>
                  <div>
                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                      {features[0].title}
                    </dt>
                    <dd className={`text-sm leading-6 ${getAccentColor(features[0].color)}`}>
                      {features[0].subtitle}
                    </dd>
                  </div>
                </div>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{features[0].description}</p>
                  
                  {features[0].features && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Services:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {features[0].features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${getColorClasses(features[0].color)}`}></div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Who Can Access:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{features[0].eligibility}</p>
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      to={features[0].link}
                      className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors duration-300 group"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </dd>
              </div>
            </div>

            {/* Second feature - single column with fade animation */}
            <div className="flex flex-col animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-8 ring-1 ring-gray-200 dark:ring-gray-800 h-full transition-all duration-500 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex items-center gap-x-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getColorClasses(features[1].color)} transition-transform duration-300 hover:scale-110`}>
                    <div className="text-white">
                      {features[1].icon}
                    </div>
                  </div>
                  <div>
                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                      {features[1].title}
                    </dt>
                    <dd className={`text-sm leading-6 ${getAccentColor(features[1].color)}`}>
                      {features[1].subtitle}
                    </dd>
                  </div>
                </div>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{features[1].description}</p>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Who Can Access:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{features[1].eligibility}</p>
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      to={features[1].link}
                      className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors duration-300 group"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </dd>
              </div>
            </div>

            {/* Third feature - single column with fade animation */}
            <div className="flex flex-col animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-8 ring-1 ring-gray-200 dark:ring-gray-800 h-full transition-all duration-500 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex items-center gap-x-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getColorClasses(features[2].color)} transition-transform duration-300 hover:scale-110`}>
                    <div className="text-white">
                      {features[2].icon}
                    </div>
                  </div>
                  <div>
                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                      {features[2].title}
                    </dt>
                    <dd className={`text-sm leading-6 ${getAccentColor(features[2].color)}`}>
                      {features[2].subtitle}
                    </dd>
                  </div>
                </div>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{features[2].description}</p>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Who Can Access:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{features[2].eligibility}</p>
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      to={features[2].link}
                      className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors duration-300 group"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </dd>
              </div>
            </div>

            {/* Fourth feature - spans 2 columns with fade animation */}
            <div className="flex flex-col lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-8 ring-1 ring-gray-200 dark:ring-gray-800 transition-all duration-500 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex items-center gap-x-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getColorClasses(features[3].color)} transition-transform duration-300 hover:scale-110`}>
                    <div className="text-white">
                      {features[3].icon}
                    </div>
                  </div>
                  <div>
                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                      {features[3].title}
                    </dt>
                    <dd className={`text-sm leading-6 ${getAccentColor(features[3].color)}`}>
                      {features[3].subtitle}
                    </dd>
                  </div>
                </div>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{features[3].description}</p>
                  
                  {features[3].features && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Services:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {features[3].features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${getColorClasses(features[3].color)}`}></div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Who Can Access:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{features[3].eligibility}</p>
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      to={features[3].link}
                      className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors duration-300 group"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Features06;