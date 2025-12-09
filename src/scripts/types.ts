export type Speaker = {
  name: string;
  title: string;
  talk_title?: string;
  role: "speaker" | "panelist";
  bio: string[];
  image: string;
};

export type Abstract = {
  id: string | number;
  title: string;
  authors: string[];
  pdf?: string;
};
