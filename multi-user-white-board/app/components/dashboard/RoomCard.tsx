import Link from "next/link";

function getPastelColor(seed: string) {
  // Simple hash to get a pastel color from a string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 70%, 85%)`;
}

export const RoomCard = ({ id, name, created_at, isPublic, onDelete, onEdit, isOwner }: {
  id: string;
  name: string;
  created_at: string;
  isPublic: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, name: string, isPublic: boolean) => void;
  isOwner?: boolean;
}) => {
  const createAt = new Date(created_at);
  const avatarColor = getPastelColor(name);
  return (
    <div className="group flex items-center border border-slate-100 p-5 rounded-2xl shadow-md bg-white/80 backdrop-blur-lg transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 hover:border-blue-300 gap-4 animate-fadein relative overflow-hidden">
      <Link
        href={`/room/${id}`}
        className="flex items-center flex-1 min-w-0"
        style={{ minHeight: 110 }}
      >
        <div
          className="flex items-center justify-center rounded-full w-12 h-12 font-bold text-lg shadow-sm mr-3 shrink-0"
          style={{ backgroundColor: avatarColor, color: '#3b3b3b' }}
          aria-label={`Room avatar for ${name}`}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="h-10 w-px bg-slate-200 mx-2 rounded-full" />
        <div className="flex flex-col gap-2 w-full min-w-0">
          <h2 className="font-semibold text-lg text-blue-600 capitalize group-hover:underline font-[family-name:var(--font-geist-sans)] truncate">{name}</h2>
          <span className="text-xs text-slate-500 truncate">
            Created {createAt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <span
          className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold border ${isPublic ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-300'}`}
          title={isPublic ? 'Anyone can join this room' : 'Only invited users can join this room'}
        >
          {isPublic ? "Public" : "Private"}
        </span>
      </Link>
      {onDelete && (
        <button
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-white/80 hover:bg-pink-100 text-pink-600 hover:text-pink-700 rounded-full p-2 shadow transition-all duration-200 border border-pink-100"
          title="Delete Room"
          onClick={() => onDelete(id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      {isOwner && onEdit && (
        <button
          className="absolute top-3 left-3 bg-white/80 hover:bg-blue-100 text-blue-600 hover:text-blue-700 rounded-full p-2 shadow transition-all duration-200 border border-blue-100"
          title="Edit Room"
          onClick={() => onEdit(id, name, isPublic)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 5.487a2.1 2.1 0 1 1 2.97 2.97L8.435 19.854a2 2 0 0 1-.878.513l-4.01 1.07a.5.5 0 0 1-.617-.617l1.07-4.01a2 2 0 0 1 .513-.878L16.862 5.487z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export const RoomCardSkeleton = () => {
  return (
    <div className="flex items-center border border-slate-200 p-5 rounded-xl shadow-sm bg-white gap-4 animate-pulse min-h-[110px]">
      <div className="rounded-full w-12 h-12 bg-slate-100 mr-3" />
      <div className="flex flex-col gap-2 w-full">
        <div className="bg-slate-100 rounded-md h-5 w-2/3" />
        <div className="bg-slate-100 rounded-md h-4 w-1/3" />
      </div>
      <span className="ml-auto bg-slate-100 rounded-full h-6 w-16" />
    </div>
  );
};