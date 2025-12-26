// Fonction : chercher l'équipe et renvoyer son ID
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

    // On prend le premier qui correspond
    return data.response[0].team.id;
}

