export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }}>
                <span className="text-[10px] font-black text-black">fp</span>
              </div>
              <span className="text-[14px] font-semibold text-white">
                findapair<span className="text-zinc-600">.org</span>
              </span>
            </div>
            <p className="text-[13px] text-zinc-500 leading-relaxed mb-4">
              Find the mate of what you lost, or give away unwanted items for free.
            </p>
            <div className="flex gap-2">
              {['𝕏', 'f', 'in', '📷'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-7 h-7 rounded-md flex items-center justify-center text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-4">Find a Pair</h4>
            <ul className="space-y-2.5">
              {['Browse solo items', 'Post your item', 'Earrings', 'Shoes', 'Gloves', 'Watches'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-4">FreeItem Network</h4>
            <ul className="space-y-2.5">
              {['Browse free items', 'Give something free', 'Donate to charity', 'Community rules', 'Success stories'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['Our mission', 'How it works', 'Smart features', 'Impact report', 'Contact us', 'Privacy policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="panel p-6 mb-10 flex flex-col md:flex-row items-center gap-6">
          <div className="text-3xl">🌍</div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-[14px] font-semibold text-emerald-400 mb-1">Our environmental impact</h4>
            <p className="text-[13px] text-zinc-500">
              Our community has prevented <strong className="text-emerald-400">4.2 tons</strong> of waste and saved <strong className="text-emerald-400">12.8 tons of CO₂</strong> this year.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-lg font-bold gradient-text">4.2t</div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-wider">Waste saved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold gradient-text">12.8t</div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-wider">CO₂ saved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold gradient-text">11.8k</div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-wider">Items reused</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[12px] text-zinc-600">
            © 2026 FindAPair.org — All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[12px] text-zinc-600">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Cookies</a>
            <span className="flex items-center gap-1.5">
              <span className="status-dot"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
