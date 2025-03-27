import "./clue.css"
import { ArrowUp } from "lucide-react"
import { ArrowDown } from "lucide-react"

const Clue = () => {
	return (
		<li className="clue-item">
			<div className="clue incorrect">
				<span>📅</span>
			</div>
			<div className="clue-detail ">
				<span className="incorrect">year</span>
				<ArrowUp className="incorrect" />
			</div>
		</li>
	)
}
export default Clue
