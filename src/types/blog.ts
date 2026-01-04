export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  categories?: string[];
  tags?: string[];
}

export interface BlogFeed {
  posts: BlogPost[];
  total: number;
  page: number;
  perPage: number;
}
