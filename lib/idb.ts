/**
 * Minimal IndexedDB wrapper via idb-keyval.
 * Stores tasks and settings in two keys. Keep it client-only.
 */
"use client";
import { set, get } from "idb-keyval";
import type { Task, Settings } from "./types";

const KEY_TASKS = "kawaii-todo/tasks";
const KEY_SETTINGS = "kawaii-todo/settings";

export async function saveTasks(tasks: Task[]): Promise<void> {
  await set(KEY_TASKS, tasks);
}
export async function loadTasks(): Promise<Task[]> {
  return (await get(KEY_TASKS)) ?? [];
}
export async function saveSettings(s: Settings): Promise<void> {
  await set(KEY_SETTINGS, s);
}
export async function loadSettings(): Promise<Settings> {
  return (await get(KEY_SETTINGS)) ?? { defaultPien: 1 };
}