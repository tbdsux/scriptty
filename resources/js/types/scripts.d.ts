export type Script = {
  id: number;
  created_at: string;
  updated_at: string;
  code: string;
  code_lang: string;
  title: string;
  description: string;
  user_id: number;
  views: number;
  likes: number;
  is_public: boolean;
  is_global: boolean;
  slug: string;
};
