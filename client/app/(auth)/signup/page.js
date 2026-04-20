"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignUpPage() {
  const [errors, setErrors] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
  });
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.message === "Full Name is required")
          setErrors((prev) => ({ ...prev, nameErr: data.message }));
        if (
          data.message === "Email is required" ||
          data.message === "Enter a valid email address" ||
          data.message === "Email already exist"
        )
          setErrors((prev) => ({ ...prev, emailErr: data.message }));
        if (data.message === "Password is required")
          setErrors((prev) => ({ ...prev, passwordErr: data.message }));

        return;
      }
      toast.success(data.message);
      setTimeout(() => {
        // reditect to OTP Verification page
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
          Sign Up
        </div>
        <form onSubmit={handelSubmit} className="flex flex-col gap-3">
          <Input
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, fullName: e.target.value }));
              setErrors((prev) => ({ ...prev, nameErr: "" }));
            }}
            label="Full Name"
            placeholder="Enter your full name"
            error={errors?.nameErr}
          />
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
          <Button type="submit">Sign Up</Button>
        </form>
        <div className="text-sm text-center mt-[1.6rem]">
          Already have an account ?{" "}
          <Link className="text-sm text-[#7747ff]" href="/signin">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
