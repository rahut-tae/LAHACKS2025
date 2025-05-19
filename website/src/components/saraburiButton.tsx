import { HiArrowRight } from 'react-icons/hi2';
import SaraburiSpinner from './saraburiSpinner';

function getButtonStyle(style: number, className?: string) {
  switch (style) {
    case 0:
      return `rounded-full border border-solid border-transparent transition-colors inline-flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 mr-4 ${className || ''}`;
    case 1:
      return `rounded-full border border-solid border-black/[.08] transition-colors inline-flex items-center justify-center hover:bg-[#f2f2f2] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 mr-4 ${className || ''}`;
    case 2:
      return `rounded-lg transition-colors inline-flex items-center justify-center hover:bg-[#00000010] hover:border-transparent sm:min-w-24 text-sm font-medium h-10 ${className || ''}`;
    case 3:
      return `rounded-full transition-colors inline-flex items-center justify-center hover:bg-[#000000c0] hover:border-transparent bg-foreground text-background text-sm pl-6 pr-4 h-10 ${className || ''}`;
    case 4:
      return `rounded-full transition-colors inline-flex items-center justify-center hover:bg-[#c0c0c0c0]  hover:border-transparent bg-[#eeeeeeff]  text-sm pl-6 pr-4 h-10 ${className || ''}`;
    case 5:
      return `rounded-full transition-colors inline-flex items-center justify-center hover:bg-[#f0f0f0f0]  hover:border-transparent bg-[#ffffffff] text-sm pl-6 pr-6 h-10 ${className || ''}`;
  }
}

export default function SaraburiButtonHref({ className, style = 0, href, children } : 
  { className?: string, 
    style?: number, 
    href: string, 
    children?: string
  }
) {
  const styleCss = getButtonStyle(style, className);

  return <a
    className={styleCss}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
    {(style === 3 || style === 4) && <HiArrowRight className="w-6 h-6 pl-1"/>}
  </a>;
}

export function SaraburiButtonClickable({ className, style=0, onClick, children } : 
  { className?: string, 
    style?: number, 
    href?: string, 
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    children?: string 
  }
) {
  const styleCss = getButtonStyle(style, className);

    return <button
      type="button"
      className={styleCss}
      onClick={onClick}
    >
      {children}
      {(style === 3 || style === 4) && <HiArrowRight className="w-6 h-6 pl-1"/>}
    </button>;
}

export function SaraburiButtonSubmit({ className, style=0, isLoading=false, children } : 
  { className?: string, 
    style?: number, 
    href?: string, 
    isLoading?: boolean,
    children?: string 
  }
) {
  const styleCss = getButtonStyle(style, className);

    return <button
      type="submit"
      className={styleCss}
    >
      {isLoading ? <SaraburiSpinner/> : children}
      {(style === 3 || style === 4) && !isLoading && <HiArrowRight className="w-6 h-6 pl-1"/>}
    </button>;
}