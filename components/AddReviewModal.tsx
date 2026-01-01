"use client";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

interface AddReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, comment: string) => void;
}

const AddReviewModal = ({ isOpen, onClose, onSubmit }: AddReviewModalProps) => {
    const { lang } = useLanguage();
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (rating === 0) {
            alert(
                lang === "ar"
                    ? "الرجاء اختيار التقييم"
                    : "Please select a rating"
            );
            return;
        }
        if (comment.trim() === "") {
            alert(
                lang === "ar" ? "الرجاء كتابة تعليق" : "Please write a comment"
            );
            return;
        }
        onSubmit(rating, comment);
        handleClose();
    };

    const handleClose = () => {
        setRating(0);
        setHoveredRating(0);
        setComment("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
            <div
                className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold font-poppins-semi-bold text-tiny-black">
                        {lang === "ar" ? "أضف مراجعتك" : "Add Your Review"}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                    >
                        <IoClose size={24} className="text-tiny-black" />
                    </button>
                </div>

                {/* Rating Stars */}
                <div className="mb-6">
                    <label className="block text-sm font-medium font-poppins-medium text-tiny-black mb-3">
                        {lang === "ar" ? "التقييم" : "Rating"}
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="cursor-pointer transition-transform hover:scale-110"
                            >
                                <FaStar
                                    size={32}
                                    className={`${
                                        star <= (hoveredRating || rating)
                                            ? "text-tiny-pink"
                                            : "text-gray-300"
                                    } transition-colors`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment */}
                <div className="mb-6">
                    <label className="block text-sm font-medium font-poppins-medium text-tiny-black mb-3">
                        {lang === "ar" ? "تعليقك" : "Your Comment"}
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-tiny-pink transition resize-none font-poppins-regular text-sm"
                        placeholder={
                            lang === "ar"
                                ? "اكتب تعليقك هنا..."
                                : "Write your comment here..."
                        }
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={handleClose}
                        className="flex-1 px-4 py-3 border border-gray-300 text-tiny-black font-poppins-medium rounded-lg hover:bg-gray-50 transition"
                    >
                        {lang === "ar" ? "إلغاء" : "Cancel"}
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 px-4 py-3 bg-tiny-pink text-white font-poppins-medium rounded-lg hover:bg-opacity-90 transition"
                    >
                        {lang === "ar" ? "إرسال" : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddReviewModal;
