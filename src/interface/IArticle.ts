export default interface IArticle {
  id: number;
  liked: number;
  shared: number;
  pricing: "Premium" | "Free";
  category: "Unwind" | "Lawyers Spotlight" | "Curated News";
  title: string;
  opening: string;
  author: string;
  thumbnail: string;
  content: string[];
  identifier: string;
  createdAt: Date;
  updatedAt: Date;
}
