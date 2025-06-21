import {
    CallingState,
    StreamTheme,
    useCallStateHooks,
  } from "@stream-io/video-react-sdk";
  import React, { useEffect } from "react";
  import Spinner from "./Spinner";
  import LocalParticipantVideo from "./LocalParticipantVideo";

  type Props = { setParticipantCount: (count: number) => void };

  const VideoLayout = (props: Props) => {
    const {
      useCallCallingState,
      useParticipantCount,
      useLocalParticipant,
      useRemoteParticipants,
    } = useCallStateHooks();

    const callingState = useCallCallingState();
    const localParticipant = useLocalParticipant();
    const remoteParticipants = useRemoteParticipants();
    const participantCount = useParticipantCount();

    useEffect(() => {
      props.setParticipantCount(participantCount);
    }, [participantCount, props]);

    if (callingState !== CallingState.JOINED) {
      return (
        <div className='mt-2 h-32 w-full flex justify-center items-center'>
          <Spinner />
        </div>
      );
    }

    return (
      <StreamTheme>
        <div className='flex flex-col gap-4 w-full overflow-y-auto max-h-[80vh] px-1'>
          {/* Local participant card */}
          {localParticipant && (
            <div className="rounded-xl shadow bg-white/90 border border-slate-200 p-2 flex flex-col items-center w-full max-w-xs mx-auto">
              <span className="mb-2 font-semibold text-slate-700 text-sm tracking-wide px-2 py-1 rounded-full bg-slate-100 w-full text-center">
                You
              </span>
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                <LocalParticipantVideo participant={localParticipant} />
              </div>
            </div>
          )}
          {/* Remote participants cards */}
          {remoteParticipants.map((participant) => (
            <div key={participant.sessionId} className="rounded-xl shadow bg-white/90 border border-slate-200 p-2 flex flex-col items-center w-full max-w-xs mx-auto">
              <span className="mb-2 font-semibold text-slate-700 text-sm tracking-wide px-2 py-1 rounded-full bg-slate-100 w-full text-center">
                {participant.name || 'Guest'}
              </span>
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                <LocalParticipantVideo participant={participant} />
              </div>
            </div>
          ))}
        </div>
      </StreamTheme>
    );
  };

  export default VideoLayout;