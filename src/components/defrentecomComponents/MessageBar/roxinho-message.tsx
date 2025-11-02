import clsx from "clsx";
import { MessageContentProps } from ".";
import Image from "next/image";

export interface RoxinhoMessageBarProps {
  message: MessageContentProps;
}

export default function RoxinhoMessageBar({ message }: RoxinhoMessageBarProps) {
  return (
    <div
      className={clsx(
        "relative flex items-center gap-4 self-end",
        "w-full sm:max-w-md",
        "bg-violet-200/60 backdrop-blur-md",
        "border border-violet-200/20",
        "rounded-xl p-4 md:mr-6",
        "shadow-lg shadow-violet-900/20",
        "group",
      )}
    >
      {/* Foto do funcionário */}
      <div
        className={clsx(
          "hidden sm:block group-hover:scale-110 transition",
          "absolute -right-10",
          "w-20 h-20 rounded-full overflow-hidden",
          "shadow-lg shadow-violet-900/40 border-2 border-violet-200/40"
        )}
      >
        <Image
          src="/images/mascote.png"
          alt="Foto do funcionário"
          width={300}
          height={300}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Texto */}
      <div
        className={clsx(
          "sm:pr-16 flex flex-col",
          "overflow-x-hidden"
        )}
      >
        <div>
          <h2 className="text-right sm:text-left font-semibold text-violet-eggplant-900 text-sm text-nowrap">
            Roxinho
          </h2>
          <p className="text-violet-eggplant-900/80 text-sm">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
}
