import Image from "next/image";
import clsx from "clsx";
import RoxinhoMessageBar from "./roxinho-message";
import { limitarTexto } from "@/utils/text-transformer";

export interface MessageContentProps {
  id: number;
  fromUser: boolean;
  content: string;
}

export interface MessageBarProps {
  name: string;
  profilePictureUrl: string | undefined;
  message: MessageContentProps;
}

export default function MessageBar({
  message,
  name,
  profilePictureUrl = "/images/default-profile-picture.png",
}: MessageBarProps) {
  const [firstName, SecondName] = name.split(" ");

  if (!message.fromUser) {
    return <RoxinhoMessageBar message={message} />;
  }

  if (message.fromUser) {
    return (
      <div
        className={clsx(
          "relative flex items-center gap-4",
          "w-full sm:max-w-md",
          "bg-violet-200/60 backdrop-blur-md",
          "border border-violet-200/20",
          "rounded-xl  p-4 sm:pr-8",
          "shadow-lg shadow-violet-900/20",
          "group"
        )}
      >
        {/* Foto do funcionário */}
        <div
          className={clsx(
            "hidden sm:block group-hover:scale-110 transition",
            "absolute -left-6",
            "w-20 h-20 rounded-full overflow-hidden",
            "shadow-lg shadow-violet-900/40 border-2 border-violet-200/40"
          )}
        >
          <Image
            src={profilePictureUrl}
            alt="Foto do funcionário"
            width={300}
            height={300}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Texto */}
        <div className={clsx("sm:pl-11 flex flex-col", "overflow-x-hidden")}>
          <div>
            <h2 className="font-semibold text-violet-eggplant-900 text-sm text-nowrap">
              {limitarTexto(`${firstName} ${SecondName}`)}
            </h2>
            <p className="text-violet-eggplant-900/80 text-sm">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
