import React from 'react';
import { 

  Clock, 
  Shield, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Users,
  Award,
  Calendar,
  Star,
  HeartHandshake
} from 'lucide-react';

const WorkPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Exceptional Services, 
            <span className="block text-blue-200">Exceptional Results</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Delivering innovative solutions with precision, transparency, and unwavering commitment
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Our Vision Section */}
        <section className="mb-24 scroll-mt-20" id="vision">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 mb-4">
                <Target className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                We envision a future where every business interaction is transformed by technology that 
                not only solves problems but creates new opportunities for growth and connection.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Transformative Growth</h3>
                    <p className="text-gray-600">Empowering businesses to reach new heights through innovative solutions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Human-Centric Design</h3>
                    <p className="text-gray-600">Creating solutions that prioritize user experience and human needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Excellence Standard</h3>
                    <p className="text-gray-600">Setting new benchmarks for quality and innovation in our industry</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600 mb-2">2030</div>
                  <p className="text-gray-700 font-medium">Our target year to become the industry benchmark for innovation and reliability</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Completion Time */}
        <section className="mb-24 scroll-mt-20" id="timeline">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Service Completion Time</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We respect your time. Our efficient processes ensure timely delivery without compromising quality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Standard Projects", time: "2-4 Weeks", desc: "Complete end-to-end implementation", icon: "⚡" },
              { title: "Complex Solutions", time: "4-8 Weeks", desc: "Advanced custom development", icon: "🔧" },
              { title: "Ongoing Support", time: "24-48 Hours", desc: "Response time for critical issues", icon: "🛡️" },
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-3">{service.time}</div>
                <p className="text-gray-600">{service.desc}</p>
                <div className="mt-6">
                  <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                    View Details
                    <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Client Trust & Success */}
        <section className="mb-24 scroll-mt-20" id="trust">
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-2/3">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-8 w-8 text-blue-300" />
                  <h2 className="text-3xl font-bold">Building Unshakeable Trust</h2>
                </div>
                <p className="text-lg text-gray-300 mb-8">
                  Our clients' success is our greatest achievement. We build relationships that last, 
                  delivering consistent value and maintaining complete transparency every step of the way.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { value: "98%", label: "Client Retention" },
                    { value: "4.9/5", label: "Satisfaction Score" },
                    { value: "250+", label: "Happy Clients" },
                    { value: "99.9%", label: "Uptime Guarantee" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-blue-200 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <HeartHandshake className="h-6 w-6 text-green-400" />
                    <h3 className="font-bold text-xl">Our Promise</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Transparent Communication",
                      "Data Privacy Guaranteed",
                      "No Hidden Costs",
                      "24/7 Priority Support"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="scroll-mt-20" id="journey">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to industry leadership, our journey is a testament to innovation and dedication.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>

            {[
              { year: "2015", title: "Foundation", desc: "Started with a small team of passionate innovators", milestone: "First 10 clients" },
              { year: "2018", title: "Growth", desc: "Expanded services and international reach", milestone: "50+ projects delivered" },
              { year: "2020", title: "Innovation", desc: "Pioneered AI integration in our solutions", milestone: "Industry award winner" },
              { year: "2023", title: "Leadership", desc: "Recognized as industry leaders in innovation", milestone: "200+ team members" },
              { year: "Present", title: "Future", desc: "Shaping the next generation of technology", milestone: "Global expansion" },
            ].map((item, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 md:pr-12 md:pl-12 md:text-right flex justify-center md:justify-end">
                  {index % 2 === 0 ? (
                    <div className="w-full max-w-md">
                      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                        <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-3">{item.desc}</p>
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600">
                          <Star className="h-4 w-4" />
                          {item.milestone}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                
                <div className="flex items-center justify-center my-4 md:my-0">
                  <div className="relative z-10 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
                
                <div className="md:w-1/2 md:pl-12 md:pr-12 flex justify-center md:justify-start">
                  {index % 2 !== 0 ? (
                    <div className="w-full max-w-md">
                      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                        <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-3">{item.desc}</p>
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600">
                          <Star className="h-4 w-4" />
                          {item.milestone}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-24 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Begin Your Journey With Us?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have transformed their vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
                Start Your Project
              </button>
              <button className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg border border-blue-200 transition duration-300">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WorkPage;