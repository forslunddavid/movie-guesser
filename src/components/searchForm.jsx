import { Search } from "lucide-react"
import "./searchForm.css"

const searchForm = () => {
	return (
		<form className="search" role="search">
			<input
				type="text"
				placeholder="Search for a movie"
				aria-label="Search for a movie"
			/>
			<button type="submit" aria-label="Search">
				<Search className="search-icon" />
			</button>
		</form>
	)
}

export default searchForm
