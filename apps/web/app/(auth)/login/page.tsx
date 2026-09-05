"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  LockKeyhole,
  Mail,
} from "lucide-react";

import {
  createSupabaseBrowserClient,
} from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const supabase =
    createSupabaseBrowserClient();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);
    setLoading(true);

    const {
      error: signInError,
    } =
      await supabase.auth.signInWithPassword(
        {
          email: email.trim(),
          password,
        }
      );

    if (signInError) {
      setLoading(false);

      setError(
        "E-mail ou senha incorretos. Verifique seus dados e tente novamente."
      );

      return;
    }

    router.push("/command-center");
    router.refresh();
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center px-6 py-12"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div
        className="w-full"
        style={{
          maxWidth: "420px",
        }}
      >
        {/* Logo e título */}
        <div className="mb-8 text-center">
          <div className="mb-5 flex items-center justify-center">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                background: "var(--card)",
                border:
                  "1px solid var(--border)",
              }}
            >
              <span className="text-lg font-semibold">
                C
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Entrar no CreatorOS
          </h1>

          <p
            className="mt-2 text-sm"
            style={{
              color:
                "var(--text-muted)",
            }}
          >
            Acesse seu Command Center.
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7"
          style={{
            background: "var(--card)",
            border:
              "1px solid var(--border)",
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.25)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* E-mail */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                E-mail
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute top-1/2 -translate-y-1/2"
                  style={{
                    left: "14px",
                    color:
                      "var(--text-muted)",
                  }}
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="seu@email.com"
                  autoComplete="email"
                  required
                  className="h-11 w-full rounded-lg text-sm outline-none transition"
                  style={{
                    paddingLeft: "42px",
                    paddingRight: "12px",
                    background:
                      "var(--bg)",
                    color:
                      "var(--text)",
                    border:
                      "1px solid var(--border)",
                  }}
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Senha
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute top-1/2 -translate-y-1/2"
                  style={{
                    left: "14px",
                    color:
                      "var(--text-muted)",
                  }}
                />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  required
                  className="h-11 w-full rounded-lg text-sm outline-none transition"
                  style={{
                    paddingLeft: "42px",
                    paddingRight: "12px",
                    background:
                      "var(--bg)",
                    color:
                      "var(--text)",
                    border:
                      "1px solid var(--border)",
                  }}
                />
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div
                role="alert"
                className="rounded-lg px-3 py-2.5 text-sm"
                style={{
                  color: "#fca5a5",
                  background:
                    "rgba(239, 68, 68, 0.08)",
                  border:
                    "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                {error}
              </div>
            )}

            {/* Entrar */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background:
                  "var(--primary)",
                color: "#ffffff",
              }}
            >
              {loading
                ? "Entrando..."
                : "Entrar"}

              {!loading && (
                <ArrowRight
                  size={17}
                />
              )}
            </button>
          </form>

          {/* Separador */}
          <div className="my-6 flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{
                background:
                  "var(--border)",
              }}
            />

            <span
              className="text-xs"
              style={{
                color:
                  "var(--text-muted)",
              }}
            >
              ou
            </span>

            <div
              className="h-px flex-1"
              style={{
                background:
                  "var(--border)",
              }}
            />
          </div>

          {/* Cadastro */}
          <div className="text-center">
            <p
              className="text-sm"
              style={{
                color:
                  "var(--text-muted)",
              }}
            >
              Ainda não possui uma conta?
            </p>

            <Link
              href="/register"
              className="mt-3 flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                border:
                  "1px solid var(--border)",
                color:
                  "var(--text)",
              }}
            >
              Criar conta
            </Link>
          </div>
        </div>

        {/* Rodapé */}
        <p
          className="mt-5 text-center text-xs"
          style={{
            color:
              "var(--text-muted)",
          }}
        >
          Ao continuar, você concorda com os
          termos e políticas do CreatorOS.
        </p>
      </div>
    </main>
  );
}