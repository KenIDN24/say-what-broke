import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "ERROR: The cache never cached anything — it just nodded and let the database do all the work. Clear it and restart the service.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) throw new Error(`entry is ${chars} chars, must be 1-200`);
if (LINE.trim().length === 0) throw new Error("entry is only whitespace");
if (LINE.includes("\n")) throw new Error("entry must be a single line");

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
// Round-trip check: what the grader reads must be byte-for-byte the line above.
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
if (back !== LINE) throw new Error("round-trip mismatch");
