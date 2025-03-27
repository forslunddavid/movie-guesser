import { useState, useEffect } from "react"
import MainContainer from "./components/mainContainer.jsx"
import Header from "./components/header.jsx"
import { getMovieById } from "../src/services/api.js"
import "./App.css"

function App() {
	const [movie, setMovie] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		async function fetchMovie() {
			try {
				const movieData = await getMovieById(550)
				console.log(movieData, "movie")
				setMovie(movieData)
			} catch (err) {
				console.log(err, "failed to fetch movie")
				setError(err)
			} finally {
				setLoading(false)
			}
		}

		fetchMovie()
	}, [])

	return (
		<>
			<Header />
			<MainContainer />
			<header>
				<h1>MovieGrid</h1>
			</header>
			<main>
				{loading && <h2>Loading...</h2>}
				{error && <h2>Error loading movie</h2>}
				{movie && <p>{movie.title}</p>}
				{movie && <p>{movie.runtime} minutes</p>}
				{movie && <p>${movie.budget} dollars</p>}
				{movie && <p>{movie.release_date}</p>}
				{movie && <p>{movie.genres[0].name}</p>}
				{movie && <p>{movie.origin_country}</p>}
				{movie && <p>{movie.tagline}</p>}
			</main>
		</>
	)
}

export default App
