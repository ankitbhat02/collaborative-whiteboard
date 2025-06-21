"use client";

import React, { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { RoomCard, RoomCardSkeleton } from "./RoomCard";
import NewRoomModal from "./NewRoomModal";
import { fetchUserDrawingRooms, deleteDrawingRoom, updateDrawingRoom } from "@/app/services/drawing-room.service";
import Header from "./Header";

type Session = {
  user?: {
    id?: string;
    user_metadata?: {
      userName?: string;
    };
  };
};

type RoomType = {
  id: string;
  name: string;
  created_at: string;
  isPublic: boolean;
  owner: string;
};

type EditRoomState = {
  id: string;
  name: string;
  isPublic: boolean;
} | null;

type Props = {
  session: Session | null;
};

const DashboardBody = (props: Props) => {
  const { session } = props;
  const pathname = usePathname();
  const isDashboard = pathname === "/";

  const [rooms, setRooms] = useState<RoomType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreateRoomModal, setShowCreateRoomModal] =
    useState<boolean>(false);
  const [editRoom, setEditRoom] = useState<EditRoomState>(null);
  const [editLoading, setEditLoading] = useState(false);

  // Conditions
  const hasNotCreatedARoom = !loading && rooms?.length === 0;
  const hasAtLeastOneRoom = rooms && rooms!.length >= 0;
  const shouldShowRoom = !loading && hasAtLeastOneRoom;

  const loadUserDrawingRooms = useCallback(async () => {
    return fetchUserDrawingRooms(session?.user?.id || '').then((res) => {
      setRooms(res);
    });
  }, [session?.user?.id]);

  const handleDeleteRoom = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this room? This action cannot be undone.")) return;
    try {
      await deleteDrawingRoom(id);
      setRooms((prev) => prev?.filter((room) => room.id !== id) || []);
    } catch {
      alert("Failed to delete room. Please try again.");
    }
  };

  const handleEditRoom = (id: string, name: string, isPublic: boolean) => {
    setEditRoom({ id, name, isPublic });
  };

  const handleEditRoomSave = async () => {
    if (!editRoom) return;
    setEditLoading(true);
    try {
      await updateDrawingRoom(editRoom.id, editRoom.name, editRoom.isPublic);
      setRooms((prev) => prev?.map((room) =>
        room.id === editRoom.id ? { ...room, name: editRoom.name, isPublic: editRoom.isPublic } : room
      ) || []);
      setEditRoom(null);
    } catch {
      alert("Failed to update room. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      loadUserDrawingRooms().then(() => {
        setLoading(false);
      });
    }
  }, [session?.user?.id, loadUserDrawingRooms]);

  return (
    <div className='max-w-5xl flex flex-col gap-10 mx-auto px-4 pt-28 pb-12 min-h-[80vh] bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl animate-fadein border border-slate-100'>
      {isDashboard && (
        <>
          <Header
            session={session}
            setShowCreateRoomModal={setShowCreateRoomModal}
          />
          <div className="border-b border-slate-200 my-4" />
        </>
      )}

      {isDashboard && (
        <div className="w-full flex justify-center animate-fadein">
          <div className="bg-gradient-to-r from-violet-100/80 via-blue-100/80 to-blue-200/80 backdrop-blur-md rounded-2xl shadow-lg px-8 py-6 mt-2 mb-4 flex flex-col items-center border border-slate-100">
            <span className="text-2xl sm:text-3xl font-extrabold text-violet-700 drop-shadow-sm mb-1">Your collaborative whiteboard, reimagined.</span>
          </div>
        </div>
      )}

      {hasNotCreatedARoom && (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500 animate-fadein">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-4 opacity-60">
            <path stroke="currentColor" strokeWidth="1.5" d="M7 21h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"/><path stroke="currentColor" strokeWidth="1.5" d="M9 3v4m6-4v4"/><path stroke="currentColor" strokeWidth="1.5" d="M8 13h8m-8 4h5"/></svg>
            <p className="text-lg font-semibold font-[family-name:var(--font-geist-sans)]">No rooms yet</p>
            <p className="text-sm mt-1">Your drawing rooms will display here when you create new rooms.</p>
          </div>
        )}

      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fadein'>
        {loading && (
          <>
            {Array(5)
              .fill(5)
              .map((_, i) => (
                <RoomCardSkeleton key={i} />
              ))}
          </>
        )}

        {shouldShowRoom && (
          <>
            {rooms?.map(({ id, name, created_at, isPublic, owner }) => (
              <RoomCard
                key={id}
                id={id}
                name={name}
                created_at={created_at}
                isPublic={isPublic}
                onDelete={owner === session?.user?.id ? handleDeleteRoom : undefined}
                onEdit={owner === session?.user?.id ? handleEditRoom : undefined}
                isOwner={owner === session?.user?.id}
              />
            ))}
          </>
        )}
      </section>
      <NewRoomModal
        show={showCreateRoomModal}
        setShow={setShowCreateRoomModal}
        loadUserDrawingRooms={loadUserDrawingRooms}
        session={session}
      />
      {/* Edit Room Modal */}
      {editRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Room</h2>
            <label className="block mb-2 text-sm font-medium">Room Name</label>
            <input
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={editRoom.name}
              onChange={e => setEditRoom({ ...editRoom, name: e.target.value })}
              maxLength={50}
              disabled={editLoading}
            />
            <label className="block mb-2 text-sm font-medium">Visibility</label>
            <select
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={editRoom.isPublic ? "public" : "private"}
              onChange={e => setEditRoom({ ...editRoom, isPublic: e.target.value === "public" })}
              disabled={editLoading}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                onClick={() => setEditRoom(null)}
                disabled={editLoading}
              >Cancel</button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                onClick={handleEditRoomSave}
                disabled={editLoading || !editRoom.name.trim()}
              >{editLoading ? "Saving..." : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardBody;