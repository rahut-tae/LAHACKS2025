"use client";
import { SaraburiTypography } from "@/components";
import { useTranslation } from "@/hooks/useTranslation";

export default function MyPage() {
	const { t } = useTranslation(); // Access toggle from the provider

  return (
    <div className="items-center justify-items-center p-4 mt-20 md:p-8 pb-20 gap-16 font-[family-name:var(--font-jakarta-sans)] bg-background">
      <main className="w-full gap-8 w-full items-center">
        {/* section 1 */}
        <section className="grid grid-cols-12 gap-y-4 md:gap-y-8 p-2 max-w-screen-xl mx-auto">
          <div className="col-span-full md:col-span-full">
            <SaraburiTypography 
              variant="h4" 
              className="my-2 text-center"
            >
              {t.terms_smallHeader}
            </SaraburiTypography>
            <SaraburiTypography 
              variant="h1" 
              className="my-4 text-center"
            >
              {t.terms_title}
            </SaraburiTypography>
          </div>
        </section>
      </main>
    </div>
  );
}
