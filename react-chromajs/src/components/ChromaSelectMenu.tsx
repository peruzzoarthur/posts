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
