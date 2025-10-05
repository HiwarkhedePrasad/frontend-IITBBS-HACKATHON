"use client";
import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Working with them was a game-changer. Their expertise in AI-driven analytics helped us increase our user engagement by over 40% in just one quarter. Truly remarkable results.",
      name: "Sarah Chen",
      title: "CEO, InnovateX",
      initials: "SC",
      color: "from-cyan-400 to-blue-500",
    },
    {
      quote:
        "The cloud infrastructure they built for us is rock-solid. Scalable, secure, and incredibly efficient. Our downtime has been virtually zero since the migration.",
      name: "David Rodriguez",
      title: "CTO, QuantumLeap",
      initials: "DR",
      color: "from-purple-400 to-pink-500",
    },
    {
      quote:
        "From concept to launch, the mobile app development process was seamless. The final product exceeded our expectations and has received rave reviews from our users.",
      name: "Emily White",
      title: "Head of Product, ConnectApp",
      initials: "EW",
      color: "from-emerald-400 to-teal-500",
    },
    {
      quote:
        "Their data science team is second to none. They uncovered insights we never would have found on our own, directly leading to a new, highly profitable revenue stream.",
      name: "Michael Brandt",
      title: "VP of Strategy, DataCorp",
      initials: "MB",
      color: "from-orange-400 to-red-500",
    },
    {
      quote:
        "The bespoke web platform is the backbone of our operations. Its performance and user-centric design have streamlined our workflow and boosted team productivity.",
      name: "Jessica Miller",
      title: "COO, Visionary Solutions",
      initials: "JM",
      color: "from-violet-400 to-purple-500",
    },
    {
      quote:
        "An exceptional partner in every sense of the word. They are not just vendors; they are collaborators who are genuinely invested in your success. Highly recommended.",
      name: "Alex Johnson",
      title: "Founder, Nebula Systems",
      initials: "AJ",
      color: "from-fuchsia-400 to-pink-500",
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl font-black mb-16 sm:mb-20 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
          Trusted by Industry Leaders
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group relative flex flex-col justify-between bg-gray-900/40 border-2 border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm hover:border-white/40 hover:shadow-2xl hover:bg-gray-900/60"
            >
              {/* Gradient accent line */}
              <div
                className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${testimonial.color} opacity-60`}
              />

              <div className="flex-grow relative">
                {/* Quote icon with gradient */}
                <div
                  className={`mb-5 bg-gradient-to-br ${testimonial.color} p-3 rounded-xl inline-flex shadow-lg`}
                >
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 24 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M9.47368 18C7.68421 18 6.09895 17.3491 4.71789 16.0474C3.33684 14.7456 2.64632 13.1754 2.64632 11.3368C2.64632 9.42105 3.20421 7.64912 4.32 6.02105C5.43579 4.39298 6.94737 2.63158 8.85474 0.736842L11.0253 2.64561C9.64421 3.94737 8.53895 5.17544 7.70947 6.32982C6.88 7.48421 6.46526 8.71228 6.46526 10.014C6.46526 10.3684 6.50105 10.6842 6.57263 10.9614C6.64421 11.2386 6.75158 11.4772 6.89474 11.6772C5.92421 11.5333 5.09474 11.8246 4.40632 12.5526C3.71789 13.2807 3.37368 14.2456 3.37368 15.4474C3.37368 16.3333 3.66526 17.0351 4.24842 17.5526C4.83158 18.0702 5.55789 18.3298 6.42737 18.3298H9.47368V18ZM23.0168 18C21.2274 18 19.6421 17.3491 18.2611 16.0474C16.88 14.7456 16.1895 13.1754 16.1895 11.3368C16.1895 9.42105 16.7474 7.64912 17.8632 6.02105C18.9789 4.39298 20.4905 2.63158 22.3979 0.736842L24 2.64561C23.0842 3.5614 22.2547 4.51228 21.5116 5.5C20.7684 6.48772 20.2316 7.51228 19.8947 8.57193C20.1011 8.5 20.3253 8.44737 20.5674 8.41228C20.8095 8.37719 21.0337 8.36842 21.2389 8.38596C22.2821 8.63158 23.0842 9.25439 23.6421 10.2544C24.2 11.2544 24.1642 12.3281 23.5326 13.4754L22.8442 14.8596C22.4295 15.6842 21.7242 16.5439 20.7284 17.4386C21.4168 17.7895 22.1768 17.9649 23.0063 17.9649L23.0168 18Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <p className="text-gray-100 text-base sm:text-lg leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 relative">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br ${testimonial.color} text-white font-bold text-lg mr-4 flex-shrink-0 shadow-lg`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-300">{testimonial.title}</p>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl bg-gradient-to-br ${testimonial.color} pointer-events-none`}
                style={{ zIndex: -1 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
