import { useEffect, useState, useRef } from "react";
import { invoke, convertFileSrc } from "@tauri-apps/api/core";
import { emit } from "@tauri-apps/api/event";
import "./SwitchBarApp.css";

interface CarouselItem {
  name: string;
  path: string;
  thumb_path: string;
  is_video: boolean;
}

interface MonitorInfo {
  index: number;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

interface Widget {
  id: string;
  name: string;
  html_file: string;
  html_content: string;
}

interface Setup {
  name: string;
  monitors: any[];
}

type Mode = "wallpaper" | "widgets";

export default function SwitchBarApp() {
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [monitors, setMonitors] = useState<MonitorInfo[]>([]);
  const [selectedMonitor, setSelectedMonitor] = useState<number>(1);
  const [mode, setMode] = useState<Mode>("wallpaper");
  const [isCustomMode, setIsCustomMode] = useState<boolean>(true);
  const [setups, setSetups] = useState<Setup[]>([]);
  const [activeSetupName, setActiveSetupName] = useState<string>("");
  const [activeWidgets, setActiveWidgets] = useState<string[]>([]);
  const [allWidgets, setAllWidgets] = useState<Widget[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    window.focus();
    
    invoke<CarouselItem[]>("get_wallpapers").then((data) => {
      setItems(data);
    }).catch((err) => {
      console.error("Failed to fetch wallpapers", err);
    });

    invoke<MonitorInfo[]>("get_monitors").then((data) => {
      setMonitors(data);
      if (data.length > 0) {
        setSelectedMonitor(data[0].index);
      }
    }).catch((err) => {
      console.error("Failed to fetch monitors", err);
    });

    invoke<Widget[]>("get_widgets").then((data) => {
      setAllWidgets(data);
    }).catch((err) => {
      console.error("Failed to fetch widgets", err);
    });

    invoke<boolean>("get_custom_mode").then((val) => {
      setIsCustomMode(val);
    });

    invoke<Setup[]>("get_setups").then((data) => {
      setSetups(data);
    });

    invoke<any>("get_active_setup").then((data) => {
      if (data) setActiveSetupName(data.name);
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCustomMode && mode === "wallpaper" && scrollRef.current) {
        if (e.key === 'ArrowRight') {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
          scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mode, isCustomMode]);

  useEffect(() => {
    invoke<string[]>(`get_monitor_widgets`, { monitorIndex: selectedMonitor }).then((active) => {
      setActiveWidgets(active || []);
    }).catch((err) => {
      console.error("Failed to fetch active widgets:", err);
    });
  }, [selectedMonitor]);

  const handleWallpaperClick = async (item: CarouselItem) => {
    await emit(`update-monitor-${selectedMonitor}`, item.path);
    await invoke("set_monitor_wallpaper", { monitorIndex: selectedMonitor, path: item.path });
  };

  const handleWidgetToggle = async (widgetId: string) => {
    let newActiveWidgets: string[];
    if (activeWidgets.includes(widgetId)) {
      newActiveWidgets = activeWidgets.filter(id => id !== widgetId);
    } else {
      newActiveWidgets = [...activeWidgets, widgetId];
    }
    setActiveWidgets(newActiveWidgets);
    await invoke("set_monitor_widgets", { monitorIndex: selectedMonitor, widgets: newActiveWidgets });
    await emit("update-widgets", {});
  };

  const handleSetupSelect = async (name: string) => {
    setActiveSetupName(name);
    await invoke("set_active_setup", { name });
    setIsCustomMode(false);
    await invoke("set_custom_mode", { enabled: false });
    // Trigger refresh
    await invoke("refresh_app");
  };

  const toggleCustomMode = async (enabled: boolean) => {
    setIsCustomMode(enabled);
    await invoke("set_custom_mode", { enabled });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    setIsDragging(false);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeftState(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return;
    e.preventDefault();
    if (scrollRef.current) {
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollRef.current.scrollLeft = scrollLeftState - walk;
      
      if (Math.abs(walk) > 5) {
        setIsDragging(true);
      }
    }
  };

  return (
    <div onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }} className="switch-bar-container">
      <div className="switch-bar-header">
        <div className="main-mode-toggle">
          <button 
            className={`mode-btn ${!isCustomMode ? "active" : ""}`}
            onClick={() => toggleCustomMode(false)}
          >
            Setups
          </button>
          <button 
            className={`mode-btn ${isCustomMode ? "active" : ""}`}
            onClick={() => toggleCustomMode(true)}
          >
            Custom
          </button>
        </div>

        {isCustomMode && (
          <>
            <div className="divider" />
            <select 
              value={selectedMonitor} 
              onChange={(e) => setSelectedMonitor(parseInt(e.target.value, 10))}
              className="monitor-select"
            >
              {monitors.map((m) => (
                <option key={m.index} value={m.index}>{m.name}</option>
              ))}
            </select>
            <div className="mode-toggle">
              <button 
                className={`mode-btn ${mode === "wallpaper" ? "active" : ""}`}
                onClick={() => setMode("wallpaper")}
              >
                Wallpaper
              </button>
              <button 
                className={`mode-btn ${mode === "widgets" ? "active" : ""}`}
                onClick={() => setMode("widgets")}
              >
                Widgets
              </button>
            </div>
          </>
        )}
      </div>

      {!isCustomMode ? (
        <div className="setups-grid scroll-area">
          {setups.map((setup) => (
            <div
              key={setup.name}
              className={`setup-item ${activeSetupName === setup.name ? "active" : ""}`}
              onClick={() => handleSetupSelect(setup.name)}
            >
              <div className="setup-icon">
                <svg viewBox="0 0 24 24" width="48" height="48">
                  <path fill="currentColor" d="M20,18H4V6H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                </svg>
              </div>
              <span className="setup-name">{setup.name}</span>
              <span className="setup-info">{setup.monitors.length} Monitors</span>
            </div>
          ))}
        </div>
      ) : (
        <>
          {mode === "wallpaper" ? (
            <div 
              className="scroll-area" 
              ref={scrollRef} 
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <div className="carousel">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="carousel-item"
                    onClick={(e) => {
                      if (isDragging) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      handleWallpaperClick(item);
                    }}
                  >
                    <img 
                      src={convertFileSrc(item.thumb_path)} 
                      alt={item.name} 
                      className="thumbnail-img"
                      draggable={false}
                    />
                    {item.is_video && (
                      <div className="video-overlay">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="white" opacity="0.8">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div 
              className="widgets-grid scroll-area"
              ref={scrollRef}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {allWidgets.map((widget) => (
                <div
                  key={widget.id}
                  className={`widget-item ${activeWidgets.includes(widget.id) ? "active" : ""}`}
                  onClick={(e) => {
                    if (isDragging) {
                      e.preventDefault();
                      e.stopPropagation();
                      return;
                    }
                    handleWidgetToggle(widget.id);
                  }}
                >
                  <span className="widget-name">{widget.name}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}