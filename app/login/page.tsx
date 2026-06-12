import Link from "next/link";
import { redirect } from "next/navigation";
import { login } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

type LoginPageProps = Readonly<{
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
}>;

function getMessage(message?: string, error?: string) {
  if (message === "signup-success") {
    return {
      text: "Compte cree, connectez-vous.",
      tone: "success" as const
    };
  }

  if (error === "missing-fields") {
    return {
      text: "Veuillez renseigner votre email et votre mot de passe.",
      tone: "error" as const
    };
  }

  if (error === "invalid-credentials") {
    return {
      text: "Connexion impossible avec ces identifiants.",
      tone: "error" as const
    };
  }

  return null;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/bibliotheque");
  }

  const { error, message } = await searchParams;
  const feedback = getMessage(message, error);

  return (
    <section className="mx-auto w-full max-w-md px-5 py-12 sm:px-8 sm:py-16">
      <div className="rounded-[6px] border border-white/70 bg-white/90 p-6 shadow-panel sm:p-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
              Connexion
            </h1>
            <p className="text-sm leading-6 text-muted sm:text-base">
              Connectez-vous avec votre email et votre mot de passe.
            </p>
          </div>
          {feedback ? (
            <p
              className={`rounded-[6px] px-4 py-3 text-sm font-medium ${
                feedback.tone === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {feedback.text}
            </p>
          ) : null}
          <form action={login} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-stone-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-h-12 w-full rounded-[6px] border border-stone-200 bg-white px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-stone-700"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="min-h-12 w-full rounded-[6px] border border-stone-200 bg-white px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
            >
              Connexion
            </button>
          </form>
          <p className="text-sm text-stone-600">
            Pas encore de compte? {" "}
            <Link href="/signup" className="font-semibold text-accent">
              CrÃ©er un compte
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
