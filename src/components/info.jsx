import "./info.css"
import HowToPlay from "./howToPlay.jsx"
import Attributes from "./attrributes.jsx"
import { X } from "lucide-react"

const Info = () => {
	return (
		<div className="info">
			<div className="info-container">
				<X />
				<button>How to play</button>
				<HowToPlay />
				<button>Attributes</button>
				<Attributes />
			</div>
		</div>
	)
}

export default Info
