export interface ProductResult {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  url: string;
  platform: 'Amazon' | 'Ricardo';
}

export interface NLPResult {
  category: string;
  attributes: Record<string, unknown>;
}
