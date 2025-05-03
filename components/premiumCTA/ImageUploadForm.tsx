import { FC } from 'react';
import { FiPlusCircle, FiTrash } from 'react-icons/fi';

interface ImageUploadFormProps {
  images: File[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

export const ImageUploadForm: FC<ImageUploadFormProps> = ({
  images,
  onImageUpload,
  onRemoveImage
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#0f1c47] border-b pb-2">Shop Images*</h3>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0f1c47] transition-colors">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
          id="shopImageUpload"
          required={images.length === 0}
        />
        <label htmlFor="shopImageUpload" className="cursor-pointer">
          <div className="mb-2 text-[#0f1c47]">
            <FiPlusCircle className="w-8 h-8 mx-auto" />
          </div>
          <p className="text-sm text-gray-600">Drag and drop images here</p>
          <p className="text-xs text-gray-500 mt-1">or click to browse (max 5 images)</p>
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-32 object-cover rounded-lg shadow-sm"
              />
              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
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