import "./attributes.css"
import Incorrect from "./incorrect.jsx"
import Correct from "./correct.jsx"
import Close from "./close.jsx"
import { ArrowUp, ArrowDown } from "lucide-react"

const Attributes = () => {
	return (
		<>
			<p>The year the movie was released</p>
			<p>
				If you are within 3 years it will show close (yellow) and a
				direction arrow <ArrowUp /> or <ArrowDown />
			</p>
			<div className="attribute-boxes">
				<Incorrect /> <Close />
				<Correct />
			</div>
			<p>The country the movie was produced in.</p>
			<div className="attribute-boxes">
				<Incorrect />
				<Correct />
			</div>
			<p>The genre of the movie</p>{" "}
			<div className="attribute-boxes">
				<Correct />
				<Incorrect />
			</div>
			<p>The budget of the movie </p>
			<p>
				If you are within 20% of the movies budget it will show close
				(yellow) and a direction arrow <ArrowUp /> or <ArrowDown />
			</p>
			<div className="attribute-boxes">
				{" "}
				<Correct /> <Close />
				<Incorrect />
			</div>
			<p>Runtime of the movie</p>
			<p>
				If you are within 15 minutes it will show close (yellow) and an
				indicator and a direction arrow <ArrowUp /> or <ArrowDown />
			</p>
			<div className="attribute-boxes">
				<Correct /> <Close />
				<Incorrect />
			</div>
		</>
	)
}

export default Attributes
