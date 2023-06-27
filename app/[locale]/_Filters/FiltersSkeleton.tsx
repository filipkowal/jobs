export default function FiltersSkeleton() {
  return (
    <div className="lg:w-10/12 w-full max-w-[70rem] justify-left">
      <div className="hidden lg:flex flex-row mb-2 gap-2 flex-wrap relative">
        <span className="bg-digitalent-gray-light animate-pulse h-10 mr-2 w-8" />
        <span className="bg-digitalent-gray-light animate-pulse h-10 mr-2 w-32" />
        <span className="bg-digitalent-gray-light animate-pulse h-10 mr-2 w-32" />
        <span className="bg-digitalent-gray-light animate-pulse h-10 mr-2 w-32" />
        <span className="bg-digitalent-gray-light animate-pulse h-10 mr-2 w-32" />
        <span className="bg-digitalent-gray-light animate-pulse h-10 mr-2 w-32" />
      </div>

      <div className="relative lg:hidden w-[fit-content] pl-1">
        <span className="bg-digitalent-gray-light animate-pulse h-10 mr-2 w-32" />
      </div>
    </div>
  );
}
