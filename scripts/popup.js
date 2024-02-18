/**
 * Cette fonction affiche la popup pour partager son score. 
 */
function displayPopup() {
    let popupBackground = document.querySelector(".popup__global__wrapper")
    // La popup est masquée par défaut (display:none), ajouter la classe "active"
    // va changer son display et la rendre visible. 
    popupBackground.classList.add("active")
}

/**
 * Cette fonction cache la popup pour partager son score. 
 */
function hidePopup() {
    let popupBackground = document.querySelector(".popup__global__wrapper")
    // La popup est masquée par défaut (display:none), supprimer la classe "active"
    // va rétablir cet affichage par défaut. 
    popupBackground.classList.remove("active")
}


/**
 * Cette fonction initialise les écouteurs d'événements qui concernent 
 * l'affichage de la popup. 
 */
function initAddEventListenerPopup() {
    // On écoute le click sur le bouton "partager"
    shareButton = document.querySelector(".share__zone__wrapper button")
    let popupBackground = document.querySelector(".popup__global__wrapper")
    shareButton.addEventListener("click", () => {
        // Quand on a cliqué sur le bouton partagé, on affiche la popup
        displayPopup()
    })

    // On écoute le click sur la div "popupBackground"
    popupBackground.addEventListener("click", (event) => {
        // Si on a cliqué précisément sur la popupBackground 
        // (et pas un autre élément qui se trouve dedant)
        if (event.target === popupBackground) {
            // Alors on cache la popup
            hidePopup()
        }
    })
}

