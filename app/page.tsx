"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  useEffect(() => {
    const getData = async () => {
      const data = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: "amool@gmail.com",
          password: "1234@1234",
        }),
      });
      console.log(await data.json());
    };
    // getData();
  }, []);

  const login = async () => {
    const data = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log(await data.json());
  };

  const register = async () => {
    const data = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log(await data.json());
  };
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Hello next js</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 13,
        }}
      >
        <input
          placeholder="Enter your email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          placeholder="Enter your password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button onClick={login}>Login</button>
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}
