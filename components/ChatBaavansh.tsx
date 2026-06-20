"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, fadeUp } from "@/lib/animations";
import { profile, suggestedQuestions } from "@/lib/profile";
import { retrieveAnswer } from "@/lib/retrieval";

interface Msg {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hey — it's me (well, an AI trained on me). Ask anything: AgentMemry, my Metasys Global RAG pipeline, my systems and compiler work, or what kind of role I'm chasing. Answers come with sources.",
};

const msgVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const chipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ChatBaavansh() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [liveMode, setLiveMode] = useState<boolean | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/chat")
      .then((r) => r.json())
      .then((d) => {
        if (active) setLiveMode(Boolean(d?.live));
      })
      .catch(() => {
        if (active) setLiveMode(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;

    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(history);
    setInput("");
    setLoading(true);

    const useFallback = async () => {
      await new Promise((r) => setTimeout(r, 380));
      const result = retrieveAnswer(q);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: result.answer, sources: result.sources },
      ]);
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();

      if (data?.reply) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: String(data.reply) },
        ]);
        setLiveMode(true);
      } else {
        if (data?.reason === "no_key") setLiveMode(false);
        await useFallback();
      }
    } catch {
      await useFallback();
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const badge =
    liveMode === null
      ? { dot: "bg-muted", label: "connecting", cls: "text-muted" }
      : liveMode
        ? { dot: "bg-lime", label: "Live AI · Claude", cls: "text-lime" }
        : { dot: "bg-muted", label: "Offline RAG", cls: "text-muted" };

  function clearChat() {
    setMessages([GREETING]);
    setInput("");
    inputRef.current?.focus();
  }

  const isEmptyState = messages.length === 1 && messages[0] === GREETING;

  return (
    <section id="chat" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 section-divider" />

      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/[0.02] blur-[150px]" />

      <div className="relative mx-auto max-w-site px-6">
        <Reveal variants={fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
            [ chat-with-baavansh ]
          </p>
        </Reveal>
        <Reveal variants={fadeUp} custom={1}>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight">
            Don&apos;t read my r&eacute;sum&eacute;.
            <br />
            <span className="bg-gradient-to-r from-lime to-cyan bg-clip-text text-transparent">
              Interrogate
            </span>{" "}
            it.
          </h2>
        </Reveal>
        <Reveal variants={fadeUp} custom={2}>
          <p className="mt-5 max-w-2xl text-muted md:text-lg">
            This is a RAG agent over my projects and experience. Ask it anything a
            recruiter would — it answers from a structured knowledge base of my
            work, with sources.
          </p>
        </Reveal>

        <Reveal variants={fadeUp} custom={3}>
          <div className="relative mt-10">
            {/* Pulsing glow behind */}
            <div className="pointer-events-none absolute -inset-2 animate-glow-pulse rounded-xl bg-gradient-to-br from-lime/5 via-cyan/3 to-violet/3 blur-2xl" />

            <div className="glass-strong relative overflow-hidden rounded-xl shadow-[0_0_80px_-20px_rgba(204,255,0,0.08)]">
              {/* Terminal header */}
              <div className="flex items-center justify-between border-b border-line/40 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={clearChat}
                    aria-label="Clear chat"
                    title="Clear chat"
                    className="group h-3 w-3 rounded-full bg-[#ff5f56] transition-all hover:scale-110"
                  />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-3 font-mono text-xs text-muted">
                    ask-baavansh --interactive
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <button
                    onClick={clearChat}
                    className="text-muted transition-colors hover:text-lime"
                    aria-label="Reset conversation"
                  >
                    clear
                  </button>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${badge.dot} ${
                        liveMode ? "animate-pulse" : "opacity-70"
                      }`}
                    />
                    <span className={`uppercase tracking-wider ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="scanlines h-[460px] space-y-5 overflow-y-auto px-4 py-6 md:px-6"
              >
                <AnimatePresence mode="popLayout">
                  {messages.map((m, i) =>
                    m.role === "assistant" ? (
                      <motion.div
                        key={`msg-${i}`}
                        variants={msgVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="flex gap-3"
                      >
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-gradient-to-br from-lime to-cyan font-mono text-xs font-bold text-ink">
                          {profile.initials}
                        </span>
                        <div className="max-w-[88%]">
                          <div className="glass rounded-lg px-4 py-3 text-sm leading-relaxed text-paper md:text-[15px]">
                            {m.content}
                          </div>
                          {m.sources && m.sources.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {m.sources.map((s) => (
                                <span
                                  key={s}
                                  className="rounded-sm border border-line/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                                >
                                  <span className="text-lime">&#9670;</span> {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`msg-${i}`}
                        variants={msgVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="flex justify-end"
                      >
                        <div className="max-w-[88%] rounded-lg bg-gradient-to-r from-lime to-lime-dim px-4 py-3 text-sm font-medium leading-relaxed text-ink md:text-[15px]">
                          {m.content}
                        </div>
                      </motion.div>
                    ),
                  )}

                  {loading && (
                    <motion.div
                      key="typing"
                      variants={msgVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex gap-3"
                    >
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-gradient-to-br from-lime to-cyan font-mono text-xs font-bold text-ink">
                        {profile.initials}
                      </span>
                      <div className="glass flex items-center gap-2 rounded-lg px-4 py-4">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="h-1.5 w-1.5 rounded-full bg-lime"
                            animate={{
                              y: [0, -6, 0],
                              opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: d * 0.15,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                        <span className="ml-2 font-mono text-[11px] text-muted">
                          thinking...
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Empty state */}
                {isEmptyState && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-8 flex flex-col items-center text-center"
                  >
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-lime/40 to-transparent" />
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted/60">
                      Ask a question below or pick a starter
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Suggested questions */}
              <div className="flex flex-wrap gap-2 border-t border-line/30 px-4 py-3 md:px-6">
                <span className="self-center font-mono text-[10px] uppercase tracking-wider text-muted/60">
                  try:
                </span>
                {suggestedQuestions.map((q, i) => (
                  <motion.button
                    key={q}
                    custom={i}
                    variants={chipVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.04, borderColor: "rgba(204,255,0,0.6)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => send(q)}
                    disabled={loading}
                    className="rounded-sm border border-line/40 px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-lime hover:text-lime disabled:opacity-40"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-3 border-t border-line/30 bg-surface/30 px-4 py-3 md:px-6"
              >
                <span className="font-mono text-sm text-lime">{">"}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about AgentMemry, Metasys Global, why hire me..."
                  className="flex-1 bg-transparent py-1.5 font-mono text-sm text-paper outline-none placeholder:text-muted/50"
                  aria-label="Ask a question"
                  autoComplete="off"
                />
                <motion.button
                  type="submit"
                  disabled={loading || !input.trim()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-sm bg-lime px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-[0_0_20px_-4px_rgba(204,255,0,0.25)] transition-all disabled:translate-y-0 disabled:opacity-30 disabled:shadow-none"
                >
                  Send
                </motion.button>
              </form>
            </div>
          </div>
        </Reveal>

        <Reveal variants={fadeUp} custom={4}>
          <p className="mt-3 font-mono text-[11px] text-muted">
            Powered by Claude when an API key is configured — otherwise an
            in-browser retrieval engine answers, so the chat never breaks.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
