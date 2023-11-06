import { Accordion, Checkbox } from "../../../components";
import { components } from "../../../schema";
import { ALL_REGIONS, Locale } from "../../../utils";

export default function RegionsFilter({
  regions,
  selectedStates,
  isOpen,
  setSelectedStates,
  dict,
  locale,
}: {
  regions: components["schemas"]["Filters"]["regions"];
  selectedStates: string[];
  isOpen: boolean;
  setSelectedStates: (regions: string[]) => void;
  dict: { Regions: string; "Whole Switzerland": string };
  locale: Locale;
}) {
  if (!regions) return null;

  const states = regions
    .map((region) => (region?.states ? [...region.states] : []))
    .flat();

  return (
    <Accordion
      title={dict["Regions"]}
      isOpen={isOpen}
      labelTag={
        selectedStates.length > 0 ? selectedStates.length.toString() : undefined
      }
    >
      <label className="text-digitalent-blue text-xl mb">
        <Checkbox
          name="allRegions"
          checked={selectedStates.length === states.length}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedStates(states);
            } else {
              setSelectedStates([]);
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
              {region.states?.map((state) => (
                <Checkbox
                  key={state}
                  name={state}
                  checked={selectedStates.includes(state)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedStates([...selectedStates, e.target.value]);
                    } else {
                      setSelectedStates(
                        selectedStates.filter(
                          (region) => region !== e.target.value
                        )
                      );
                    }
                  }}
                  value={state}
                  disabled={!states.includes(state)}
                >
                  <span className="text-xl">{state}</span>
                </Checkbox>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Accordion>
  );
}
