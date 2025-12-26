async function analyserMatch() {
    const home = document.getElementById("homeTeam").value;
    const away = document.getElementById("awayTeam").value;

    if (home === "" || away === "") {
        alert("Merci de remplir les deux équipes.");
        return;
    }

    // Appel à l'API pour récupérer les stats
    const url = `https://v3.football.api-sports.io/v3/fixtures?season=2025&team=${home}&opponent=${away}`;
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": API_FOOTBALL_KEY,
                "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
            }
        });
        
        const data = await response.json();
        
        if (data.response.length === 0) {
            alert("Aucune stat trouvée pour ce match");
            return;
        }

        // Exemple simple : prendre le dernier match pour stats
        const lastMatch = data.response[0];
        const homeGoals = lastMatch.goals.home;
        const awayGoals = lastMatch.goals.away;
        const probableScore = `${homeGoals}-${awayGoals}`;

        const analyse = `
Match analysé : ${home} vs ${away}

📊 Dernier match :
- ${home} : ${homeGoals} buts
- ${away} : ${awayGoals} buts

🎯 Score probable : ${probableScore}
`;

        document.getElementById("analyseTexte").innerText = analyse;

    } catch (error) {
        console.error(error);
        alert("Erreur lors de la récupération des stats");
    }
}

