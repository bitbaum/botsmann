# Kigott Blog Content

This repository contains content for the Kigott blog. Each post is stored as an MDX file in its own directory under `posts/`.

## Post Structure

Each post should follow this structure:
- A directory under `posts/` with a URL-friendly name
- An `index.mdx` file containing the post content and frontmatter
- Any media files (images, etc.) stored in the same directory or a `media/` subdirectory

## Frontmatter Format

Each MDX file should begin with frontmatter in this format:

```
---
title: "Post Title"
date: "YYYY-MM-DD"
author: "Author Name"
excerpt: "Brief description of the post"
published: true  # Set to true to publish at next 9am window
tags: ["tag1", "tag2"]  # Optional
featuredImage: "./featured.jpg"  # Optional
---
```

## Publishing Workflow

1. Create a new directory under `posts/`
2. Add your content as `index.mdx` with proper frontmatter
3. Add any images or media to the same directory
4. Set `published: true` when ready to publish
5. The post will go live at the next 9am publishing window

## Rich Media Support

The blog supports various rich media components:

### Images

```markdown
![Alt text](./media/image-name.jpg)
```

### YouTube Videos

```markdown
<YouTube id="video-id" />
```

### Tweets

```markdown
<Tweet id="tweet-id" />
```

### Callouts

```markdown
<Callout type="info">
  Important information goes here.
</Callout>
```

Types: `info`, `warning`, `success`

## Example Structure

```
posts/
├── welcome-post/
│   ├── index.mdx
│   └── featured.jpg
└── test-post/
    ├── index.mdx
    └── media/
        └── example.png
``` 