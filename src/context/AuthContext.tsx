import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export interface UserData {
  id: string;
  name: string;
  email: string;
  courseId: string;
  courseName: string;
  interests: string[];
}

interface AuthContextType {
  user: UserData | null;
  session: Session | null;
  loading: boolean;
  register: (
    name: string,
    email: string,
    password: string,
    courseId: string,
    courseName: string
  ) => Promise<{ error: string | null }>;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  updateInterests: (interests: string[]) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function profileToUser(profile: {
  id: string;
  email: string;
  name: string;
  course_id: string;
  course_name: string;
  interests: string[];
}): UserData {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    courseId: profile.course_id,
    courseName: profile.course_name,
    interests: profile.interests ?? [],
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(supabaseUser: User) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supabaseUser.id)
        .single();
      if (data && !error) setUser(profileToUser(data));
    } catch {
      // profile fetch failed — user stays null, app continues
    }
  }

  useEffect(() => {
    let settled = false;

    // Safety net: if Supabase never responds, unblock the app after 5s
    const timeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        setLoading(false);
      }
    }, 5000);

    supabase.auth
      .getSession()
      .then(async ({ data: { session } }) => {
        setSession(session);
        if (session?.user) {
          await loadProfile(session.user);
        }
      })
      .catch(() => {
        // network error — proceed as logged out
      })
      .finally(() => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          setLoading(false);
        }
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        loadProfile(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const register = async (
    name: string,
    email: string,
    password: string,
    courseId: string,
    courseName: string
  ): Promise<{ error: string | null }> => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, course_id: courseId, course_name: courseName } },
      });
      if (error) return { error: error.message };

      const { error: loginErr } = await supabase.auth.signInWithPassword({ email, password });
      if (loginErr) return { error: loginErr.message };
      return { error: null };
    } catch {
      return { error: "Could not connect to the server. Please try again." };
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: "Invalid email or password." };
      return { error: null };
    } catch {
      return { error: "Could not connect to the server. Please try again." };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const updateInterests = async (interests: string[]) => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ interests })
      .eq("id", user.id);
    if (!error) setUser({ ...user, interests });
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, register, login, logout, updateInterests }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
