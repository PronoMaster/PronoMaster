// 1️⃣ Fonction pour chercher l'ID d'une équipe
async function getTeamId(teamName) {
    const url = `https://v3.football.api-sports.io/v3/teams?search=${teamName}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": API_FOOTBALL_KEY,
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }
    });
    const data = await response.json();

    if (!data.response || data.response.length === 0) {
        return null;
    }

    // On prend le premier résultat
    return data.response[0].team.id;
}

// 2️⃣ Fonction principale pour analyser un match
async function analyserMatch() {
    const homeName = document.getElementById("homeTeam").value;
    const awayName = document.getElementById("awayTeam").value;

    if (!homeName || !awayName) {
        alert("Merci de remplir les deux équipes.");
        return;
    }

    // Cherche les IDs des équipes via l'API
    const homeId = await getTeamId(homeName);
    const awayId = await getTeamId(awayName);

    if (!homeId || !awayId) {
        alert("Équipe introuvable (vérifie l’orthographe).");
        return;
    }

    // Récupérer stats des derniers matchs
    const url = `https://v3.football.api-sports.io/v3/fixtures?season=2025&team=${homeId}&opponent=${awayId}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": API_FOOTBALL_KEY,
                "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
            }
        });

        const data = await response.json();
        if (!data.response || data.response.length === 0) {
            alert("Aucune stat trouvée pour ce match.");
            return;
        }

        const lastMatch = data.response[0];
        const homeGoals = lastMatch.goals.home;
        const awayGoals = lastMatch.goals.away;

        const probableScore = `${homeGoals}-${awayGoals}`;

        const analyse = `
Match analysé : ${homeName} vs ${awayName}

📊 Dernier match enregistré :
- ${homeName} : ${homeGoals} buts
- ${awayName} : ${awayGoals} buts

🎯 Score probable : ${probableScore}
`;

        document.getElementById("analyseTexte").innerText = analyse;

    } catch (err) {
        console.error(err);
        alert("Erreur lors de la récupération des stats");
    }
}
