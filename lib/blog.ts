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
const GITHUB_REPO = 'kigott-blog-content';
const GITHUB_BRANCH = 'main';

// Base URL for raw GitHub content
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

// Configuration options
const CONFIG = {
  // Set to true to always use the current date for published posts, even if they have a date
  FORCE_CURRENT_DATE_FOR_PUBLISHED: true,
  // Set to true to enable more verbose logging
  VERBOSE_LOGGING: true
};

// Function to check if a file exists on GitHub
async function fileExistsOnGitHub(path: string): Promise<boolean> {
  try {
    const response = await fetch(`${GITHUB_RAW_BASE}/${path}`, { 
      method: 'HEAD',
      cache: 'no-store'
    });
    return response.ok;
  } catch (error) {
    console.error(`Error checking if file exists: ${path}`, error);
    return false;
  }
}

// Function to get the current date in YYYY-MM-DD format
function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0]; // e.g., "2023-03-05"
}

// Function to determine the post date based on our configuration and the post data
function determinePostDate(data: any): string {
  const currentDate = getCurrentDate();
  
  // If post is published
  if (data.published === true) {
    // If we're forcing current date for all published posts OR if no date is provided
    if (CONFIG.FORCE_CURRENT_DATE_FOR_PUBLISHED || !data.date) {
      if (CONFIG.VERBOSE_LOGGING) {
        console.log(`Using current date (${currentDate}) for published post.`, 
                    data.date ? `Original date was: ${data.date}` : 'No original date was provided.');
      }
      return currentDate;
    }
  }
  
  // Otherwise use the provided date or fallback to current date
  return data.date || currentDate;
}

// Function to fetch all blog posts
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('Fetching all blog posts');
    
    // Fetch all directories in the posts folder
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/posts`,
      { cache: 'no-store' } // No caching needed—daily Cron ensures freshness, and published: true controls visibility
    );
    
    if (!res.ok) {
      console.error('Failed to fetch posts', res.status, res.statusText);
      return [];
    }
    
    const directories = await res.json();
    
    // Process each directory as a potential blog post
    const posts = await Promise.all(
      directories.map(async (dir: any) => {
        if (dir.type !== 'dir') return null;
        
        const slug = dir.name;
        console.log('Processing post directory:', slug);
        
        // Fetch the index.mdx file for this post
        const mdxRes = await fetch(
          `${GITHUB_RAW_BASE}/posts/${slug}/index.mdx`,
          { cache: 'no-store' }
        );
        
        if (!mdxRes.ok) {
          console.error(`Failed to fetch MDX for ${slug}:`, mdxRes.status, mdxRes.statusText);
          return null;
        }
        
        const mdxContent = await mdxRes.text();
        
        // Parse frontmatter and content
        const { data, content } = matter(mdxContent);
        
        // Skip posts that aren't published
        if (data.published !== true) {
          console.log(`Skipping unpublished post: ${slug}`);
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
              console.warn(`Featured image not found for ${slug}: ${featuredImage}`);
              
              // Try alternative image formats
              const fileNameWithoutExt = imagePath.replace(/\.(jpg|jpeg|png|gif|webp|jfif)$/, '');
              
              // Try common image extensions
              for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'jfif']) {
                const altPath = `posts/${slug}/${fileNameWithoutExt}.${ext}`;
                if (await fileExistsOnGitHub(altPath)) {
                  featuredImage = `${GITHUB_RAW_BASE}/${altPath}`;
                  console.log(`Found alternative featured image for ${slug}: ${featuredImage}`);
                  break;
                }
              }
            }
          } catch (error) {
            console.error(`Error checking featured image for ${slug}:`, error);
            featuredImage = undefined;
          }
        }
        
        return {
          slug,
          title: data.title,
          date: postDate,
          author: data.author || 'Kigott Team',
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
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

// Function to fetch a single blog post by slug
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log('Fetching blog post for slug:', slug);
    
    if (!slug) {
      console.error('Attempted to fetch blog post with empty slug');
      return null;
    }
    
    // Fetch the index.mdx file for this post
    const mdxRes = await fetch(
      `${GITHUB_RAW_BASE}/posts/${slug}/index.mdx`,
      { cache: 'no-store' } // Always fetch fresh content
    );
    
    if (!mdxRes.ok) {
      console.error(`Failed to fetch post for ${slug}:`, mdxRes.status, mdxRes.statusText);
      return null;
    }
    
    const mdxContent = await mdxRes.text();
    
    // Parse frontmatter and content
    const { data, content } = matter(mdxContent);
    
    // Skip posts that aren't published
    if (data.published !== true) {
      console.log(`Skipping unpublished post: ${slug}`);
      return null;
    }
    
    // Determine the post date based on our configuration
    const postDate = determinePostDate(data);
    
    if (CONFIG.VERBOSE_LOGGING) {
      console.log(`Post date for ${slug}:`, postDate, 
                  data.date ? `Original date: ${data.date}` : 'No original date found');
    }
    
    // Process featured image
    let featuredImage: string | undefined = undefined;
    
    if (data.featuredImage) {
      // Remove ./ prefix if present
      const imagePath = data.featuredImage.replace(/^\.\//, '');
      featuredImage = `${GITHUB_RAW_BASE}/posts/${slug}/${imagePath}`;
      
      // Log the resolved featured image URL
      if (CONFIG.VERBOSE_LOGGING) {
        console.log(`Resolved featured image for ${slug}:`, featuredImage);
      }
      
      // Verify the image exists
      const imageExists = await fileExistsOnGitHub(`posts/${slug}/${imagePath}`);
      if (!imageExists) {
        console.warn(`Featured image not found: ${featuredImage}`);
        
        // Try alternative formats
        const fileNameWithoutExt = imagePath.replace(/\.(jpg|jpeg|png|gif|webp|jfif)$/, '');
        
        for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'jfif']) {
          const altPath = `posts/${slug}/${fileNameWithoutExt}.${ext}`;
          if (await fileExistsOnGitHub(altPath)) {
            featuredImage = `${GITHUB_RAW_BASE}/${altPath}`;
            console.log(`Found alternative featured image: ${featuredImage}`);
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
      author: data.author || 'Kigott Team',
      excerpt: data.excerpt || '',
      content,
      tags: data.tags || [],
      featuredImage
    };
  } catch (error) {
    console.error(`Failed to fetch post for ${slug}:`, error);
    return null;
  }
} 