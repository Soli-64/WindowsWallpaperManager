# WinWallpaper

A powerful, native Windows wallpaper manager built with **Tauri v2** and **React**. WinWallpaper turns your desktop into a dynamic canvas, supporting high-performance video backgrounds, custom HTML widgets, and multi-monitor configurations with a sleek, modern interface.

## ✨ Features

- **Dual-Mode System**:
  - **Setup Mode**: Apply predefined, static configurations across all your monitors with one click.
  - **Custom Mode**: Manually fine-tune wallpapers and widgets for each monitor individually.
- **Dynamic Media Support**: Seamlessly set images (JPG, PNG) or high-quality videos (MP4, WebM) as your desktop background.
- **HTML Widgets**: Overlay custom HTML/CSS/JS widgets (clocks, weather, system monitors) directly on your wallpaper. Supports **Live Reloading**—edits to your widget files appear instantly!
- **Multi-Monitor Optimized**: Automatically detects all displays and creates independent, synchronized background layers for each.
- **Sleek Control Bar**: A "Switch Bar" interface accessible via global shortcut, featuring a modern design with horizontal drag-scroll navigation.
- **System Tray Integration**: Persistent access to app controls, setup switching, and quick actions via the Windows system tray.
- **Global Shortcuts**: Toggle the management interface instantly (Default: `Alt + W`, fully configurable).
- **Performance First**: Built with **Rust** and **React** for minimal resource usage and maximum responsiveness.

## 🎮 Operational Modes

WinWallpaper operates in two distinct modes to give you both consistency and flexibility:

- **Setup Mode (Presets)**:
  - Select from a list of predefined "Setups" that apply specific wallpapers and widgets across all your monitors simultaneously.
  - Ideal for quickly switching between "Work," "Gaming," or "Minimal" desktop environments.
  - Setups are static—changing your settings while in this mode won't overwrite the preset unless you explicitly save it.

- **Custom Mode (Manual)**:
  - Allows you to manually change the wallpaper and toggle widgets for each monitor individually.
  - This mode uses a dedicated "Custom" configuration, acting as a sandbox for your manual adjustments.
  - When you switch from a Setup to Custom mode, your current setup is copied over as a starting point, allowing you to tweak it without affecting the original preset.

## 🚀 Getting Started

### Prerequisites

- **Rust**: Latest stable version.
- **Node.js**: v18 or newer.
- **FFmpeg**: Required for video thumbnail generation (must be in your system `PATH`).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Soli-64/WinWallpaper.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development & Build

Run in development mode:
```bash
npm run tauri dev
```

Create a production build:
```bash
npm run tauri build
```

## 📂 Configuration & Storage

WinWallpaper keeps its data organized in your **Documents** folder under `win-wallpaper/`:

- `/wallpapers`: Place your image and video files here.
- `/widgets`: Store your custom HTML widget files here.
- `/thumbnails`: Automatically managed cache for media previews.
- `config.json`: Stores your global settings, keyboard shortcuts, and saved setups.
- `widgets.json`: Defines the metadata for your available widgets.

## 🛠️ Widgets System

WinWallpaper widgets are standard web pages. You can build anything using HTML, CSS, and JavaScript.

1. Create a `.html` file in the `widgets/` folder.
2. Register it in `widgets.json`:
   ```json
   [
     {
       "id": "my-clock",
       "name": "Minimal Clock",
       "html_file": "clock.html"
     }
   ]
   ```
3. Use the **Custom Mode** in the Switch Bar to toggle the widget on any of your monitors.

*Check out our [Clock Widget Example](examples/widget/clock.html) to get started!*

## ⌨️ Shortcuts

- **Toggle Switch Bar**: `Alt + W` (Default)
- **Cycle Setup**: Accessible via System Tray
- **Custom Shortcuts**: Define your own keys in `config.json`.

## 📸 Screenshots

![Switch Bar Interface](docs/media/screenshot_1.png)

## ⚠️ Known Issues

- **Launch on Startup**: The automatic startup hook may require administrative permissions or manual activation in the Windows Startup settings depending on your environment.
- **Video Thumbnails**: If video previews don't appear, ensure FFmpeg is correctly installed and accessible in your terminal.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💖 Support the Project

If WinWallpaper makes your desktop better, consider supporting its development!

- **BTC**: `19CdK5s3ALPcxjNxGiqM7pDZJ2AvY1SPcw`
- **SOL**: `9q1pTozYZRHEuYn5eMBcNGj5BvHXCRPCyzhwVhNqazN1`
- **ETH** (BASE): `0xDE23577a8f54E5e8EEF5eaf85438709a8178e897`