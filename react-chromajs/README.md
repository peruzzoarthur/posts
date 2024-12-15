### React Chromajs Select Menu

Finally I've decided to put in practice my blog project and share my work within the community. This is the first post of some series of blog posts I'm going to be sharing in this page for the next times to come.

My first series will be about React components I've been building in my projects.
One of the ideas behind of components is to make them reusable within parts of the same app, and even more than one application. Today, I'm gonna be sharing a select menu for color palette picking, integrating Chroma.js library with shadcn elements and react state.

Colors are truly amazing for styling our components. But they are also quite dangerous, in a sense that, harmony between the choosen colors is a very sensitive issue.

For that, that are lots of already built in tools, in the components libraries themselves (shadcn has a very straight forward way to colorize their components) and also external projects and libraries.
Most usually, if I need to get creative with colors, I use [colorhunt](https://colorhunt.co/) to play around with some color styles in my application. But in a recent project, while working with react-leaflet and maps, I came across the need for color palettes consisting of more than the four colored ones colorhunt offers. As I'm a developer and not a designer it was a struggle for me combining more palettes together (cheers out for all designers that make styling much more straightforward for us developers).

So, as said before, I needed color palettes with more colors... I did some research and found [Chroma.js](https://www.npmjs.com/package/chroma-js) library. This is an amazing library for working with colors, and have many utility functions within it, for many use cases. If you're interesed in this topic, I think it's worthy taking a look on it's [docs](https://www.vis4.net/Chroma.js/).

While taking a read on the documentation, I found `chroma.brewer`, a color palette generator, that uses [ColorBrewer Palettes](https://colorbrewer2.org/), an external service very common for Geographic Information System ([GIS](https://en.wikipedia.org/wiki/Geographic_information_system)) specialists for helping creating maps, and also a perfect fit for my use case (you can check some examples in the end of this post).

The code I'll be sharing is a React Typescript project [set up with Vite & shadcn/ui.](https://ui.shadcn.com/docs/installation/vite) which consists of a reusable [Card](https://ui.shadcn.com/docs/components/card) with a [Select](https://ui.shadcn.com/docs/components/select) menu, and a row of [Badges](https://ui.shadcn.com/docs/components/badge) for inspecting the colors of the palette, and saving the array of colors in a react state to be used elsewere.

#### Code

- First, install Chroma.js and its type definitions

```bash
npm install chroma-js
npm install -D @types/chroma-js
```

- Install shadcn/ui components

```bash
npx shadcn@latest add badge button card select
```

- Define type for brewer palettes

```typescript
export type BrewerPaletteKey = keyof typeof brewer;
```

For being able to ensure that we are getting the right objects from the helper function, we need to get the keys from the type defined for <code>brewer</code>.
<code>keyof</code> will get the keys from <code>typeof</code>, the type that corresponds from the helper function.

- Create a select menu at src/components/ChromaSelectMenu.tsx

```typescript
import { brewer } from "chroma-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { BrewerPaletteKey } from "./ChromaCard";

type ChromaSelectMenuProps = {
  brewerPalette: BrewerPaletteKey | undefined;
  setBrewerPalette: React.Dispatch<
    React.SetStateAction<BrewerPaletteKey | undefined>
  >;
};

export const ChromaSelectMenu = ({
  brewerPalette,
  setBrewerPalette,
}: ChromaSelectMenuProps) => {
  return (
    <Select
      defaultValue={brewerPalette}
      onValueChange={(value) => setBrewerPalette(value as BrewerPaletteKey)}
    >
      <SelectTrigger className="w-auto">
        <SelectValue placeholder={brewerPalette || "Select palette"} />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(brewer).map((palette) => (
          <SelectItem key={palette} value={palette}>
            {palette}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
```

<code>ChromaSelectMenu</code> component is a dropdown menu built with the <code>Select</code> component, which allows users to choose a color palette from the <code>brewer</code> object. The <code>defaultValue</code> prop sets the initial selected palette using <code>brewerPalette</code> state, and the <code>onValueChange</code> handler updates <code>brewerPalette</code> when the user select a new item, ensuring type safety by casting the value to <code>BrewerPaletteKey</code>. The options for the menu are dynamically generated using <code>Object.keys(brewer)</code>, which retrieves all the palette names (keys) from the <code>brewer</code> object and maps them to <code>SelectItem</code> components.

- Create colors bar at src/components/ChromaPaletteBar.tsx

```typescript
import { brewer } from "chroma-js";
import { Badge } from "./ui/badge";
import { BrewerPaletteKey } from "./ChromaCard";

type ChromaPaletteBarProps = {
  brewerPalette: BrewerPaletteKey;
};

export const ChromaPaletteBar = ({ brewerPalette }: ChromaPaletteBarProps) => {
  return (
    <div className="flex justify-center items-center w-full">
      {brewer[brewerPalette].map((color, index) => (
        <Badge
          key={index}
          style={{ backgroundColor: color }}
          className="h-10 w-10 border-none rounded-none"
        />
      ))}
    </div>
  );
};
```

Badges are small, versatile UI components often used to display compact, visually distinct pieces of information, such as labels, statuses, counts, or categories. In the example provided, badges are being used to create a color palette bar, where each badge represents a single color from the selected <code>brewerPalette</code>. This demonstrates their flexibility, as they can be styled dynamically using properties like <code>backgroundColor</code> and other custom css classes, to visually communicate different states or data.

- Create the card component at src/components/ChromaCard.tsx

```typescript
import { brewer } from "chroma-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChromaSelectMenu } from "./ChromaSelectMenu";
import { ChromaPaletteBar } from "./ChromaPaletteBar";

export type BrewerPaletteKey = keyof typeof brewer;

export const ChromaCard = () => {
  const [brewerPalette, setBrewerPalette] = useState<BrewerPaletteKey | undefined>(
    undefined,
  );

  return (
    <Card className="w-[50vh] h-auto p-10 space-y-5">
      <CardTitle>Color palette picker</CardTitle>
      <CardDescription>
        Select menu for chroma-js color palettes
      </CardDescription>
      <CardContent className="space-y-2">
        <ChromaSelectMenu
          brewerPalette={brewerPalette}
          setBrewerPalette={setBrewerPalette}
        />
        {brewerPalette && <ChromaPaletteBar brewerPalette={brewerPalette} />}
      </CardContent>
      <CardFooter>
        <Button>Apply</Button>
      </CardFooter>
    </Card>
  );
};
```

Cards are highly flexible UI components used to group related content and actions within a defined container, providing a visually organized and modular design. In the <code>ChromaCard</code> component, the card encapsulates a color palette picker, including a title, description, a dropdown menu (ChromaSelectMenu), and a visual color bar (<code>ChromaPaletteBar</code>). The <code>useState</code> hook is utilized to manage the internal state of the selected color palette (<code>brewerPalette</code>), allowing the component to respond dynamically to user input and re-render when the palette changes.

![component](component.png)
Figure 1: Example of the created component with Purple-Blue-Green color palette selected.

The modularity of <code>ChromaCard</code> makes it reusable across various applications. For instance, in my use case of creating a GIS data visualization app, this component can be adapted to manage and display different palettes for styling maps, graphs, or charts.

- Use case: [cgis](https://cgis.up.railway.app/) styling feature for geojson data.

In order to create a nice way to distinguish colors for different geospatial data in my application, I applied the above detailed component for generating colors to be applied to the loaded geojson files. I'm looking forward to detail this implementation in a next series of posts, explaining more in depth concepts about web GIS and the application I'm developing.

![cgis_use_case](cgis_use_case.png)
Figure 2: Purple-Blue-Green palette applied to polygons of municipalities of Rio Grande do Sul, Brazil.
