export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🔗</span>
              </div>
              <span className="text-xl font-bold">
                finda<span className="text-purple-400">pair</span>.org
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Find the mate of what you lost, or give away unwanted items for free. Reducing waste, one pair at a time.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Find a Pair</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Browse Solo Items</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Post Your Item</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Earrings</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Shoes</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Gloves & Accessories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">FreeItem Network</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition-colors">Browse Free Items</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Give Something Free</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Donate to Charity</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Community Rules</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Success Stories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Our Mission</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Waste Reduction Impact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-800/30">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <span className="text-4xl">🌍</span>
              <div className="flex-1">
                <h4 className="font-bold text-green-400 text-lg">Our Environmental Impact</h4>
                <p className="text-gray-400 text-sm">
                  By connecting solo items with their mates and giving away unwanted goods, our community has prevented 
                  <strong className="text-green-400"> 4.2 tons </strong> of waste from entering landfills this year. 
                  Every item reused is a step toward a more sustainable world.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">4.2t</div>
                  <div className="text-xs text-gray-500">Waste Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">3.2k</div>
                  <div className="text-xs text-gray-500">Pairs Matched</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">8.5k</div>
                  <div className="text-xs text-gray-500">Items Given</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 FindAPair.org — All rights reserved. Promoting waste reduction since day one.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
              <span className="text-sm">𝕏</span>
            </a>
            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
              <span className="text-sm">f</span>
            </a>
            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
              <span className="text-sm">in</span>
            </a>
            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
              <span className="text-sm">📷</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
