<script>
	import { onMount } from "svelte";
    import md5 from 'blueimp-md5';
    import { page } from '$app/state';
    import { sessionStore } from '$lib/stores'; // Import the store


	let { data } = $props();
    

    import { API_KEY, SHARED_SECRET } from './api.js';
    let session = null;


 //speciferar callback URL och skicka användare till lastfm auth page. Får sedan tillbaka token för session.
function account(){
        console.log(data)

        var cb = 'http://localhost:5173';
        window.location = 'http://www.last.fm/api/auth/?api_key=' + API_KEY + '&cb=' + cb;
        
    //getUser()
}



onMount(()=>{session = load_user(); console.log('session', session); });

export async function load_user(){
    // Få token från URL
    var token = $derived(page.url.href.split('=')[1]);
    console.log('token',token)
    if (token){

        // Skapa API-signature med nödvändiga parametrar och shared secret.
        const params = {
            api_key: API_KEY,
            method: 'auth.getSession',
            token: token,
    
        };
        // Skapa en sträng av parametrarna i alfabetisk ordning och lägg till shared secret i slutet.
        let sig = Object.keys(params).map(k => k + params[k]);
        sig = sig.join('') + SHARED_SECRET;
        console.log("sig ", sig)
        // Hasha strängen med MD5 metoden för att få API-signaturen.
        const api_sig = md5(sig);
        console.log('api', api_sig)

        // Skicka en begäran till Last.fm API med token och API-signaturen för att få sessionen.  
        const params_ = new URLSearchParams({
        method: 'auth.getSession',
        api_key: API_KEY,
        token,
        api_sig,
        format: 'json'
        });

        


        const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?${params_}`
        );

        const text = await res.json();
        console.log(text);
        const session = text.session;
        sessionStore.set(session); // Update the store
        return session;
}}

</script>
<main>
<header> Musical Introspective </header>


<section>
    <input type="button" value="Log in" class="account" onclick={account}>


    <a class="tabs" href="introspection">
    <div >
        Start Introspection
    </div>
    </a>

    <a class="tabs" href="information">
    <div  >
        Information
    </div>
    </a>

    <a class="tabs" href="leaderboard">
    <div>
        Leaderboard
    </div>
    </a>

</section>
</main>

<style>
main{
    background-color: rgb(0, 0, 171);
    height: 100vh;
}
section{
    display: flex;
    border: solid 5px blue;
    border-radius: 30px;
    height: 90vh;
    width: 70vw;
    align-items: center;
    margin: auto;
    flex-direction: column;
    font-size: 30px;
    background-color: rgb(86, 1, 233);
}
header{
    display: flex;
    height: fit-content;
    width: fit-content;
    font-size: 40px;
    justify-content: center;
    align-items: center;
    margin: auto;
    
}
.tabs{
    border: solid 5px rgb(99, 0, 99);
    height: fit-content;
    width: 40%;
    min-width: fit-content;
    align-items: center;
    text-align: center;
    margin-top: 15%;
    background-color: rgb(94, 0, 128);
    transition: background 0.5s;
    transition: all 0.5s;
    position: relative;
    color: black;
    text-decoration-line: none;
}
.tabs:hover{
    background-color: rgb(120, 15, 218);
    transform: scale(1.1);
}
.tabs:active{
    transform: scale(1.05)
}
.account{
    width: fit-content;
    height: fit-content;
    border: solid 3px black;
    font-size: 20px;
    margin-right: 90%;
}
.account:hover{
    border: solid 3px green;
}


</style>