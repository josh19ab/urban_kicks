import React from "react";

function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl text-gray-900 ">
            <strong className="font-extrabold text-quaternary passero-one-regular text-6xl">
              Theft
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl text-gray-700 font-mono">
            Sustainable Fashion for the Conscious Consumer <br />
            Discover Unique Pre-Loved Pieces with Style
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-quaternary px-12 py-3 text-sm font-medium text-white shadow   sm:w-auto hover:bg-black focus:outline-none focus:ring "
              href="/explore"
            >
              Shop Thrift
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
