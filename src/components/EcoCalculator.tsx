import { useState } from 'react'

export default function EcoCalculator() {
  const [itemsMatched, setItemsMatched] = useState(3)
  const [itemsGiven, setItemsGiven] = useState(5)
  const [itemsDonated, setItemsDonated] = useState(2)

  const totalItems = itemsMatched + itemsGiven + itemsDonated
  const wastePrevented = (totalItems * 1.2 / 1000).toFixed(2)
  const co2Saved = (totalItems * 1.2 * 2.5 / 1000).toFixed(2)
  const moneySaved = (itemsMatched * 85).toFixed(0)

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="eyebrow mb-3 block">Impact calculator</span>
          <h2 className="heading-lg mb-3">Your <span className="gradient-text">eco impact</span></h2>
          <p className="text-body max-w-xl mx-auto">See how your contributions make a difference.</p>
        </div>

        <div className="panel p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              {[
                { label: 'Items matched', icon: '🔗', value: itemsMatched, setValue: setItemsMatched, max: 20, color: '#06b6d4' },
                { label: 'Free items given', icon: '🎁', value: itemsGiven, setValue: setItemsGiven, max: 30, color: '#10b981' },
                { label: 'Items donated', icon: '♻️', value: itemsDonated, setValue: setItemsDonated, max: 15, color: '#34d399' },
              ].map((slider, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[13px] font-medium text-zinc-300 flex items-center gap-2">
                      <span>{slider.icon}</span> {slider.label}
                    </label>
                    <span className="text-lg font-bold" style={{ color: slider.color }}>{slider.value}</span>
                  </div>
                  <input type="range" min="0" max={slider.max} value={slider.value} onChange={(e) => slider.setValue(Number(e.target.value))} />
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-[14px] font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Your estimated impact</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-2xl font-bold gradient-text mb-1">{wastePrevented}</div>
                  <div className="text-[11px] text-zinc-500">Tons waste prevented</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-2xl font-bold gradient-text mb-1">{co2Saved}</div>
                  <div className="text-[11px] text-zinc-500">Tons CO₂ saved</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-2xl font-bold gradient-text mb-1">${moneySaved}</div>
                  <div className="text-[11px] text-zinc-500">Money saved</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-2xl font-bold gradient-text mb-1">{Math.round(Number(co2Saved) / 0.022)}</div>
                  <div className="text-[11px] text-zinc-500">Trees equivalent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
