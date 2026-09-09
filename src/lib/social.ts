// Social features: profiles, followers, social interactions
import { db } from './db'

export interface SocialProfile {
  userId: string
  bio: string
  website?: string
  socialLinks: {
    twitter?: string
    instagram?: string
    facebook?: string
  }
  followers: string[]
  following: string[]
  isPrivate: boolean
}

export interface SocialPost {
  id: string
  userId: string
  content: string
  images: string[]
  timestamp: number
  likes: string[]
  comments: SocialComment[]
  type: 'achievement' | 'match' | 'listing' | 'update'
  itemId?: string
}

export interface SocialComment {
  id: string
  userId: string
  text: string
  timestamp: number
}

class SocialService {
  // Get user's social profile
  getProfile(userId: string): SocialProfile {
    const profiles = this.getAllProfiles()
    return profiles.find(p => p.userId === userId) || {
      userId,
      bio: '',
      socialLinks: {},
      followers: [],
      following: [],
      isPrivate: false,
    }
  }

  // Get all profiles
  private getAllProfiles(): SocialProfile[] {
    try {
      const data = localStorage.getItem('findapair_social_profiles')
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  // Save profile
  private saveProfile(profile: SocialProfile): void {
    const profiles = this.getAllProfiles()
    const index = profiles.findIndex(p => p.userId === profile.userId)
    
    if (index >= 0) {
      profiles[index] = profile
    } else {
      profiles.push(profile)
    }
    
    localStorage.setItem('findapair_social_profiles', JSON.stringify(profiles))
  }

  // Update profile
  updateProfile(userId: string, updates: Partial<SocialProfile>): void {
    const profile = this.getProfile(userId)
    this.saveProfile({ ...profile, ...updates })
  }

  // Follow a user
  follow(followerId: string, followingId: string): boolean {
    if (followerId === followingId) return false

    const followerProfile = this.getProfile(followerId)
    const followingProfile = this.getProfile(followingId)

    // Check if already following
    if (followerProfile.following.includes(followingId)) {
      return false
    }

    // Add to following
    followerProfile.following.push(followingId)
    this.saveProfile(followerProfile)

    // Add to followers
    followingProfile.followers.push(followerId)
    this.saveProfile(followingProfile)

    return true
  }

  // Unfollow a user
  unfollow(followerId: string, followingId: string): boolean {
    const followerProfile = this.getProfile(followerId)
    const followingProfile = this.getProfile(followingId)

    // Remove from following
    followerProfile.following = followerProfile.following.filter(id => id !== followingId)
    this.saveProfile(followerProfile)

    // Remove from followers
    followingProfile.followers = followingProfile.followers.filter(id => id !== followerId)
    this.saveProfile(followingProfile)

    return true
  }

  // Check if following
  isFollowing(followerId: string, followingId: string): boolean {
    const profile = this.getProfile(followerId)
    return profile.following.includes(followingId)
  }

  // Get followers count
  getFollowersCount(userId: string): number {
    const profile = this.getProfile(userId)
    return profile.followers.length
  }

  // Get following count
  getFollowingCount(userId: string): number {
    const profile = this.getProfile(userId)
    return profile.following.length
  }

  // Get social posts
  getPosts(limit: number = 20): SocialPost[] {
    try {
      const data = localStorage.getItem('findapair_social_posts')
      const posts: SocialPost[] = data ? JSON.parse(data) : []
      return posts.slice(0, limit)
    } catch {
      return []
    }
  }

  // Create social post
  createPost(userId: string, content: string, type: SocialPost['type'], itemId?: string): SocialPost {
    const post: SocialPost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      content,
      images: [],
      timestamp: Date.now(),
      likes: [],
      comments: [],
      type,
      itemId,
    }

    const posts = this.getPosts(1000)
    posts.unshift(post)
    localStorage.setItem('findapair_social_posts', JSON.stringify(posts))

    return post
  }

  // Like a post
  likePost(postId: string, userId: string): boolean {
    const posts = this.getPosts(1000)
    const post = posts.find(p => p.id === postId)
    
    if (!post) return false
    if (post.likes.includes(userId)) return false

    post.likes.push(userId)
    localStorage.setItem('findapair_social_posts', JSON.stringify(posts))

    return true
  }

  // Unlike a post
  unlikePost(postId: string, userId: string): boolean {
    const posts = this.getPosts(1000)
    const post = posts.find(p => p.id === postId)
    
    if (!post) return false

    post.likes = post.likes.filter(id => id !== userId)
    localStorage.setItem('findapair_social_posts', JSON.stringify(posts))

    return true
  }

  // Add comment to post
  addComment(postId: string, userId: string, text: string): SocialComment | null {
    const posts = this.getPosts(1000)
    const post = posts.find(p => p.id === postId)
    
    if (!post) return null

    const comment: SocialComment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      text,
      timestamp: Date.now(),
    }

    post.comments.push(comment)
    localStorage.setItem('findapair_social_posts', JSON.stringify(posts))

    return comment
  }

  // Get user's posts
  getUserPosts(userId: string): SocialPost[] {
    return this.getPosts(1000).filter(p => p.userId === userId)
  }

  // Get feed (posts from followed users)
  getFeed(userId: string, limit: number = 20): SocialPost[] {
    const profile = this.getProfile(userId)
    const allPosts = this.getPosts(1000)
    
    // Get posts from followed users
    const feedPosts = allPosts.filter(p => 
      profile.following.includes(p.userId) || p.userId === userId
    )
    
    return feedPosts.slice(0, limit)
  }
}

export const socialService = new SocialService()
