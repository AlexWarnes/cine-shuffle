import { UNSPLASH_ACCESS_KEY, } from "$env/static/private";
import { error } from "@sveltejs/kit";
const baseURL = "https://api.unsplash.com/photos/random"
let err = 0
export async function load(){
  const image = await getRandomImage()
  if (!image){
    error(400, { message: "Unsplash api error"})
  }
  return {
    image
  }
}

async function getRandomImage(){
  const orientation = 'landscape'
  // orientation=${orientation}
  const topics = 'cinematic'
  return await fetch(`${baseURL}?&topics=${topics}`, {
    method: 'GET',
    headers: {
      'Accept-Version': 'v1',
      'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    }
  }).then(res => {
    return res.json()
  })
}