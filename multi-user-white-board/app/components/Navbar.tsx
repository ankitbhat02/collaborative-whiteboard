import React from "react";
import Link from 'next/link';

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

type Props = {
  session: Session | null;
  owner?: Session['user'] | null;
  isRoom?: boolean;
  room?: Room | null;
  isLoadingRoom?: boolean;
  participantCount?: number;
};

const Navbar = (props: Props) => {
  const { session, owner, isRoom, room, isLoadingRoom, participantCount } =
    props;
  const shouldShowRoomName = isRoom && room?.name;
  const shouldShowRoomVisibilityBadge = isRoom && !isLoadingRoom;
  const isRoomOwner = owner?.id === session?.user?.id;

  return (
    <nav className='bg-white/60 backdrop-blur-xl z-30 border border-slate-200 fixed top-0 left-0 right-0 flex justify-center shadow-2xl rounded-b-2xl px-4 py-2 transition-all duration-300'>
      <div className='w-full max-w-5xl flex justify-between items-center'>
        <section className='flex gap-4 items-center'>
          <span className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-violet-600 drop-shadow-md"><circle cx="12" cy="12" r="10" fill="url(#nav-logo-gradient)" opacity="0.18"/><path d="M8 12h8M12 8v8" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/></svg>
            <svg width="0" height="0">
              <defs>
                <linearGradient id="nav-logo-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <Link href='/' className='text-2xl font-extrabold tracking-tight text-violet-700 font-[family-name:var(--font-geist-sans)] drop-shadow-sm'>SyncPad</Link>
          </span>
          {shouldShowRoomName && (
            <div className="flex flex-wrap gap-2 items-center ml-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 font-semibold shadow-sm flex items-center gap-1">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v1.5M3 7.5h18m-18 0v10.25A2.25 2.25 0 0 0 5.25 20h13.5A2.25 2.25 0 0 0 21 17.75V7.5m-9 4.25h.008v.008H12v-.008Z" /></svg>
                {room?.name}
              </span>
              {shouldShowRoomVisibilityBadge && (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold shadow-sm flex items-center gap-1">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  {room?.isPublic ? "Public" : "Private"}
                </span>
              )}
              {owner && (
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold shadow-sm flex items-center gap-1">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.25v-.667A2.583 2.583 0 0 1 7.083 16h9.834a2.583 2.583 0 0 1 2.583 2.583v.667" /></svg>
                  Owned by {owner?.user_metadata?.userName} {isRoomOwner && <>(You)</>}
                </span>
              )}
              {participantCount ? (
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold shadow-sm flex items-center gap-1">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm9.75 10.5a4.5 4.5 0 1 0-9 0m13.5-2.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-2.25 2.25v-.75a2.25 2.25 0 0 0-2.25-2.25h-3a2.25 2.25 0 0 0-2.25 2.25v.75" /></svg>
                  {participantCount} participants
                </span>
              ) : null}
            </div>
          )}
        </section>
        <section className='flex items-center gap-3 relative'>
          {session && (
            <span className="bg-gradient-to-r from-violet-100/80 via-blue-100/80 to-blue-200/80 text-blue-700 font-semibold rounded-full px-4 py-1 shadow mr-2">
              Welcome back, @{session?.user?.user_metadata?.userName}
            </span>
          )}
          {isRoom && (
            <Link
              href='/'
              className='flex items-center font-semibold text-sm px-4 py-2 rounded-full gap-2 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white shadow-lg hover:scale-105 active:scale-100 transition-all duration-200 border border-blue-200/40 backdrop-blur-md'
              style={{ boxShadow: '0 4px 24px rgba(59,130,246,0.10)' }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.7}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor" className="text-blue-300" />
                <rect x="14" y="3" width="7" height="7" rx="2" fill="currentColor" className="text-blue-400" />
                <rect x="14" y="14" width="7" height="7" rx="2" fill="currentColor" className="text-blue-500" />
                <rect x="3" y="14" width="7" height="7" rx="2" fill="currentColor" className="text-blue-600" />
              </svg>
              <span className='font-medium tracking-wide'>Dashboard</span>
            </Link>
          )}
          <div
            className={`h-10 w-10 overflow-hidden rounded-full user-avatar-bg flex items-center justify-center border border-slate-200 shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 bg-gradient-to-br from-violet-400/80 to-blue-400/80 backdrop-blur-md relative`}
            style={{ '--user-avatar-color': session?.user?.user_metadata?.userColor } as React.CSSProperties}
            tabIndex={0}
          >
            <span className="text-white font-bold text-lg select-none drop-shadow-md">
              {session?.user?.user_metadata?.userName?.charAt(0)?.toUpperCase() || '?'}
            </span>
            <div className="absolute right-0 top-12 min-w-[120px] bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-100 py-2 px-3 text-slate-700 text-sm font-medium opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-all duration-200" style={{zIndex: 100}}>
              <button className="w-full text-left py-1 px-2 rounded hover:bg-blue-50" onClick={() => { window.location.href = '/login'; }}>Logout</button>
            </div>
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;