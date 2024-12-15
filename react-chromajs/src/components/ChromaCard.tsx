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
