interface Room {
  id: number;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

interface Meta {
  page: number;
  take: number;
  itemCount: number;
  previosPage: number | boolean;
  nextPage: number | boolean;
}

export type { Room, Meta };