const { Configuration, OpenAIApi } = require("openai");
const openaiConfiguration = new Configuration({apiKey: process.env.OPENAI_API_KEY});
const openai = new OpenAIApi(openaiConfiguration);

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

export const OpenIARequest = async function(ingredients: string) {

  const prompt = format.replace('{INGREDIENTS}', ingredients);

  const gptResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 1500,
    temperature: 0.7,
    top_p: 0.3,
    presence_penalty: 0,
    frequency_penalty: 0.5,
  });

  const json = `${gptResponse.choices[0].text.trim().replace('\n', '')}`;
  try {
    JSON.parse(json);
    return true;
  } catch(e) {
    return false;
  }
  
};

export default OpenIARequest;
