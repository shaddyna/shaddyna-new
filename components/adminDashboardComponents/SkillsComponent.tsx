import { useState, useEffect } from 'react';
import axios from 'axios';
import { Skill } from '@/types/skills';
import { User } from '@/types/profile';

const SKILLS_PER_PAGE = 10;

export const SkillsComponent = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [visibleCount, setVisibleCount] = useState(SKILLS_PER_PAGE);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/skill');
        console.log("Fetched skills:", response.data.skills); // Now logging the right data
        setSkills(response.data.skills); // ✅ Fix here
      } catch (error) {
        console.error("Error fetching skills:", error);
        setError('Failed to fetch skills');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);
  
  

  const handleDelete = async (skillId: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await axios.delete(`http://localhost:5000/api/skill/${skillId}`);
        setSkills(prev => prev.filter(s => s._id !== skillId));
      } catch {
        alert('Failed to delete skill');
      }
    }
  };

  const handleEdit = (skill: Skill) => setEditingSkill(skill);

  const handleSaveEdit = async () => {
    if (!editingSkill) return;
    try {
      const response = await axios.put(`http://localhost:5000/api/skill/${editingSkill._id}`, editingSkill);
      setSkills(skills.map(s => (s._id === editingSkill._id ? response.data : s)));
      setEditingSkill(null);
    } catch {
      alert('Failed to update skill');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingSkill) return;
    setEditingSkill({ ...editingSkill, [e.target.name]: e.target.value });
  };

  const visibleSkills = skills.slice(0, visibleCount);

  if (loading) return <div className="p-6 text-center">Loading skills...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Skills List</h3>

      <div className="space-y-4">
        {visibleSkills.map(skill => (
          <div key={skill._id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="text-[#0f1c47] font-medium">{skill.title}</p>
              <p className="text-sm text-gray-500">{skill.description}</p>
              <p className="text-sm text-gray-500 capitalize">{skill.category}</p>
              <p className="text-sm text-gray-500">{skill.priceType} - ${skill.price ?? 'N/A'}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => handleEdit(skill)} className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Edit</button>
              <button onClick={() => handleDelete(skill._id)} className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {skills.length > SKILLS_PER_PAGE && (
        <div className="mt-4 text-center">
          {visibleCount < skills.length ? (
            <button
              onClick={() => setVisibleCount(prev => prev + SKILLS_PER_PAGE)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Show More
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount(SKILLS_PER_PAGE)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Collapse
            </button>
          )}
        </div>
      )}

      {editingSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Skill</h3>
            <div className="space-y-4">
              {['title', 'description', 'category', 'price'].map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.replace(/^\w/, c => c.toUpperCase())}
                  </label>
                  <input
                    type={field === 'price' ? 'number' : 'text'}
                    name={field}
                    value={(editingSkill as any)[field]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">Price Type</label>
                <select
                  name="priceType"
                  value={editingSkill.priceType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="hourly">Hourly</option>
                  <option value="fixed">Fixed</option>
                  <option value="negotiable">Negotiable</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button onClick={() => setEditingSkill(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

  