<script>
        import { goto } from '$app/navigation';
</script>

<header>
        <h1>Information</h1>
</header>

<main> 
        <h2>Welcome to Music Introspective!</h2>
        <p>This is a game where you have to dive deep into your own music listening habits and guess which track out of two that you have listened to more.</p>
        <p>To play, simply press the "Start Introspection" button on the main screen and take a look at the tracks that pop up.</p>
        <p class="longparagraph">If you think you have listened to one more than the other, select it!</p>
        <p> Beat your own high score and compete with friends to see who knows their music-self best!</p>
        
</main>
<input type="button" value="Go to Main" class="back" onclick={() => {goto('/')}}>

<style>
        header{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100px;
        }
        main{
                display: flex;
                flex-direction: column;
                border:solid 5px black;
                align-items: center;
                margin: auto;
                height: 80vh;
                width: 70vw;
        }
        .longparagraph{
                margin-top: -15px;
        }
        .back{
                margin-left: 20px;
        }
</style>
