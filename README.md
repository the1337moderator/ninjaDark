# NinjaDark

A simple Chrome extension that inverts colors on NinjaRMM's web interface, creating a dark mode by flipping white/black and grayscale values.

## Features

- 🌙 Automatically inverts colors on `app.ninjarmm.com`
- 🎨 Preserves images and videos in original colors
- ⚡ Instant activation on page load
- 🎯 Only affects NinjaRMM domain

## Installation

### Load Unpacked (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the `ninjaDark` folder
6. Navigate to `https://app.ninjarmm.com` to see the dark mode in action

## How It Works

The extension uses CSS filters to invert all colors on the page:
- `filter: invert(100%)` - Flips white to black and vice versa
- `hue-rotate(180deg)` - Corrects color hues after inversion
- Double-inversion on images/videos to restore their original appearance

## Permissions

The extension only requires permission to read and modify content on `app.ninjarmm.com`. No other sites are affected.

## License

MIT License - See LICENSE file for details

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
