import Link from "next/link";
import RetroPaddle from "@/components/RetroPaddle";

const features = [
  {
    number: "01",
    title: "Your schedule.",
    description: "Tell us when you're available to play. No more endless group messages trying to find a time.",
  },
  {
    number: "02",
    title: "Your people",
    description: "Get matches with players of similar skill levels for enjoyable, balanced games.",
  },
  {
    number: "03",
    title: "Your next game.",
    description: "Receive suggested matches, accept the ones that work for you, and get back on the court.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="eyebrow mb-5">
            Your neighbourhood court club 
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight">
            Good games. 
            <span className="block text-petrol-blue">
              Good company.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted max-w-xl">
            Less scheduling, more time on the court.
            PickleMatch brings compatible players together for games that fit your schedule and skill level.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/register"
              className="btn btn-primary"
            >
              Find your next match 
            </Link>

            <Link
              href="#how-it-works"
              className="btn btn-outline"
            >
              How it works 
            </Link>
          </div>
        </div>

        {/* Pickleball illustration */}
        <div className="flex justify-center">
          <RetroPaddle />
        </div>
      </section>

      {/* Signature retro stripe */}
      <div 
        className="retro-stripe"
        aria-hidden="true"
      />

      {/* How it works section */}
      <section 
        id="how-it-works"
        className="max-w-7xl mx-auto px-6 py-16 lg:py-20"
      >
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">
            Simple by design 
          </p>

          <h2 className="text-4xl sm:text-5xl">
            More play. Less planning.
          </h2>

          <p className="text-muted mt-4">
            Three simple steps to your next game.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <article 
              key={feature.number}
              className="pm-card"
            >
              <span className="font-display text-4xl font-bold text-burnt-orange">
                {feature.number}
              </span>

              <h3 className="pm-card-title mt-5">
                {feature.title}
              </h3>

              <p className="text-muted">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Final invitation */}
      <section className="bg-petrol-blue text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <h2 className="text-3xl sm:text-4xl mb-4">
            See you on the court.
          </h2>

          <p className="mb-6 text-white/90">
            Your next favourite game it just around the corner 
          </p>

          <Link
            href="/register"
            className="btn bg-surface text-charcoal hover:bg-white"
          >
            Join PickleMatch 
          </Link>
        </div>
      </section>
    </>
  );
}