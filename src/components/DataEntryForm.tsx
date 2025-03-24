import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import type { PortfolioData } from '../types';

interface DataEntryFormProps {
  onSubmit: (data: PortfolioData) => void;
}

export function DataEntryForm({ onSubmit }: DataEntryFormProps) {
  const { register, control, handleSubmit } = useForm<PortfolioData>({
    defaultValues: {
      socialMedia: [{ id: '1', name: '', url: '' }],
      projects: [{ id: '1', title: '', description: '', image: '', githubUrl: '' }],
      about: {
        skills: [],
        interests: []
      }
    }
  });

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = 
    useFieldArray({ control, name: 'socialMedia' });
  
  const { fields: projectFields, append: appendProject, remove: removeProject } = 
    useFieldArray({ control, name: 'projects' });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Information</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            {...register('name')}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Short Bio</label>
          <textarea
            {...register('shortBio')}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">About Me</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Profile Picture URL</label>
          <input
            {...register('about.profilePicture')}
            type="url"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register('about.description')}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Skills (comma-separated)</label>
          <input
            {...register('about.skills')}
            className="w-full p-2 border rounded"
            placeholder="React, TypeScript, Tailwind CSS"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interests (comma-separated)</label>
          <input
            {...register('about.interests')}
            className="w-full p-2 border rounded"
            placeholder="Web Development, UI/UX Design, Open Source"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Projects</h2>
          <button
            type="button"
            onClick={() => appendProject({ id: Date.now().toString(), title: '', description: '', image: '', githubUrl: '' })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus size={16} /> Add Project
          </button>
        </div>
        {projectFields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Project {index + 1}</h3>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <input
              {...register(`projects.${index}.title`)}
              placeholder="Project Title"
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              {...register(`projects.${index}.description`)}
              placeholder="Project Description"
              className="w-full p-2 border rounded"
              required
            />
            <input
              {...register(`projects.${index}.image`)}
              placeholder="Project Image URL"
              type="url"
              className="w-full p-2 border rounded"
              required
            />
            <input
              {...register(`projects.${index}.githubUrl`)}
              placeholder="GitHub URL"
              type="url"
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Social Media</h2>
          <button
            type="button"
            onClick={() => appendSocial({ id: Date.now().toString(), name: '', url: '' })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus size={16} /> Add Social Media
          </button>
        </div>
        {socialFields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-center">
            <input
              {...register(`socialMedia.${index}.name`)}
              placeholder="Platform Name"
              className="flex-1 p-2 border rounded"
              required
            />
            <input
              {...register(`socialMedia.${index}.url`)}
              placeholder="Profile URL"
              type="url"
              className="flex-1 p-2 border rounded"
              required
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeSocial(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-600 font-semibold"
      >
        Generate Portfolio
      </button>
    </form>
  );
}