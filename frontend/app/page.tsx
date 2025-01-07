import Hero from "./ui/landing/Hero";
import Footer from "./ui/landing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-between scroll-smooth gap-16">
      <Hero />
      <Footer />
    </div>
  );
}
