'use client';

import { useState, useEffect, useRef } from 'react';

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
      {/* Plain counts, not buttons. Nothing on this site has a border radius
          or a filled call-to-action, and this was the last thing that did. */}
      <p className="a-label">RESPONSES</p>
      <ul className="a-stats">
        <li>
          <button className="a-linkish" onClick={handleLike} disabled={liked}>
            {liked ? 'liked' : 'like'}
          </button>{' '}
          <b>{likeCount}</b>
        </li>
        <li>
          <button className="a-linkish" onClick={toggleAndScroll}>
            {showComments ? 'hide comments' : 'comments'}
          </button>{' '}
          <b>{commentList.length}</b>
        </li>
      </ul>

      {showComments && (
        <section ref={commentsSectionRef} style={{ marginTop: '34px' }}>
          <form className="a-form" onSubmit={handleSubmitComment}>
            <input
              type="text"
              placeholder="your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="say something"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {error && <p className="a-error">{error}</p>}
            <div>
              <button className="a-linkish" type="submit" disabled={submitting}>
                {submitting ? 'posting…' : 'post comment'}
              </button>
            </div>
          </form>

          <ul className="a-rows" style={{ marginTop: '30px' }}>
            {commentList.length > 0 ? (
              commentList
                .slice()
                .sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt))
                .map((c, index) => (
                  <li className="a-row" key={index}>
                    <div className="a-row-main">
                      {c.name}
                      <span className="a-row-note">{c.comment}</span>
                    </div>
                    <span className="a-row-meta">
                      {new Date(c._createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))
            ) : (
              <li className="a-row">
                <span className="a-row-note">Nobody has said anything yet.</span>
              </li>
            )}
          </ul>
        </section>
      )}
    </>
  );
}
