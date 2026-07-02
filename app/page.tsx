import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold text-red-600">
        GuardianSOS
      </h1>

      <p>Your Emergency Companion</p>

      <div className="flex gap-4">
        <Link href="/sign-in">
          Login
        </Link>

        <Link href="/sign-up">
          Signup
        </Link>
      </div>
    </main>
  );
}