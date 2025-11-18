"use client";

import { useMemo, useState } from "react";

type GenerateResponse = {
  hook: string;
  fullScript: string[];
  voiceover: string[];
  visualShots: string[];
  captions: string[];
  hashtags: string[];
};

const EMOTIONS = ["Shock", "Motivation", "Mystery", "Awe", "Hope", "Urgency"];
const STYLES = ["Finance", "Fitness", "Tech", "Self-Help", "Education", "Travel", "Fashion", "Food", "Business", "Mindset"];

export default function Page() {
  const [topic, setTopic] = useState("");
  const [emotion, setEmotion] = useState("Motivation");
  const [style, setStyle] = useState("Self-Help");
  const [duration, setDuration] = useState(45);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canGenerate = useMemo(() => topic.trim().length >= 3 && !loading, [topic, loading]);

  async function onGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!canGenerate) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, emotion, style, durationSec: duration }),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = (await res.json()) as GenerateResponse;
      setData(json);
    } catch (err: any) {
      setError(err?.message ?? "Failed to generate");
    } finally {
      setLoading(false);
    }
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <main className="space-y-6">
      <form onSubmit={onGenerate} className="card p-4 sm:p-6 rounded-xl border border-white/10 space-y-4">
        <div>
          <label className="label">Topic</label>
          <input
            className="input"
            placeholder="e.g. Passive income, Weight loss myth, AI productivity hack"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Primary Emotion</label>
            <select className="input" value={emotion} onChange={(e) => setEmotion(e.target.value)}>
              {EMOTIONS.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Niche / Style</label>
            <select className="input" value={style} onChange={(e) => setStyle(e.target.value)}>
              {STYLES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Duration (sec)</label>
            <select className="input" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
              {[30, 45, 60].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="btn" disabled={!canGenerate}>
            {loading ? "Generating?" : "Generate Viral Script"}
          </button>
          <button
            type="button"
            className="btn bg-white/10 hover:bg-white/20"
            onClick={() => {
              setTopic("");
              setData(null);
              setError(null);
            }}
          >
            Reset
          </button>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>

      {data && (
        <section className="space-y-6">
          <div className="section">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">1. VIRAL HOOK (???? 3 ?????)</h2>
              <button className="btn bg-white/10 hover:bg-white/20" onClick={() => copy(data.hook)}>Copy</button>
            </div>
            <div className="codeblock">{data.hook}</div>
          </div>

          <div className="section">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">2. FULL SCRIPT (30?60 sec)</h2>
              <button className="btn bg-white/10 hover:bg-white/20" onClick={() => copy(data.fullScript.join("\n"))}>Copy</button>
            </div>
            <div className="codeblock space-y-2">
              {data.fullScript.map((line, i) => (
                <p key={i}>? {line}</p>
              ))}
            </div>
          </div>

          <div className="section">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">3. VOICEOVER TEXT</h2>
              <button className="btn bg-white/10 hover:bg-white/20" onClick={() => copy(data.voiceover.join("\n"))}>Copy</button>
            </div>
            <div className="codeblock space-y-2">
              {data.voiceover.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          <div className="section">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">4. VISUAL SHOTS LIST</h2>
              <button className="btn bg-white/10 hover:bg-white/20" onClick={() => copy(data.visualShots.join("\n"))}>Copy</button>
            </div>
            <div className="codeblock space-y-2">
              {data.visualShots.map((line, i) => (
                <p key={i}>- {line}</p>
              ))}
            </div>
          </div>

          <div className="section">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">5. CAPTIONS</h2>
              <button className="btn bg-white/10 hover:bg-white/20" onClick={() => copy(data.captions.join("\n"))}>Copy</button>
            </div>
            <div className="codeblock space-y-2">
              {data.captions.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          <div className="section">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">6. HASHTAGS</h2>
              <button className="btn bg-white/10 hover:bg-white/20" onClick={() => copy(data.hashtags.join(" "))}>Copy</button>
            </div>
            <div className="codeblock flex flex-wrap gap-2">
              {data.hashtags.map((h, i) => (
                <span key={i} className="px-2 py-1 bg-white/10 rounded-md">{h}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="btn"
              onClick={() => copy([
                "1) VIRAL HOOK:\n" + data.hook,
                "\n2) FULL SCRIPT:\n" + data.fullScript.join("\n"),
                "\n3) VOICEOVER:\n" + data.voiceover.join("\n"),
                "\n4) VISUAL SHOTS:\n" + data.visualShots.join("\n"),
                "\n5) CAPTIONS:\n" + data.captions.join("\n"),
                "\n6) HASHTAGS:\n" + data.hashtags.join(" "),
              ].join("\n\n"))}
            >Copy All</button>
          </div>
        </section>
      )}
    </main>
  );
}
