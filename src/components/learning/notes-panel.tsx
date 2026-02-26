"use client";

import { useState, useEffect } from "react";
import { useLearningProgress } from "@/hooks/use-learning-progress";
import { StickyNote, X, Save, Highlighter } from "lucide-react";

interface NotesPanelProps {
  articleSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

export function NotesPanel({ articleSlug, isOpen, onClose }: NotesPanelProps) {
  const { progress, saveNote } = useLearningProgress(articleSlug);
  const [note, setNote] = useState(progress?.notes || "");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (progress?.notes) {
      setNote(progress.notes);
    }
  }, [progress?.notes]);

  const handleSave = async () => {
    setIsSaving(true);
    saveNote(note);
    setLastSaved(new Date());
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleAutoSave = () => {
    saveNote(note);
    setLastSaved(new Date());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (note !== progress?.notes) {
        handleAutoSave();
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timer);
  }, [note]);

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-16 bottom-0 w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-[#088395] dark:text-[#7AB2B2]" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notes</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Note Editor */}
      <div className="flex-1 overflow-y-auto p-4">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Take notes while reading...

Key concepts:
- Important point 1
- Important point 2

Questions to review:
- What did I learn?
- What do I want to explore further?"
          className="w-full h-full resize-none bg-gray-50 dark:bg-gray-800 border-0 rounded-lg p-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#088395] dark:focus:ring-[#7AB2B2]"
        />

        {/* Highlights */}
        {progress?.highlights && progress.highlights.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Highlighter className="w-4 h-4" />
              Highlights ({progress.highlights.length})
            </h4>
            <div className="space-y-2">
              {progress.highlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-r"
                >
                  <p className="text-sm text-gray-800 dark:text-gray-200 mb-1">
                    {highlight.text}
                  </p>
                  {highlight.note && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                      {highlight.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {lastSaved && (
            <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isSaving
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              : 'bg-[#088395] dark:bg-[#7AB2B2] text-white dark:text-gray-950 hover:bg-[#09637E] dark:hover:bg-[#88c4c4]'
          }`}
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}

// Floating note button
export function NoteToggleButton({ onClick, hasNotes }: { onClick: () => void; hasNotes: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`fixed right-6 bottom-6 z-40 p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
        hasNotes
          ? 'bg-[#088395] dark:bg-[#7AB2B2] text-white dark:text-gray-950'
          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
      }`}
      title="Open notes"
    >
      <StickyNote className="w-6 h-6" />
      {hasNotes && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">!</span>
        </span>
      )}
    </button>
  );
}