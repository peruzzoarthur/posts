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
