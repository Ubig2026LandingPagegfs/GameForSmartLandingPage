"use client";
import RegistrationView from "@/components/features/auth/RegistrationView";

export default function RegisterPage() {
  return (
    <div className="bg-dark min-vh-100">
      <RegistrationView 
        competitionTitle="GameForSmart Community" 
        competitionSlug="community" 
        fee="Free Entry" 
      />
    </div>
  );
}
