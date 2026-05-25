import { profile } from "@/lib/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-site flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs text-muted">
          Built with Next.js ·{" "}
          <span className="text-lime">Chat-with-Baavansh</span> RAG agent
        </p>
      </div>
    </footer>
  );
}
