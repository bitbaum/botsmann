import matter from 'gray-matter';
import { toDateString } from './format';

// Interface for blog post metadata and content
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  tags?: string[];
  featuredImage?: string;
}

// GitHub repository configuration
const GITHUB_USERNAME = 'g-but';
const GITHUB_REPO = 'botsmann-blog-content';
const GITHUB_BRANCH = 'main';

// Base URL for raw GitHub content
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

// Configuration options
const CONFIG = {
  // Set to true to always use the current date for published posts, even if they have a date
  FORCE_CURRENT_DATE_FOR_PUBLISHED: true,
};

// Revalidation time in seconds (1 hour) - enables ISR instead of forcing dynamic rendering
const REVALIDATE_INTERVAL = 3600;

// Function to check if a file exists on GitHub
async function fileExistsOnGitHub(path: string): Promise<boolean> {
  try {
    const response = await fetch(`${GITHUB_RAW_BASE}/${path}`, {
      method: 'HEAD',
      next: { revalidate: REVALIDATE_INTERVAL },
    });
    return response.ok;
  } catch {
    return false;
  }
}

// Function to determine the post date based on our configuration and the post data
function determinePostDate(data: { published?: boolean; date?: string }): string {
  const currentDate = toDateString();

  // If post is published
  if (data.published === true) {
    // If we're forcing current date for all published posts OR if no date is provided
    if (CONFIG.FORCE_CURRENT_DATE_FOR_PUBLISHED || !data.date) {
      return currentDate;
    }
  }

  // Otherwise use the provided date or fallback to current date
  return data.date || currentDate;
}

// Function to fetch all blog posts
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    // Fetch all directories in the posts folder
    // Use ISR with revalidation instead of no-store to support static generation
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/posts`,
      { next: { revalidate: REVALIDATE_INTERVAL } },
    );

    if (!res.ok) {
      return [];
    }

    const directories = await res.json();

    // Process each directory as a potential blog post
    const posts = await Promise.all(
      directories.map(async (dir: { type: string; name: string }) => {
        if (dir.type !== 'dir') return null;

        const slug = dir.name;

        // Fetch the index.mdx file for this post
        const mdxRes = await fetch(`${GITHUB_RAW_BASE}/posts/${slug}/index.mdx`, {
          next: { revalidate: REVALIDATE_INTERVAL },
        });

        if (!mdxRes.ok) {
          return null;
        }

        const mdxContent = await mdxRes.text();

        // Parse frontmatter and content
        const { data, content } = matter(mdxContent);

        // Skip posts that aren't published
        if (data.published !== true) {
          return null;
        }

        // Determine the post date based on our configuration
        const postDate = determinePostDate(data);

        // Process featured image
        let featuredImage: string | undefined = undefined;

        if (data.featuredImage) {
          // Remove ./ prefix if present
          const imagePath = data.featuredImage.replace(/^\.\//, '');
          featuredImage = `${GITHUB_RAW_BASE}/posts/${slug}/${imagePath}`;

          // Verify the image exists
          try {
            const imageExists = await fileExistsOnGitHub(`posts/${slug}/${imagePath}`);
            if (!imageExists) {
              // Try alternative image formats
              const fileNameWithoutExt = imagePath.replace(/\.(jpg|jpeg|png|gif|webp|jfif)$/, '');

              // Try common image extensions
              for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'jfif']) {
                const altPath = `posts/${slug}/${fileNameWithoutExt}.${ext}`;
                if (await fileExistsOnGitHub(altPath)) {
                  featuredImage = `${GITHUB_RAW_BASE}/${altPath}`;
                  break;
                }
              }
            }
          } catch {
            featuredImage = undefined;
          }
        }

        return {
          slug,
          title: data.title,
          date: postDate,
          author: data.author || 'Botsmann Team',
          excerpt: data.excerpt || '',
          content,
          tags: data.tags || [],
          featuredImage,
        };
      }),
    );

    // Filter out null values and sort by date (newest first)
    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

// Function to fetch a single blog post by slug
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    if (!slug) {
      return null;
    }

    // Fetch the index.mdx file for this post
    // Use ISR with revalidation instead of no-store to support static generation
    const mdxRes = await fetch(`${GITHUB_RAW_BASE}/posts/${slug}/index.mdx`, {
      next: { revalidate: REVALIDATE_INTERVAL },
    });

    if (!mdxRes.ok) {
      return null;
    }

    const mdxContent = await mdxRes.text();

    // Parse frontmatter and content
    const { data, content } = matter(mdxContent);

    // Skip posts that aren't published
    if (data.published !== true) {
      return null;
    }

    // Determine the post date based on our configuration
    const postDate = determinePostDate(data);

    // Process featured image
    let featuredImage: string | undefined = undefined;

    if (data.featuredImage) {
      // Remove ./ prefix if present
      const imagePath = data.featuredImage.replace(/^\.\//, '');
      featuredImage = `${GITHUB_RAW_BASE}/posts/${slug}/${imagePath}`;

      // Verify the image exists
      const imageExists = await fileExistsOnGitHub(`posts/${slug}/${imagePath}`);
      if (!imageExists) {
        // Try alternative formats
        const fileNameWithoutExt = imagePath.replace(/\.(jpg|jpeg|png|gif|webp|jfif)$/, '');

        for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'jfif']) {
          const altPath = `posts/${slug}/${fileNameWithoutExt}.${ext}`;
          if (await fileExistsOnGitHub(altPath)) {
            featuredImage = `${GITHUB_RAW_BASE}/${altPath}`;
            break;
          }
        }
      }
    }

    // Return the blog post data
    return {
      slug,
      title: data.title,
      date: postDate,
      author: data.author || 'Botsmann Team',
      excerpt: data.excerpt || '',
      content,
      tags: data.tags || [],
      featuredImage,
    };
  } catch {
    return null;
  }
}
