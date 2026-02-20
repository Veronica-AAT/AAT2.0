import fs from "fs";
import path from "path";
import { parse } from "yaml";

const contentDir = path.join(process.cwd(), "content");

export function loadContent<T = Record<string, unknown>>(filename: string): T {
  const filePath = path.join(contentDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return parse(raw) as T;
}
