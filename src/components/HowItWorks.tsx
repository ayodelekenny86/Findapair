export default function HowItWorks() {
  return (
    <section id="how" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Two platforms, one mission: reduce waste and help people find what they need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Find a Pair */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Find a Pair</h3>
            <p className="text-gray-600 mb-6">
              Lost one of a pair? Someone out there has the mate. It's cheaper than buying new, and saves something from the landfill.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                <div>
                  <p className="font-semibold text-gray-900">Post Your Solo Item</p>
                  <p className="text-sm text-gray-600">Describe what you have and what you're looking for. Include photos, size, brand, and condition.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                <div>
                  <p className="font-semibold text-gray-900">Get Matched</p>
                  <p className="text-sm text-gray-600">Our community gets notified. Someone who has the other half or is looking for exactly yours will reach out.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                <div>
                  <p className="font-semibold text-gray-900">Connect & Complete</p>
                  <p className="text-sm text-gray-600">Arrange exchange. The price is always less than buying a new pair — and you save something from the trash.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-xl border border-purple-100">
              <p className="text-sm text-gray-600 italic">
                💡 "At the very least, someone else would be happy to pay for your solo gold earring — maybe to make another item entirely out of it."
              </p>
            </div>
          </div>

          {/* FreeItem Network */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
            <div className="text-4xl mb-4">♻️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The FreeItem Network</h3>
            <p className="text-gray-600 mb-6">
              One person's trash is another person's treasure. Everything posted is 100% free. No money ever changes hands.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                <div>
                  <p className="font-semibold text-gray-900">List Your Unwanted Items</p>
                  <p className="text-sm text-gray-600">Snap a photo, write a description. Everything must be free, legal, and appropriate for all ages.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                <div>
                  <p className="font-semibold text-gray-900">Someone Claims It</p>
                  <p className="text-sm text-gray-600">Your online noticeboard keeps people visiting every minute. Someone nearby will claim your item.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                <div>
                  <p className="font-semibold text-gray-900">Or Donate to Non-Profit</p>
                  <p className="text-sm text-gray-600">Can't find a taker? Tag it for donation and we'll connect you with a local charity. Promote waste reduction!</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-xl border border-green-100">
              <p className="text-sm text-gray-600 italic">
                🌍 "A feelgood factor comes from giving unwanted stuff to a non-profit — promoting waste reduction and reducing landfills."
              </p>
            </div>
          </div>
        </div>

        {/* The Rules */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">The One Rule of FreeItem</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <span className="text-4xl mb-3 block">💚</span>
              <h4 className="font-bold text-gray-900 text-lg mb-2">Always Free</h4>
              <p className="text-gray-600 text-sm">No money changes hands. Everything listed is genuinely free to claim.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <span className="text-4xl mb-3 block">⚖️</span>
              <h4 className="font-bold text-gray-900 text-lg mb-2">Always Legal</h4>
              <p className="text-gray-600 text-sm">All items must be legal to give away and own. No stolen or prohibited goods.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <span className="text-4xl mb-3 block">👨‍👩‍👧‍👦</span>
              <h4 className="font-bold text-gray-900 text-lg mb-2">Family Friendly</h4>
              <p className="text-gray-600 text-sm">Everything posted must be appropriate for all ages. Keep it clean and kind.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
