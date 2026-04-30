import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://yfmymnrzxouytxbvsgxw.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmbXltbnJ6eG91eXR4YnZzZ3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1Nzc2NjksImV4cCI6MjA5MzE1MzY2OX0.qqpk25nj6M1Pyz4cRVyqOCTUEvbt0CzGBppZgcXl1Jk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          course_id: string;
          course_name: string;
          interests: string[];
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      help_tickets: {
        Row: {
          id: number;
          user_id: string;
          subject: string;
          description: string;
          status: "Pending" | "Resolved";
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["help_tickets"]["Row"],
          "id" | "created_at" | "status"
        >;
        Update: Partial<Database["public"]["Tables"]["help_tickets"]["Insert"]>;
      };
    };
  };
};
