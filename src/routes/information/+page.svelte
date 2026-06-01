<script>
      import { goto } from '$app/navigation';
</script>

<main> 
        

        <header>
                <h1>Information</h1>
        </header>

        <section>
                <h2>Welcome to Music Introspective!</h2>
                <p>This is a game where you have to dive deep into your own music listening habits and guess which track out of two that you have listened to more.</p>
                <p>To play, simply press log in with your Last.fm account and then click the "Start Introspection" button on the main screen and take a look at the tracks that pop up.</p>
                <p class="longparagraph">If you think you have listened to one more than the other, select it!</p>
                <p>Beat your own high score and compete with friends to see who knows their music-self best!</p>
        </section>

<input type="button" value="Go to Main" class="back" onclick={() => {goto('/')}}>
</main>
<style>
        header{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100px;
                background-color: blueviolet;
        }
        section{
                display: flex;
                flex-direction: column;
                border:solid 5px black;
                align-items: center;
                margin: auto;
                height: 80vh;
                width: 70vw;
                background-color: blueviolet;
        }
        main{
                height: 100vh;
                width: 100vw;
                background-color: blueviolet;
        }
        .longparagraph{
                margin-top: -15px;
        }
        .back{
                margin-left: 20px;
        }
</style>
