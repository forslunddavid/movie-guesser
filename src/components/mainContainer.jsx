import SearchForm from "./searchForm"
import ClueContainer from "./clueContainer"
import "./mainContainer.css"

const mainContainer = () => {
	return (
		<>
			<main className="main-content">
				<h2>What movie are we looking for today?</h2>
				<p className="number-of-guesses">guesses 0/5</p>
				<SearchForm />
				<ClueContainer />
			</main>
		</>
	)
}

export default mainContainer
