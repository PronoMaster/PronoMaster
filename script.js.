function analyserMatch() {
    const home = document.getElementById("homeTeam").value;
    const away = document.getElementById("awayTeam").value;

    if (home === "" || away === "") {
        alert("Merci de remplir les deux équipes.");
        return;
    }

    // Stats simulées
    const stats = {
        homeGoals: 1.9,
        awayGoals: 1.3,
        homeConceded: 1.0,
        awayConceded: 1.6,
        homeForm: "V V N V D",
        awayForm: "D N D V D"
    };

    const analyse = `
Match analysé : ${home} vs ${away}

📊 Forme récente :
- ${home} : ${stats.homeForm}
- ${away} : ${stats.awayForm}

⚽ Moyenne de buts :
- ${home} : ${stats.homeGoals} marqués / match
- ${away} : ${stats.awayGoals} marqués / match

🔎 Analyse PronoMaster :
${home} présente une meilleure dynamique et une solidité défensive supérieure.
${away} encaisse régulièrement à l’extérieur.

📈 Probabilité estimée :
- Victoire ${home} : élevée
- Match nul : possible
- Victoire ${away} : faible

🎯 Score probable : 2-1
`;

    document.getElementById("analyseTexte").innerText = analyse;
}
