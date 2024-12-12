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
