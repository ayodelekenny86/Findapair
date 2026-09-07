import { useState } from 'react'

interface BatchImportProps {
  isOpen: boolean
  onClose: () => void
  onImport: (items: any[]) => void
}

export default function BatchImport({ isOpen, onClose, onImport }: BatchImportProps) {
  const [csvData, setCsvData] = useState('')
  const [preview, setPreview] = useState<any[]>([])
  const [error, setError] = useState('')

  if (!isOpen) return null

  const parseCSV = (csv: string) => {
    try {
      const lines = csv.trim().split('\n')
      if (lines.length < 2) {
        setError('CSV must have at least a header row and one data row')
        return
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
      const requiredFields = ['title', 'category', 'description', 'location', 'price']
      
      const missingFields = requiredFields.filter(f => !headers.includes(f))
      if (missingFields.length > 0) {
        setError(`Missing required fields: ${missingFields.join(', ')}`)
        return
      }

      const items = lines.slice(1).map((line, index) => {
        const values = line.split(',').map(v => v.trim())
        const item: any = {}
        
        headers.forEach((header, i) => {
          item[header] = values[i] || ''
        })

        // Convert price to number
        if (item.price) {
          item.price = parseFloat(item.price.replace('$', ''))
        }

        // Add default values
        item.id = `import_${Date.now()}_${index}`
        item.type = item.price > 0 ? 'pair' : 'free'
        item.emoji = '📦'
        item.condition = item.condition || 'Good'
        item.matchScore = Math.floor(Math.random() * 20) + 80
        item.verified = false
        item.trustScore = 85
        item.donationOption = false
        item.urgency = 'normal'
        item.images = []
        item.postedAt = Date.now()
        item.postedAgo = 'Just now'
        item.saves = 0
        item.views = 0
        item.status = 'active'

        return item
      })

      setPreview(items)
      setError('')
    } catch (err) {
      setError('Failed to parse CSV. Please check the format.')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setCsvData(text)
      parseCSV(text)
    }
    reader.readAsText(file)
  }

  const handleImport = () => {
    if (preview.length === 0) return
    onImport(preview)
    onClose()
  }

  const sampleCSV = `title,category,description,location,price,condition
Gold Hoop Earring,Earrings,Beautiful 14k gold hoop earring,New York,85,Excellent
Nike Air Max,Shoes,Brand new Nike Air Max size 10,Los Angeles,120,New
Cashmere Gloves,Gloves,Pure cashmere gloves,Chicago,45,Like New`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">📥 Batch Import</h3>
            <p className="text-xs text-zinc-500">Import multiple items from CSV</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Instructions */}
          <div className="mb-6 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">CSV Format</h4>
            <p className="text-xs text-zinc-400 mb-3">
              Required fields: title, category, description, location, price
            </p>
            <details className="text-xs">
              <summary className="text-cyan-400 cursor-pointer hover:text-cyan-300 mb-2">View sample CSV</summary>
              <pre className="bg-zinc-800 p-3 rounded text-zinc-300 overflow-x-auto mt-2">
                {sampleCSV}
              </pre>
            </details>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block mb-2">
              <div className="w-full px-6 py-8 border-2 border-dashed border-zinc-700 rounded-lg text-center cursor-pointer hover:border-cyan-500/50 transition-colors">
                <div className="text-3xl mb-2">📁</div>
                <p className="text-sm text-zinc-400 mb-1">Click to upload CSV file</p>
                <p className="text-xs text-zinc-600">or paste CSV data below</p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </label>
          </div>

          {/* CSV Input */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-zinc-400 mb-2 block">Or paste CSV data</label>
            <textarea
              value={csvData}
              onChange={(e) => {
                setCsvData(e.target.value)
                if (e.target.value) parseCSV(e.target.value)
              }}
              placeholder="Paste your CSV data here..."
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 resize-none font-mono"
              rows={6}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Preview */}
          {preview.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                Preview ({preview.length} items)
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {preview.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{item.title}</div>
                      <div className="text-xs text-zinc-500">{item.category} • {item.location}</div>
                    </div>
                    <div className="text-sm font-bold text-cyan-400">
                      {item.type === 'pair' ? `$${item.price}` : 'FREE'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-700"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={preview.length === 0}
            className="flex-1 px-4 py-2.5 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Import {preview.length > 0 ? `${preview.length} Items` : ''}
          </button>
        </div>
      </div>
    </div>
  )
}
