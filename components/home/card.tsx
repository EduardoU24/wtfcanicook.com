import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import LabelSearch from "./labelsearch";
import ComponentGrid from "./component-grid";
import SmallCard from "./smallcard";
import { useState } from "react";
import RecipeCard from "./recipecard";
import { useSession } from "next-auth/react";
import { useSignInModal } from "../layout/sign-in-modal";
import Image from 'next/image';

const format 
       = 'You are a Cook or Chef.'
+ '\n' + 'Give me 2 recipe that may contain the next ingredients or other ingredients that are easy to find and tell me how to cook them step by step.'
+ '\n' + 'Make me a shopping list with the missing ingredients on each recipe.'
+ '\n' + 'The ingedients are {INGREDIENTS}'
+ '\n' + 'Return all this in the following json format:'
+ '\n' + '{'
+ '\n' + '	"recipes": [{'
+ '\n' + '		"name": "",'
+ '\n' + '		"ingredients": [],'
+ '\n' + '		"preparation": []'
+ '\n' + '	}]'
+ '\n' + '}'
+ '\n' + 'only give me the json.';

const DEFAULT_PARAMS = {
  "model": "text-davinci-003",
  "temperature": 0.7,
  "max_tokens": 1500,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
}

export async function saveRecipe(data: any) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.NEXTAUTH_SECRET as string
    },
    body: JSON.stringify(data)
  };

  const toReturn = await fetch('/api/recipes', requestOptions).then(data => data.json());
  return toReturn;
}

export async function getGPT(ingredients: string) {
  const prompt = format.replace('{INGREDIENTS}', ingredients);
  const params_ = { ...DEFAULT_PARAMS, ...{prompt: prompt} };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY as string
    },
    body: JSON.stringify(params_)
  };

  const data = await fetch('https://api.openai.com/v1/completions', requestOptions).then(data => data.json());
  return data;
}

export async function loadYoutubeFromGPT(parsedGPT: any) {
  for(let i = 0; i < parsedGPT.recipes.length; i++)  {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.YOUTUBE_API_KEY as string
      }
    };
    const youtubeRequest = await fetch(`/api/youtube?q=${parsedGPT.recipes[i].name}`, requestOptions).then(data => data.json());
    parsedGPT.recipes[i].videos = youtubeRequest;
  }
  return parsedGPT;
}

export default function Card({ title, description, demo, large }: { title: string; description: ReactNode | string; demo: ReactNode; large?: boolean;}) {

  const testJson = {
    "recipes": [{
      "name": "Garlic Broccoli Stir Fry",
      "ingredients": ["1 tablespoon vegetable oil", "1 onion, thinly sliced", "3 cloves garlic, minced", "1 head broccoli, chopped into florets", "1 pound ground beef"],
      "preparation": ["Heat oil in a large skillet over medium-high heat.", "Add onion and garlic and cook until softened, about 3 minutes.", "Add broccoli and cook for 3 minutes.", "Add ground beef and cook for an additional 5 minutes, stirring occasionally.", "Cook until the beef is no longer pink and the broccoli is cooked through, about 5 minutes.", "Serve with rice or noodles."],
      "videos": ["LIy6Bhg7nH8", "3p-igEWj_n0", "mRqy5-Wv2GA", "Xt5zzI_3-VA"]
    }, {
      "name": "Meaty Onion Soup",
      "ingredients": ["1 tablespoon olive oil", "1 onion, diced", "3 cloves garlic, minced", "2 carrots, chopped", "2 celery stalks, chopped", "2 cups beef broth", "1 pound ground beef", "1/2 teaspoon dried thyme", "1/2 teaspoon dried oregano", "Salt and pepper to taste"],
      "preparation": ["Heat the olive oil in a large pot over medium-high heat.", "Add the onion, garlic, carrots, and celery and cook until softened, about 5 minutes.", "Add the beef broth and bring to a simmer.", "Add the ground beef, thyme, oregano, and salt and pepper and cook for an additional 5 minutes.", "Simmer for 15 minutes, or until the beef is cooked through.", "Serve with crusty bread."],
      "videos": ["GtopeHKdDOo", "CeBJP7CJK10", "LIy6Bhg7nH8", "3yfCOHzpcO8"]
    }]
  };

  const [searching, setSearching] = useState(false);
  const [found, setFound] = useState(false);
  const [findings, setFindings] = useState("");
  const [errorMessage, setError] = useState("");
  const [parsedGPT, setParsedGPT] = useState();
  const { data: session } = useSession();
  const { email, image } = session?.user || {};
  const { SignInModal, setShowSignInModal } = useSignInModal();
  
  const onSearch = async (event: any) => {
    event.preventDefault();

    if (!email) {
        setShowSignInModal(true);
        console.log('setShowSignInModal');
        return;
    }

    if(typeof event.target?.search?.value !== 'string' || event.target.search.value.length < 3) {
      setSearching(false);
      return;
    }

    setSearching(true);

    try {
      const gpt = await getGPT(event.target.search.value);
      if(gpt.error) {
        setSearching(false);
        setError("Something went wrong, please try again. \n\n" + gpt.error.message);
        return;
      }
      const json = `${gpt.choices[0].text.trim().replace('\n', '')}`;
      await setFindings(json);
      const parsedJson = await JSON.parse(json);
      const withYoutubes = await loadYoutubeFromGPT(parsedJson);
      setParsedGPT(withYoutubes);
      setSearching(false);
      setFound(true);

      saveRecipe(withYoutubes);
    } catch(e) {
      console.log(e);
      setSearching(false);
      setError("Something went wrong, please try again...");
      return;
    }
  }

  if(!large) return ( <SmallCard key={title} title={title} description={description} demo={demo} /> );

  return (
  <div className={`relative col-span-2 row-span-3 h-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm p-3`}>
    <div className="mx-auto max-w-md text-center items-center justify-center pt-2 pb-5">
      <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-2xl md:font-normal">
        <Balancer>{!!parsedGPT || found ? <>Bon appetit</> : <>Try with what you have in the fridge</>}</Balancer>
      </h2>
    </div>

    <SignInModal />

    {errorMessage ? 
      <div className="p-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Whoops, </strong>
          <span className="block sm:inline"> {errorMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3"onClick={() => { setError("") }}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      </div>
    : null}

    <div className="mx-auto text-center items-center pt-2 pb-5">
      <form onSubmit={onSearch}>
        <fieldset disabled={!!parsedGPT || searching || found}>
        <LabelSearch />
        <button disabled={!!parsedGPT || searching || found} type="submit" className=" clear-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {!!parsedGPT || found ? <>Try again in a few minutes</> : 
            <>
              {!searching ? <>Make Recipe
              <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </> : <>Generating...</>}
            </>}
        </button>
        </fieldset>
      </form>
    </div>
    <hr className="h-10 mt-5 mx-10"  />

    {!searching ? null : <div className="w-full p-5"><Image src={"https://i.kym-cdn.com/photos/images/original/002/051/163/11a.gif"} alt="Loading..." height={220} width={220} className="rounded-md aspect-square mx-auto text-center" /></div> }

    {!!parsedGPT || searching || found ? null : <ComponentGrid />}

    {parsedGPT && (parsedGPT as any).recipes.length > 0 && (parsedGPT as any).recipes.map((recipe : any, key : number) => (
      <RecipeCard key={key++} recipeData={recipe} />
    ))}
  </div>
  );
}
