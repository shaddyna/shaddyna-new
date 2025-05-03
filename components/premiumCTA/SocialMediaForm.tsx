import { FC } from 'react';
import { FiTrash } from 'react-icons/fi';
import { SocialMedia } from '@/types/CTAtypes';

interface SocialMediaFormProps {
  socialMedias: SocialMedia[];
  newSocialMedia: SocialMedia;
  onPlatformChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddSocialMedia: () => void;
  onRemoveSocialMedia: (index: number) => void;
}

export const SocialMediaForm: FC<SocialMediaFormProps> = ({
  socialMedias,
  newSocialMedia,
  onPlatformChange,
  onUrlChange,
  onAddSocialMedia,
  onRemoveSocialMedia
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#0f1c47] border-b pb-2">Social Media Links</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
            value={newSocialMedia.platform}
            onChange={onPlatformChange}
            placeholder="e.g. Instagram"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
              value={newSocialMedia.url}
              onChange={onUrlChange}
              placeholder="https://"
            />
            <button
              type="button"
              onClick={onAddSocialMedia}
              className="px-4 py-2 bg-[#0f1c47] text-white rounded-lg hover:bg-[#1a2d5a] transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {socialMedias.length > 0 && (
        <div className="mt-4 space-y-2">
          {socialMedias.map((social, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div>
                <span className="font-medium">{social.platform}:</span> {social.url}
              </div>
              <button
                type="button"
                onClick={() => onRemoveSocialMedia(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};