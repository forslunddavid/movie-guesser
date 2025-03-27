import "./clue.css"
import { ArrowUp } from "lucide-react"
import { ArrowDown } from "lucide-react"

const Clue = () => {
	return (
		<ul className="clue-list">
			<li className="clue-item">
				<div className="clue close">
					<span>📅</span>
				</div>
				<div className="clue-detail ">
					<span className="close">year</span>
					<ArrowDown className="close" />
				</div>
			</li>
			<li className="clue-item">
				<div className="clue incorrect">
					<span>🇸🇪</span>
				</div>
				<div className="clue-detail ">
					<span className="incorrect">Country</span>
				</div>
			</li>
			<li className="clue-item">
				<div className="clue correct">
					<span>🎬</span>
				</div>
				<div className="clue-detail ">
					<span className="correct">Genre</span>
				</div>
			</li>
			<li className="clue-item">
				<div className="clue incorrect">
					<span>💰</span>
				</div>
				<div className="clue-detail ">
					<span className="incorrect">Budget</span>
					<ArrowUp className="incorrect" />
				</div>
			</li>
			<li className="clue-item">
				<div className="clue incorrect">
					<span>🕰️</span>
				</div>
				<div className="clue-detail ">
					<span className="incorrect">Runtime</span>
					<ArrowUp className="incorrect" />
				</div>
			</li>
		</ul>
	)
}
export default Clue
