import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-14 sm:pt-20">
      <PageContainer>
        <div className="relative rounded-4xl bg-slate-950 px-6 py-16 text-white shadow-2xl sm:px-10 lg:px-14">
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-orange-500/30 blur-2xl" />
          <div className="absolute -bottom-16 left-10 h-52 w-52 rounded-full bg-sky-500/20 blur-2xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
                New Season 2026
              </span>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Wear The City.
                <br />
                Own The Moment.
              </h1>
              <p className="max-w-xl text-base text-slate-300 sm:text-lg">
                Discover street-ready styles, premium essentials, and high
                comfort gear designed for daily moves.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/shop"
                  className="rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  Shop Collection
                </Link>
                <Link
                  href="/productdetails/pulse-oversized-hoodie"
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  Explore Bestseller
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur animate-[float_6s_ease-in-out_infinite]">
                <p className="text-3xl font-black">120+</p>
                <p className="text-sm text-slate-200">Premium Products</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur sm:translate-y-8 animate-[float_7s_ease-in-out_infinite]">
                <p className="text-3xl font-black">48h</p>
                <p className="text-sm text-slate-200">Fast Delivery Window</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur sm:col-span-2 animate-[float_8s_ease-in-out_infinite]">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
                  Trending Tags
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  #LayeredLooks #UrbanMinimal #CorePerformance
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
