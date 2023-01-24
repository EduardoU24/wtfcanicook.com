import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import CookingCat from "@/components/home/cookingcat";
import AdBlock from "@/components/home/adblock";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import BegBlock from "@/components/home/begblock";

export default function Home() {
  return (
    <Layout>
      <motion.div
        className="max-w-xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>WTF Can I Cook?</Balancer>
        </motion.h1>
        <motion.p
          className="mt-6 text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            AI Generated recipes, enter your ingredients and let the internet gods decide your next meal.
          </Balancer>
        </motion.p>
        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <motion.a
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            href="https://twitter.com/EduardoU24"
            target="_blank"
            rel="noreferrer"
            className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
          >
            <Twitter className="h-5 w-5 text-[#1d9bf0]" />
            <p className="text-sm font-semibold text-[#1d9bf0]">
               Liked it? Share it!
            </p>
          </motion.a>
        </motion.div>
      </motion.div>
      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
      <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-3 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={demo}
            large={large}
          />
        ))}
      </div>
    </Layout>
  );
}

const features = [
  {
    title: "Beautiful, reusable components",
    large: true,
  },
  {
    title: "Any Ingredients",
    description:
      "By pressing an emoji 🍓 you can add them to your recipe easily but remember you can write anything in the input bar.",
    demo: <CookingCat />,
  },
  {
    title: "It's Free*",
    description:
      (<>
      This web uses the OpenAI API, if you want to use it more than once a day please add a key of your own.
      <br/>
      You can obtain a key
        <a
          className="font-medium text-gray-800 underline transition-colors m-1"
          href="https://beta.openai.com/account/api-keys"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </>),
    demo: <BegBlock />,
  },
  {
    title: "Ad Space",
    description:
      "Do you want your brand here? 👀 \n\n [contact@wtfcanicook.com](mailto:contact@wtfcanicook.com)",
    demo: <AdBlock />,
  },
];
