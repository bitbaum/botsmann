'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DetailedHTMLProps, ImgHTMLAttributes, useState, useEffect } from 'react';
import { useContext } from 'react';

// Helper function to transform image paths
const transformImageSrc = (src: string, slug: string) => {
  if (!src) return '';
  
  // If it's already an absolute URL, return it as is
  if (src.startsWith('http')) return src;
  
  // If no slug is provided, return the original src
  if (!slug) return src;
  
  // If it's a relative path, convert to GitHub raw URL
  if (src.startsWith('./') || src.startsWith('../')) {
    const imagePath = src.replace(/^\.\//, ''); // Remove leading ./
    return `https://raw.githubusercontent.com/g-but/kigott-blog-content/main/posts/${slug}/${imagePath}`;
  }
  
  // Return the original src if it doesn't match any criteria
  return src;
};

// Function to safely handle image errors by attempting to find alternative formats
const useAlternativeImageFormat = async (src: string): Promise<string | null> => {
  if (!src) return null;
  
  // Try with a different extension if loading fails
  if (src.endsWith('.jpg')) {
    // Try .jfif as alternative
    const jfifSrc = src.replace(/\.jpg$/, '.jfif');
    try {
      const response = await fetch(jfifSrc, { method: 'HEAD' });
      if (response.ok) return jfifSrc;
    } catch (error) {
      console.error('Failed to check jfif alternative', error);
    }
  } else if (src.endsWith('.jfif')) {
    // Try .jpg as alternative
    const jpgSrc = src.replace(/\.jfif$/, '.jpg');
    try {
      const response = await fetch(jpgSrc, { method: 'HEAD' });
      if (response.ok) return jpgSrc;
    } catch (error) {
      console.error('Failed to check jpg alternative', error);
    }
  }
  
  // No viable alternative found
  return null;
};

// Define custom MDX components with Tailwind styling
const MDXComponents = {
  // Headings
  h1: (props: any) => (
    <h1 className="mb-8 text-4xl font-semibold tracking-tight text-gray-900" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="mb-4 mt-8 text-2xl font-semibold text-gray-900" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="mb-4 mt-6 text-xl font-semibold text-gray-900" {...props} />
  ),
  
  // Text elements
  p: (props: any) => (
    <p className="mb-4 text-gray-600" {...props} />
  ),
  ul: (props: any) => (
    <ul className="mb-4 list-disc pl-6 text-gray-600" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-4 list-decimal pl-6 text-gray-600" {...props} />
  ),
  li: (props: any) => (
    <li className="mb-2" {...props} />
  ),
  a: ({ href, ...props }: any) => {
    const isExternal = href?.startsWith('http');
    
    if (isExternal) {
      return (
        <a 
          href={href}
          className="text-brand-500 hover:text-opacity-80"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }
    
    return (
      <Link 
        href={href} 
        className="text-brand-500 hover:text-opacity-80"
        {...props}
      />
    );
  },
  
  // Media elements
  img: (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & { slug?: string }) => {
    const { src, alt, slug } = props;
    const [imageSrc, setImageSrc] = useState<string>('');
    const [isError, setIsError] = useState(false);
    
    if (!src) {
      console.error('Image source missing');
      return <div className="my-8 p-4 bg-red-50 text-red-500">Image source missing</div>;
    }
    
    // Extract slug from URL if not provided directly
    useEffect(() => {
      // Log the image source and slug for debugging
      console.log('MDX img processing:', { src, slug });
      
      // Get the slug from props or extract from URL
      let contextSlug = typeof slug === 'string' ? slug : '';
      
      // If slug is not provided directly, try to extract from URL pathname
      if (!contextSlug && typeof window !== 'undefined') {
        const urlPath = window.location.pathname;
        const pathParts = urlPath.split('/');
        // Assuming URL structure is /blog/[slug]
        if (pathParts.length >= 3 && pathParts[1] === 'blog') {
          contextSlug = pathParts[2];
          console.log('Extracted slug from URL:', contextSlug);
        }
      }
      
      // Use welcome-post as a last resort fallback, but we should never need this
      // if the ClientMDXContent is passing the slug correctly
      if (!contextSlug) {
        contextSlug = 'welcome-post';
        console.log('Using fallback slug as last resort:', contextSlug);
      }
      
      try {
        let fullSrc = '';
        
        if (src.startsWith('http')) {
          // If it's already an absolute URL, use it as is
          fullSrc = src;
        } else if (src.startsWith('./') || src.startsWith('../')) {
          // If it's a relative path and we have a slug, convert to GitHub raw URL
          if (!contextSlug) {
            console.error('Missing slug for relative image path:', src);
            setIsError(true);
            return;
          }
          
          const imagePath = src.replace(/^\.\//, ''); // Remove leading ./
          fullSrc = `https://raw.githubusercontent.com/g-but/kigott-blog-content/main/posts/${contextSlug}/${imagePath}`;
          console.log('Using dynamic slug for image path:', { contextSlug, imagePath, fullSrc });
        } else {
          // For any other format, just use the src as is
          fullSrc = src;
        }
        
        // Log the processed image source for debugging
        console.log('Processed image source:', fullSrc);
        setImageSrc(fullSrc);
      } catch (error) {
        console.error('Error processing image:', error);
        setIsError(true);
      }
    }, [src, slug]);
    
    if (isError) {
      return <div className="my-8 p-4 bg-red-50 text-red-500">Failed to load image</div>;
    }
    
    if (!imageSrc) {
      return <div className="my-8 p-4 bg-gray-50 text-gray-500">Loading image...</div>;
    }
    
    // Check for alternative formats when the image fails to load
    const handleImageError = () => {
      console.error('Image load error:', imageSrc);
      
      // Try alternative format
      if (imageSrc.endsWith('.jpg')) {
        const jfifSrc = imageSrc.replace(/\.jpg$/, '.jfif');
        console.log('Trying alternative format:', jfifSrc);
        setImageSrc(jfifSrc);
      } else if (imageSrc.endsWith('.jfif')) {
        const jpgSrc = imageSrc.replace(/\.jfif$/, '.jpg');
        console.log('Trying alternative format:', jpgSrc);
        setImageSrc(jpgSrc);
      } else {
        setIsError(true);
      }
    };
    
    return (
      <div className="my-8">
        <Image 
          src={imageSrc}
          alt={alt || ''}
          width={800}
          height={450}
          className="rounded-lg"
          onError={handleImageError}
        />
        {alt && <p className="mt-2 text-sm text-gray-500 italic">{alt}</p>}
      </div>
    );
  },
  
  // Custom components
  YouTube: ({ id }: { id: string }) => (
    <div className="my-8 aspect-video overflow-hidden rounded-lg">
      <iframe 
        src={`https://www.youtube.com/embed/${id}`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  ),
  
  Tweet: ({ id }: { id: string }) => (
    <div className="my-8">
      <blockquote className="twitter-tweet">
        <a href={`https://twitter.com/x/status/${id}`}>Loading tweet...</a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </div>
  ),
  
  // Callout component for important information
  Callout: ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'success' }) => {
    const styles = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      success: 'bg-green-50 border-green-200 text-green-800'
    };
    
    // Ensure type is a valid value
    const safeType = (type && ['info', 'warning', 'success'].includes(type)) ? type : 'info';
    
    return (
      <div className={`my-6 rounded-lg border-l-4 p-4 ${styles[safeType]}`}>
        {children}
      </div>
    );
  }
};

export default MDXComponents; 