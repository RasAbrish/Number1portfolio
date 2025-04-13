interface SectionHeadingProps {
  title: string
  highlight?: string
  description?: string
}

export function SectionHeading({ title, highlight, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-2 sm:gap-4 text-center px-4">
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-[1.1]">
        {title}{" "}
        {highlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500">
            {highlight}
          </span>
        )}
      </h2>
      <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full my-2 sm:my-4"></div>
      {description && (
        <p className="max-w-[85%] leading-normal text-muted-foreground text-sm sm:text-base md:text-lg sm:leading-7 mb-4 sm:mb-8">
          {description}
        </p>
      )}
    </div>
  )
}
