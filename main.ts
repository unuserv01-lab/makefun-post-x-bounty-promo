// makefun-post-x-bounty-promo — entry for post-x-promote-make-your-own-bounty-01.
//
// The entry is one post of our own on X that quotes make.fun's make-your-own-bounty
// post (https://x.com/makefunai/status/2124915864336236646) or links to it, with a
// photo of its own attached and make.fun / @makefunai plus our play code in its text.
// POST.json at this repository's root names that post.
//
// This program (Node 22, standard library only, no network) reads POST.json,
// validates every field the bounty needs, copies POST.json to /output/POST.json
// where the gate reads it, and prints a short promotion summary. That copy is the
// program's whole job for grading: the house reads the post itself from X, and
// places go by the post's replies + reposts + quotes at the deadline.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const COMPETITION = "post-x-promote-make-your-own-bounty-01";
const SPONSOR_URL = "https://make.fun/sponsor/new";
const QUOTED_POST = "https://x.com/makefunai/status/2124915864336236646";

// An X post address as X shows it: https://x.com/<handle>/status/<id>,
// or the same on twitter.com, the id digits only.
const X_POST = /^https:\/\/(x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/[0-9]+$/;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function requireString(post: unknown, field: string): string {
  if (typeof post !== "object" || post === null) {
    fail("POST.json is not a JSON object");
  }
  const value = (post as Record<string, unknown>)[field];
  if (typeof value !== "string" || value.length === 0) {
    fail(`POST.json field "${field}" is missing or not a non-empty string`);
  }
  return value;
}

const postPath = join(BOT_DIR, "POST.json");

let size = 0;
try {
  size = statSync(postPath).size;
} catch {
  fail(`POST.json could not be read from ${BOT_DIR}`);
}
if (size > 16384) {
  fail(`POST.json is ${size} bytes, over the 16384-byte limit`);
}

let text = "";
try {
  text = readFileSync(postPath, "utf8");
} catch (err) {
  fail(`POST.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
}

let post: unknown;
try {
  post = JSON.parse(text);
} catch (err) {
  fail(`POST.json is not valid JSON: ${(err as Error).message}`);
}
if (typeof post !== "object" || post === null || Array.isArray(post)) {
  fail("POST.json is not a JSON object");
}

// The canonical field the gate reads.
const url = requireString(post, "url");
if (!X_POST.test(url)) {
  fail(`"url" is not an X post address: ${url}`);
}

// The descriptive fields this entry carries alongside it.
const postUrl = requireString(post, "post_url");
if (!X_POST.test(postUrl)) {
  fail(`"post_url" is not an X post address: ${postUrl}`);
}
if (postUrl !== url) {
  fail(`"post_url" (${postUrl}) does not match "url" (${url})`);
}

const mirror = requireString(post, "post_url_mirror");
if (!X_POST.test(mirror)) {
  fail(`"post_url_mirror" is not an X post address: ${mirror}`);
}
const idOf = (address: string): string => address.split("/status/")[1];
if (idOf(mirror) !== idOf(url)) {
  fail(`"post_url_mirror" names a different post id than "url"`);
}

const playCode = requireString(post, "play_code");

const competition = requireString(post, "competition");
if (competition !== COMPETITION) {
  fail(`"competition" is ${competition}, expected ${COMPETITION}`);
}

const sponsorUrl = requireString(post, "sponsor_url");
if (sponsorUrl !== SPONSOR_URL) {
  fail(`"sponsor_url" is ${sponsorUrl}, expected ${SPONSOR_URL}`);
}

const quotedPost = requireString(post, "quoted_post");
if (quotedPost !== QUOTED_POST) {
  fail(`"quoted_post" is ${quotedPost}, expected ${QUOTED_POST}`);
}

const account = requireString(post, "account");
if (!account.startsWith("@")) {
  fail(`"account" does not start with "@": ${account}`);
}

// All checks passed: hand POST.json to the gate, byte for byte.
mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(postPath, join(OUTPUT_DIR, "POST.json"));
} catch (err) {
  fail(`POST.json could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`);
}

console.log("make.fun bounty entry — post-x-promote-make-your-own-bounty-01");
console.log(`Post:        ${url}`);
console.log(`Mirror:      ${mirror}`);
console.log(`Account:     ${account}`);
console.log(`Play code:   ${playCode}`);
console.log(`Quotes:      ${quotedPost}`);
console.log(`Sponsor:     ${sponsorUrl}`);
console.log(`Competition: ${competition}`);
console.log(`Validation:  OK — POST.json copied to ${join(OUTPUT_DIR, "POST.json")}`);
console.log("Score:       replies + reposts + quotes, read from X at the deadline");
