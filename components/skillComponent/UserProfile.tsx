import { User } from '@/types/skills';
import Image from 'next/image';
import Link from 'next/link';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
          <Image
            src={user.avatar}
            alt={user.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h3 className="text-xl font-bold text-[#0f1c47]">{user.name}</h3>
        <p className="text-gray-500 text-sm">{user.location}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-[#0f1c47] mb-2">About</h4>
        <p className="text-gray-700">{user.bio || 'No bio provided'}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-[#0f1c47] mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <Link href="/hub/me" className="w-full block text-center py-2 bg-[#0f1c47] text-white rounded-md hover:bg-[#0a142f] transition-colors">
  View Profile
</Link>
    </div>
  );
};