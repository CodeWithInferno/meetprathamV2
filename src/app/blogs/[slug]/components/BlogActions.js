'use client';

import { useState, useEffect, useRef } from 'react';
import { Heart, MessageSquare } from 'lucide-react';

export default function BlogActions({ slug, initialLikes, initialComments }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [commentList, setCommentList] = useState(initialComments);
  const [showComments, setShowComments] = useState(false);

  // Comment Form State
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const commentsSectionRef = useRef(null);

  useEffect(() => {
    // Check local storage only on the client
    if (localStorage.getItem(`liked-${slug}`) === 'true') {
      setLiked(true);
    }
  }, [slug]);

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikeCount(prev => prev + 1);
    localStorage.setItem(`liked-${slug}`, 'true');
    await fetch('/api/like', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug }) });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!name || !comment) {
      setError("Name and comment fields are required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const response = await fetch('/api/comment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, comment, slug }) });
    
    if (response.ok) {
      setCommentList(prev => [...prev, { name, comment, _createdAt: new Date().toISOString() }]);
      setName('');
      setComment('');
    } else {
      setError("Failed to submit comment. Please try again.");
    }
    setSubmitting(false);
  };
  
  const toggleAndScroll = () => {
    const willBeOpen = !showComments;
    setShowComments(willBeOpen);
    // Scroll to the section after it becomes visible
    setTimeout(() => {
        commentsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  return (
    <>
      {/* --- ACTION BUTTONS --- */}
      <div className="space-y-4">
        <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-neutral-500">Engage</h3>
        <button onClick={handleLike} disabled={liked} className="w-full flex items-center justify-center gap-3 p-3 border-2 border-black rounded-md font-bold text-lg hover:bg-yellow-300 transition-colors disabled:bg-neutral-200 disabled:cursor-not-allowed">
          <Heart size={22} className={liked ? 'text-red-500 fill-current' : ''} />
          <span>{likeCount}</span>
        </button>
        <button onClick={toggleAndScroll} className="w-full flex items-center justify-center gap-3 p-3 border-2 border-black rounded-md font-bold text-lg hover:bg-yellow-300 transition-colors">
          <MessageSquare size={22} />
          <span>{commentList.length}</span>
        </button>
      </div>

      {/* --- COMMENTS SECTION (Appears below the main article content) --- */}
      {showComments && (
        <section ref={commentsSectionRef} className="bg-white border-t-2 border-black py-16 px-6 mt-20 -mx-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-sans text-3xl font-bold tracking-tight mb-8">Join the Conversation</h2>
            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="space-y-4 border-2 border-black p-6 rounded-lg mb-12">
              <input type="text" placeholder="Your Name*" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-stone-100 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 font-serif" />
              <textarea placeholder="Your Comment*" value={comment} onChange={(e) => setComment(e.target.value)} rows={4} className="w-full p-3 bg-stone-100 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 font-serif" />
              {error && <p className="text-red-600 font-sans text-sm">{error}</p>}
              <button type="submit" disabled={submitting} className="w-full p-3 bg-black text-white font-bold rounded-md hover:bg-neutral-800 disabled:bg-neutral-400 transition-colors">
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
            
            {/* Comment List */}
            <div className="space-y-6">
              {commentList.length > 0 ? (
                commentList.sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt)).map((c, index) => (
                  <div key={index} className="border-b-2 border-neutral-200 pb-4">
                    <p className="font-sans font-bold">{c.name}</p>
                    <p className="font-serif text-neutral-700 mt-1">{c.comment}</p>
                    <p className="text-xs text-neutral-400 mt-2 font-sans">{new Date(c._createdAt).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="font-serif text-neutral-500">Be the first to leave a comment.</p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}