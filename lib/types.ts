export type Post = {
  data: {
    title: string;
    isPublished: boolean;
    publishDate: string;
    alt: string;
    image: string;
    tags: string[];
  };
  slug: string;
  content: string;
};
