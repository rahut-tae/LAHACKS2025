"use client";
import { SaraburiTypography, SaraburiButtonHref } from "@/components";

export default function HomePage() {

  return (
    <div className="items-center justify-items-center min-h-screen mt-20 pb-20 p-4 gap-16 md:p-8 font-[family-name:var(--font-jakarta-sans)] bg-background">
      <main className="flex flex-col gap-8 items-center">
        {/* section 1 */}
        <section className="grid grid-cols-12 gap-y-4 md:gap-y-8 p-2 max-w-screen-xl">
          <div className="col-start-1 md:col-span-5 col-span-full md:mt-18">
            <SaraburiTypography 
              variant="h1a" 
              className="pb-8 md:text-left text-center"
            >
              <p>Say <b>Open Sesame</b> to Your Next Job Opportunity</p>
            </SaraburiTypography>
            <div className="md:block flex justify-center md:justify-left">
              <SaraburiButtonHref style={3} href="https://scholarity.io/auth">
                Join Now
              </SaraburiButtonHref>
            </div>
            <div className="flex justify-center md:justify-start items-center mt-20">
              <p>3rd Place at</p>
              <img
                className=" w-12 mx-2 rounded-lg" 
                src="/assets/logo-lahacks.png"
                alt="trusted by" 
              />
            </div>
          </div>
          <div className="col-start-1 md:col-start-7 col-span-full md:col-span-7 relative overflow-visible w-full mt-10">
            <img
              className="absolute inset-0 rounded-lg" 
              src="/assets/hero-4.png" 
              alt="Hero picture" 
            />
          </div>

{/*
          <div className="hidden md:block col-span-full relative w-full aspect-[2] overflow-visible">
            <img
              className="absolute inset-0 rounded-lg" 
              src="/assets/hero-1.png" 
              alt="Hero picture" 
            />
            <div
              className="sticky top-[70%] w-48 md:w-72 aspect-[4/3] mb-2 md:mb-8"
              style={{ marginLeft: "auto", marginRight: "1rem" }}
            >
              <img
                className="absolute inset-0 rounded-lg shadow-xl" 
                src="/assets/face-1.png" 
                alt="Face picture" 
              />
            </div>
          </div>
          <div className="block md:hidden col-span-full relative w-full aspect-[400/540] overflow-visible">
            <img
              className="absolute inset-0 rounded-lg" 
              src="/assets/hero-1-mobile.png" 
              alt="Hero picture" 
            />
          </div>
            */}

        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
