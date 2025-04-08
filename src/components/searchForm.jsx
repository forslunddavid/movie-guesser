import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import "./searchForm.css"
import { searchMovies } from "../services/api"

const SearchForm = ({ onSelectMovie, disabled = false }) => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [searchInput, setSearchInput] = useState("")
	const [suggestions, setSuggestions] = useState([])
	const [showSuggestions, setShowSuggestions] = useState(false)
	const [selectedMovie, setSelectedMovie] = useState(null)
	const inputRef = useRef(null)
	const suggestionRef = useRef(null)
	const formRef = useRef(null)

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
		setSelectedMovie(null)

		if (searchValue.length >= 3) {
			try {
				setLoading(true)
				const response = await searchMovies(searchValue)
				const data = await response.json()
				setSuggestions(data.results.slice(0, 8)) // Limit to 8 suggestions
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
		console.log("Movie selected:", movie)
		setSelectedMovie(movie)
		setSearchInput(movie.title)
		setShowSuggestions(false)

		// Automatically submit after selection if you want immediate guessing
		if (onSelectMovie && !disabled) {
			onSelectMovie(movie)
			setSearchInput("")
			setSelectedMovie(null)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("Form submitted, selected movie:", selectedMovie)
		if (selectedMovie && !disabled && onSelectMovie) {
			onSelectMovie(selectedMovie)
			// Reset for next guess
			setSearchInput("")
			setSelectedMovie(null)
		}
	}

	// Handle keyboard events like Enter key on suggestions
	const handleKeyDown = (e, movie) => {
		if (e.key === "Enter") {
			e.preventDefault()
			handleSelectMovie(movie)
		}
	}

	return (
		<form
			ref={formRef}
			className={`search-form ${disabled ? "disabled" : ""}`}
			role="search"
			onSubmit={handleSubmit}
		>
			<div className="search-container">
				<input
					ref={inputRef}
					type="search"
					placeholder={
						disabled
							? "No more guesses available"
							: "Search for a movie"
					}
					aria-label="Search for a movie"
					value={searchInput}
					onChange={(e) => handleSearchInput(e.target.value)}
					onClick={() => {
						if (searchInput.length >= 3) {
							setShowSuggestions(true)
						}
					}}
					disabled={disabled}
					onKeyDown={(e) => {
						if (
							e.key === "Enter" &&
							!selectedMovie &&
							suggestions.length > 0
						) {
							e.preventDefault()
							handleSelectMovie(suggestions[0])
						}
					}}
				/>

				<button
					type="submit"
					aria-label="Search"
					disabled={!selectedMovie || disabled}
					onClick={() => {
						if (selectedMovie && !disabled && onSelectMovie) {
							onSelectMovie(selectedMovie)
							setSearchInput("")
							setSelectedMovie(null)
						}
					}}
				>
					<Search className="search-icon" />
				</button>

				{/* Suggestions dropdown */}
				{showSuggestions && suggestions.length > 0 && !disabled && (
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
									onKeyDown={(e) => handleKeyDown(e, movie)}
									tabIndex="0"
									role="option"
									aria-selected={
										selectedMovie &&
										selectedMovie.id === movie.id
									}
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
