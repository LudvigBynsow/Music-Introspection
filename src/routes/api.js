
import { PUBLIC_API_KEY, PUBLIC_SHARED_SECRET } from '$env/static/public';


export var API_KEY = PUBLIC_API_KEY;
export var SHARED_SECRET = PUBLIC_SHARED_SECRET;



export async function getTracks(session){
  console.log('lastfm_user', session);

  const top = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${session.name}&api_key=${API_KEY}&format=json&limit=150`);
  const top_text = await top.text();

  return top_text;
}

export async function getAlbumInfo(artist, track) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${artist}&track=${track}&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.track && data.track.album && data.track.album.title) {
    let albummbid = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=${API_KEY}&artist=${artist}&album=${data.track.album.title}&format=json`);
    const albummbid_data = await albummbid.json();
    console.log('albummbid_data', albummbid_data);
    //let images = await getimage(albummbid_data.album.mbid);
      return albummbid_data.album.image;

  }

}

export async function getimage(mbid) {
  let images = [];
 console.table(mbid);
if (mbid) {
const url = 'https://coverartarchive.org/release/' + mbid;
console.log(url);
await fetch(url)
.then(res => res.json())
.then((out) => {
        
console.table(out);
const relations = out.images;
console.table(relations);
// Find image relation
if (relations) {
  console.log('relations', relations);
for (let i = 0; i < relations.length; i++) {
        let image_url = relations[i].image;
        console.log(image_url);
        images.push(image_url);
        }
  return images;
}
})
.catch(err => { throw console.log(err) });
}
 }