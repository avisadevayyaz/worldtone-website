"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import Link from "next/link"
import {
    FieldDescription,
    Field,
} from "@/src/components/ui/field"
import { useState } from "react"

export function     SignupForm({
    className,
    ...props
}: React.ComponentProps<"form">) {

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };


    return (

        <>
            <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Create Account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Fill your information below and connect
                    with World Tone
                </p>
            </div>

            <div className="space-y-4">
                <form className="fle flex-col gap-6 space-y-5" {...props}>

                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="John Doe"
                                className="pl-9"
                                name="name"
                                type="text"
                                id="name"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="you@example.com"
                                className="pl-9"
                                name="email"
                                type="email"
                                id="email"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            {passwordShown ? (
                                <Eye className="cursor-pointer absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" onClick={togglePasswordVisibility} />
                            ) : (
                                <EyeOff className="cursor-pointer absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" onClick={togglePasswordVisibility} />
                            )}
                            <Input
                                type={passwordShown ? "text" : "password"}
                                placeholder="********"
                                className="pl-9"
                                name="password"
                                id="password"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                className="rounded border-input"
                                type="checkbox"
                                name="remember"
                            />
                            <span className="text-muted-foreground">Agree with our <Link href="/terms">Terms & Condition</Link></span>
                        </label>
                    </div>

                    <Field>
                        <Button type="submit">Create Account</Button>
                    </Field>

                </form>
            </div>

            <Field>
                <FieldDescription className="px-6 text-center">
                    Already have an account? <Link href="/auth/login">Sign in</Link>
                </FieldDescription>
            </Field>

        </>

    )
}
