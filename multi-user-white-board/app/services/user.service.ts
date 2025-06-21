import { adminAuthClient, supabase } from "../lib/initSupabase";

// User session
export const getUserSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

// User profile
export const fetchUserById = async (userId: string) => {
  const { data } = await adminAuthClient.getUserById(userId);
  return data;
};

// User's stream token
export const generateUserVideoToken = async (userId: string) => {
  const res = await fetch("/api/generate-user-video-instance", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  return data;
};