export default function SaraburiTypography({ 
  variant, 
  className, 
  children 
}: { 
  variant: string, 
  className?: string, 
  children: React.ReactNode
}) {
  switch(variant) {
    case "h1":
      return (<h1
      className={`text-3xl md:text-[2.5rem] font-medium ${className || ''}`}
      >{children}</h1>);
    case "h1a":
      return (<h1
      className={`text-3xl md:text-7xl font-medium ${className || ''}`}
      >{children}</h1>);
    case "h2":
      return (<h1
      className={`text-3xl ${className || ''}`}
      >{children}</h1>);
    case "h3":
      return (<h3
      className={`text-lg font-medium ${className || ''}`}
      >{children}</h3>);
    case "h4":
      return (<h1
      className={`text-lg text-neutral-500 ${className || ''}`}
      >{children}</h1>);
    case "h5":
      return (<h1
      className={`text-5xl ${className || ''}`}
      >{children}</h1>);
    case "error":
      return (<p
      className={`text-red-500 text-sm ${className || ''}`}
      >{children}</p>);
    default:
      throw new Error("Invalid SaraburiTypography variant");
  }
}