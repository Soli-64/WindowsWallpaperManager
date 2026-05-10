import React from "react";

interface Setup {
  name: string;
  monitors: any[];
}

interface SetupGridProps {
  setups: Setup[];
  activeSetupName: string;
  onSetupSelect: (name: string) => void;
}

export const SetupGrid: React.FC<SetupGridProps> = ({ setups, activeSetupName, onSetupSelect }) => {
  return (
    <div className="setups-grid scroll-area">
      {setups.map((setup) => (
        <div
          key={setup.name}
          className={`setup-item ${activeSetupName === setup.name ? "active" : ""}`}
          onClick={() => onSetupSelect(setup.name)}
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
  );
};
