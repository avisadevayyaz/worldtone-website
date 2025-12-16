"use client";

import { LoginFormValues, loginSchema } from "@/src/app/auth/schemas/schemas";
import { Mail, Lock, Chrome, Facebook, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/src/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/components/ui/button";
import { loginWithSSO } from "@/src/actions/auth";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginApi } from "../api/api";
import Link from "next/link";
import { toast } from "sonner";
import { ApiError } from "@/src/lib/api-client";

export function LoginForm(): React.ReactElement {

    const [serverError, setServerError] = useState<string | null>(null);
    const [ssoState, ssoAction] = useActionState(loginWithSSO, null);
    const [passwordShown, setPasswordShown] = useState(false);
    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const onSubmit = async (values: LoginFormValues) => {
        setServerError(null);
        try {
            const res = await loginApi(values);
            setUser(res.user);
            toast.success("Logged in successfully");
            router.push("/");
        } catch (err) {
            const message = (err as ApiError)?.details?.error || "Failed to login";
            setServerError(message as string);
            toast.error(message as string);
        }
    };

    return (

        <>
            <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
                        W
                    </div>
                </div>
                <h1 className="text-2xl font-semibold">Sign in</h1>
                <p className="text-sm text-muted-foreground">Hi! Welcome back, you,ve been missed</p>
            </div>

            <div className="space-y-4">


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="you@example.com"
                                className="pl-9"
                                type="email"
                                {...register("email")}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            {passwordShown ? (
                                <Eye className="cursor-pointer absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" onClick={togglePasswordVisibility} />
                            ) : (
                                <EyeOff className="cursor-pointer absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" onClick={togglePasswordVisibility} />
                            )}
                            <Input
                                placeholder="••••••••"
                                className="pl-9"
                                type={passwordShown ? "text" : "password"}
                                {...register("password")}
                            />
                        </div>
                    </div>
                    {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                    {serverError && (
                        <p className="text-sm text-destructive">{serverError}</p>
                    )}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                className="rounded border-input"
                                id="remember"
                                type="checkbox"
                                {...register("remember")}
                            />
                            <span className="text-muted-foreground">Remember me</span>
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-primary hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or sign in with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <form action={ssoAction}>
                        <input type="hidden" name="provider" value="github" />
                        <Button type="submit" variant="outline" className="w-full cursor-pointer">
                            <Facebook className="h-4 w-4" />
                            <span>Facebook</span>
                        </Button>
                    </form>
                    <form action={ssoAction}>
                        <input type="hidden" name="provider" value="google" />
                        <Button type="submit" variant="outline" className="w-full cursor-pointer">
                            <Chrome className="h-4 w-4" />
                            <span>Google</span>
                        </Button>
                    </form>
                </div>
                {ssoState?.error && (
                    <p className="text-sm text-destructive text-center">{ssoState.error}</p>
                )}

            </div>

            <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                    Sign Up
                </Link>
            </p>


        </>

    );
}
