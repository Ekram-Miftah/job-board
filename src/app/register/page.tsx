"use client";
import { RegisterInput, registerSchema } from "@/lib/validations";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Account created! Please login.");
      router.push("/login");
    } catch (error) {
      toast.error("Somehting went Worong .Please try Again .");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flext ite justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Abebe Teka" {...register("name")} />
              {errors.name && (
                <p className="text-sm  text-red-500 ">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="AbebeTeka@gmail.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm  text-red-500 ">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm  text-red-500 ">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">I want to </Label>
              <select
                id="role"
                {...register("role")}
                className="w-full border rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value={"APPLICANT"}>Find a Job</option>
                <option value={"EMPLOYER"}>Post Jobs</option>
              </select>

              {errors.role && (
                <p className="text-sm  text-red-500 ">{errors.role.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account "}
            </Button>

            <p className="text-center  text-sm text-slate-600">
              Already have an Account
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
