/**
 * Generates a movie ID based on the current date (changes at 00:00 UTC)
 * @param {number} minId - Minimum movie ID in your range
 * @param {number} maxId - Maximum movie ID in your range
 * @returns {number} - A deterministic movie ID for today
 */
export function getDailyMovieId(minId = 1, maxId = 999999) {
	// Get current date in UTC and reset time to 00:00
	const today = new Date()
	const utcDate = new Date(
		Date.UTC(
			today.getUTCFullYear(),
			today.getUTCMonth(),
			today.getUTCDate(),
			0,
			0,
			0,
			0
		)
	)

	// Convert date to a number (milliseconds since epoch)
	const dateNumber = utcDate.getTime()

	// Create a simple hash from the date
	// This ensures that different days produce different, but deterministic values
	const hash = Math.abs((dateNumber * 17) % 104729) // Using a prime number for better distribution

	// Map the hash to a movie ID within your range
	const range = maxId - minId + 1
	const movieId = minId + (hash % range)

	return Math.floor(movieId)
}

/**
 * Gets the number of seconds until the next day (00:00 UTC)
 * Useful for scheduling the next update
 * @returns {number} - Seconds until midnight UTC
 */
export function getSecondsUntilNextDay() {
	const now = new Date()
	const tomorrow = new Date(
		Date.UTC(
			now.getUTCFullYear(),
			now.getUTCMonth(),
			now.getUTCDate() + 1,
			0,
			0,
			0,
			0
		)
	)

	return Math.floor((tomorrow - now) / 1000)
}

/**
 * Validates if a movie ID exists in the TMDb database
 * We'll need this because not all IDs in a range may exist
 * @param {number} movieId - The movie ID to validate
 * @param {string} apiKey - Your TMDb API key or token
 * @returns {Promise<boolean>} - True if the movie exists and is valid
 */
export async function isValidMovieId(movieId, apiKey) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
			}
		)

		return response.ok
	} catch (error) {
		console.error("Error validating movie ID:", error)
		return false
	}
}

/**
 * Gets a valid daily movie ID by checking against the API
 * If the generated ID isn't valid, it will try the next one
 * @param {number} minId - Minimum movie ID in your range
 * @param {number} maxId - Maximum movie ID in your range
 * @param {string} apiKey - Your TMDb API key or token
 * @returns {Promise<number>} - A valid movie ID for today
 */
export async function getValidDailyMovieId(minId = 1, maxId = 999999, apiKey) {
	const baseId = getDailyMovieId(minId, maxId)

	// Try the generated ID first
	if (await isValidMovieId(baseId, apiKey)) {
		return baseId
	}

	// If not valid, try the next few IDs
	for (let offset = 1; offset < 50; offset++) {
		const nextId = baseId + offset
		if (nextId <= maxId && (await isValidMovieId(nextId, apiKey))) {
			return nextId
		}
	}

	// Fallback to a known valid ID if all attempts fail
	console.warn("Could not find a valid movie ID, using fallback")
	return 238 // The Godfather as fallback
}
