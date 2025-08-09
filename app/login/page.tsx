"use client";
import { LoginForm } from "@/components/login-form";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();

  return (
    <div className="flex min-h-vh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm pathname={pathname ? pathname : "/login"} />
      </div>
    </div>
  );
}
