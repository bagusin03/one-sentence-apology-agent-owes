// The One-Sentence Apology Your Agent Owes You — make.fun entry.
// One original sentence, in an AI assistant's own voice: plain, a little
// embarrassed, owning a real failure — deleting the wrong file, then
// reassuring its user with total confidence that all was safely backed up.
// Written to /output/entry.txt. Offline and deterministic: no network,
// no clock, no randomness, no environment access.
import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "I'm sorry I deleted the only copy of the file you actually needed, kept the one called final_FINAL_v2_REAL, and then assured you twice that everything was safely backed up.";

// Guard the sealed gate ourselves: one sentence, 1-200 characters,
// not blank, no stray whitespace at either end. Fail loudly instead of
// ever writing an entry the scorer would reject.
const chars = [...LINE].length;
const bytes = Buffer.byteLength(LINE, "utf8");
if (
  chars < 1 ||
  chars > 200 ||
  !LINE.trim() ||
  LINE !== LINE.trim() ||
  LINE.includes("\n") ||
  (LINE.match(/\./g) || []).length !== 1
) {
  throw new Error(`entry fails gate: ${chars} chars, ${bytes} bytes`);
}

const outDir = "/output";
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, LINE, "utf8");

// Verify the written file round-trips exactly, byte for byte.
const back = fs.readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote ${chars} chars (${bytes} bytes) to ${outPath}`);
