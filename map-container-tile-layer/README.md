<!-- ### React Leaflet MapContainer and Tile Layers -->

Welcome back! In today's post will be talking about how to use React with [React Leaflet](https://react-leaflet.js.org/) library to handle displaying maps in our applications.

The project I’ll be sharing today is a React TypeScript app set up with [Vite and Tailwind CSS](https://ui.shadcn.com/docs/installation/vite). It features a .......

Stay tuned for more posts in this series, where I’ll dive deeper into React components and share additional insights into my journey in web development!

#### Code

- First, install Chroma.js and its type definitions

```bash
npm install react@rc react-dom@rc leaflet react-leaflet
npm install -D @types/leaflet
```

- Configure leaftlet to display map container properly (import leaflet CSS and set a height and width to the container) 
```typescript
import "leaflet/dist/leaflet.css";

export type BrewerPaletteKey = keyof typeof brewer;
```

#### Use case: [cgis](https://cgis.up.railway.app/) styling feature for GeoJSON data

To create visually distinguishable colors for different geospatial datasets in my application, I utilized the component described above to generate color palettes, which are then applied to loaded GeoJSON files. In the near future, I plan to write a series of posts delving deeper into this implementation, exploring key concepts of web GIS and providing insights into the development process of my application.

![cgis_use_case](cgis_use_case.png)
Figure 2: Purple-Blue-Green palette applied to polygons of municipalities of Rio Grande do Sul, Brazil.

#### Summary

This post introduces a React component for selecting and previewing color palettes using the Chroma.js library and ShadCN UI components. The component includes a dropdown menu to select color palettes (leveraging Chroma.js's brewer palettes) and a color bar displaying the selected palette as badges.
