import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5001/api/feedback');
      if (!res.ok) throw new Error('Failed to fetch feedback');
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackAdded = (newFeedback) => {
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-extrabold mb-8 text-center">Wall of Love</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <FeedbackForm onFeedbackAdded={handleFeedbackAdded} />
          <FeedbackList feedbacks={feedbacks} loading={loading} error={error} />
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;
