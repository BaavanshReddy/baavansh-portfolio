import { profile } from "@/lib/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-site flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-muted">
          &copy; {new Date().getFullYear()} {profile.name}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted transition-colors hover:text-lime"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted transition-colors hover:text-lime"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-xs text-muted transition-colors hover:text-lime"
          >
            Email
          </a>
        </div>

        <p className="font-mono text-xs text-muted">
          Built with Next.js &middot;{" "}
          <span className="text-lime">Chat-with-Baavansh</span> RAG agent
        </p>
      </div>
    </footer>
  );
}
