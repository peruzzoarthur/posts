### React Chromajs Select Menu

This is a React Typescript project [setup with Vite & shadcn/ui.](https://ui.shadcn.com/docs/installation/vite)


Install dependencies:

```bash
npm install chroma-js
npm install -D @types/chroma-js
```

Install shadcn/ui components

```bash
npx shadcn@latest add badge button card select
```

#### Chromajs and brewer function

Define type for brewer palettes

```typescript
export type BrewerPalette = keyof typeof brewer;
```

Create a select menu at src/components/ChromaSelectMenu.tsx

```typescript
import { brewer } from "chroma-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { BrewerPalette } from "./ChromaCard";

type ChromaSelectMenuProps = {
  brewerPalette: BrewerPalette | undefined;
  setBrewerPalette: React.Dispatch<
    React.SetStateAction<BrewerPalette | undefined>
  >;
};

export const ChromaSelectMenu = ({
  brewerPalette,
  setBrewerPalette,
}: ChromaSelectMenuProps) => {
  return (
    <Select
      defaultValue={brewerPalette}
      onValueChange={(value) => setBrewerPalette(value as BrewerPalette)}
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

Create colors bar at src/components/ChromaPaletteBar.tsx

```typescript
import { brewer } from "chroma-js";
import { Badge } from "./ui/badge";
import { BrewerPalette } from "./ChromaCard";

type ChromaPaletteBarProps = {
  brewerPalette: BrewerPalette;
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

Create the card component at src/components/ChromaCard.tsx

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

export type BrewerPalette = keyof typeof brewer;

export const ChromaCard = () => {
  const [brewerPalette, setBrewerPalette] = useState<BrewerPalette | undefined>(
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

Use case - ColdMapViewer
