import { Metadata } from "next";
import LoginView from "@/components/features/auth/LoginView";

export const metadata: Metadata = {
  title: "Masuk | GameForSmart",
  description: "Masuk ke akun GameForSmart Anda untuk mengakses turnamen dan game terbaru.",
};

export default function LoginPage() {
  return <LoginView />;
}
