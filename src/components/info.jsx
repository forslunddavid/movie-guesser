import "./info.css"
import HowToPlay from "./howToPlay.jsx"
import Attributes from "./attrributes.jsx"
import { X } from "lucide-react"
import { useState } from "react"

const Info = ({ onClose }) => {
	const [activeSection, setActiveSection] = useState('howToPlay')
	return (
		<div className="info">
			<div className="info-container">
				<X className="close-icon" onClick={onClose} style={{ cursor: 'pointer', position: 'absolute', top: '10px', right: '10px' }} />
				<div className="info-buttons">
					<button 
						className={activeSection === 'howToPlay' ? 'active' : ''} 
						onClick={() => setActiveSection('howToPlay')}
					>
						How to play
					</button>
					<button 
						className={activeSection === 'attributes' ? 'active' : ''} 
						onClick={() => setActiveSection('attributes')}
					>
						Attributes
					</button>
				</div>
				<div className="info-content">
					{activeSection === 'howToPlay' && <HowToPlay />}
					{activeSection === 'attributes' && <Attributes />}
				</div>
			</div>
		</div>
	)
}

export default Info
