import Shell from "@/components/layout/Shell";

export default function Home() {
  return (
    <Shell>
      <h1
        style={{
          fontSize: 34,
          marginBottom: 16,
        }}
      >
        Bem-vindo ao CreatorOS
      </h1>

      <p
        style={{
          opacity: 0.7,
        }}
      >
        A plataforma está oficialmente em desenvolvimento.
      </p>
    </Shell>
  );
}