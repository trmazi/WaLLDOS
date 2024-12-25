# WaLLDOS
 Portal-style wall display app that mimics the level display in Portal.

## Features

- Geo-location API for location data
- OpenWeatherMap API for weather data
- Volumio API for playback information
- Stores settings into a rolling cookie

## Usage

Use either the hosted GitHub Pages (no volumio!) or build and self-host with nginx.

#### GitHub Pages
You can use WaLLDOS via the publicly hosted URL https://walldos.iidxfan.xyz, though Volumio will **not** work unless it's HTTPS!
Repository: https://github.com/trmazi/WaLLDOS_pages

#### Install

`cd` to project's dir and run `npm install`

### Vite builds

#### Hot-reloads for development

```
npm run dev
```

#### Builds and minifies for production

```
npm run build
```

#### Serves recently built app

```
npm run preview
```

### Linting

#### Lint

```
npm run lint
```
