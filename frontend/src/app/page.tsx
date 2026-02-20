import FeaturedProducts from "./_components/FeaturedProducts";
import MyCarousel from "./_components/MyCarousel";
import RecentProducts from "./_components/RecentProducts";
import Slogan from "./_components/Slogan";

export default async function HomePage() {
  return (
    <div className="bg-inherit">
      <MyCarousel />
      {/* <AboutSection />
      <ServicesSection /> */}
      <FeaturedProducts />
      <RecentProducts />
      <Slogan />
    </div>
  );
}
