import "./howToPlay.css"

const HowToPlay = () => {
	return (
		<div className="how-to-play">
			<h3>How to Play MovieGrid</h3>
			<p>
				Guess the movie in 10 tries. Each guess reveals the attributes of
				the movie. The color of the tiles will change to show how close your
				guess was.
			</p>
			<h4>Step 1</h4>
			<p>Guess a movie using the search bar.</p>
			<div className="example-box">[How to play diagram 1]</div>
			
			<h4>Step 2</h4>
			<p>Make another guess based on the new information.</p>
			<div className="example-box">[How to play diagram 2]</div>
			
			<h4>Step 3</h4>
			<p>Keep going until you guess the movie.</p>
			<div className="example-box">[How to play diagram 3]</div>
			
			<p className="note">A new MovieGrid will appear every day!</p>
		</div>
	)
}

export default HowToPlay
