import { LoginForm } from "@/src/features/auth/component/login-form";


export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md space-y-10">
                <LoginForm  />
            </div>
        </div>

    );
}