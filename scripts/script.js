/**
 * Cette fonction retourne le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbOfQuestions  : le nombre de mots ou de phrases proposé(e)s à l'utilisateur 
 */
function getScoreMessage (score, nbOfQuestions) {
    let scoreWrapper = document.querySelector(".score__zone__wrapper span")
    let scoreMessage = ` ${score} /  ${nbOfQuestions} `
    //on injecte le score dans le html
    scoreWrapper.innerText = scoreMessage
}

 /**
     * Cette fonction affiche la proposition dans le conteneur visé
     * @param {string} proposition : mot ou phrase  à afficher 
     */
 function displayProposition (proposition) {
    let propositionWrapper = document.querySelector(".proposition__zone__wrapper")
    propositionWrapper.innerText = proposition

}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

 /**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format (ici 2 caractères au minimum)
 * @param {string} name 
 * @throws {Error}
 */
 function validerNom (name) {
    if(name.length < 2) {
        throw new Error ("Le nom est trop petit")
    }
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format
 * @param {string} email 
 * @throws {Error}
 */
function validerEmail(email) {
    let regExpEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!regExpEmail.test(email)) {
        throw new Error ("Le format de l'email est invalide")
    }
}

/**
 * Cette fonction gère les messages d'erreur du formulaire
 * @param {string} message 
 */
function afficherMessageErreur (message) {
    
    let spanErreurMessage = document.getElementById("erreurMessage")
    if(!spanErreurMessage) {
        let popup = document.querySelector(".popup__wrapper")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        
        popup.append(spanErreurMessage)
    }

    spanErreurMessage.innerText = message
}


/**
 *Cette fonction permet de gérer le formulaire
 *@param {string} scoreEmail : le score. 
 */ 
function gererFormulaire (scoreEmail) {
    try {
        
        //préparation du mail
        let formName = document.querySelector("#name").value
        validerNom(formName)
        let formEmail = document.querySelector("#email").value
        validerEmail(formEmail)
        afficherMessageErreur("")
        
        afficherEmail(formName, formEmail,scoreEmail )
    } catch (error) {
        afficherMessageErreur(error.message)
    }
}


/**
 * Cette fonction lance le jeu.
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function getGame () {
    //initialisation et écoute des évènements sur les boutons radions ("mots" ou "phrases")
    let radioInputs = document.querySelectorAll("input[type='radio']")
    let propositionList = wordList
    radioInputs.forEach((radioInput) => {
        radioInput.addEventListener("change", (event) => {
            if(event.target.value === "1") {
                propositionList = wordList
                
            } else {
                propositionList = sentenceList
            }
            displayProposition(propositionList[i])
        })
    })
    
        
    

    //initialisation et écoute des évènements sur le bouton valider à côté du champs de saisi de l'utilisateur
    let score = 0
    let validationButton = document.querySelector(".validation__button")
    let entryInput = document.querySelector("#entry__input")
    let i = 0
    
    displayProposition(propositionList[i])
    validationButton.addEventListener("click", () => {
       
        if (entryInput.value === propositionList[i]){
            score++
        }
        
        i++
        getScoreMessage (score, i)
        entryInput.value = ""

        if(propositionList[i]  === undefined) {
            displayProposition("Le jeu est fini")
            validationButton.diasbled = true
        } else {
            displayProposition(propositionList[i])   
        }
        
        getScoreMessage (score, i)
    })

    

   
    
    let form = document.querySelector("form")

    
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = ` ${score} /  ${i} `
        gererFormulaire(scoreEmail)
    })
    
}
