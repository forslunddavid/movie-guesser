import "./header.css"
import { CircleHelp } from "lucide-react"
import Info from "./info.jsx"
import { useState } from "react"

const Header = () => {
	const [openInfo, setOpenInfo] = useState(false)

	const handleInfoClick = () => {
		setOpenInfo(!openInfo)
		console.log("Info clicked")
	}

	return (
		<header className="header">
			<div className="header-container">
				<h1>Header!</h1>
				<div className="info-button-container">
					<CircleHelp onClick={handleInfoClick} />
					{openInfo && <Info onClose={() => setOpenInfo(false)} />}
				</div>
			</div>
		</header>
	)
}

export default Header
