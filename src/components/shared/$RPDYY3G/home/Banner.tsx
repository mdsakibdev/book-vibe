import bannerImage from '@/assets/banner-image.png'
import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
    return (
<section className="container mx-auto px-4 py-8 md:py-12">
  <div className=" w-full">
    <div
      className="
        relative overflow-hidden
        rounded-4xl
        border border-gray-200
        bg-linear-to-br from-[#f5f7f6] via-white to-[#e8f5e9]
        px-10 py-10
        shadow-[0_15px_50px_rgba(0,0,0,0.08)]
        sm:px-10
        md:px-14 md:py-14
      "
    >
      {/* Decorative Circle */}
      <div
        className="
          absolute -right-20 -top-20
          h-64 w-64
          rounded-full
          bg-[#23BE0A]/10
          blur-2xl
        "
      />

      <div
        className="
          absolute -bottom-24 -left-20
          h-56 w-56
          rounded-full
          bg-green-200/20
          blur-3xl
        "
      />

      <div
        className="
          relative z-10
          flex flex-col items-center
          justify-between gap-10
          md:flex-row
          md:gap-16
        "
      >
        {/* Left Side */}
        <div className="flex-1 text-center md:text-left">
          {/* Small Badge */}
          <div
            className="
              mb-5 inline-flex items-center
              rounded-full
              border border-green-200
              bg-white/80
              px-4 py-2
              text-sm font-medium
              text-[#23BE0A]
              shadow-sm
              backdrop-blur-sm
            "
          >
            📚 Discover Your Next Read
          </div>

          {/* Heading */}
          <h1
            className="
              max-w-xl
              font-serif
              text-4xl font-bold
              leading-[1.1]
              tracking-tight
              text-gray-900
              sm:text-5xl
              lg:text-6xl
            "
          >
            Books to freshen up your{" "}
            <span className="text-[#23BE0A]">
              bookshelf
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-lg
              text-base
              leading-7
              text-gray-600
              sm:text-lg
            "
          >
            Explore our collection of inspiring stories,
            timeless classics, and exciting new reads
            selected just for you.
          </p>

          {/* Button */}
          <div className="mt-8">
            <Link
              href="/list"
              className="
                inline-flex items-center gap-2
                rounded-xl
                bg-[#23BE0A]
                px-6 py-3.5
                text-sm font-semibold
                text-white
                shadow-lg shadow-green-500/20
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-[#1fa609]
                hover:shadow-xl hover:shadow-green-500/30
                active:translate-y-0
              "
            >
              View The List
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Right Side - Book */}
        <div className="relative shrink-0">
          {/* Glow */}
          <div
            className="
              absolute left-1/2 top-1/2
              h-56 w-56
              -translate-x-1/2 -translate-y-1/2
              rounded-full
              bg-[#23BE0A]/15
              blur-3xl
            "
          />

          {/* Image Container */}
          <div
            className="
              relative
              h-64 w-48
              sm:h-72 sm:w-52
              md:h-80 md:w-60
              lg:h-90 lg:w-64
            "
          >
            <Image
              src={bannerImage}
              alt="The Dating Playbook For Men Book Cover"
              fill
              priority
              className="
                object-contain
                drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]
                transition-transform
                duration-500
                hover:-translate-y-2
                hover:rotate-1
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    );
};

export default Banner;