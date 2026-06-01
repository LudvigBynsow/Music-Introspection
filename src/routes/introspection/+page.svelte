<script>
/* eslint-disable svelte/require-each-key */

    import {getAlbumInfo, getTracks, getimage} from '../api.js';
    import { onMount } from "svelte";
    import { sessionStore } from '$lib/stores'; // Import the store
	import { goto } from '$app/navigation';

    let score = 0;

    let highScore = 0;

    function updateHighScore() {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', JSON.stringify({score:highScore,user:session.name})); // Save high score to localStorage
        }
    }

    let session = null;
    sessionStore.subscribe(value => session = value); 
    let tracks_list = [];

    function getRandomTracks(array, count = 2) {
        if (!array || array.length === 0) return [];
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy.slice(0, count);
        
    }

    async function createTracks(){
        tracks_list = await Promise.all(
                getRandomTracks(tracks.toptracks.track, 2).map(async track => {
                    const image = await getAlbumInfo(track.artist.name, track.name);
                        
                    console.log('track info', {
                        name: track.name,
                        artist: track.artist.name,
                        playcount: track.playcount,
                        rank: track['@attr'].rank,
                    })


                    return {
                        ...track,
                        image,
                        rank: Number(track['@attr']?.rank)
                    };


                })
            );
    }

    let tracks;
    onMount(async () => {
        highScore = JSON.parse(localStorage.getItem('highScore'))?.score || 0; // Load high score from localStorage
        let highScoreUser = JSON.parse(localStorage.getItem('highScore'))?.user || 'Unknown'; // Load high score from localStorage

        if (session) {
            const response = await getTracks(session);
            tracks = JSON.parse(response);

            console.log('tracks', tracks);

            createTracks();
            }
        
         else {
            goto('/');
        }
    });

    let lost = false

    async function selectTrack(track) {
        let other_track = tracks_list.find(t => t.name !== track.name);
        if (other_track.rank > track.rank) {
            console.log("right");
            score += 1;
        } else {
            console.log("wrong");
            updateHighScore();
            lost = true;
        }
        createTracks();
    }
    
    

    
</script>

{#if lost}
    <div class="losing">
        YOU LOST
        <input type="button" value="Play again?" class="again" onclick={() => {score = 0; lost = false; createTracks();}}>
        <input type="button" value="Go to Main" class="back" onclick={() => {goto('/')}}>

    </div>
{/if}

<main>

<header>
<p class="score">Score: {score}</p>
<p class="score">High Score: {highScore}</p>
</header>

<section>
  {#each tracks_list as track }
   <div class="field">
        <div class="cover"> 
            {#if track.image?.[4]?.["#text"]} 
                <img class="image" src={track.image[4]["#text"]} alt="Album cover" /> 
            {:else} 
                <p>No image available: {track}</p> 
            {/if}
        </div>
        <div class="title">
            {track.name} - {track.artist.name}
        </div>
        <div class="Select">
            <input type="button" value="select" class="button" onclick={() => selectTrack(track)}>
        </div>
    </div> 
  {/each}
</section>
</main>

<style>
.score{
    color: white;
    justify-content: center;
    display: flex;
    align-items: end;
    margin: auto;
    font-size: 30px;
}
.losing{
    display: flex;
    background-color: rgba(0,0,0,0.8);
    height: 100vh;
    width: 100vw;
    position: fixed;
    color: white;
    justify-content: center;
    align-items: center;
    margin: auto;
    font-size: 30px;
    flex-direction: column;
}
main{
    background-color: black;
}
section{
    display: flex;
    background-color: black;
    height: 91.5vh;
    width: 100vw;
    margin: auto;
    gap:20px;
    justify-content: space-around;
    
    
}
.field{
    justify-content: center;
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 90%;
    flex: 1;
}

.cover{
    justify-content: center;
    width: 45%;
    height: 45%;
    margin: auto;
    margin-top: 5%;
    border: solid 5px black;
}
.image{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.title{
    display: flex;
    font-size: large;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 7%;
    margin: auto;
    margin-top: -5%;
    border: solid 5px black;
    min-width: fit-content;
}
.Select{
    width: 250px;
    height: 50px;
    justify-content: center;
    align-items: center;
    margin: auto;

}
.button{
    width: 100%;
    height: 100%;
}
.again{
    width: 200px;
    height: 30px;
    background-color: violet;
}
.back{
    width: 100px;
    height: 30px;
    background-color: purple;
    margin-top: 20px;
}
</style>