import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import UserReviews from "@/components/UserReviews";
import Footer from "@/components/Footer";


export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* HeroSection */}
      <HeroSection />

      {/* Feature Section */}
      <FeatureSection />

      {/* User Reviews */}
      <UserReviews />

      {/* Other Content */}

      {/* Footer */}
      <Footer />
    </div>
  );
}