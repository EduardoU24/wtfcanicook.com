import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Analytics } from "@vercel/analytics/react";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <Meta {...meta} />
      <SignInModal />
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display">
            <Image
              src="/logo.png"
              alt="WTFCanICook logo"
              width="30"
              height="30"
              className="mr-2 rounded-full"
            ></Image>
            <p>WTFCanICook.com</p>
          </Link>
          <div>
            <AnimatePresence>
              {!session && status !== "loading" ? (
                <motion.button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Sign In
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <main className="flex w-full flex-col items-center justify-center py-32">
        {children}
      </main>
      <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center text-xs">
        <p className="text-gray-500">
          Made with 💜 by{" "}
          <a
            className="font-medium text-gray-800 transition-colors mr-1"
            href="https://eduardo.cat/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eduardo.cat 

          </a>
          
          —

          Powered by{" "}
          <a
            className="font-medium text-gray-800 transition-colors mr-1"
            href="https://openai.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI 
            
          </a>

          —

          Template by{" "}
          <a
            className="font-medium text-gray-800 transition-colors mr-1"
            href="https://twitter.com/steventey"
            target="_blank"
            rel="noopener noreferrer"
          >
            Steven Tey
          </a>
        </p>
      </div>
      <Analytics />
    </>
  );
}
