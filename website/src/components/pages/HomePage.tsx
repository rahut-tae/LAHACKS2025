"use client";
import { SaraburiTypography, SaraburiButtonHref } from "@/components";
import ContactForm from "@/components/layout/contactForm";

export default function HomePage() {

  return (
    <div className="items-center justify-items-center min-h-screen pt-20 pb-20 p-4 gap-16 md:px-8 font-[family-name:var(--font-jakarta-sans)] bg-[#f8f8f8]">
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
            <div className="flex justify-center md:justify-start items-center mt-7 md:mt-20">
              <p>3rd Place at</p>
              <img
                className=" w-12 mx-2 rounded-lg" 
                src="/assets/logo-lahacks.png"
                alt="trusted by" 
              />
            </div>
          </div>
          <div className="col-start-1 md:col-start-7 col-span-full md:col-span-7 w-full mt-5 md:mt-10 w-full">
            <img
              className="w-full h-auto rounded-lg" 
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
        <section className="grid grid-cols-12 gap-y-4 md:gap-y-8 p-8 max-w-screen-xl bg-white rounded-lg w-full">
          <div className="col-span-full md:col-start-5 md:col-span-4 md:my-18">
            <SaraburiTypography 
              variant="h1" 
              className="pb-8 md:text-left text-center"
            >
              <p>Join the Waitlist</p>
            </SaraburiTypography>
            <p>We promise to not spam you and only send you relevant updates. Your data will be used purely for this waitlist.</p>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
