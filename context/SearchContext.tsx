"use client";
import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext<{
  search: string;
  setSearch: (value: string) => void;
}>({
  search: "",
  setSearch: () => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
