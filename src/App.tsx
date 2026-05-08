import { useEffect, useState, useRef } from "react";
import { listen } from "@tauri-apps/api/event";
import { invoke, convertFileSrc } from "@tauri-apps/api/core";
import "./App.css";

interface Widget {
  id: string;
  name: string;
  html_file: string;
  html_content: string;
}

function WidgetComponent({ widget }: { widget: Widget }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Inject HTML (which now contains styles)
      containerRef.current.innerHTML = widget.html_content;

      // Execute scripts by re-creating them
      const scripts = containerRef.current.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) =>
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }
  }, [widget]);

  return <div ref={containerRef} className={`widget widget-${widget.id}`} />;
}

function App() {
  const [wallpaperPath, setWallpaperPath] = useState<string | null>(null);
  const [widgets, setWidgets] = useState<Widget[]>([]);

  const isVideo = (path: string) => {
    const ext = path.split('.').pop()?.toLowerCase();
    return ["mp4", "webm", "mov"].includes(ext || "");
  };

  useEffect(() => {
    // Get wallpaper
    invoke<string>("get_default_wallpaper").then((path) => {
      if (path) setWallpaperPath(path);
    });

    // Get widgets
    invoke<Widget[]>("get_widgets")
      .then((data) => {
        setWidgets(data);
      })
      .catch((err) => console.error("Failed to load widgets:", err));

    const setupListener = async () => {
      const unlistenWallpaper = await listen<string>("update-wallpaper", (event) => {
        console.log("New wallpaper:", event.payload);
        setWallpaperPath(event.payload);
      });

      const unlistenWidgets = await listen("update-widgets", () => {
        console.log("Widgets updated, reloading...");
        invoke<Widget[]>("get_widgets")
          .then((data) => {
            setWidgets(data);
          })
          .catch((err) => console.error("Failed to reload widgets:", err));
      });

      return () => {
        unlistenWallpaper();
        unlistenWidgets();
      };
    };

    const cleanup = setupListener();
    return () => {
      cleanup.then(unlisten => unlisten());
    };
  }, []);

  return (
    <main className="container">
      {wallpaperPath && (
        isVideo(wallpaperPath) ? (
          <video
            key={wallpaperPath}
            src={convertFileSrc(wallpaperPath)}
            autoPlay
            loop
            muted
            className="wallpaper-media"
          />
        ) : (
          <img
            key={wallpaperPath}
            src={convertFileSrc(wallpaperPath)}
            alt="Wallpaper"
            className="wallpaper-media"
          />
        )
      )}

      {/* Widgets Layer */}
      <div className="widgets-layer">
        {widgets.map((widget) => (
          <WidgetComponent key={widget.id} widget={widget} />
        ))}
      </div>
    </main>
  );
}

export default App;
