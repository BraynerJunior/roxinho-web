"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@/animations/loading.json";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-violet-eggplant-50">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
        className="w-full h-100"
      />
    </div>
  );
}
