"use client";

import React, { useEffect, useState } from "react";
import { fetchUserById, getUserSession } from "../../services/user.service";
import { useParams } from "next/navigation";
import { fetchDrawingRoomById } from "../../services/drawing-room.service";
import Navbar from "../../components/Navbar";
import BoardContainer from "@/app/components/drawing-room/BoardContainer";
import VideoWrapper from "@/app/components/videos/VideoWrapper";
import VideoLayout from "@/app/components/videos/VideoLayout";

type Session = {
  user?: {
    id?: string;
    user_metadata?: {
      userName?: string;
      userColor?: string;
    };
  };
};

type Room = {
  id?: string;
  name?: string;
  isPublic?: boolean;
  owner?: string;
  drawing?: string;
};

const DrawingRoomPage = () => {
  const { roomId } = useParams();
  const [owner, setOwner] = useState<Session['user'] | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [user, setUser] = useState<Session['user'] | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [participantCount, setParticipantCount] = useState<number>(0);

  useEffect(() => {
    getUserSession().then((session) => {
      setSession(session);
      setUser(session?.user);

      fetchDrawingRoomById(roomId as string).then((room) => {
        const canEnterRoom =
          room![0].isPublic || room![0].owner === session?.user?.id;

        if (!canEnterRoom) {
          return (window.location.href = "/");
        }
        setRoom(room![0]);
        setIsLoading(false);
        fetchUserById(room![0].owner).then((res) => {
          setOwner(res.user);
        });
      });
    });
  }, [roomId]);

  return (
    <main>
      <Navbar
        session={session}
        owner={owner}
        room={room}
        isRoom
        isLoadingRoom={isLoading}
        participantCount={participantCount}
      />

      <div
        className='relative w-full h-[calc(100vh-80px)]'
        style={{
          background: "linear-gradient(45deg, #03A9F4, #4CAF50)",
        }}
      >
        {isLoading ? (
          <div className='flex justify-center items-center h-screen text-white'>
            <p>One moment. Please...</p>
          </div>
        ) : (
          <div className='flex w-full h-full flex-row mt-20'>
            <div className='flex-1 relative'>
              <BoardContainer roomId={room?.id || ''} />
            </div>
            <aside className='w-[300px]'>
              <VideoWrapper
                userData={{
                  id: user?.id ?? '',
                  user_metadata: { userName: user?.user_metadata?.userName ?? '' }
                }}
                callId={room?.id || ''}
              >
                <VideoLayout setParticipantCount={setParticipantCount} />
              </VideoWrapper>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default DrawingRoomPage;