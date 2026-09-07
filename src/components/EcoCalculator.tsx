import { useState } from 'react'

export default function EcoCalculator() {
  const [itemsMatched, setItemsMatched] = useState(3)
  const [itemsGiven, setItemsGiven] = useState(5)
  const [itemsDonated, setItemsDonated] = useState(2)

  // Calculate impact
  const avgWeightPerItem = 1.2 // kg
  const co2PerKg = 2.5 // kg CO2 per kg of product
  const landfillSpacePerItem = 0.003 // cubic meters
  
  const totalItems = itemsMatched + itemsGiven + itemsDonated
  const wastePrevented = (totalItems * avgWeightPerItem / 1000).toFixed(2) // tons
  const co2Saved = (totalItems * avgWeightPerItem * co2PerKg / 1000).toFixed(2) // tons
  const landfillSaved = (totalItems * landfillSpacePerItem * 1000).toFixed(1) // liters
  const moneySaved = (itemsMatched * 85).toFixed(0) // avg savings per match

  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/5 to-transparent"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your <span className="gradient-text">Eco Impact</span> Calculator
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            See how your contributions make a difference. Adjust the sliders to estimate your impact.
          </p>
        </div>

        <div className="glass rounded-3xl p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Sliders */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <span>🔗</span> Items Matched (Found a pair)
                  </label>
                  <span className="text-lg font-bold text-cyan-400">{itemsMatched}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={itemsMatched}
                  onChange={(e) => setItemsMatched(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <span>🎁</span> Free Items Given
                  </label>
                  <span className="text-lg font-bold text-green-400">{itemsGiven}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={itemsGiven}
                  onChange={(e) => setItemsGiven(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <span>♻️</span> Items Donated to Charity
                  </label>
                  <span className="text-lg font-bold text-emerald-400">{itemsDonated}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={itemsDonated}
                  onChange={(e) => setItemsDonated(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="pt-4 border-t border-slate-700/50">
                <p className="text-xs text-slate-500">
                  💡 Based on average item weight of 1.2kg and CO₂ emissions of 2.5kg per kg of product manufactured.
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-200 mb-4">Your Estimated Impact</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-light rounded-xl p-4 text-center card-hover">
                  <div className="text-3xl font-bold gradient-text mb-1">{wastePrevented}</div>
                  <div className="text-xs text-slate-500">Tons Waste Prevented</div>
                  <div className="mt-2 text-lg">🗑️</div>
                </div>
                
                <div className="glass-light rounded-xl p-4 text-center card-hover">
                  <div className="text-3xl font-bold gradient-text mb-1">{co2Saved}</div>
                  <div className="text-xs text-slate-500">Tons CO₂ Saved</div>
                  <div className="mt-2 text-lg">🌍</div>
                </div>
                
                <div className="glass-light rounded-xl p-4 text-center card-hover">
                  <div className="text-3xl font-bold gradient-text mb-1">{landfillSaved}L</div>
                  <div className="text-xs text-slate-500">Landfill Space Saved</div>
                  <div className="mt-2 text-lg">📦</div>
                </div>
                
                <div className="glass-light rounded-xl p-4 text-center card-hover">
                  <div className="text-3xl font-bold gradient-text mb-1">${moneySaved}</div>
                  <div className="text-xs text-slate-500">Money Saved</div>
                  <div className="mt-2 text-lg">💰</div>
                </div>
              </div>

              {/* Visual comparison */}
              <div className="glass-light rounded-xl p-4 mt-4">
                <p className="text-xs text-slate-400 mb-3 font-semibold">Equivalent to:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>🌳</span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((Number(co2Saved) / 0.022) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-400">{Math.round(Number(co2Saved) / 0.022)} trees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🚗</span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((Number(co2Saved) / 0.0002) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-400">{Math.round(Number(co2Saved) / 0.0002)} km not driven</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🛍️</span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((totalItems / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-400">{totalItems} shopping bags saved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
