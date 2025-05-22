"use client";
import { SaraburiTypography, SaraburiButtonClickable } from "@/components";
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
              <SaraburiButtonClickable 
                style={3} 
                onClick={() => {
                  window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                  });
                }}
              >
                Join the Waitlist
              </SaraburiButtonClickable>
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
        </section>
        <section className="grid grid-cols-12 gap-y-4 md:gap-y-8 p-2 max-w-screen-xl">
          <div className="col-start-1 md:col-start-1 col-span-full md:col-span-6 w-full mt-5 md:mt-10 w-full order-last md:order-none">
            <img
              className="w-full h-auto rounded-lg" 
              src="/assets/hero-5.png" 
              alt="Hero picture" 
            />
          </div>
          <div className="col-span-full col-start-1 md:col-start-8 md:col-span-4 md:mt-18 order-first md:order-none">
            
            <SaraburiTypography 
              variant="h1" 
              className="pb-8 md:text-left text-center"
            >
              <p>One Resume. A Thousand Doors.</p>
            </SaraburiTypography>
            <p>Open Sesame is a fully autonomous job application platform powered by AI agents. Just upload your resume and set preferences — it applies to jobs 24/7 in the background while you focus on interviews and networking.</p>
            <br />
            <p>Networking mode automatically researches and composes personalized messages to recruiters and hiring managers in your industry. You&apos;re up to 10 times more likely to get an offer this way.<sup>1</sup></p>
            <br/>
            <br/>
            <SaraburiButtonClickable
              style={3}
              onClick={() => {
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: 'smooth'
                });
              }}
            >
              Join the Waitlist
            </SaraburiButtonClickable>
          </div>
          <p className="block col-start-1 col-span-full text-sm"><sup>1</sup> Flynn J. 25 Incredible Employee Referral Statistics [2023]: Facts about Employee Referrals in the U.S., 2023</p>
        </section>
        <section className="grid grid-cols-12 gap-y-4 md:gap-y-8 p-8 max-w-screen-xl w-full">
          <div className="col-span-full md:col-start-4 md:col-span-6 md:my-18">
            <SaraburiTypography 
              variant="h1" 
              className="pb-8 text-center w-full mx-auto"
            >
              Watch it in action
            </SaraburiTypography>
            <p className="text-center mb-8">Demo of the prototype Open Sesame agent in action. Not representative of the final product.</p>
            <div className="relative w-full aspect-video">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/HO5hX6xxCZg"
                title="OpenSesame Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
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
