// import { useState } from 'react';
// const Comment = ({ comments }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [comment, setComment] = useState('');
//   const [commentList, setCommentList] = useState(comments || []);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmitComment = async () => {
//     setSubmitting(true);
//     setError(null);
//     setSuccessMessage('');

//     if (!name || !email || !comment) {
//       setError('All fields are required.');
//       setSubmitting(false);
//       return;
//     }

//     const commentData = {
//       name,
//       email,
//       comment,
//     };

//     try {
//       const response = await fetch('/api/comment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(commentData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSuccessMessage(data.message);
//         setCommentList([...commentList, commentData]);
//         setName('');
//         setEmail('');
//         setComment('');
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message);
//       }
//     } catch (error) {
//       console.error('Error submitting comment:', error);
//       setError('Failed to submit comment. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="mt-12 w-full max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>

//       {/* Comment Form */}
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <textarea
//             placeholder="Your Comment"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
//           />
//           <button
//             onClick={handleSubmitComment}
//             disabled={submitting}
//             className={`w-full p-3 bg-blue-600 text-white font-semibold rounded-md transition-all duration-200 ${
//               submitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
//             }`}
//           >

//             {submitting ? 'Submitting...' : 'Submit Comment'}
//           </button>
//         </div>
//       </div>

//       {/* Display Comments */}
//       <div className="space-y-6">
//         {commentList.length > 0 ? (
//           commentList.map((comment, index) => (
//             <div key={index} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
//               <p className="text-lg font-semibold text-gray-700">{comment.name}</p>
//               <p className="text-gray-600 mt-1">{comment.comment}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No comments yet. Be the first to comment!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Comment;











import { useState } from 'react';

const Comment = ({ comments, postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState(comments || []);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmitComment = async () => {
    setSubmitting(true);
    setError(null);
    setSuccessMessage('');

    if (!name || !email || !comment) {
      setError('All fields are required.');
      setSubmitting(false);
      return;
    }

    const commentData = {
      name,
      email,
      comment,
      post: postId, // Ensure the field name matches what the backend expects
    };

    console.log('Submitting comment data:', commentData); // Debugging log

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setCommentList([...commentList, commentData]);
        setName('');
        setEmail('');
        setComment('');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 w-full max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>

      {/* Comment Form */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          />
          <textarea
            value={postId}
            readOnly
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-12 bg-gray-100"
          />
          <button
            onClick={handleSubmitComment}
            disabled={submitting}
            className={`w-full p-3 bg-blue-600 text-white font-semibold rounded-md transition-all duration-200 ${
              submitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {submitting ? 'Submitting...' : 'Submit Comment'}
          </button>
        </div>
      </div>

      {/* Display Comments */}
      <div className="space-y-6">
        {commentList.length > 0 ? (
          commentList.map((comment, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
              <p className="text-lg font-semibold text-gray-700">{comment.name}</p>
              <p className="text-gray-600 mt-1">{comment.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Comment;