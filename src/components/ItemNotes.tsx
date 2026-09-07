import { useState, useEffect } from 'react'
import type { Item } from '../lib/db'

interface ItemNotesProps {
  item: Item
}

interface Note {
  id: string
  text: string
  createdAt: number
  updatedAt: number
}

export default function ItemNotes({ item }: ItemNotesProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    loadNotes()
  }, [item.id])

  const loadNotes = () => {
    const stored = localStorage.getItem(`notes_${item.id}`)
    if (stored) {
      setNotes(JSON.parse(stored))
    } else {
      setNotes([])
    }
  }

  const saveNotes = (updated: Note[]) => {
    setNotes(updated)
    localStorage.setItem(`notes_${item.id}`, JSON.stringify(updated))
  }

  const addNote = () => {
    if (!newNote.trim()) return

    const note: Note = {
      id: Date.now().toString(),
      text: newNote,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    saveNotes([note, ...notes])
    setNewNote('')
  }

  const deleteNote = (id: string) => {
    saveNotes(notes.filter(n => n.id !== id))
  }

  const startEdit = (note: Note) => {
    setEditingId(note.id)
    setEditText(note.text)
  }

  const saveEdit = () => {
    if (!editText.trim()) return

    const updated = notes.map(n =>
      n.id === editingId ? { ...n, text: editText, updatedAt: Date.now() } : n
    )
    saveNotes(updated)
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-zinc-400 mb-3">📝 Notes</h3>

      {/* Add note */}
      <div className="mb-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 resize-none"
          rows={2}
        />
        <button
          onClick={addNote}
          disabled={!newNote.trim()}
          className="mt-2 px-4 py-2 bg-cyan-500 text-black text-xs font-semibold rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Note
        </button>
      </div>

      {/* Notes list */}
      {notes.length === 0 ? (
        <p className="text-xs text-zinc-600 text-center py-4">No notes yet</p>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-3">
              {editingId === note.id ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                    rows={2}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={saveEdit}
                      className="px-3 py-1 bg-cyan-500 text-black text-xs font-semibold rounded hover:bg-cyan-400"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 bg-zinc-700 text-zinc-300 text-xs rounded hover:bg-zinc-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-zinc-300 whitespace-pre-wrap">{note.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-[10px] text-zinc-600">
                      {new Date(note.createdAt).toLocaleDateString()}
                      {note.updatedAt !== note.createdAt && ' (edited)'}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(note)}
                        className="text-[10px] text-cyan-400 hover:text-cyan-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-[10px] text-zinc-500 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
