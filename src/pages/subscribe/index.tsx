import React from "react";
import Image from "next/image";
import PriceCard from "@/components/PriceCard";
import Head from "next/head";

function Index() {
  const monthlyPoints: string[] = [
    "Great starter",
    "Read all premium contents.",
    "Podcast access.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  ];
  const yearlyPoints: string[] = [
    "Save more",
    "Read all premium contents.",
    "Podcast access.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  ];
  return (
    <>
      <Head>
        <title>Subscribe - Teracce</title>
      </Head>
      <div className="container mx-auto px-3 pb-16 pt-28 sm:pt-40">
        <div className="flex flex-col items-center xl:flex-row xl:justify-between">
          <div className="flex flex-col items-center">
            <div className="relative w-56 h-56 lg:w-64 lg:h-64">
              <Image
                src={"/payment-plan.png"}
                alt="A girl watering a plant"
                fill={true}
              />
            </div>
            <p className="w-full text-center text-xl">
              Invest, and it&apos;ll <span className="underline">grow</span>
            </p>
            <h1 className="text-2xl w-full">
              Choose your{" "}
              <span className="font-extrabold">subscription plan:</span>
            </h1>
          </div>
          <div className="flex flex-col mt-5 gap-3 md:flex-row items-stretch">
            <div>
              <PriceCard
                title="Monthly Plan"
                price={50000}
                duration="Monthly"
                points={monthlyPoints}
              />
            </div>
            <div>
              <PriceCard
                title="Yearly Plan"
                price={600000}
                duration="Yearly"
                points={yearlyPoints}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
