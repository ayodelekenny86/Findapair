import { useState } from 'react'

export default function ReferralSystem() {
  const [referralCode] = useState('FINDAPAIR-JOHN2024')
  const [copied, setCopied] = useState(false)
  const [referralLink] = useState('https://findapair.org/ref/JOHN2024')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stats = {
    totalReferrals: 12,
    activeReferrals: 8,
    rewardsEarned: 45,
    pendingRewards: 15,
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="eyebrow mb-3 block">Invite friends</span>
          <h2 className="heading-lg mb-3">
            Earn <span className="gradient-text">rewards</span>
          </h2>
          <p className="text-body max-w-xl mx-auto">
            Invite friends to FindAPair and earn rewards for every active member.
          </p>
        </div>

        <div className="panel p-6 md:p-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-[20px] font-bold gradient-text">{stats.totalReferrals}</p>
              <p className="text-[11px] text-zinc-500">Total Referrals</p>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-[20px] font-bold gradient-text">{stats.activeReferrals}</p>
              <p className="text-[11px] text-zinc-500">Active Members</p>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-[20px] font-bold gradient-text">${stats.rewardsEarned}</p>
              <p className="text-[11px] text-zinc-500">Rewards Earned</p>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-[20px] font-bold gradient-text">${stats.pendingRewards}</p>
              <p className="text-[11px] text-zinc-500">Pending</p>
            </div>
          </div>

          {/* Referral Code */}
          <div className="mb-6">
            <label className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Your Referral Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="input-field flex-1 font-mono text-cyan-400"
              />
              <button
                onClick={() => copyToClipboard(referralCode)}
                className="btn-primary !px-6 whitespace-nowrap"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Referral Link */}
          <div className="mb-6">
            <label className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Your Referral Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="input-field flex-1 text-[12px]"
              />
              <button
                onClick={() => copyToClipboard(referralLink)}
                className="btn-secondary !px-6 whitespace-nowrap"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="btn-secondary flex-1 !text-[13px]">
              📧 Email Friends
            </button>
            <button className="btn-secondary flex-1 !text-[13px]">
              💬 Share on WhatsApp
            </button>
            <button className="btn-secondary flex-1 !text-[13px]">
              🐦 Share on Twitter
            </button>
          </div>

          {/* How it works */}
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h4 className="text-[14px] font-semibold text-white mb-4">How it works</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">1️⃣</div>
                <p className="text-[13px] text-zinc-300 font-medium mb-1">Share your code</p>
                <p className="text-[12px] text-zinc-500">Send your referral link to friends</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">2️⃣</div>
                <p className="text-[13px] text-zinc-300 font-medium mb-1">They sign up</p>
                <p className="text-[12px] text-zinc-500">Friend creates an account</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">3️⃣</div>
                <p className="text-[13px] text-zinc-300 font-medium mb-1">You earn rewards</p>
                <p className="text-[12px] text-zinc-500">Get $5 when they post their first item</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
