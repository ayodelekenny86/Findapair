import { useState, useEffect } from 'react'

interface Review {
  id: string
  reviewerId: string
  reviewerName: string
  rating: number
  comment: string
  timestamp: number
}

interface SellerReviewsProps {
  sellerId: string
  sellerName: string
}

export default function SellerReviews({ sellerId, sellerName }: SellerReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [showForm, setShowForm] = useState(false)
  const [newRating, setNewRating] = useState(5)
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    loadReviews()
  }, [sellerId])

  const loadReviews = () => {
    const stored = localStorage.getItem(`reviews_${sellerId}`)
    if (stored) {
      setReviews(JSON.parse(stored))
    }
  }

  const submitReview = () => {
    if (!newComment.trim()) return

    const user = JSON.parse(localStorage.getItem('findapair_currentUser') || '{}')
    const newReview: Review = {
      id: Date.now().toString(),
      reviewerId: user.id || 'anonymous',
      reviewerName: user.name || 'Anonymous',
      rating: newRating,
      comment: newComment,
      timestamp: Date.now(),
    }

    const updated = [newReview, ...reviews]
    setReviews(updated)
    localStorage.setItem(`reviews_${sellerId}`, JSON.stringify(updated))
    setShowForm(false)
    setNewComment('')
    setNewRating(5)
  }

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0'

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-400">Seller Reviews</h3>
          <p className="text-xs text-zinc-500">
            {reviews.length} reviews • {averageRating}★ average
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs text-cyan-400 hover:text-cyan-300"
        >
          {showForm ? 'Cancel' : 'Write Review'}
        </button>
      </div>

      {showForm && (
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 mb-4">
          <div className="mb-3">
            <label className="text-xs text-zinc-500 mb-2 block">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setNewRating(star)}
                  className={`text-2xl ${star <= newRating ? 'text-amber-400' : 'text-zinc-600'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 resize-none"
            rows={3}
          />
          <button
            onClick={submitReview}
            className="mt-2 px-4 py-2 bg-cyan-500 text-black text-xs font-semibold rounded-lg hover:bg-cyan-400"
          >
            Submit Review
          </button>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-xs text-zinc-600 text-center py-4">No reviews yet</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-xs font-medium text-white">{review.reviewerName}</div>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`text-xs ${star <= review.rating ? 'text-amber-400' : 'text-zinc-600'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-[10px] text-zinc-600">
                  {new Date(review.timestamp).toLocaleDateString()}
                </div>
              </div>
              <p className="text-xs text-zinc-400">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
