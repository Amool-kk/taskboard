"use client";
import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [router, user]);

  return (
    <div className="flex min-h-vh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm pathname={pathname ? pathname : "/register"} />
      </div>
    </div>
  );
}
