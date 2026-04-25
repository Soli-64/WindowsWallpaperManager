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
  Atom
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
            <a href="#showcase" className="hover:text-primary-400 transition-colors">Showcase</a>
            <a href="https://github.com/Soli-64/WinWallpaper" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all">
              <GitHub className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary-500/10 blur-[120px] rounded-full opacity-30 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="z-10 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight animate-slide-up">
                Switch Wallpapers <br />
                <span className="text-gradient">In a Click</span>
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                A native Windows wallpaper manager built with Tauri and React. 
                Experience seamless multi-monitor support for images and video wallpapers with minimal performance overhead.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <a href="https://github.com/Soli-64/WinWallpaper/releases" className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary-900/20">
                  <Download className="w-5 h-5" />
                  Download Now
                </a>
                <a href="#showcase" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold border border-white/10 transition-all">
                  Watch Demo
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="relative z-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative glass p-2 rounded-2xl overflow-hidden shadow-2xl">
                {/* <img 
                  src="/assets/hero.png" 
                  alt="WinWallpaper Demo" 
                  className="rounded-xl w-full object-cover aspect-video animate-float"
                /> */}
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
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">Powerful Features</h2>
              <p className="text-slate-400">Everything you need for a stunning desktop experience.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={Monitor}
                title="Multi-Monitor Support"
                description="Automatically detects active monitors and displays selected wallpaper."
              />
              <FeatureCard 
                icon={Video}
                title="Video Wallpapers"
                description="Enjoy smooth video playback (MP4, WebM) as your background."
              />
              <FeatureCard 
                icon={Keyboard}
                title="Global Shortcuts"
                description="Instantly toggle the selection interface with Alt + W without leaving your current workspace."
              />
              <FeatureCard 
                icon={Zap}
                title="Tauri v2 Performance"
                description="Built on Rust for fast execution and minimal system resources footprint."
              />
              <FeatureCard 
                icon={Layers}
                title="Thumbnail Cache"
                description="Automatically generates thumbnails for your entire media library using FFmpeg."
              />
              <FeatureCard 
                icon={ImageIcon}
                title="Session Persistence"
                description="Your session stays exactly how you left it. Wallpapers are automatically reloaded on startup."
              />
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section id="showcase" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Seamless Desktop Integration</h2>
                <ul className="space-y-4 pl-10">
                  {[
                    // "",
                    "Native Windows integration",
                    "Supports high-resolution 4K media",
                    "Minimal CPU & RAM usage",
                    "Automatic file discovery"
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
                  src="/assets/present_1.gif" 
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
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm">
            © 2026 WinWallpaper Manager. Released under the MIT License.
          </p>
          <div className="flex gap-6">
            <a href="https://github.com/Soli-64/WinWallpaper" className="text-slate-400 hover:text-white transition-colors">
              <GitHub className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
