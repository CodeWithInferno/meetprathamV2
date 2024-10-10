import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import sanityClient from '@sanity/client';
import { useState, useEffect } from 'react';

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // replace with your project ID
  dataset: 'production', // replace with your dataset name
  useCdn: true, // `false` if you want to ensure fresh data
});

const LikeButton = ({ postId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const result = await client.fetch(
          `*[_type == "post" && _id == $postId]{likes}[0]`,
          { postId }
        );
        setLikeCount(result?.likes || 0);
      } catch (error) {
        console.error('Error fetching like count:', error);
      }
    };

    fetchLikeCount();

    const savedLikeStatus = localStorage.getItem(`liked-${postId}`);
    if (savedLikeStatus === 'true') {
      setLiked(true);
    }
  }, [postId]);

  const handleLike = async () => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);

    const newLikeCount = newLikedStatus ? likeCount + 1 : likeCount - 1;
    setLikeCount(newLikeCount);

    localStorage.setItem(`liked-${postId}`, newLikedStatus.toString());

    try {
      await client.patch(postId)
        .setIfMissing({ likes: 0 })
        .inc({ likes: newLikedStatus ? 1 : -1 })
        .commit();
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  return (
    <button onClick={handleLike} className="like-button">
      {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeButton;