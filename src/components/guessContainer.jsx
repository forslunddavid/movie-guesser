import { ArrowUp, ArrowDown } from "lucide-react"
import "./guessContainer.css"
import "./clue.css"

const GuessContainer = ({ guess, index }) => {
	// Handle edge cases where clues might be missing
	if (!guess || !guess.clues) {
		console.error("Invalid guess data:", guess)
		return <div className="guess-container error">Invalid guess data</div>
	}

	return (
		<div
			className={`guess-container ${
				guess.isCorrect ? "correct-guess" : ""
			}`}
		>
			<div className="guess-header">
				<div className="guess-number">{index + 1}</div>
				<div className="guess-title">
					<h4>{guess.title}</h4>
					<p>{new Date(guess.release_date).getFullYear()}</p>
				</div>
				{guess.poster_path && (
					<div className="guess-poster">
						<img
							src={`https://image.tmdb.org/t/p/w92${guess.poster_path}`}
							alt={`${guess.title} poster`}
						/>
					</div>
				)}
			</div>

			<ul className="clue-list">
				{/* Year Clue */}
				<li className="clue-item">
					<div
						className={`clue ${
							typeof guess.clues.year.status === "object"
								? guess.clues.year.status.status
								: guess.clues.year.status
						}`}
					>
						<span>📅</span>
					</div>
					<div className="clue-detail">
						<span
							className={
								typeof guess.clues.year.status === "object"
									? guess.clues.year.status.status
									: guess.clues.year.status
							}
						>
							{guess.clues.year.value}
						</span>
						{typeof guess.clues.year.status === "object" &&
							guess.clues.year.status.direction === "higher" && (
								<ArrowDown
									className={guess.clues.year.status.status}
								/>
							)}
						{typeof guess.clues.year.status === "object" &&
							guess.clues.year.status.direction === "lower" && (
								<ArrowUp
									className={guess.clues.year.status.status}
								/>
							)}
					</div>
				</li>

				{/* Country Clue */}
				<li className="clue-item">
					<div className={`clue ${guess.clues.country.status}`}>
						<span>🌍</span>
					</div>
					<div className="clue-detail">
						<span className={guess.clues.country.status}>
							{displayCountry(guess.clues.country.value)}
						</span>
					</div>
				</li>

				{/* Genre Clue */}
				<li className="clue-item">
					<div className={`clue ${guess.clues.genre.status}`}>
						<span>🎬</span>
					</div>
					<div className="clue-detail">
						<span className={guess.clues.genre.status}>
							{guess.clues.genre.value}
						</span>
					</div>
				</li>

				{/* Budget Clue */}
				<li className="clue-item">
					<div
						className={`clue ${
							typeof guess.clues.budget.status === "object"
								? guess.clues.budget.status.status
								: guess.clues.budget.status
						}`}
					>
						<span>💰</span>
					</div>
					<div className="clue-detail">
						<span
							className={
								typeof guess.clues.budget.status === "object"
									? guess.clues.budget.status.status
									: guess.clues.budget.status
							}
						>
							{formatBudget(guess.clues.budget.value)}
						</span>
						{typeof guess.clues.budget.status === "object" &&
							guess.clues.budget.status.direction ===
								"higher" && (
								<ArrowDown
									className={guess.clues.budget.status.status}
								/>
							)}
						{typeof guess.clues.budget.status === "object" &&
							guess.clues.budget.status.direction === "lower" && (
								<ArrowUp
									className={guess.clues.budget.status.status}
								/>
							)}
					</div>
				</li>

				{/* Runtime Clue */}
				<li className="clue-item">
					<div
						className={`clue ${
							typeof guess.clues.runtime.status === "object"
								? guess.clues.runtime.status.status
								: guess.clues.runtime.status
						}`}
					>
						<span>🕰️</span>
					</div>
					<div className="clue-detail">
						<span
							className={
								typeof guess.clues.runtime.status === "object"
									? guess.clues.runtime.status.status
									: guess.clues.runtime.status
							}
						>
							{formatRuntime(guess.clues.runtime.value)}
						</span>
						{typeof guess.clues.runtime.status === "object" &&
							guess.clues.runtime.status.direction ===
								"higher" && (
								<ArrowDown
									className={
										guess.clues.runtime.status.status
									}
								/>
							)}
						{typeof guess.clues.runtime.status === "object" &&
							guess.clues.runtime.status.direction ===
								"lower" && (
								<ArrowUp
									className={
										guess.clues.runtime.status.status
									}
								/>
							)}
					</div>
				</li>
			</ul>
		</div>
	)
}

// Helper functions for displaying values
function displayCountry(countryCode) {
	const countryEmojis = {
		US: "🇺🇸 USA",
		GB: "🇬🇧 UK",
		FR: "🇫🇷 France",
		DE: "🇩🇪 Germany",
		IT: "🇮🇹 Italy",
		ES: "🇪🇸 Spain",
		JP: "🇯🇵 Japan",
		KR: "🇰🇷 S. Korea",
		IN: "🇮🇳 India",
		CN: "🇨🇳 China",
		CA: "🇨🇦 Canada",
		AU: "🇦🇺 Australia",
		SE: "🇸🇪 Sweden",
		RU: "🇷🇺 Russia",
		BR: "🇧🇷 Brazil",
		MX: "🇲🇽 Mexico",
		AR: "🇦🇷 Argentina",
		NZ: "🇳🇿 New Zealand",
		DK: "🇩🇰 Denmark",
		NO: "🇳🇴 Norway",
		FI: "🇫🇮 Finland",
		NL: "🇳🇱 Netherlands",
		BE: "🇧🇪 Belgium",
		CH: "🇨🇭 Switzerland",
		AT: "🇦🇹 Austria",
		IE: "🇮🇪 Ireland",
		PT: "🇵🇹 Portugal",
		GR: "🇬🇷 Greece",
		TR: "🇹🇷 Türkiye",
		PL: "🇵🇱 Poland",
		ZA: "🇿🇦 South Africa",
		TH: "🇹🇭 Thailand",
		SG: "🇸🇬 Singapore",
		MY: "🇲🇾 Malaysia",
		ID: "🇮🇩 Indonesia",
		PH: "🇵🇭 Philippines",
		IL: "🇮🇱 Israel",
		EG: "🇪🇬 Egypt",
		SA: "🇸🇦 Saudi Arabia",
		AE: "🇦🇪 UAE",
		HK: "🇭🇰 Hong Kong",
		TW: "🇹🇼 Taiwan",
		CZ: "🇨🇿 Czech Republic",
		HU: "🇭🇺 Hungary",
		RO: "🇷🇴 Romania",
		BG: "🇧🇬 Bulgaria",
		HR: "🇭🇷 Croatia",
		UA: "🇺🇦 Ukraine",
		CO: "🇨🇴 Colombia",
		CL: "🇨🇱 Chile",
		PE: "🇵🇪 Peru",
		VE: "🇻🇪 Venezuela",
		NG: "🇳🇬 Nigeria",
		MA: "🇲🇦 Morocco",
		VN: "🇻🇳 Vietnam",
		IS: "🇮🇸 Iceland",
		LU: "🇱🇺 Luxembourg",
		IR: "🇮🇷 Iran",
		IQ: "🇮🇶 Iraq",
		LB: "🇱🇧 Lebanon",
		QA: "🇶🇦 Qatar",
		KW: "🇰🇼 Kuwait",
		KZ: "🇰🇿 Kazakhstan",
		SK: "🇸🇰 Slovakia",
		SI: "🇸🇮 Slovenia",
		RS: "🇷🇸 Serbia",
		LT: "🇱🇹 Lithuania",
		LV: "🇱🇻 Latvia",
		EE: "🇪🇪 Estonia",
		MT: "🇲🇹 Malta",
		CY: "🇨🇾 Cyprus",
		MO: "🇲🇴 Macau",
	}

	return countryEmojis[countryCode] || countryCode
}

function formatBudget(budget) {
	if (!budget || budget === 0) return "Unknown"

	if (budget >= 1000000) {
		return `$${(budget / 1000000).toFixed(1)}M`
	} else if (budget >= 1000) {
		return `$${(budget / 1000).toFixed(0)}K`
	}

	return `$${budget}`
}

function formatRuntime(minutes) {
	if (!minutes) return "Unknown"

	const hours = Math.floor(minutes / 60)
	const mins = minutes % 60

	if (hours > 0) {
		return `${hours}h ${mins}m`
	}

	return `${mins}m`
}

export default GuessContainer
