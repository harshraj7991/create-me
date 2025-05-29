// src/components/dashboard/PostList.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { RiEdit2Line, RiEyeLine } from 'react-icons/ri';

// import { db } from '@/lib/firebase';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { Post, SocialPlatform } from '@/types';

// Dummy posts data for demonstration
const DUMMY_POSTS: Post[] = [
  {
    id: 'post1',
    userId: 'user123',
    title: 'New Product Launch',
    description: 'Announcing our latest product innovation',
    content: {
      facebook: 'We\'re excited to announce our latest product! #innovation #newproduct',
      twitter: 'Just launched! Check out our new product 🚀 #innovation',
      linkedin: 'We\'re thrilled to introduce our latest innovation to the market. This product represents months of research and development...',
      instagram: 'New product alert! 🔥 #innovation #newproduct #launch'
    },
    platforms: ['facebook', 'twitter', 'linkedin', 'instagram'],
    status: 'published',
    publishedAt: new Date('2023-06-15'),
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-15')
  },
  {
    id: 'post2',
    userId: 'user123',
    title: 'Summer Sale',
    description: 'Promoting our summer discount campaign',
    content: {
      facebook: 'Summer SALE is here! Get up to 50% off on all products. Limited time only! #summersale #discount',
      twitter: 'SALE ALERT! 🔥 Up to 50% off everything! Shop now before it\'s gone! #summersale',
      instagram: '☀️ Summer vibes, summer prices! Shop our biggest sale of the season now! #summersale #shopnow'
    },
    platforms: ['facebook', 'twitter', 'instagram'],
    status: 'scheduled',
    scheduledFor: new Date(Date.now() + 86400000 * 2), // 2 days from now
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2023-06-20')
  },
  {
    id: 'post3',
    userId: 'user123',
    title: 'Customer Testimonial',
    description: 'Sharing positive feedback from a client',
    content: {
      linkedin: 'We\'re honored to share this testimonial from one of our valued clients: "Working with this team has transformed our business operations..."',
      facebook: 'Here\'s what our clients are saying about us! #testimonial #happyclient'
    },
    platforms: ['linkedin', 'facebook'],
    status: 'draft',
    createdAt: new Date('2023-06-25'),
    updatedAt: new Date('2023-06-25')
  }
];

// Platform icon mapping
const PlatformIcon = ({ platform }: { platform: SocialPlatform }) => {
  switch (platform) {
    case 'facebook':
      return <span className="text-blue-600">FB</span>;
    case 'instagram':
      return <span className="text-pink-600">IG</span>;
    case 'twitter':
      return <span className="text-blue-400">X</span>;
    case 'linkedin':
      return <span className="text-blue-800">LI</span>;
    default:
      return null;
  }
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (status) {
    case 'published':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'scheduled':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case 'draft':
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColor} ${textColor}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    // In a real app, fetch posts from Firestore
    // For now, use dummy data
    const fetchPosts = async () => {
      setLoading(true);
      
      try {
        // This is commented out as we're using dummy data
        // if (user) {
        //   const postsRef = collection(db, 'posts');
        //   const q = query(
        //     postsRef,
        //     where('userId', '==', user.uid),
        //     orderBy('createdAt', 'desc')
        //   );
        //   const querySnapshot = await getDocs(q);
        //   const fetchedPosts: Post[] = [];
        //   querySnapshot.forEach((doc) => {
        //     fetchedPosts.push({ id: doc.id, ...doc.data() } as Post);
        //   });
        //   setPosts(fetchedPosts);
        // }
        
        // Using dummy data instead
        setPosts(DUMMY_POSTS);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [user]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating your first post.</p>
        <div className="mt-6">
          <Link href="/create-post">
            <Button>Create Post</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <li key={post.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="truncate">
                  <div className="flex text-sm">
                    <p className="font-medium text-blue-600 truncate">{post.title}</p>
                    <p className="ml-1 flex-shrink-0 text-gray-500">
                      in {post.platforms.length} platform{post.platforms.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="mt-2 flex">
                    <div className="flex items-center text-sm text-gray-500">
                      <p>{post.description}</p>
                    </div>
                  </div>
                </div>
                <div className="ml-2 flex flex-shrink-0">
                  <StatusBadge status={post.status} />
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <div className="flex space-x-2">
                  {post.platforms.map((platform) => (
                    <div key={platform} className="text-xs">
                      <PlatformIcon platform={platform as SocialPlatform} />
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2 text-black">
                  <Link href={`/preview/${post.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<RiEyeLine />}
                    >
                      Preview
                    </Button>
                  </Link>
                  <Link href={`/create-post?edit=${post.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<RiEdit2Line />}
                    >
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <p>
                  {post.status === 'published' && post.publishedAt && (
                    <>Published on {format(post.publishedAt, 'MMM d, yyyy')}</>
                  )}
                  {post.status === 'scheduled' && post.scheduledFor && (
                    <>Scheduled for {format(post.scheduledFor, 'MMM d, yyyy')}</>
                  )}
                  {post.status === 'draft' && (
                    <>Last updated {format(post.updatedAt, 'MMM d, yyyy')}</>
                  )}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}