import SaraburiTypography from "@/components/saraburiTypography";
import { HiArrowRight } from 'react-icons/hi2';

export default function SaraburiTile({ variant, className, title, description, src, children } : { variant: number, className?: string, title? : string, description?: string, src?: string, children?: React.ReactNode }) {
  switch(variant) {
    case 1:
      return <a 
        className={`relative p-4 md:p-8 rounded-lg bg-white  transition-colors hover:bg-[#f2f2f2] ${className || ''}`}
        href="https://scholarity.io/app/#"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <SaraburiTypography variant="h3">
          {title || ""}
        </SaraburiTypography>
        <div className="pb-3"></div>
        <p>
          {description || ""}
        </p>
        <p className="pb-8"></p>
        <div className="absolute inset-0 flex flex-col items-start justify-end p-4 md:p-8">
          <HiArrowRight className="w-6 h-6"/>
        </div>
      </a>;
    case 2:
      if (src === undefined) {
        throw new Error("Invalid SaraburiTile: src is required for variant 2");
      }
      return <a
        className={`relative p-0 rounded-lg bg-white  aspect-[3/4] w-full transition-opacity duration-300 hover:opacity-70 ${className || ''}`}
        href="https://scholarity.io/app/#"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* background */}
        <img
          className="rounded-lg object-cover h-full w-full transform scale-100 hover:scale-110"
          src={src}
          alt="Description"
        />
        {/* foreground */}
        <div className="absolute inset-0 flex flex-col items-start justify-end p-4 text-black">
          {children}
          <SaraburiTypography variant="h3">
            {title || ""}
          </SaraburiTypography>
          <div className="pb-3"></div>
          <p className="hidden md:block">
            {description || ""}
          </p>
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-start p-4">
          <HiArrowRight className="w-6 h-6"/>
        </div>
      </a>;

  }
}