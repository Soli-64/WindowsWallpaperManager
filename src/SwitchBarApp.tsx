import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { emit } from "@tauri-apps/api/event";
import "./SwitchBarApp.css";

import { SwitchBarHeader } from "./components/SwitchBarHeader";
import { SetupGrid } from "./components/SetupGrid";
import { WallpaperCarousel } from "./components/WallpaperCarousel";
import { WidgetsGrid } from "./components/WidgetsGrid";

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
    await invoke("refresh_app");
  };

  const toggleCustomMode = async (enabled: boolean) => {
    setIsCustomMode(enabled);
    await invoke("set_custom_mode", { enabled });
  };

  return (
    <div onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }} className="switch-bar-container">
      <SwitchBarHeader 
        isCustomMode={isCustomMode}
        onToggleCustomMode={toggleCustomMode}
        selectedMonitor={selectedMonitor}
        onMonitorChange={setSelectedMonitor}
        monitors={monitors}
        mode={mode}
        onModeChange={setMode}
      />

      {!isCustomMode ? (
        <SetupGrid 
          setups={setups}
          activeSetupName={activeSetupName}
          onSetupSelect={handleSetupSelect}
        />
      ) : (
        <>
          {mode === "wallpaper" ? (
            <WallpaperCarousel 
              items={items}
              onWallpaperClick={handleWallpaperClick}
            />
          ) : (
            <WidgetsGrid 
              allWidgets={allWidgets}
              activeWidgets={activeWidgets}
              onWidgetToggle={handleWidgetToggle}
            />
          )}
        </>
      )}
    </div>
  );
}