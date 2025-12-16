import { LoginFormValues } from "@/src/app/auth/schemas/schemas";
import { apiFetch } from "@/src/lib/api-client";
import { login } from "@/src/routes/routes";

type LoginResponse = {
    user: {
        id: string;
        name: string;
        email: string;
    };
    accessToken?: string;
};

export async function loginApi(payload: LoginFormValues): Promise<LoginResponse> {
    return apiFetch<LoginResponse>(login, {
        method: "POST",
        body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            remember: payload.remember ?? false,
        }),
    });
}