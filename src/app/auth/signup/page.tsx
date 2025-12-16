import { SignupForm } from "@/src/features/auth/component/signup-form"

export default function SignupPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md space-y-10">
                <SignupForm />
            </div>
        </div>
    )
}