"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import {
  createSupabaseBrowserClient,
} from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();

  const supabase =
    createSupabaseBrowserClient();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    const normalizedName =
      name.trim();

    const normalizedEmail =
      email.trim();

    if (!normalizedName) {
      setError(
        "Informe seu nome."
      );

      return;
    }

    if (password.length < 6) {
      setError(
        "A senha deve possuir pelo menos 6 caracteres."
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "As senhas não coincidem."
      );

      return;
    }

    setLoading(true);

    const {
  data,
  error: signUpError,
} =
  await supabase.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      emailRedirectTo:
        `${window.location.origin}/auth/callback`,
      data: {
        full_name:
          normalizedName,
      },
    },
  });

    if (signUpError) {
      setLoading(false);

      setError(
        signUpError.message
      );

      return;
    }

    setLoading(false);

    if (
      data.session
    ) {
      router.push(
        "/command-center"
      );

      router.refresh();

      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <main
        className="flex min-h-screen items-center justify-center px-6 py-12"
        style={{
          background:
            "var(--bg)",
          color:
            "var(--text)",
        }}
      >
        <div
          className="w-full"
          style={{
            maxWidth:
              "420px",
          }}
        >
          <div className="mb-8 text-center">
            <div className="mb-5 flex items-center justify-center">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background:
                    "var(--card)",
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
              Conta criada
            </h1>

            <p
              className="mt-2 text-sm"
              style={{
                color:
                  "var(--text-muted)",
              }}
            >
              Seu cadastro foi realizado
              com sucesso.
            </p>
          </div>

          <div
            className="rounded-2xl p-7 text-center"
            style={{
              background:
                "var(--card)",
              border:
                "1px solid var(--border)",
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.25)",
            }}
          >
            <CheckCircle2
              size={44}
              strokeWidth={1.5}
              className="mx-auto mb-5"
              style={{
                color:
                  "var(--primary)",
              }}
            />

            <h2 className="text-lg font-semibold">
              Verifique seu e-mail
            </h2>

            <p
              className="mt-3 text-sm leading-6"
              style={{
                color:
                  "var(--text-muted)",
              }}
            >
              Enviamos um link de
              confirmação para:
            </p>

            <p className="mt-1 text-sm font-medium">
              {email.trim()}
            </p>

            <Link
              href="/login"
              className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                background:
                  "var(--primary)",
                color:
                  "#ffffff",
              }}
            >
              Ir para o login
              <ArrowRight
                size={17}
              />
            </Link>
          </div>

          <p
            className="mt-5 text-center text-xs"
            style={{
              color:
                "var(--text-muted)",
            }}
          >
            CreatorOS · Operating System
            for Creators
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center px-6 py-12"
      style={{
        background:
          "var(--bg)",
        color:
          "var(--text)",
      }}
    >
      <div
        className="w-full"
        style={{
          maxWidth:
            "420px",
        }}
      >
        {/* Logo e título */}
        <div className="mb-8 text-center">
          <div className="mb-5 flex items-center justify-center">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                background:
                  "var(--card)",
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
            Criar conta
          </h1>

          <p
            className="mt-2 text-sm"
            style={{
              color:
                "var(--text-muted)",
            }}
          >
            Comece sua jornada no CreatorOS.
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7"
          style={{
            background:
              "var(--card)",
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
            {/* Nome */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Nome
              </label>

              <div className="relative">
                <User
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
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  placeholder="Seu nome"
                  autoComplete="name"
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
                  placeholder="Mínimo de 6 caracteres"
                  autoComplete="new-password"
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

            {/* Confirmar senha */}
            <div>
              <label
                htmlFor="confirm-password"
                className="mb-2 block text-sm font-medium"
              >
                Confirmar senha
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
                  id="confirm-password"
                  type="password"
                  value={
                    confirmPassword
                  }
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Repita sua senha"
                  autoComplete="new-password"
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
                  color:
                    "#fca5a5",
                  background:
                    "rgba(239, 68, 68, 0.08)",
                  border:
                    "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                {error}
              </div>
            )}

            {/* Criar conta */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background:
                  "var(--primary)",
                color:
                  "#ffffff",
              }}
            >
              {loading
                ? "Criando conta..."
                : "Criar conta"}

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

          {/* Login */}
          <div className="text-center">
            <p
              className="text-sm"
              style={{
                color:
                  "var(--text-muted)",
              }}
            >
              Já possui uma conta?
            </p>

            <Link
              href="/login"
              className="mt-3 flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                border:
                  "1px solid var(--border)",
                color:
                  "var(--text)",
              }}
            >
              Entrar
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
          Ao criar sua conta, você concorda
          com os termos e políticas do
          CreatorOS.
        </p>
      </div>
    </main>
  );
}