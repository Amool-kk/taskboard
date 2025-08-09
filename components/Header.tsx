"use client";

import { ListTodo, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchForm } from "./ui/search";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    const data = await fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (data.status === 200) {
      router.replace("/login");
    }
  };
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="flex h-[--header-height] w-full items-center justify-between px-2 py-2 lg:px-4">
        <Link href="/" className="flex items-center gap-2">
          <ListTodo size={20} className="h-8 w-8" />
        </Link>

        {pathname === "/" && (
          <div className="hidden sm:flex flex-1 justify-center items-center gap-2 px-2">
            <SearchForm className="w-full max-w-xl" />
            <Button onClick={() => router.push("/create-board")}>
              <Plus />
            </Button>
          </div>
        )}

        <div className="flex items-center justify-end">
          <LogOut onClick={logout} />
        </div>
      </div>

      {pathname === "/" && (
        <div className="flex sm:hidden flex-col gap-2 px-2 pb-2">
          <SearchForm className="w-full" />
          <Button
            onClick={() => router.push("/create-board")}
            className="w-full"
          >
            <Plus className="mr-2" />
            Create Board
          </Button>
        </div>
      )}
    </header>
  );
}
