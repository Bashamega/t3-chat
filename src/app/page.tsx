"use client"
import React from 'react';
import { MessageCircle, Zap, Shield, Clock, ArrowRight, Star, Users, Cpu, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">T3 Chat</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <Button variant="gradient" size="default">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-blue-900/50 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            3x Faster Than ChatGPT
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Lightning-Fast</span><br />
            AI Chat Experience
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience AI conversations at unprecedented speed. T3 Chat delivers instant responses with superior accuracy, revolutionizing how you interact with artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg">
              Start Chatting Now
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">0.3s</div>
            <div className="text-gray-400">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">50M+</div>
            <div className="text-gray-400">Messages Sent</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">100K+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose T3 Chat?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Built from the ground up for speed, accuracy, and reliability. Experience the future of AI communication.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Lightning Speed</h3>
            <p className="text-gray-300 leading-relaxed">
              Get responses in under 0.5 seconds. Our optimized infrastructure ensures you never wait for answers.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-900/50 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Enterprise Security</h3>
            <p className="text-gray-300 leading-relaxed">
              Bank-grade encryption and privacy protection. Your conversations stay private and secure.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-900/50 rounded-xl flex items-center justify-center mb-6">
              <Cpu className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Advanced AI</h3>
            <p className="text-gray-300 leading-relaxed">
              Powered by cutting-edge language models fine-tuned for accuracy and contextual understanding.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-orange-900/50 rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">24/7 Availability</h3>
            <p className="text-gray-300 leading-relaxed">
              Always online, always ready. Access intelligent conversations whenever you need them.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-red-900/50 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Team Collaboration</h3>
            <p className="text-gray-300 leading-relaxed">
              Share conversations, collaborate on projects, and work together with powerful team features.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Multi-language</h3>
            <p className="text-gray-300 leading-relaxed">
              Communicate in over 100 languages with native-level fluency and cultural understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-gradient-to-r from-blue-800 to-purple-800 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">See The Difference</h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Compare T3 Chat with other AI assistants and experience the speed advantage.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-400 mb-4">Other AI Chats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg">
                    <span className="text-gray-300">Response Time</span>
                    <span className="text-red-400 font-semibold">2-5s</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg">
                    <span className="text-gray-300">Uptime</span>
                    <span className="text-red-400 font-semibold">95%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg">
                    <span className="text-gray-300">Context Length</span>
                    <span className="text-red-400 font-semibold">4K tokens</span>
                  </div>
                </div>
              </div>
              
              <div className="md:border-l md:border-r border-gray-600 px-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                  VS
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-4">T3 Chat</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg">
                    <span className="text-gray-300">Response Time</span>
                    <span className="text-green-400 font-semibold">0.3s</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg">
                    <span className="text-gray-300">Uptime</span>
                    <span className="text-green-400 font-semibold">99.9%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg">
                    <span className="text-gray-300">Context Length</span>
                    <span className="text-green-400 font-semibold">32K tokens</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Loved by Professionals</h2>
          <p className="text-xl text-gray-300">See what our users are saying about T3 Chat</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg shadow-gray-900/20">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              "The speed is incredible. I can't go back to slower AI assistants after using T3 Chat. It's transformed my workflow completely."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-900/50 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-400 font-semibold text-sm">SM</span>
              </div>
              <div>
                <div className="font-semibold text-white">Sarah Mitchell</div>
                <div className="text-gray-400 text-sm">Product Manager</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg shadow-gray-900/20">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              "Finally, an AI that keeps up with my thinking pace. The instant responses make brainstorming sessions so much more productive."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-400 font-semibold text-sm">JC</span>
              </div>
              <div>
                <div className="font-semibold text-white">James Chen</div>
                <div className="text-gray-400 text-sm">Software Engineer</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg shadow-gray-900/20">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              "The combination of speed and accuracy is unmatched. T3 Chat has become an essential tool for our entire team."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-900/50 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-400 font-semibold text-sm">AR</span>
              </div>
              <div>
                <div className="font-semibold text-white">Alex Rodriguez</div>
                <div className="text-gray-400 text-sm">Marketing Director</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-800 to-blue-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Experience Lightning-Fast AI?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've already made the switch to faster, smarter AI conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              Schedule Demo
            </Button>
          </div>
          <p className="text-blue-300 text-sm mt-4">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">T3 Chat</span>
              </div>
              <p className="text-gray-500 leading-relaxed">
                The fastest AI chat platform built for modern professionals and teams.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2025 T3 Chat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;