import React from "react";

type Props = {
  session: { user?: { user_metadata?: { userName?: string } } } | null;
  setShowCreateRoomModal: (show: boolean) => void;
};

const Header = (props: Props) => {
  const { setShowCreateRoomModal } = props;
  return (
    <section className='w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-2 relative mt-2'>
      {/* Soft gradient background */}
      <div className="absolute -top-8 left-0 w-full h-32 pointer-events-none -z-10">
        <div className="w-full h-full bg-gradient-to-br from-violet-200/40 via-blue-100/40 to-pink-100/40 blur-2xl rounded-3xl"></div>
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-lg font-semibold text-violet-700 mb-1">Unleash your creativity</span>
        <span className="text-base text-slate-500 max-w-xs leading-snug">Collaborate, brainstorm, and bring your ideas to life with SyncPad&apos;s modern whiteboard rooms.</span>
      </div>
      <button
        className='flex items-center gap-2 px-5 py-2.5 rounded-full glass-bg shadow-lg font-semibold text-base text-violet-700 hover:scale-105 hover:shadow-xl transition-all duration-200 border border-violet-100 backdrop-blur-md bg-gradient-to-r from-violet-100/80 via-white/80 to-pink-100/80'
        style={{ position: 'relative', top: 0 }}
        onClick={() => setShowCreateRoomModal(true)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2.2}
          stroke='currentColor'
          className='w-6 h-6 text-violet-500'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 6v12m6-6H6'
          />
        </svg>
        <span className="font-bold tracking-tight">New Room</span>
      </button>
    </section>
  );
};

export default Header;