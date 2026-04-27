import React from 'react';

const FeedbackList = ({ feedbacks, loading, error }) => {
  if (loading) return <div className="text-center py-10">Loading feedback...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
      {feedbacks.length === 0 ? (
        <p className="text-gray-500 italic">No feedback yet. Be the first to share!</p>
      ) : (
        feedbacks.map((f) => (
          <div key={f.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">{f.name}</span>
              <span className="text-yellow-500">
                {'★'.repeat(f.rating)}
                {'☆'.repeat(5 - f.rating)}
              </span>
            </div>
            <p className="text-gray-600">{f.message}</p>
            <span className="text-xs text-gray-400 mt-2 block">
              {new Date(f.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackList;
