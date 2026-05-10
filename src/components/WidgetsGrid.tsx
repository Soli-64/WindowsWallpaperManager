import React from "react";
import { useDragScroll } from "../hooks/useDragScroll";

interface Widget {
  id: string;
  name: string;
}

interface WidgetsGridProps {
  allWidgets: Widget[];
  activeWidgets: string[];
  onWidgetToggle: (widgetId: string) => void;
}

export const WidgetsGrid: React.FC<WidgetsGridProps> = ({ allWidgets, activeWidgets, onWidgetToggle }) => {
  const { scrollRef, isDragging, scrollHandlers } = useDragScroll();

  return (
    <div 
      className="widgets-grid scroll-area"
      ref={scrollRef}
      {...scrollHandlers}
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
            onWidgetToggle(widget.id);
          }}
        >
          <span className="widget-name">{widget.name}</span>
        </div>
      ))}
    </div>
  );
};
