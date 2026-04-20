"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignInPage() {
  const [errors, setErrors] = useState({
    emailErr: "",
    passwordErr: "",
    credientailErr: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) {
        if (
          data.message === "Email is required" ||
          data.message === "Enter a valid email address" ||
          data.message === "Email is not verified"
        )
          setErrors((prev) => ({ ...prev, emailErr: data.message }));
        if (data.message === "Password is required")
          setErrors((prev) => ({ ...prev, passwordErr: data.message }));
        if (data.message === "Invalid Crediential")
          setErrors((prev) => ({ ...prev, credientailErr: data.message }));

        return;
      }
      toast.success(data.message);
      console.log(data);

      setTimeout(() => {
        redirect("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex min-h-[calc(100vh-180px)] items-center justify-center px-4 py-12">
      <Toaster />
      <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
          Welcome to{" "}
          <span className="text-2xl font-black tracking-tight text-slate-900">
            NEXA<span className="text-orange-500">MART</span>
          </span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          Sign In to your account
        </div>
        <form onSubmit={handelSubmit} className="flex flex-col gap-3">
          <Input
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, email: e.target.value }));
              setErrors((prev) => ({ ...prev, emailErr: "" }));
            }}
            label="Email"
            placeholder="Enter email"
            type="email"
            error={errors?.emailErr}
          />
          <Input
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, password: e.target.value }));
              setErrors((prev) => ({ ...prev, passwordErr: "" }));
            }}
            label="Password"
            placeholder="Enter your password"
            type="password"
            error={errors?.passwordErr}
          />
          {errors.credientailErr && (
            <p className="mt-1 text-sm text-red-500">
              {errors?.credientailErr}
            </p>
          )}
          <div>
            <a className="text-sm text-[#7747ff]" href="#">
              Forgot your password?
            </a>
          </div>
          <Button type="submit">Sign In</Button>
        </form>
        <div className="text-sm text-center mt-[1.6rem]">
          Don't have an account ?{" "}
          <Link className="text-sm text-[#7747ff]" href="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
