interface BentoCardProps {
  title: string;
  description: string;
  media: React.ReactNode;
  position: 'left' | 'middle' | 'right';
}

function BentoCard({ title, description, media, position }: BentoCardProps) {
  const roundedClasses = {
    left: 'max-lg:rounded-t-[1.5rem] lg:rounded-l-[1.5rem]',
    middle: ']',
    right: 'max-lg:rounded-b-[1.5rem] lg:rounded-r-[1.5rem]',
  }[position];

  return (
    <div className="relative max-w-sm mx-auto">
      <div className={`absolute inset-px rounded-lg bg-white ${roundedClasses}`} />
      <div className={`relative flex h-full pb-10 pt-5 flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] ${roundedClasses.replace(/\[2rem\]/g, '[calc(2rem+1px)]')}`}>
        <div className="flex flex-1 items-center [container-type:inline-size]">
          {media}
        </div>
        <div className="px-8 sm:px-10mx-auto">
          <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
            {title}
          </p>
          <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
            {description}
          </p>
        </div>
      </div>
      <div className={`pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 ${roundedClasses}`} />
    </div>
  );
}

export function BentoGrid() {
  return (
    <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3">
      <BentoCard
        position="left"
        title="Verbindend"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores impedit."
        media={
          <div className="h-[min(152px,40cqw)] text-5xl w-full items-center justify-center flex">
            🤝
          </div>
        }
      />
      <BentoCard
        position="middle"
        title="Performant"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores impedit."
        media={
          <>
            <div className="h-[min(152px,40cqw)] text-5xl w-full items-center justify-center flex">
              🚀
            </div>
            {/* <img
              className="w-full max-lg:max-w-xs p-8 mx-auto"
              src="https://tailwindui.com/plus/img/component-images/bento-03-performance.png"
              alt=""
            /> */}
          </>
        }
      />
      <BentoCard
        position="right"
        title="Sicher"
        description="Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida."
        media={
          <>
            <div className="h-[min(152px,40cqw)] text-5xl w-full items-center justify-center flex">
              🔒
            </div>
            {/* <img
              className="h-[min(152px,40cqw)] object-cover p-4 mx-auto"
            src="https://tailwindui.com/plus/img/component-images/bento-03-security.png"
              alt=""
            /> */}
          </>
        }
      />
    </div>
  );
}
