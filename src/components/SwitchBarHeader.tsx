import React from "react";
import { Image, LayoutGrid, Library, Sliders, Monitor } from "lucide-react";

interface MonitorInfo {
  index: number;
  name: string;
}

interface SwitchBarHeaderProps {
  isCustomMode: boolean;
  onToggleCustomMode: (enabled: boolean) => void;
  selectedMonitor: number;
  onMonitorChange: (index: number) => void;
  monitors: MonitorInfo[];
  mode: "wallpaper" | "widgets";
  onModeChange: (mode: "wallpaper" | "widgets") => void;
}

export const SwitchBarHeader: React.FC<SwitchBarHeaderProps> = ({
  isCustomMode,
  onToggleCustomMode,
  selectedMonitor,
  onMonitorChange,
  monitors,
  mode,
  onModeChange,
}) => {
  return (
    <div className="switch-bar-header">
      <div className="header-column monitors-column">
        <div className="column-header-icon">
          <Monitor size={16} />
        </div>
        {monitors.map((m) => (
          <button
            key={m.index}
            className={`mode-btn ${selectedMonitor === m.index ? "active" : ""}`}
            onClick={() => onMonitorChange(m.index)}
            title={`Monitor ${m.name.charAt(m.name.length - 1)}`}
          >
            <span className="monitor-num-only">{m.name.charAt(m.name.length - 1)}</span>
          </button>
        ))}
      </div>

      <div className="header-column toggles-column">
        <div className="main-mode-toggle">
          <button 
            className={`mode-btn ${!isCustomMode ? "active" : ""}`}
            onClick={() => onToggleCustomMode(false)}
            title="Setups"
          >
            <Library size={16} />
          </button>
          <button 
            className={`mode-btn ${isCustomMode ? "active" : ""}`}
            onClick={() => onToggleCustomMode(true)}
            title="Custom"
          >
            <Sliders size={16} />
          </button>
        </div>

        {isCustomMode && (
          <div className="mode-toggle">
            <button 
              className={`mode-btn ${mode === "wallpaper" ? "active" : ""}`}
              onClick={() => onModeChange("wallpaper")}
              title="Wallpaper"
            >
              <Image size={16} />
            </button>
            <button 
              className={`mode-btn ${mode === "widgets" ? "active" : ""}`}
              onClick={() => onModeChange("widgets")}
              title="Widgets"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
