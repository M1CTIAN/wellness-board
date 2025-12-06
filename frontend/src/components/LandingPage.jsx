import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.h1 
                variants={fadeInUp}
                className="font-serif text-6xl md:text-7xl lg:text-8xl font-medium leading-tight tracking-tight mb-8 text-stone-900"
              >
                Find your <br />
                <span className="italic text-stone-500">inner balance.</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-stone-600 mb-10 max-w-lg leading-relaxed font-light"
              >
                A personalized wellness companion that adapts to your life. 
                Science-backed insights for mind, body, and spirit.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link 
                  to="/start" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-stone-900 rounded-full hover:bg-stone-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-stone-200"
                >
                  Start your journey
                </Link>
                <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-stone-900 bg-white border border-stone-200 rounded-full hover:bg-stone-50 transition-all duration-300">
                  Learn more
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column - Hero Visual */}
            <div className="relative hidden lg:block h-150 w-full perspective-1000">
              {/* Abstract Organic Background for the visual */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-50/80 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
              
              {/* Floating Elements Container */}
              <div className="relative w-full h-full">
                
                {/* Element 1: Main Insight Card (Center) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white/80 backdrop-blur-xl rounded-4xl p-8 shadow-2xl shadow-stone-200/50 border border-white/60 animate-float-slow z-20"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-bold tracking-widest text-stone-400 uppercase">Daily Insight</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
                    </div>
                  </div>
                  <h3 className="font-serif text-3xl text-stone-800 mb-3">Morning Calm</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6 font-light">Your energy is steady today. A perfect time for creative work.</p>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-1.5 flex-1 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-stone-800 rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium text-stone-400">75%</span>
                  </div>
                </motion.div>

                {/* Element 2: Sleep Pill (Top Right) */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="absolute top-[25%] right-[5%] bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg shadow-stone-100/50 border border-white/40 animate-float-delayed z-10 flex items-center gap-4"
                >
                  <span className="text-2xl grayscale opacity-80">🌙</span>
                  <div>
                    <div className="text-xs text-stone-400 font-medium uppercase tracking-wider">Sleep Score</div>
                    <div className="text-base font-serif text-stone-700">Excellent</div>
                  </div>
                </motion.div>

                {/* Element 3: Meditation Pill (Bottom Left) */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                  className="absolute bottom-[25%] left-[0%] bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg shadow-stone-100/50 border border-white/40 animate-float z-30 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 font-medium uppercase tracking-wider">Up Next</div>
                    <div className="text-base font-serif text-stone-700">Focus Flow</div>
                  </div>
                </motion.div>

                {/* Element 4: Decorative Blur */}
                 <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 2 }}
                  className="absolute top-[15%] left-[15%] w-32 h-32 bg-orange-100/40 rounded-full blur-2xl mix-blend-multiply animate-blob"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-160 h-160 bg-indigo-300/20 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
          <div className="absolute top-[20%] right-[20%] w-140 h-140 bg-purple-300/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-180 h-180 bg-pink-300/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { step: "01", title: "Share your goals", desc: "Tell us what matters—sleep, energy, or mindfulness." },
              { step: "02", title: "Get insights", desc: "Receive daily, bite-sized tips tailored to your rhythm." },
              { step: "03", title: "Grow daily", desc: "Build lasting habits with gentle nudges." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="group relative p-8 rounded-3xl bg-stone-50/50 hover:bg-white hover:shadow-xl hover:shadow-stone-100/50 transition-all duration-500"
              >
                <div className="absolute top-8 right-8 font-serif text-6xl text-stone-100 group-hover:text-indigo-100 transition-colors duration-500 select-none">{item.step}</div>
                <div className="relative z-10 pt-12">
                  <h3 className="text-2xl font-medium text-stone-900 mb-4">{item.title}</h3>
                  <p className="text-stone-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Value Prop */}
      <section className="py-32 bg-stone-50 relative overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-160 h-160 bg-indigo-100/40 rounded-full blur-3xl mix-blend-multiply animate-blob opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-5xl md:text-6xl mb-8 text-stone-900 leading-tight">
                Intelligence that <br /> feels human.
              </h2>
              <p className="text-xl text-stone-600 mb-10 leading-relaxed font-light">
                Our AI learns gently over time, adapting to your rhythm rather than forcing a new one. It understands that some days are for pushing, and others are for pausing.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Adapts to your rhythm', desc: 'Learns from your energy levels and mood.' },
                  { title: 'Privacy-first design', desc: 'Your data stays yours. Always.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0"></div>
                    <div>
                      <h4 className="text-stone-900 font-medium mb-1">{item.title}</h4>
                      <p className="text-stone-500 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-5xl bg-white shadow-2xl shadow-stone-200/50 p-10 flex flex-col justify-center items-center text-center relative overflow-hidden border border-stone-100">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-50/30 to-stone-50/30"></div>
                <div className="relative z-10 w-full max-w-xs">
                  <div className="w-24 h-24 bg-white rounded-3xl shadow-sm flex items-center justify-center text-5xl mb-8 mx-auto animate-float">
                    ✨
                  </div>
                  <p className="text-2xl font-serif text-stone-900 mb-3">"Take it slow today."</p>
                  <p className="text-stone-500 font-light">Your sleep quality was lower than usual. Let's focus on restoration.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Holistic well-being.</h2>
            <p className="text-xl text-stone-500 font-light">Everything you need to nurture your mind and body.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🌙", title: "Sleep Better", desc: "Rituals to help you wind down." },
              { icon: "🥗", title: "Eat Mindfully", desc: "Nourishment, not restriction." },
              { icon: "🧘", title: "Reduce Stress", desc: "Micro-meditations for any moment." },
              { icon: "⚡", title: "Boost Energy", desc: "Sustain your vitality naturally." },
              { icon: "🧠", title: "Mental Clarity", desc: "Clear brain fog and find focus." },
              { icon: "💪", title: "Move More", desc: "Gentle movement for every level." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-stone-50 hover:bg-white hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500 border border-transparent hover:border-stone-100 group"
              >
                <div className="text-4xl mb-6 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">{feature.icon}</div>
                <h3 className="text-xl font-medium text-stone-900 mb-3">{feature.title}</h3>
                <p className="text-stone-500 leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Credibility - Editorial Style */}
      <section className="py-32 bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 text-stone-900 leading-tight">
                Quietly empowering <br />
                <span className="italic text-stone-500">50,000+ lives.</span>
              </h2>
              <p className="text-lg text-stone-600 font-light leading-relaxed mb-8">
                "This app doesn't shout at you. It whispers. It's the first wellness tool that actually feels like it's on my side, helping me find balance in a chaotic world."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" />
                </div>
                <div>
                  <div className="font-medium text-stone-900">Sarah J.</div>
                  <div className="text-sm text-stone-500">Member since 2023</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { stat: "2M+", label: "Mindful Moments" },
                { stat: "4.9", label: "App Store Rating" },
                { stat: "150+", label: "Expert Guides" },
                { stat: "92%", label: "Feel Calmer" }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                  <div className="font-serif text-4xl text-stone-900 mb-2">{item.stat}</div>
                  <div className="text-sm text-stone-500 uppercase tracking-wider font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Emotional & Clean */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-5xl md:text-7xl mb-8 text-stone-900 tracking-tight">
            Find your rhythm.
          </h2>
          <p className="text-xl text-stone-500 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Start your journey to a more balanced life today. No pressure, just progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/start" 
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-medium text-white bg-stone-900 rounded-full hover:bg-stone-800 transition-all duration-300 hover:scale-105 shadow-xl shadow-stone-200"
            >
              Start for free
            </Link>
          </div>
          <p className="mt-8 text-sm text-stone-400">No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer - Minimal Editorial */}
      <footer className="bg-white py-12 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-stone-900"></div>
            <span className="font-serif text-xl font-medium text-stone-900 tracking-tight">Wellness Board</span>
          </div>
          <div className="flex gap-8 text-stone-500 text-sm font-medium">
            <a href="#" className="hover:text-stone-900 transition-colors">Manifesto</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Contact</a>
          </div>
          <div className="text-stone-400 text-sm">
            © 2025
          </div>
        </div>
      </footer>
    </div>
  );
}
