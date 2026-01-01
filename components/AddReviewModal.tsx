"use client";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

interface AddReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, comment: string) => void;
    isLoading?: boolean;
}

const AddReviewModal = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading = false,
}: AddReviewModalProps) => {
    const { lang } = useLanguage();
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error(
                lang === "ar"
                    ? "الرجاء اختيار التقييم"
                    : "Please select a rating"
            );
            return;
        }
        if (comment.trim() === "") {
            toast.error(
                lang === "ar" ? "الرجاء كتابة تعليق" : "Please write a comment"
            );
            return;
        }

        await onSubmit(rating, comment);
        setIsSuccess(true);
    };

    const handleClose = () => {
        setRating(0);
        setHoveredRating(0);
        setComment("");
        setIsSuccess(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
            <div
                className="bg-white relative rounded-2xl p-6 max-w-lg w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="cursor-pointer absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                >
                    <IoClose size={24} className="text-tiny-black" />
                </button>

                {isSuccess ? (
                    // Success Message
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold font-poppins-semi-bold text-tiny-black mb-2">
                            {lang === "ar" ? "شكراً لك!" : "Thank You!"}
                        </h2>
                        <p className="text-sm font-normal font-poppins-regular text-tiny-black-300 text-center mb-6">
                            {lang === "ar"
                                ? "تم إرسال تقييمك بنجاح. نقدر ملاحظاتك!"
                                : "Your review has been submitted successfully. We appreciate your feedback!"}
                        </p>
                        <button
                            onClick={handleClose}
                            className="cursor-pointer px-8 py-3 bg-tiny-pink text-white font-poppins-medium rounded-2xl hover:bg-opacity-90 transition"
                        >
                            {lang === "ar" ? "إغلاق" : "Close"}
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="flex flex-col justify-center gap-1 items-center mb-6">
                            <h2 className="text-[18px] font-semibold font-poppins-semi-bold text-tiny-black">
                                {lang === "ar"
                                    ? "ملاحظات الجلسة"
                                    : "Session Feedback"}
                            </h2>
                            <p className="text-xs font-normal font-poppins-regular text-tiny-black-300">
                                {lang === "ar"
                                    ? "قيم المنتج وساعدنا على التحسين."
                                    : "Rate the product and help us improve."}
                            </p>
                        </div>

                        {/* Rating Stars */}
                        <div className="mb-6">
                            <div className="flex justify-center items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() =>
                                            setHoveredRating(star)
                                        }
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="cursor-pointer transition-transform hover:scale-110"
                                    >
                                        <FaStar
                                            size={32}
                                            className={`${
                                                star <=
                                                (hoveredRating || rating)
                                                    ? "text-tiny-pink"
                                                    : "text-gray-300"
                                            } transition-colors`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Comment */}
                        <div className="mb-6 relative">
                            <div
                                className={`absolute -top-2 left-3 font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2 ${
                                    lang === "ar" ? "right-3 left-auto" : ""
                                }`}
                            >
                                {lang === "ar" ? "تعليقك" : "Your Comment"}
                            </div>
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
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="cursor-pointer flex-1 px-4 py-3 bg-tiny-pink text-white font-poppins-medium rounded-2xl hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading
                                    ? lang === "ar"
                                        ? "جارٍ الإرسال..."
                                        : "Sending..."
                                    : lang === "ar"
                                    ? "إرسال"
                                    : "Send"}
                            </button>
                            <button
                                onClick={handleClose}
                                className="cursor-pointer flex-1 px-4 py-3 border border-tiny-pink text-tiny-pink font-poppins-medium rounded-2xl hover:bg-gray-50 transition"
                            >
                                {lang === "ar" ? "إلغاء" : "Cancel"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddReviewModal;
