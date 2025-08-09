import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "./input";
import { useSearch } from "@/context/SearchContext";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const { search, setSearch } = useSearch();
  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          placeholder="Type to search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 pl-7"
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </form>
  );
}
