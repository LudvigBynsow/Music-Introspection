<script>
    import { goto } from '$app/navigation';
    let highscore=JSON.parse(localStorage.getItem('highScore'))
</script>

<h1>Work in Progress</h1>
<main>
    <ol>
        
        <li>{highscore.user}: {highscore.score}</li>
        
    </ol>
</main>

<input type="button" value="Go to Main" class="back" onclick={() => {goto('/')}}>