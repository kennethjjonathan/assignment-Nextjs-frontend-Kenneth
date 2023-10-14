export default interface IArticle {
  id: number;
  liked: number;
  shared: number;
  isPremium: boolean;
  category: "Unwind" | "Lawyers Spotlight" | "Curated News";
  title: string;
  opening?: string;
  author: string;
  thumbnail: string;
  content: string[];
  createdAt: Date;
  updatedAt: Date;
}
