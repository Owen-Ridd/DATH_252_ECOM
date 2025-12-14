import React, { useState, useEffect } from "react";
import axiosClient from "../../../api/axiosClient";
import toast from "react-hot-toast";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      const { data } = await axiosClient.get(`/products/${productId}/reviews`);
      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchReviews(); }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login to write a review");

    setLoading(true);
    try {
      await axiosClient.post(`/products/${productId}/reviews`, { rating, comment });
      toast.success("Review Submitted!");
      setComment("");
      setRating(5);
      fetchReviews(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 pt-5 border-top">
      <h3 className="text-center mb-5" style={{fontFamily: "'Playfair Display', serif"}}>Customer Reviews</h3>
      
      <div className="row justify-content-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <h5 className="mb-4 text-uppercase small fw-bold text-muted" style={{letterSpacing: "1px"}}>
            {reviews.length} Comments
          </h5>
          
          {reviews.length === 0 && <p className="text-muted fst-italic">No reviews yet. Be the first to write one!</p>}

          <div style={{maxHeight: "500px", overflowY: "auto", paddingRight: "10px"}}>
            {reviews.map((review) => (
              <div key={review._id} className="mb-4 pb-4 border-bottom">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3 fw-bold text-muted" style={{width: "40px", height: "40px"}}>
                            {review.name.charAt(0)}
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold" style={{fontSize: "0.9rem"}}>{review.name}</h6>
                            <small className="text-muted" style={{fontSize: "0.75rem"}}>
                                {new Date(review.createdAt).toLocaleDateString()}
                            </small>
                        </div>
                    </div>
                    <div className="text-warning small">
                        {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fa ${i < review.rating ? "fa-star" : "fa-star-o text-muted opacity-25"}`}></i>
                        ))}
                    </div>
                </div>
                <p className="text-muted mb-0 small" style={{lineHeight: "1.6"}}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-5 offset-lg-1">
            <div className="bg-light p-4 rounded-3">
                <h5 className="mb-4 fw-bold" style={{fontFamily: "'Playfair Display', serif"}}>Write a Review</h5>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label className="form-label small text-uppercase fw-bold text-muted">Rating</label>
                        <div className="d-flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <i 
                                    key={star}
                                    className={`fa fa-star fs-4 cursor-pointer ${star <= rating ? "text-warning" : "text-muted opacity-25"}`}
                                    onClick={() => setRating(star)}
                                    style={{cursor: "pointer"}}
                                ></i>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label small text-uppercase fw-bold text-muted">Your Comment</label>
                        <textarea 
                            className="form-control border-0 rounded-0 border-bottom bg-transparent px-0"
                            rows="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts about this product..."
                            style={{resize: "none", boxShadow: "none", borderBottomColor: "#ccc"}}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-dark w-100 rounded-0 text-uppercase fw-bold py-3" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;