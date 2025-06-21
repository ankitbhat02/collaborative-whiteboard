import { supabase } from "../lib/initSupabase";

const DRAWING_ROOM_TABLE = "drawing-rooms"; // supabase table name

export const createDrawingRoom = async (
  name: string,
  userId: string,
  isPublic: boolean
) => {
  const { data, error } = await supabase
    .from(DRAWING_ROOM_TABLE)
    .insert({
      name,
      owner: userId,
      isPublic,
      isPasswordProtected: false,
      password: null,
    })
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
  }
  return data;
};

export const fetchUserDrawingRooms = async (userId: string) => {
  const { data } = await supabase
    .from(DRAWING_ROOM_TABLE)
    .select()
    .eq("owner", userId)
    .order("created_at", { ascending: false });

  return data;
};

export const fetchDrawingRoomById = async (id: string) => {
  const { data } = await supabase
    .from(DRAWING_ROOM_TABLE)
    .select()
    .eq("id", id);
  return data;
};

export const updateRoomDrawing = async (roomId: string, drawing: any) => {
  await supabase
    .from(DRAWING_ROOM_TABLE)
    .update({
      drawing,
    })
    .eq("id", roomId)
    .select();
};

export const deleteDrawingRoom = async (id: string) => {
  const { error } = await supabase
    .from(DRAWING_ROOM_TABLE)
    .delete()
    .eq("id", id);
  if (error) {
    console.error("Supabase delete error:", error);
    throw error;
  }
};

// Update room name and visibility
export const updateDrawingRoom = async (
  id: string,
  name: string,
  isPublic: boolean
) => {
  const { error } = await supabase
    .from(DRAWING_ROOM_TABLE)
    .update({ name, isPublic })
    .eq("id", id);
  if (error) {
    console.error("Supabase update error:", error);
    throw error;
  }
};