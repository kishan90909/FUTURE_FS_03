import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="h-[90vh] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      <div className="bg-black/60 p-10 rounded-xl text-white">
        <h1 className="text-5xl font-bold mb-6">
          Just Do It
        </h1>
        <p className="text-lg mb-8">
          AI-powered Nike website redesigned with modern UI & UX
        </p>
        <Link
          href="/products"
          className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
