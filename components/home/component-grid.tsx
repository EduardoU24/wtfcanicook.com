import Tooltip from "@/components/shared/tooltip";

export default function ComponentGrid() {

  const emojis = [{emoji: '🍇', value: 'Grapes'},
  {emoji: '🍈', value: 'Melon'},
  {emoji: '🍉', value: 'Watermelon'},
  {emoji: '🍊', value: 'Tangerine'},
  {emoji: '🍋', value: 'Lemon'},
  {emoji: '🍌', value: 'Banana'},
  {emoji: '🍍', value: 'Pineapple'},
  {emoji: '🥭', value: 'Mango'},
  {emoji: '🍎', value: 'Apple'},
  {emoji: '🍐', value: 'Pear'},
  {emoji: '🍑', value: 'Peach'},
  {emoji: '🍒', value: 'Cherries'},
  {emoji: '🍓', value: 'Strawberry'},
  {emoji: '🫐', value: 'Blueberries'},
  {emoji: '🥝', value: 'Kiwi'},
  {emoji: '🍅', value: 'Tomato'},
  {emoji: '🫒', value: 'Olive'},
  {emoji: '🥥', value: 'Coconut'},
  {emoji: '🥑', value: 'Avocado'},
  {emoji: '🍆', value: 'Eggplant'},
  {emoji: '🥔', value: 'Potato'},
  {emoji: '🥕', value: 'Carrot'},
  {emoji: '🌽', value: 'Corn'},
  {emoji: '🌶️', value: 'Pepper'},
  {emoji: '🫑', value: 'Bell Pepper'},
  {emoji: '🥒', value: 'Cucumber'},
  {emoji: '🥦', value: 'Broccoli'},
  {emoji: '🧄', value: 'Garlic'},
  {emoji: '🧅', value: 'Onion'},
  {emoji: '🍄', value: 'Mushroom'},
  {emoji: '🥜', value: 'Peanuts'},
  {emoji: '🫘', value: 'Beans'},
  {emoji: '🍞', value: 'Bread'},
  {emoji: '🍗', value: 'Chicken'},
  {emoji: '🥩', value: 'Meat'},
  {emoji: '🥓', value: 'Bacon'},
  {emoji: '🥚', value: 'Egg'},
  {emoji: '🧈', value: 'Butter'},
  {emoji: '🍚', value: 'Rice'},
  {emoji: '🦀', value: 'Crab'},
  {emoji: '🦞', value: 'Lobster'},
  {emoji: '🦐', value: 'Shrimp'},
  {emoji: '🦑', value: 'Squid'},
  {emoji: '🦪', value: 'Oyster'}];

  const onEmojiClick = function(emoji: string) {
    let search = document.getElementById('search') as HTMLInputElement;
    if(search === null) 
      return;

    if(search.value.includes(emoji))
      return;

    let currentValue = search.value.trim().split(',');
    currentValue.push(` ${emoji}`);
    search.value = currentValue.join(',').replace(/^\,/, "");
  };

  return (
    <div className="grid gap-2 grid-cols-5 shadow-sm sm:grid-cols-11">
      {emojis.map(({ emoji, value }, key) => (
        <>
        <Tooltip content={value}>
          <div key={key++} onClick={() => onEmojiClick(value)} className="flex cursor-default items-center justify-center rounded-md md:border md:border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100">
            <p className="text-gray-600">{emoji}</p>
          </div>
        </Tooltip>
        </>
      ))}
    </div>
  );
}