export type Script = {
  id: number;
  created_at: string;
  updated_at: string;
  code: string;
  codeLang: string;
  title: string;
  description: string;
  user_id: number;
  views: number;
  likes: number;
  is_public: boolean;
  share_link: string | null;
};
