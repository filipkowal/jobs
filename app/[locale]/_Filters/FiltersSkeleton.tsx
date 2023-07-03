export default function FiltersSkeleton() {
  return (
    <div className="lg:w-10/12 w-full max-w-[70rem] justify-left h-[44px]">
      <div className="hidden lg:flex flex-row mb-2 gap-2 flex-wrap relative animate-pulse blur-sm">
        <span className="border-digitalent-blue border-2 py-1 px-3 text-digitalent-blue">
          Berufsfelder
        </span>
        <span className="border-digitalent-blue border-2 py-1 px-3 text-digitalent-blue">
          Technologien
        </span>
        <span className="border-digitalent-blue border-2 py-1 px-3 text-digitalent-blue">
          Branchen
        </span>
        <span className="border-digitalent-blue border-2 py-1 px-3 text-digitalent-blue">
          Firmengrösse
        </span>
        <span className="border-digitalent-blue border-2 py-1 px-3 text-digitalent-blue">
          Arbeitslevel
        </span>
        <span className="border-digitalent-blue border-2 py-1 px-3 text-digitalent-blue">
          Arbeitspensum
        </span>
        <span className="border-digitalent-blue border-2 py-1 px-3 text-digitalent-blue">
          Mehr...
        </span>
      </div>

      <span className="block lg:hidden border-digitalent-blue border-2 py-1 px-3 text-digitalent-blue ml-1" />
    </div>
  );
}
