import "./attributes.css"
import Incorrect from "./incorrect.jsx"
import Correct from "./correct.jsx"
import Close from "./close.jsx"

const Attributes = () => {
	return (
		<>
			<h3>Debut Album</h3>
			<p>The year the movie was released</p>
			<div className="attribute-boxes">
				<Incorrect /> <Close />
				<Correct />
			</div>
			<p>The country the movie was produced in.</p>
			<div className="attribute-boxes">
				<Incorrect />
				<Correct />
			</div>
			<p>The year the movie was released</p>{" "}
			<div className="attribute-boxes">
				<Correct /> <Close />
				<Incorrect />
			</div>
			<p>The budget of the movie </p>
			<div className="attribute-boxes">
				{" "}
				<Correct /> <Close />
				<Incorrect />
			</div>
			<p>Runtime of the movie</p>{" "}
			<div className="attribute-boxes">
				<Correct /> <Close />
				<Incorrect />
			</div>
		</>
	)
}

export default Attributes
