/**
 * MLP UI: 1-line input, pien slider, 🪄 button, checklist with DnD.
 * - Calls POST /api/magic to get steps.
 * - Persists to IndexedDB on every mutation.
 * - Keep all logic client-side; no server storage.
 */
"use client";
import { useEffect, useMemo, useState } from "react";
import { loadTasks, saveTasks, loadSettings, saveSettings } from "@/lib/idb";
import type { Task } from "@/lib/types";

export default function Page() {
  const [title, setTitle] = useState("");
  const [pien, setPien] = useState(1);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => { (async () => {
    setTasks(await loadTasks());
    const s = await loadSettings();
    setPien(s.defaultPien ?? 1);
  })(); }, []);

  useEffect(() => { saveTasks(tasks); }, [tasks]);
  useEffect(() => { saveSettings({ defaultPien: pien }); }, [pien]);

  const addParent = () => {
    if (!title.trim()) return;
    const t: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      done: false,
      order: tasks.length,
      createdAt: Date.now(),
    };
    setTasks(prev => [...prev, t]);
    setTitle("");
  };

  const magic = async (parentId: string, taskTitle: string) => {
    const res = await fetch("/api/magic", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: taskTitle, pien }),
    });
    const data = await res.json();
    if (!Array.isArray(data?.steps)) return;
    // Append child steps (flat under parent)
    setTasks(prev => {
      const baseOrder = Math.max(-1, ...prev.map(t => t.order)) + 1;
      const children = data.steps.map((s: string, i: number): Task => ({
        id: crypto.randomUUID(),
        title: s,
        done: false,
        parentId,
        order: baseOrder + i,
        createdAt: Date.now(),
      }));
      return [...prev, ...children];
    });
  };

  const toggle = (id: string) =>
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));

  const parents = useMemo(() => tasks.filter(t => !t.parentId), [tasks]);
  const childrenOf = (pid: string) => tasks.filter(t => t.parentId === pid);

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">kawaii todo 🩷</h1>
      <div className="flex gap-2">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addParent()}
          placeholder="やること書いて、魔法でサクッと分解しよ💖"
          className="flex-1 border rounded px-3 py-2"
        />
        <button onClick={addParent} className="border rounded px-3 py-2">追加</button>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm">ぴえん度🥺</label>
        <input type="range" min={0} max={4} value={pien} onChange={e => setPien(parseInt(e.target.value))} />
        <span className="text-sm">{pien}</span>
        <span className="text-xs opacity-70">※ ぴえんは"細かさの目安"</span>
      </div>

      <ul className="space-y-4">
        {parents.map(p => (
          <li key={p.id} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={p.done} onChange={() => toggle(p.id)} />
                <span className={p.done ? "line-through opacity-70" : ""}>{p.title}</span>
              </label>
              <button onClick={() => magic(p.id, p.title)} className="text-sm border rounded px-2 py-1">🪄 まほう</button>
            </div>
            <ul className="mt-2 pl-6 list-disc">
              {childrenOf(p.id).map(c => (
                <li key={c.id}>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={c.done} onChange={() => toggle(c.id)} />
                    <span className={c.done ? "line-through opacity-70" : ""}>{c.title}</span>
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}