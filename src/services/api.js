// origin_country
// genres
// release_date
// revenue
// runtime
// tagline //"reveal as extra clue"

export async function getMovieById(movieId) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
				},
			}
		)

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`)
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.log(error, "error")
		throw error
	}
}

export async function getAllMovies() {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/popular`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${
						import.meta.env.VITE_API_READ_ACCESS_TOKEN
					}`,
				},
			}
		)

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`)
		}
		return response
	} catch (error) {
		console.log(error, "error")
		throw error
	}
}

export async function searchMovies(query) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${
						import.meta.env.VITE_API_READ_ACCESS_TOKEN
					}`,
				},
			}
		)
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`)
		}
		return response
	} catch (error) {
		console.log(error, "error")
		throw error
	}
}
