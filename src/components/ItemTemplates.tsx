import { useState, useEffect } from 'react'

interface ItemTemplate {
  id: string
  name: string
  category: string
  description: string
  condition: string
  price: number
  createdAt: number
}

interface ItemTemplatesProps {
  isOpen: boolean
  onClose: () => void
  onUseTemplate: (template: ItemTemplate) => void
}

export default function ItemTemplates({ isOpen, onClose, onUseTemplate }: ItemTemplatesProps) {
  const [templates, setTemplates] = useState<ItemTemplate[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: '',
    description: '',
    condition: 'Good',
    price: 0,
  })

  useEffect(() => {
    if (isOpen) {
      loadTemplates()
    }
  }, [isOpen])

  const loadTemplates = () => {
    const stored = localStorage.getItem('itemTemplates')
    if (stored) {
      setTemplates(JSON.parse(stored))
    }
  }

  const saveTemplates = (updated: ItemTemplate[]) => {
    setTemplates(updated)
    localStorage.setItem('itemTemplates', JSON.stringify(updated))
  }

  const createTemplate = () => {
    if (!newTemplate.name || !newTemplate.category) return

    const template: ItemTemplate = {
      id: Date.now().toString(),
      ...newTemplate,
      createdAt: Date.now(),
    }

    saveTemplates([template, ...templates])
    setNewTemplate({ name: '', category: '', description: '', condition: 'Good', price: 0 })
    setShowCreateForm(false)
  }

  const deleteTemplate = (id: string) => {
    saveTemplates(templates.filter(t => t.id !== id))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">📋 Item Templates</h3>
            <p className="text-xs text-zinc-500">Save reusable item templates</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="text-xs text-cyan-400 hover:text-cyan-300"
            >
              + New Template
            </button>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">
              ✕
            </button>
          </div>
        </div>

        {showCreateForm && (
          <div className="p-6 border-b border-zinc-800 bg-zinc-800/30">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                placeholder="Template name..."
                className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                value={newTemplate.category}
                onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                placeholder="Category..."
                className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
              <textarea
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                placeholder="Description..."
                className="col-span-2 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 resize-none"
                rows={2}
              />
              <select
                value={newTemplate.condition}
                onChange={(e) => setNewTemplate({ ...newTemplate, condition: e.target.value })}
                className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option>New</option>
                <option>Like New</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
              <input
                type="number"
                value={newTemplate.price}
                onChange={(e) => setNewTemplate({ ...newTemplate, price: Number(e.target.value) })}
                placeholder="Price ($)"
                className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              onClick={createTemplate}
              className="w-full mt-3 px-4 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400"
            >
              Save Template
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">
          {templates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-sm text-zinc-500">No templates yet</p>
              <p className="text-xs text-zinc-600 mt-1">Create a template to save time</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div key={template.id} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white">{template.name}</h4>
                      <p className="text-xs text-zinc-500 mt-1">{template.category}</p>
                    </div>
                    <button
                      onClick={() => deleteTemplate(template.id)}
                      className="text-xs text-zinc-500 hover:text-red-400"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400 mb-3 line-clamp-2">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-zinc-700 text-zinc-300 text-xs rounded">{template.condition}</span>
                      <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded">${template.price}</span>
                    </div>
                    <button
                      onClick={() => onUseTemplate(template)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      Use →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
