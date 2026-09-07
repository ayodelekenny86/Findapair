export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/10 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center glow-sm">
                <span className="text-slate-900 font-bold text-sm">FP</span>
              </div>
              <span className="text-lg font-bold">
                finda<span className="text-cyan-400">pair</span>
                <span className="text-slate-600 text-sm">.org</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Find the mate of what you lost, or give away unwanted items for free. Reducing waste, one pair at a time.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'f', 'in', '📷'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 glass-light rounded-lg flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all text-sm"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-slate-200 mb-4 text-sm uppercase tracking-wider">Find a Pair</h4>
            <ul className="space-y-2.5">
              {['Browse Solo Items', 'Post Your Item', 'Earrings', 'Shoes', 'Gloves & Accessories', 'Watches'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-200 mb-4 text-sm uppercase tracking-wider">FreeItem Network</h4>
            <ul className="space-y-2.5">
              {['Browse Free Items', 'Give Something Free', 'Donate to Charity', 'Community Rules', 'Success Stories', 'Trust Scores'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-200 mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {['Our Mission', 'How It Works', 'Smart Features', 'Impact Report', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="glass rounded-2xl p-6 mb-10 border border-emerald-500/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-4xl">🌍</div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-bold text-emerald-400 text-lg mb-1">Our Environmental Impact</h4>
              <p className="text-slate-400 text-sm">
                By connecting solo items with their mates and giving away unwanted goods, our community has prevented{' '}
                <strong className="text-emerald-400">4.2 tons</strong> of waste from entering landfills and saved{' '}
                <strong className="text-emerald-400">12.8 tons of CO₂</strong> this year.
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-xl font-bold gradient-text">4.2t</div>
                <div className="text-[10px] text-slate-600 uppercase tracking-wider">Waste Saved</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold gradient-text">12.8t</div>
                <div className="text-[10px] text-slate-600 uppercase tracking-wider">CO₂ Saved</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold gradient-text">11.8k</div>
                <div className="text-[10px] text-slate-600 uppercase tracking-wider">Items Reused</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">
            © 2026 FindAPair.org — All rights reserved. Promoting waste reduction and sustainable living.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookies</a>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
