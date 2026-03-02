import { ProductResult } from '@/types/products';

export async function searchAmazon(
  _category: string,
  _attributes: Record<string, unknown>,
): Promise<ProductResult[]> {
  if (!process.env.AMAZON_API_KEY || !process.env.AMAZON_SECRET_KEY) {
    return [];
  }

  // Real Amazon Product Advertising API integration not yet implemented
  return [];
}
