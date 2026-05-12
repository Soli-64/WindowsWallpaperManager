import React from 'react';
import { 
  Monitor, 
  Video, 
  Image as ImageIcon, 
  Zap, 
  Keyboard, 
  Download,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  Atom,
  Code,
  Settings2,
  RefreshCw,
  Layout,
  MousePointer2,
  Library
} from 'lucide-react';

const GitHub = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    stroke="none"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="glass p-6 rounded-2xl border border-white/10 hover:border-primary-400/50 transition-all duration-300 group">
    <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
      <Icon className="w-6 h-6 text-primary-400" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-slate-950 text-slate-200 selection:bg-primary-500/30 selection:text-primary-200">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight text-white">WinWallpaper</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-primary-400 transition-colors">Features</a>
            <a href="#modes" className="hover:text-primary-400 transition-colors">Modes</a>
            <a href="#widgets" className="hover:text-primary-400 transition-colors">Widgets</a>
            <a href="#showcase" className="hover:text-primary-400 transition-colors">Showcase</a>
            <div className="flex items-center gap-3">
              <a href="https://github.com/Soli-64/WinWallpaper/releases" className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary-900/20 text-sm">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
              <a href="https://github.com/Soli-64/WinWallpaper" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all text-sm font-medium">
                <GitHub className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary-500/10 blur-[120px] rounded-full opacity-30 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 px-3 py-1 rounded-full text-xs font-bold text-primary-400 mb-6 uppercase tracking-wider">
                <Zap className="w-3 h-3" />
                Powered by Tauri v2
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight animate-slide-up">
                Your Desktop, <br />
                <span className="text-gradient">Redefined.</span>
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                WinWallpaper is a powerful, native Windows wallpaper manager. 
                Experience seamless multi-monitor video backgrounds, live HTML widgets, and instant mode switching with zero compromise on performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <a href="https://github.com/Soli-64/WinWallpaper/releases" className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary-900/20">
                  <Download className="w-5 h-5" />
                  Download Now
                </a>
                <a href="#features" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold border border-white/10 transition-all">
                  Explore Features
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="relative z-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative glass p-2 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://raw.githubusercontent.com/Soli-64/WinWallpaper/main/docs/media/screenshot_1.png" 
                  alt="WinWallpaper Demo" 
                  className="rounded-xl w-full object-cover aspect-video animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/20 blur-3xl rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 relative bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">Unmatched Performance</h2>
              <p className="text-slate-400">Built with Rust and React for a lightweight yet powerful experience.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={Monitor}
                title="Multi-Monitor Mastery"
                description="Independent background layers for every display, automatically detected and synchronized."
              />
              <FeatureCard 
                icon={Video}
                title="Dynamic Media"
                description="High-performance support for 4K video (MP4, WebM) and high-res images."
              />
              <FeatureCard 
                icon={Code}
                title="HTML Widgets"
                description="Overlay clocks, weather, or system monitors using standard web technologies."
              />
              <FeatureCard 
                icon={Settings2}
                title="Dual-Mode System"
                description="Switch between global Setups and per-monitor Custom adjustments instantly."
              />
              <FeatureCard 
                icon={Layout}
                title="System Tray"
                description="Quick access to setups and controls right from your Windows taskbar."
              />
              <FeatureCard 
                icon={Keyboard}
                title="Global Shortcuts"
                description="Fully configurable shortcuts to toggle your workspace without losing focus."
              />
            </div>
          </div>
        </section>

        {/* Modes Section */}
        <section id="modes" className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="glass p-6 rounded-3xl border border-white/5 shadow-2xl relative">
                  <div className="absolute -top-4 -left-4 bg-primary-600 px-4 py-2 rounded-lg text-sm font-bold shadow-xl">Preset Power</div>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center shrink-0">
                        <Library className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">Setup Mode</h4>
                        <p className="text-sm text-slate-400">One-click environments. Apply a unified look across all monitors for work, gaming, or relaxation.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center shrink-0">
                        <MousePointer2 className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">Custom Mode</h4>
                        <p className="text-sm text-slate-400">Complete freedom. Fine-tune wallpapers and widgets for each monitor individually.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">A Mode for Every <span className="text-gradient">Moment</span></h2>
                <p className="text-lg text-slate-400 mb-8">
                  Whether you want a consistent theme across three monitors or a specific widget on just one, WinWallpaper adapts to your needs.
                </p>
                <div className="space-y-4">
                  {[
                    "Static presets that won't change unless you want them to",
                    "Sandbox adjustments in Custom mode",
                    "Seamless transition between modes"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-primary-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Widgets Section */}
        <section id="widgets" className="py-24 px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">The Web is Your <span className="text-gradient">Widget</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Build your own widgets using HTML, CSS, and JS. With <strong>Live Reloading</strong>, your changes appear instantly on your desktop as you code.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-3xl border border-white/5 hover:border-primary-500/30 transition-all">
                <RefreshCw className="w-10 h-10 text-primary-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Live Reloading</h3>
                <p className="text-slate-400 text-sm">No more restarting. Edit your widget code and watch your desktop update in real-time.</p>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5 hover:border-primary-500/30 transition-all">
                <ImageIcon className="w-10 h-10 text-indigo-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Any Framework</h3>
                <p className="text-slate-400 text-sm">Use React, Vue, or just vanilla JS. If a browser can render it, WinWallpaper can display it.</p>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5 hover:border-primary-500/30 transition-all">
                <Cpu className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Low Overhead</h3>
                <p className="text-slate-400 text-sm">Optimized webview rendering ensures your widgets don't eat your FPS while gaming.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section id="showcase" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Seamless Desktop Integration</h2>
                <ul className="space-y-4">
                  {[
                    "Native Windows integration via Tauri v2",
                    "Supports high-resolution 4K media with low overhead",
                    "Minimal CPU & RAM usage even with video wallpapers",
                    "Automatic file discovery in your Documents folder"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-primary-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass p-4 rounded-3xl border border-white/5 shadow-2xl">
                <img 
                  src="https://raw.githubusercontent.com/Soli-64/WinWallpaper/main/docs/media/present_1.gif" 
                  alt="Interface Demo" 
                  className="rounded-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-xl font-bold text-slate-500 uppercase tracking-[0.2em] mb-12">Built with modern tech</h2>
            <div className="flex flex-wrap justify-center gap-12 opacity-60">
              <div className="flex items-center gap-2">
                <Cpu className="w-8 h-8 hover:text-orange-400 transition-all duration-500" />
                <span className="text-2xl font-bold">Rust</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-8 h-8 hover:text-purple-400 transition-all duration-500" />
                <span className="text-2xl font-bold">Tauri v2</span>
              </div>
              <div className="flex items-center gap-2">
                <Atom className="w-8 h-8 hover:text-blue-400 transition-all duration-500" />
                <span className="text-2xl font-bold">React</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-8 h-8 hover:text-yellow-300 transition-all duration-500" />
                <span className="text-2xl font-bold">Vite</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 glass">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-xl text-white">WinWallpaper</span>
            <p className="text-slate-500 text-sm">
              © 2026 WinWallpaper Manager. Released under the MIT License.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/Soli-64/WinWallpaper" className="text-slate-400 hover:text-white transition-colors">
              <GitHub className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

