"use client";
import React from "react";
import { Tldraw } from "@tldraw/tldraw";
import { useSyncDemo } from "@tldraw/sync";
import "@tldraw/tldraw/tldraw.css";

interface BoardContainerProps {
  roomId: string;
}

const BoardContainer: React.FC<BoardContainerProps> = ({ roomId }) => {
  const store = useSyncDemo({ roomId: `syncpad-${roomId}` });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Tldraw store={store} />
    </div>
  );
};

export default BoardContainer;