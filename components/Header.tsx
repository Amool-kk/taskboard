"use client";

import { ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchForm } from "./ui/search";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
// import { Separator } from "@/components/ui/separator";
// import { useSidebar } from "@/components/ui/sidebar";

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    const data = await fetch("/api/logout", {
      method: "GET",
      credentials: "include",
    });

    if (data.status === 200) {
      router.replace("/login");
    }
  };
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4 py-2">
        <Link href="/">
          <ListTodo className="h-8 w-8" />
        </Link>
        {pathname === "/" ? (
          <div className="flex sm:mx-auto justify-center align-middle">
            <SearchForm className="w-full sm:mx-5 sm:w-2xl" />
            <Button onClick={() => router.push("/create-board")}>Create</Button>
          </div>
        ) : null}
        <div className="absolute right-5">
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    </header>
  );
}
