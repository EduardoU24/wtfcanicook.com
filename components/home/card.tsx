import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import LabelSearch from "./labelsearch";
import ComponentGrid from "./component-grid";
import SmallCard from "./smallcard";
import { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

const openaiKey = process.env.OPENAI_API_KEY as string;
const openaiConfiguration = new Configuration({apiKey: openaiKey});
const openai = new OpenAIApi(openaiConfiguration);

const format 
       = 'You are a Cook or Chef.'
+ '\n' + 'Give me 3 recipes that may contain the next ingredients or other ingredients that are easy to find and tell me how to cook them step by step.'
+ '\n' + 'Make me a shopping list with the missing ingredients on each recipe.'
+ '\n' + 'The ingedients are {INGREDIENTS}'
+ '\n' + 'Return all this in the following json format:'
+ '\n' + '{'
+ '\n' + '  recipes: [{'
+ '\n' + '  name: "",'
+ '\n' + '  ingredients: [""],'
+ '\n' + '  preparation: [""],'
+ '\n' + '  }]'
+ '\n' + '}'
+ '\n' + 'only give me the json.';


export default function Card({ title, description, demo, large }: { title: string; description: ReactNode | string; demo: ReactNode; large?: boolean;}) {

  const [searching, setSearching] = useState(false);
  const [findings, setFindings] = useState("");
  
  const onSearch = async (event: any) => {
    console.log('Searching...');
    event.preventDefault();
    setSearching(true);
  
    const prompt = format.replace('{INGREDIENTS}', event.target.search.value);
  
    if(typeof event.target?.search?.value !== 'string') {
      setSearching(false);
      return;
    }
    
    const gptResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 0.3,
      presence_penalty: 0,
      frequency_penalty: 0.5,
    });
    setFindings(`${gptResponse.data.choices[0].text}`);
    setSearching(false);
  }

  if(!large) return ( <SmallCard key={title} title={title} description={description} demo={demo} /> );

  return (
  <div className={`relative col-span-2 row-span-3 h-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm p-3`}>
    <div className="mx-auto max-w-md text-center items-center justify-center pt-2 pb-5">
      <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
        <Balancer>{title}</Balancer>
      </h2>
    </div>
    <div className=" mx-auto text-center items-center pt-2 pb-5">
      <form onSubmit={onSearch}>
        <LabelSearch />
        <button type="submit" className=" clear-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {!searching ? <>Make Recipe
            <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </> : <>Generating...</>}
        </button>
      </form>
    </div>
    <hr className="h-10 mt-5 mx-10"  />
    {!searching && !findings ? <ComponentGrid /> : null}
    {findings ? <>{findings}</> : null}
  </div>
  );
}
