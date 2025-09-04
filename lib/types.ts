export type Task = {
  id: string;
  title: string;
  done: boolean;
  parentId?: string; // undefined means parent
  order: number;
  createdAt: number; // epoch ms
};

export type Settings = {
  defaultPien: number; // 0..4
};