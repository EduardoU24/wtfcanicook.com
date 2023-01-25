import { NextApiRequest, NextApiResponse } from "next";

const limit = 4;

export const YoutubeRequest = async  function(req: NextApiRequest, res: NextApiResponse) {
    if(!req.headers.authorization) {
        res.status(404).end('');
        return;
    }

    const url = `https://www.googleapis.com/youtube/v3/search?maxResults=${limit}&videoEmbeddable=true&q=${encodeURIComponent(req.query.q as string)}&key=${req.headers.authorization as string}`;
    const data = await fetch(url)
    .then(response => response.json())
    .catch(error => {
      res.json(error);
    });
    let toReturn = [];
    for(let item of data.items) {
        toReturn.push(item.id.videoId);
    }
    return res.status(200).json(toReturn);
};

export default YoutubeRequest;
