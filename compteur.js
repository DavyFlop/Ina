const dateDebut = new Date(2026, 0, 7);

// Le compteur considère que la nouvelle journée commence à 6h
function getDateCompteur() {
    const maintenant = new Date();

    if (maintenant.getHours() < 6) {
        maintenant.setDate(maintenant.getDate() - 1);
    }

    return maintenant;
}

function calculerDuree() {
    const maintenant = getDateCompteur();

    let annees = maintenant.getFullYear() - dateDebut.getFullYear();
    let mois = maintenant.getMonth() - dateDebut.getMonth();
    let jours = maintenant.getDate() - dateDebut.getDate();

    if (jours < 0) {
        mois--;

        const dernierJourMoisPrecedent = new Date(
            maintenant.getFullYear(),
            maintenant.getMonth(),
            0
        ).getDate();

        jours += dernierJourMoisPrecedent;
    }

    if (mois < 0) {
        annees--;
        mois += 12;
    }

    document.getElementById("annees").textContent = annees;
    document.getElementById("mois").textContent = mois;
    document.getElementById("jours").textContent = jours;
}

calculerDuree();

// Vérifie régulièrement s'il est 6h et actualise le compteur
setInterval(calculerDuree, 60000);