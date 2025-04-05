import { useEffect, useState, useRef } from "react"
import { Search } from "lucide-react"
import "./searchForm.css"
import { searchMovies } from "../services/api"

const SearchForm = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [searchInput, setSearchInput] = useState("")
	const [suggestions, setSuggestions] = useState([])
	const [showSuggestions, setShowSuggestions] = useState(false)
	const [selectedMovie, setSelectedMovie] = useState(null)
	const inputRef = useRef(null)
	const suggestionRef = useRef(null)

	// Close suggestions when clicking outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				suggestionRef.current &&
				!suggestionRef.current.contains(event.target) &&
				!inputRef.current.contains(event.target)
			) {
				setShowSuggestions(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	const handleSearchInput = async (searchValue) => {
		setSearchInput(searchValue)

		if (searchValue.length >= 3) {
			try {
				setLoading(true)
				const response = await searchMovies(searchValue)
				const data = await response.json()
				setSuggestions(data.results.slice(0, 4)) // Limit to 8 suggestions
				setShowSuggestions(true)
			} catch (error) {
				console.error("Failed to fetch movie suggestions:", error)
				setError(error)
				setSuggestions([])
			} finally {
				setLoading(false)
			}
		} else {
			setSuggestions([])
			setShowSuggestions(false)
		}
	}

	const handleSelectMovie = (movie) => {
		setSelectedMovie(movie)
		setSearchInput(movie.title)
		setShowSuggestions(false)
		// Here you can add logic to submit the movie as an answer
		console.log("Selected movie:", movie)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (selectedMovie) {
			// Process the selected movie as the player's guess
			console.log("Submitting guess:", selectedMovie)
			// Reset for next guess
			setSearchInput("")
			setSelectedMovie(null)
		}
	}

	return (
		<form className="search-form" role="search" onSubmit={handleSubmit}>
			<div className="search-container">
				<input
					ref={inputRef}
					type="search"
					placeholder="Search for a movie"
					aria-label="Search for a movie"
					value={searchInput}
					onChange={(e) => handleSearchInput(e.target.value)}
					onClick={() => {
						if (searchInput.length >= 3) {
							setShowSuggestions(true)
						}
					}}
				/>

				<button
					type="submit"
					aria-label="Search"
					disabled={!selectedMovie}
				>
					<Search className="search-icon" />
				</button>

				{/* Suggestions dropdown */}
				{showSuggestions && suggestions.length > 0 && (
					<ul ref={suggestionRef} className="suggestions-dropdown">
						{loading ? (
							<li className="suggestion-item loading">
								Loading...
							</li>
						) : (
							suggestions.map((movie) => (
								<li
									key={movie.id}
									className="suggestion-item"
									onClick={() => handleSelectMovie(movie)}
								>
									<div className="movie-suggestion">
										<div className="movie-poster">
											{movie.poster_path ? (
												<img
													src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
													alt={`${movie.title} poster`}
												/>
											) : (
												<div className="no-poster">
													No Image
												</div>
											)}
										</div>
										<div className="movie-info">
											<p className="movie-title">
												{movie.title}
											</p>
											<p className="movie-year">
												{movie.release_date
													? new Date(
															movie.release_date
													  ).getFullYear()
													: "Unknown year"}
											</p>
										</div>
									</div>
								</li>
							))
						)}
					</ul>
				)}
			</div>
		</form>
	)
}

export default SearchForm
