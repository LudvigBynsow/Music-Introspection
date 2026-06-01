
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	  console.log(params)
    let data =await fetch( 'http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=edcad2ac640c5c417014d5d8c726386e&format=json&limit=6', {headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    }})
    console.log(data.status)
    return await data.json()
}