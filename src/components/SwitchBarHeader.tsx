import React from "react";

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
      <div className="main-mode-toggle">
        <button 
          className={`mode-btn ${!isCustomMode ? "active" : ""}`}
          onClick={() => onToggleCustomMode(false)}
        >
          Setups
        </button>
        <button 
          className={`mode-btn ${isCustomMode ? "active" : ""}`}
          onClick={() => onToggleCustomMode(true)}
        >
          Custom
        </button>
      </div>

      {isCustomMode && (
        <>
          <div className="divider" />
          <select 
            value={selectedMonitor} 
            onChange={(e) => onMonitorChange(parseInt(e.target.value, 10))}
            className="monitor-select"
          >
            {monitors.map((m) => (
              <option key={m.index} value={m.index}>{m.name}</option>
            ))}
          </select>
          <div className="mode-toggle">
            <button 
              className={`mode-btn ${mode === "wallpaper" ? "active" : ""}`}
              onClick={() => onModeChange("wallpaper")}
            >
              Wallpaper
            </button>
            <button 
              className={`mode-btn ${mode === "widgets" ? "active" : ""}`}
              onClick={() => onModeChange("widgets")}
            >
              Widgets
            </button>
          </div>
        </>
      )}
    </div>
  );
};
