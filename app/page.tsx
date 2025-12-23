import Breadcrumb from "@/components/Breadcrumb";
import Comment from "@/components/Comment";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import RatingAndReviews from "@/components/RatingAndReviews";
import SectionName from "@/components/SectionName";
import SimilarProducts from "@/components/SimilarProducts";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <SectionName secName="T-Shirt" />
            <div className="container mx-auto px-5 py-4 grow">
                <Breadcrumb />
                <RatingAndReviews />
                <div className="mt-10 mb-16 flex flex-col gap-5">
                    <Comment rating={3} />
                    <Comment rating={5} />
                    <Comment rating={4} />
                    <Comment rating={2} />

                    <button className="bg-[#F5F5F5] p-4 rounded-xl text-tiny-pink font-semibold font-poppins-semi-bold text-xs w-[70%] mx-auto">
                        View More Comments
                    </button>
                </div>

                <SimilarProducts />
            </div>
            <Footer />
        </div>
    );
}
