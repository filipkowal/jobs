import { Accordion, Checkbox } from "@/components";
import { components } from "@/schema";
import { ALL_REGIONS, Dictionary, Locale } from "@/utils";

export default function RegionsFilter({
  cantons,
  selectedCantons,
  isOpen,
  setSelectedCantons,
  dict,
  locale,
}: {
  cantons: components["schemas"]["Filters"]["cantons"];
  selectedCantons: string[];
  isOpen: boolean;
  setSelectedCantons: (cantons: string[]) => void;
  dict: Dictionary["filtersSection"];
  locale: Locale;
}) {
  if (!cantons) return null;

  return (
    <Accordion
      title={dict["cantons"]}
      isOpen={isOpen}
      labelTag={
        selectedCantons.length > 0
          ? selectedCantons.length.toString()
          : undefined
      }
    >
      <label className="text-digitalent-blue text-xl mb">
        <Checkbox
          name="allRegions"
          checked={selectedCantons.length === cantons.length}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedCantons(cantons);
            } else {
              setSelectedCantons([]);
            }
          }}
        />
        <span>{dict["Whole Switzerland"]}</span>
      </label>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {ALL_REGIONS[locale].map((region) => (
          <div key={region.name} className="flex flex-col">
            <h2 className="text-xl font-light text-digitalent-blue">
              {region.name}
            </h2>
            <div className="flex flex-col ml-4">
              {region.cantons?.map((canton) => (
                <Checkbox
                  key={canton}
                  name={canton}
                  checked={selectedCantons.includes(canton)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCantons([...selectedCantons, e.target.value]);
                    } else {
                      setSelectedCantons(
                        selectedCantons.filter(
                          (region) => region !== e.target.value
                        )
                      );
                    }
                  }}
                  value={canton}
                  disabled={!cantons.includes(canton)}
                >
                  <span className="text-xl">{canton}</span>
                </Checkbox>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Accordion>
  );
}
