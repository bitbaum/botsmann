# Botsmann content: the blog and the Knowledge Center

**Created:** 2026-01-07  
**Last modified:** 2026-09-30  
**Last modified summary:** Rewritten for the current system. Posts and guides are markdown files in this repo, read by bip-kit 0.5's collection reader; the separate MDX content repo, its components and the 9am publishing window are gone.

Both surfaces are markdown files in `content/`, committed and reviewed like
code, and rendered by [bip-kit](https://github.com/bitbaum/bip-kit), the
studio's shared long-form package.

| Surface                    | Folder                                                           | Reader             | Pages                                           |
| -------------------------- | ---------------------------------------------------------------- | ------------------ | ----------------------------------------------- |
| Blog                       | `content/blog/*.md`                                              | `lib/blog.ts`      | `/blog`, `/blog/[slug]`                         |
| Guides                     | `content/knowledge/guides/{beginner,intermediate,advanced}/*.md` | `lib/knowledge.ts` | `/knowledge/guides`, `/knowledge/guides/[slug]` |
| Infrastructure comparisons | `content/knowledge/infrastructure/*.md`                          | `lib/knowledge.ts` | `/knowledge/infrastructure`                     |

Both readers call `readCollection` / `readEntry` from `bip-kit/node`. Rendering
goes through `lib/longform/parse.ts` (bip-kit's `normalizeMarkdown`, then its
parser) and `lib/longform/LongformBody.tsx`.

## A blog post

`content/blog/<slug>.md`; the file name is the URL.

```yaml
---
title: 'Post Title'
date: '2026-09-30'
author: 'Botsmann Team'
excerpt: 'Brief description of the post'
published: true
tags: ['announcement', 'ai']
featuredImage: '/blog/<slug>/featured.jpg'
---
```

## A guide

`content/knowledge/guides/<difficulty>/<slug>.md`.

```yaml
---
title: 'Building Your First AI Chatbot'
description: 'One sentence for the index card'
difficulty: 'Beginner'
readTime: '15 min'
author: 'Botsmann Team'
publishedAt: '2026-01-12'
tags: ['chatbot', 'getting-started']
prerequisites: []
category: 'getting-started'
published: true
---
```

## Rules

- **Only `published: true` ships.** Anything else stays out of the index and its
  URL returns 404. (bip-kit alone would publish anything not marked as a draft;
  Botsmann is stricter on purpose.)
- **Dates are `YYYY-MM-DD`.** Anything else fails the build and names the file.
- **The title comes from frontmatter**; without one, the body's first `# heading`.
- `readTime` is optional; by default it is computed from the body.
- Images live in `public/` and are referenced by absolute path.

The body is markdown in bip-kit's vocabulary: headings from `##` down, lists,
quotes, tables, code, images and figures, callouts (`> [!NOTE]`), YouTube and
Vimeo links on their own line, charts and stats fences. `* ` bullets, nested
items and a body `# h1` are normalized for you. There is no JSX: a markdown file
cannot run code. See the bip-kit README for the full vocabulary.

`tests/__tests__/lib/longform-content.test.ts` parses every committed file
through the same pipeline the pages use.
