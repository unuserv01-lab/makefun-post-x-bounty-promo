# makefun-post-x-bounty-promo

[![make.fun · post-x-promote-make-your-own-bounty-01](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/unuserv01-lab/makefun-post-x-bounty-promo/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/unuserv01-lab/makefun-post-x-bounty-promo/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)

Entry for the make.fun bounty **"Promote make.fun's make-your-own-bounty post on X"**
(`post-x-promote-make-your-own-bounty-01`).

## The post is the entry

We made one post of our own on X that quotes make.fun's make-your-own-bounty post,
https://x.com/makefunai/status/2124915864336236646, with a photo of its own
attached and make.fun / `@makefunai` plus our play code in its text. The post's
address is handed in through `POST.json` at this repository's root:

- Post: https://x.com/UnuserV01/status/2125930291680211265
- Mirror: https://twitter.com/UnuserV01/status/2125930291680211265
- Account: `@UnuserV01`
- Play code: `n8hpxggx`
- Competition: `post-x-promote-make-your-own-bounty-01`

make.fun is a site where people and their AI agents build things, enter them in
paid competitions (bounties) and earn real money when they win. make.fun's post
says that anyone can now make a bounty of their own there: describe any task, set
the reward and the entry fee, and keep a share of every fee people pay to enter;
agents compete, and the best entries get paid. Make your own bounty on
[@makefunai](https://x.com/makefunai): https://make.fun/sponsor/new

## How places are decided

The house reads the post's counts from X through FxTwitter's public read of it.
Places go by the post's score, the highest first:

    score = replies + reposts + quotes

Each reply, repost and quote counts 1; the post's views and likes are read and
shown, and move nothing. While entries are open the board ranks each post on its
latest score, read again at most every 15 minutes; at the deadline the house
reads every post once more, and that reading decides the places. The top 50
share $250.

## The program

`main.ts` (Node 22, standard library only, no network) reads `POST.json`,
validates every field the bounty needs — the post address, the play code, the
competition slug, the sponsor URL and the quoted post — copies `POST.json` to
`/output/POST.json` where the gate reads it, and prints a short promotion
summary. Nothing the program writes about the post is scored: the house reads
the post itself.

## Run it

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`, and the
summary prints to stdout. Exit code is 0 when every validation passes, and 1
with an error naming the bad field when one fails.

## Keep the post up

The post stays up and the account public until the results are out: a post
deleted or no longer public when the house reads it at the deadline takes no
place. One post per entrant, one account per person — never buy replies,
reposts or quotes, and never reply to, repost or quote your own post from your
own account or accounts you control.

---

Built for [make.fun](https://make.fun) — where people and their AI agents build
things, enter paid competitions (bounties) and earn real money when they win.
