import matter from 'gray-matter';

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

// Function to fetch all blog posts
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    // Fetch all directories in the posts folder
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/posts`,
      { cache: 'no-store' } // No caching needed—daily Cron ensures freshness, and published: true controls visibility
    );
    
    if (!res.ok) {
      console.error('Failed to fetch posts');
      return [];
    }
    
    const directories = await res.json();
    
    // Process each directory as a potential blog post
    const posts = await Promise.all(
      directories.map(async (dir: any) => {
        if (dir.type !== 'dir') return null;
        
        const slug = dir.name;
        
        // Fetch the index.mdx file for this post
        const mdxRes = await fetch(
          `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/posts/${slug}/index.mdx`,
          { cache: 'no-store' }
        );
        
        if (!mdxRes.ok) return null;
        
        const mdxContent = await mdxRes.text();
        
        // Parse frontmatter and content
        const { data, content } = matter(mdxContent);
        
        // Skip posts that aren't published
        if (data.published !== true) {
          return null;
        }
        
        // Check for featured image
        let featuredImage: string | undefined = undefined;
        
        if (data.featuredImage) {
          featuredImage = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/posts/${slug}/${data.featuredImage.replace(/^\.\//, '')}`;
        }
        
        return {
          slug,
          title: data.title,
          date: data.date,
          author: data.author || 'Botsmann Team',
          excerpt: data.excerpt || '',
          content,
          tags: data.tags || [],
          featuredImage
        };
      })
    );
    
    // Filter out null values and sort by date (newest first)
    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Failed to fetch posts');
    return [];
  }
}

// Function to fetch a single blog post by slug
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Fetch the index.mdx file for this post
    const mdxRes = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/posts/${slug}/index.mdx`,
      { cache: 'no-store' } // Always fetch fresh content
    );
    
    if (!mdxRes.ok) {
      console.error('Failed to fetch post');
      return null;
    }
    
    const mdxContent = await mdxRes.text();
    
    // Parse frontmatter and content
    const { data, content } = matter(mdxContent);
    
    // Skip posts that aren't published
    if (data.published !== true) {
      return null;
    }
    
    // Check for featured image
    let featuredImage: string | undefined = undefined;
    
    if (data.featuredImage) {
      featuredImage = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/posts/${slug}/${data.featuredImage.replace(/^\.\//, '')}`;
    }
    
    // Return the blog post data
    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author || 'Botsmann Team',
      excerpt: data.excerpt || '',
      content,
      tags: data.tags || [],
      featuredImage
    };
  } catch (error) {
    console.error('Failed to fetch post');
    return null;
  }
} 