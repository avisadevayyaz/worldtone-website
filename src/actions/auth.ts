"use server";

import { redirect } from "next/navigation";

export async function loginWithEmail(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {

  console.log("loginWithEmail...",formData);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    console.log("email", email);
    console.log("password", password);

    // Server-side authentication logic
    // This is a mock implementation
    // TODO: Implement actual authentication
    // const remember = formData.get("remember") === "on";
    // Set session/cookies here
    redirect("/");

    return { error: "Invalid credentials" };
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    return {
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function loginWithSSO(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const provider = formData.get("provider") as string;

  try {
    if (!provider) {
      return { error: "Provider is required" };
    }

    // Server-side SSO logic
    // This is a mock implementation
    // TODO: Implement actual SSO authentication
    // Redirect to OAuth provider or handle callback
    redirect("/");
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    return {
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function signOut(): Promise<void> {
  // Server-side sign out logic
  // Clear session, cookies, etc.
}

export async function getCurrentUser(): Promise<{
  id: string;
  name: string;
  email: string;
} | null> {
  // Server-side user fetching logic
  // This is a mock implementation
  return null;
}
