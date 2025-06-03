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

export type WithAuthor<T> = T & {
  author: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
};
