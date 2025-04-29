import { useState, useEffect } from "react"
import SearchForm from "./searchForm"
import GuessContainer from "./guessContainer"
import "./mainContainer.css"
import { getMovieById } from "../services/api"
import {
	getValidDailyMovieId,
	getSecondsUntilNextDay,
} from "../utils/dailyMovieGenerator"

const MainContainer = () => {
	const [guesses, setGuesses] = useState([])
	const [targetMovie, setTargetMovie] = useState(null)
	const [loading, setLoading] = useState(true)
	const [dailyMovieId, setDailyMovieId] = useState(null)
	const [nextRefresh, setNextRefresh] = useState(null)
	const MAX_GUESSES = 10

	// Load the daily movie ID on mount and when the date changes
	useEffect(() => {
		const loadDailyMovie = async () => {
			try {
				setLoading(true)

				// Get today's movie ID
				const apiToken = import.meta.env.VITE_API_READ_ACCESS_TOKEN
				const movieId = await getValidDailyMovieId(1, 999999, apiToken)
				// const movieId = 999999
				console.log("Today's movie ID:", movieId)
				setDailyMovieId(movieId)

				// Fetch the movie details
				const movieData = await getMovieById(movieId)
				setTargetMovie(movieData)
				console.log("Today's movie title:", movieData.title)
				// Calculate time until next refresh
				const secondsToNextDay = getSecondsUntilNextDay()
				setNextRefresh(new Date(Date.now() + secondsToNextDay * 1000))

				// Set up the next day's refresh
				const refreshTimer = setTimeout(() => {
					// Clear guesses and reload for the new day
					setGuesses([])
					loadDailyMovie()
				}, secondsToNextDay * 1000)

				return () => clearTimeout(refreshTimer)
			} catch (error) {
				console.error("Failed to load daily movie:", error)
			} finally {
				setLoading(false)
			}
		}

		loadDailyMovie()
	}, [])

	// Add a new guess to the guesses array
	const handleAddGuess = async (selectedMovie) => {
		console.log("Handling new guess:", selectedMovie.title)

		if (!targetMovie) {
			console.error("Target movie not loaded yet")
			return
		}

		if (guesses.length >= MAX_GUESSES) {
			alert("You've used all your guesses!")
			return
		}

		if (guesses.some((guess) => guess.id === selectedMovie.id)) {
			alert("You've already guessed this movie!")
			return
		}

		try {
			setLoading(true)

			// Fetch full movie details to get all necessary clue data
			console.log("Fetching full details for movie ID:", selectedMovie.id)
			const fullMovieData = await getMovieById(selectedMovie.id)

			// Compare with target movie to determine clue correctness
			const newGuess = {
				...fullMovieData,
				clues: {
					year: {
						value: new Date(
							fullMovieData.release_date
						).getFullYear(),
						status: compareYear(
							new Date(fullMovieData.release_date).getFullYear(),
							new Date(targetMovie.release_date).getFullYear()
						),
					},
					country: {
						value:
							fullMovieData.production_countries?.[0]
								?.iso_3166_1 || "Unknown",
						status: compareValues(
							fullMovieData.production_countries?.[0]?.iso_3166_1,
							targetMovie.production_countries?.[0]?.iso_3166_1
						),
					},
					genre: {
						value: fullMovieData.genres?.[0]?.name || "Unknown",
						status: compareGenres(
							fullMovieData.genres?.map((g) => g.id) || [],
							targetMovie.genres?.map((g) => g.id) || []
						),
					},
					budget: {
						value: fullMovieData.budget,
						status: compareBudget(
							fullMovieData.budget,
							targetMovie.budget
						),
					},
					runtime: {
						value: fullMovieData.runtime,
						status: compareRuntime(
							fullMovieData.runtime,
							targetMovie.runtime
						),
					},
				},
				isCorrect: fullMovieData.id === targetMovie.id,
			}

			console.log("Adding new guess with clues:", newGuess)

			// Add to guesses array
			setGuesses((prevGuesses) => [...prevGuesses, newGuess])

			// Check if the player won
			if (fullMovieData.id === targetMovie.id) {
				setTimeout(() => {
					alert("Congratulations! You guessed the movie correctly!")
				}, 500)
			} else if (guesses.length + 1 >= MAX_GUESSES) {
				setTimeout(() => {
					alert(`Game over! The movie was: ${targetMovie.title}`)
				}, 500)
			}
		} catch (error) {
			console.error("Error adding guess:", error)
		} finally {
			setLoading(false)
		}
	}

	// Helper functions to compare movie properties
	function compareYear(guessYear, targetYear) {
		if (guessYear === targetYear) return "correct"

		const diff = guessYear - targetYear
		const direction = diff > 0 ? "higher" : "lower"

		if (Math.abs(diff) <= 3) return { status: "close", direction }
		return { status: "incorrect", direction }
	}

	function compareValues(guessValue, targetValue) {
		return guessValue === targetValue ? "correct" : "incorrect"
	}

	function compareGenres(guessGenres, targetGenres) {
		if (guessGenres.some((g) => targetGenres.includes(g))) return "correct"
		return "incorrect"
	}

	function compareBudget(guessBudget, targetBudget) {
		if (guessBudget === targetBudget) return "correct"
		if (guessBudget === 0 || targetBudget === 0) return "incorrect"

		const diff = guessBudget - targetBudget
		const direction = diff > 0 ? "higher" : "lower"

		// If within 20% of target budget, it's close
		if (Math.abs(diff) / targetBudget < 0.2)
			return { status: "close", direction }
		return { status: "incorrect", direction }
	}

	function compareRuntime(guessRuntime, targetRuntime) {
		if (guessRuntime === targetRuntime) return "correct"

		const diff = guessRuntime - targetRuntime
		const direction = diff > 0 ? "higher" : "lower"

		// If within 15 minutes, it's close
		if (Math.abs(diff) <= 15) return { status: "close", direction }
		return { status: "incorrect", direction }
	}

	// Format time until next daily movie
	const formatTimeUntilNextMovie = () => {
		if (!nextRefresh) return ""

		const now = new Date()
		const diff = nextRefresh - now

		if (diff <= 0) return "Loading new movie..."

		const hours = Math.floor(diff / (1000 * 60 * 60))
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

		return `Next movie in: ${hours}h ${minutes}m`
	}

	return (
		<main className="main-content">
			<h2>What movie are we looking for today?</h2>
			<p className="number-of-guesses">
				guesses {guesses.length}/{MAX_GUESSES}
			</p>
			{nextRefresh && (
				<p className="next-movie-timer">{formatTimeUntilNextMovie()}</p>
			)}

			<SearchForm
				onSelectMovie={handleAddGuess}
				disabled={
					loading || guesses.length >= MAX_GUESSES || !targetMovie
				}
			/>

			{loading && (
				<p className="loading-message">Loading movie data...</p>
			)}

			{guesses.length > 0 && (
				<div className="guesses-section">
					<h3>Your Guesses</h3>
					{guesses.map((guess, index) => (
						<GuessContainer
							key={guess.id}
							guess={guess}
							index={index}
						/>
					))}
				</div>
			)}
		</main>
	)
}

export default MainContainer
