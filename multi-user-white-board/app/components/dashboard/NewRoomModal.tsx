import React, { useState } from "react";
import { createDrawingRoom } from "@/app/services/drawing-room.service";

type Props = {
  show: boolean;
  setShow: Function;
  loadUserDrawingRooms: Function;
  session: any;
};

const NewRoomModal = (props: Props) => {
  const { session, show, setShow, loadUserDrawingRooms } = props;
  const [roomName, setRoomName] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);

  return (
    <>
      {show && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-gradient-to-br from-violet-200/40 via-white/60 to-pink-200/40 backdrop-blur-[6px] transition-all duration-300'
            onClick={() => !isCreatingRoom && setShow(false)}
          />
          <div className='relative z-10 w-full max-w-md mx-auto animate-fadein'>
            <form
              className='glass-bg relative flex flex-col gap-6 p-8 rounded-3xl shadow-2xl border border-violet-100'
              onSubmit={async (e) => {
                e.preventDefault();
                setIsCreatingRoom(true);

                try {
                    const newRoom = await createDrawingRoom(
                    roomName,
                    session?.user?.id,
                    isPublic
                    );

                    if (newRoom && Array.isArray(newRoom) && newRoom.length > 0) {
                    loadUserDrawingRooms();
                    window.location.href = `/room/${newRoom[0].id}`;
                    } else {
                    throw new Error("Room creation failed. No room data returned.");
                    }
                } catch (error) {
                    console.error("Room creation error:", error);
                    alert("Failed to create room. Please try again.");
                    setIsCreatingRoom(false);
                }
              }}
            >
              {/* Close button */}
              <button
                type="button"
                className="absolute top-4 right-4 text-slate-400 hover:text-violet-500 text-xl font-bold rounded-full p-1 transition-colors"
                onClick={() => setShow(false)}
                aria-label="Close"
                tabIndex={0}
              >
                ×
              </button>
              <h2 className='text-2xl font-extrabold text-violet-700 mb-2 font-[family-name:var(--font-geist-sans)]'>Create New Room</h2>
              <div className='flex flex-col gap-3'>
                <input
                  type='text'
                  placeholder='Room Name'
                  className='border border-violet-200 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 text-lg font-semibold bg-white/80 placeholder-slate-400 transition-all duration-200'
                  onChange={(e) => setRoomName(e.target.value)}
                  value={roomName}
                  required
                />
              </div>
              <div className='flex gap-2 items-center text-slate-700 text-base'>
                <label className="font-medium">Public</label>
                <input
                  type='checkbox'
                  className='accent-violet-500 w-5 h-5 rounded border border-violet-200 focus:ring-violet-400 transition-all duration-200'
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
              </div>
              <button
                className='mt-2 font-bold text-base px-5 py-3 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed'
                type='submit'
                disabled={isCreatingRoom}
              >
                {isCreatingRoom ? "Please wait..." : "Create Room"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewRoomModal;