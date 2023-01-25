import Link from "next/link.js";
import YoutubeEmbed from "./youtubeembed.js";

export default function RecipeCard({recipeData} : any) {
    return (
        <div className={`relative col-span-1 overflow-hidden rounded-md border border-gray-200 bg-gray-50 shadow-sm p-5 mb-3`}>
            <div className="h-2/6 text-left">
                <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
                    {recipeData.name}
                </h2>
            </div>
            <div className="grid grid-cols-2 col-span-1 p-5">
                {recipeData.ingredients && recipeData.ingredients.length > 0 ? <>
                    <div className="w-full col-span-1">
                        <h2 className="bgtextstyle">Ingredients: </h2>
                        <ul className="list-none">
                            {recipeData.ingredients.map((ingredient: string) => (
                                <><li className="hover:list-disc">{ingredient}</li></>
                            ))}
                        </ul>
                    </div>
                </> : null}

                {recipeData.preparation && recipeData.preparation.length > 0 ? <>
                    <div className="w-full col-span-1">
                        <h2 className="bgtextstyle">Preparation: </h2>
                        <ul className="list-decimal">
                            {recipeData.preparation.map((step: string) => (
                                <><li className="hover:list-disc">{step}</li></>
                            ))}
                        </ul>
                    </div>
                </> : null}
            </div>
            {recipeData.videos && recipeData.videos.length > 0 ? <>
                <h2 className="bgtextstyle mt-5 mb-5">What does youtube says?</h2>
                <div className={`grid grid-cols-2 gap-2`}>
                    {recipeData.videos.map((video: string, key:number) => (
                        <Link key={key++} className={`w-full grid-cols-2`} href={`https://www.youtube.com/watch?v=${video}`} target="_blank">
                            <iframe
                                className={`w-full aspect-video rounded-md`}
                                src={`https://www.youtube.com/embed/${video}?autoplay=0&rel=0`}
                                frameBorder="0"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                        </Link>
                    ))}
                </div>
            </> : null}
        </div>
    );
}