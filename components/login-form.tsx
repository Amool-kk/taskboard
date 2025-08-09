import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type LoginFormProps = React.ComponentProps<"div"> & {
  pathname?: string;
};

export function LoginForm({ className, pathname, ...props }: LoginFormProps) {
  const isLoginPage = pathname === "/login";
  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();
  const router = useRouter();

  const login = async () => {
    const data = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const { message } = await data.json();
    if (data.status === 200) {
      toast.success(message);
      setEmail(null);
      setPassword(null);
      router.replace("/");
    } else {
      toast.error(message);
    }
  };

  const register = async () => {
    const data = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const { message } = await data.json();
    if (data.status === 201) {
      toast.success(message);
      setEmail(null);
      setPassword(null);
      router.push("/login");
    } else {
      toast.error(message);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>
            {isLoginPage ? "Login to your account" : "Create your account"}
          </CardTitle>
          <CardDescription>
            Enter your email below to {isLoginPage ? "login" : "create"} to your
            account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    isLoginPage ? login() : register();
                  }}
                  type="button"
                  className="w-full"
                >
                  {isLoginPage ? "Login" : "Register"}
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              {isLoginPage ? (
                <>
                  Don&apos;t have an account?{" "}
                  <a href="/register" className="underline underline-offset-4">
                    Sign up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <a href="/login" className="underline underline-offset-4">
                    Log in
                  </a>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
