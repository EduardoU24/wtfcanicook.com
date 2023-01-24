import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";

export default function SmallCard({
    title,
    description,
    demo,
  }: {
    title: string;
    description: ReactNode | string;
    demo: ReactNode;
  }) {

  return (
    <div className={`relative col-span-1 h-96 overflow-hidden rounded-md border border-gray-200 bg-gray-50 shadow-sm`}>
      <div className="flex h-4/6 items-center justify-center">{demo}</div>
      <div className=" h-2/6 mx-auto max-w-md text-center items-center justify-center">
        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
          <Balancer>{title}</Balancer>
        </h2>
        <div className="text-gray-500">
          <Balancer>
            {typeof description === 'string' ? (
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                    className="font-medium text-gray-800 underline transition-colors"
                  />
                ),
                code: ({ node, ...props }) => (
                  <code
                    {...props}
                    // @ts-ignore (to fix "Received `true` for a non-boolean attribute `inline`." warning)
                    inline="true"
                    className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800"
                  />
                ),
              }}
            >
              {description}
            </ReactMarkdown> ) : (
              description
            )}
          </Balancer>
        </div>
      </div>
    </div>
  );
}