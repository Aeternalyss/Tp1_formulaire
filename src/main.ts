import './style.css';

const etapes = document.querySelectorAll(".etape");
const menu: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(".menu") as NodeListOf<HTMLAnchorElement>;
const btnSuivant = document.getElementById("btn-suivant") as HTMLButtonElement;
const btnPrecedent = document.getElementById("btn-precedent") as HTMLButtonElement;
const menuNav: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(".menuNav") as NodeListOf<HTMLAnchorElement>;
const elementCible = document.getElementById("cibleMontant") as HTMLSpanElement
const montantElement = document.getElementById('montant') as HTMLInputElement;

let numNav = 0;
let etape = 0;
let etapeVisiter = 0
let etapeValide = false;
// regex

interface messageErreur {
  vide?: string;
  pattern?: string;
  type?: string;
}
interface erreursJSON {
  [fieldName: string]: messageErreur;
}
let messagesJSON: erreursJSON;

async function obtenirMessages(): Promise<void> {
  const reponse = await fetch('objJSONMessages.json');
  messagesJSON = await reponse.json();
  console.log(messagesJSON);
}
// note de chose a faire 
// typo
// verifier si les msg erreur s'affiche
// ajout icone svg
// page merci --faire css
// version mobile

// validation formulaire

function valideRadios(champs: NodeListOf<HTMLInputElement>): boolean {
  // validation radio

  let cochee = false;
  for (let i = 0; i < champs.length; i++) {
    if (champs[i].checked) {
      cochee = true;
      break;
    }
  }
  const erreurRadio = document.getElementById("erreur-radios") as HTMLSpanElement;
  // faire apparaitre le message erreur
  if (!cochee) {
    erreurRadio.innerText = messagesJSON["radios"].vide ?? "";
  }
  else {
    erreurRadio.innerText = "";
  }

  return cochee;

}


function validerChamp(champ: HTMLInputElement): boolean {
  let valide = false;
  const id = champ.id;
  const idMessageErreur = "erreur-" + id;
  const erreurElement = document.getElementById(idMessageErreur) as HTMLSpanElement;

  // console.log('valider champ', champ.validity);


  // Vérifie chaque type d'erreur de validation
  if (champ.validity.valueMissing && messagesJSON[id].vide) {
    // console.log('erreur', id);

    valide = false;
    erreurElement.innerText = messagesJSON[id].vide;
    const img = document.createElement("img")
    img.style.width = "20px"
    img.src = "src/assets/logo_msg_erreur.svg";
    erreurElement.prepend(img)
  }
  else if (champ.validity.typeMismatch && messagesJSON[id].type) {
    // Type de données incorrect (email, url, tel, etc.)
    valide = false;
    erreurElement.innerText = messagesJSON[id].type;
    const img = document.createElement("img")
    img.style.width = "20px"
    img.src = "src/assets/logo_msg_erreur.svg";
    erreurElement.prepend(img)
  }
  else if (champ.validity.patternMismatch && messagesJSON[id].pattern) {
    // Ne correspond pas au pattern regex défini
    valide = false;
    erreurElement.innerText = messagesJSON[id].pattern;
    const img = document.createElement("img")
    img.style.width = "20px"
    img.src = "src/assets/logo_msg_erreur.svg";
    erreurElement.prepend(img)
  }
  else {
    // La validation n'a pas d'erreur, donc on assigne la variable vraie
    valide = true;
    erreurElement.innerText = "";

  }

  // console.log("validiter " + valide)
  return valide;
}
// Vérifie la validité du champ lorsqu'on le quitte

const champs = document.querySelectorAll("input");
champs.forEach((champs) => {
  champs.addEventListener("blur", () => { validerChamp(champs); })
});




function validerEtape(etape: number): boolean {
  console.log("etape actuelle" + etape)

  switch (etape) {
    case 0:
      const radiosElement: NodeListOf<HTMLInputElement> = document.getElementsByName('type_don') as NodeListOf<HTMLInputElement>;

      const radiosValide = valideRadios(radiosElement);
      const montantValide = validerChamp(montantElement);

      if (!radiosValide || !montantValide) {
        etapeValide = false;
      }
      else {
        etapeValide = true;

      }
      break;

    case 1:
      const nomElement = document.getElementById('nom') as HTMLInputElement;
      const prenomElement = document.getElementById('prenom') as HTMLInputElement;
      const emailElement = document.getElementById('courriel') as HTMLInputElement;
      const adresseElement = document.getElementById('adresse') as HTMLInputElement;
      const villeElement = document.getElementById('ville') as HTMLInputElement;
      const postalElement = document.getElementById('postal') as HTMLInputElement;

      //   const telephoneElement = document.getElementById('telephone') as HTMLInputElement;

      const nomValide = validerChamp(nomElement);
      const prenomValide = validerChamp(prenomElement);
      const emailValide = validerChamp(emailElement);
      const adresseValide = validerChamp(adresseElement);
      const villeValide = validerChamp(villeElement);
      const posatlValide = validerChamp(postalElement);

      //   const telephoneValide = validerChamp(telephoneElement);

      if (!nomValide || !prenomValide || !emailValide || !adresseValide || !villeValide || !posatlValide) {
        etapeValide = false;
      }
      else {
        etapeValide = true;
      }


      break;
    case 2:
      const numCarteElement =
        document.getElementById('numCarte') as HTMLInputElement;

      const expirationElement =
        document.getElementById('expiration') as HTMLInputElement;

      const numSecuElement =
        document.getElementById('numSecu') as HTMLInputElement;

      const numCarteValide = validerChamp(numCarteElement);
      const expirationValide = validerChamp(expirationElement);
      const numSecuValide = validerChamp(numSecuElement);

      if (!numCarteValide || !expirationValide || !numSecuValide) {
        etapeValide = false;
      }
      else {
        etapeValide = true;
      }
      break;
  }

  return etapeValide;
}
montantElement.addEventListener("input", () => {
  elementCible.innerText = montantElement.value
});

// affichage
const affichage = () => {

  // affiche les élément
  etapes.forEach((etapes, index) => {
    if (index == etape) {
      etapes.classList.remove("sr-only");
    } else {
      etapes.classList.add("sr-only");
    }
  });
  if (etape == 0) {
    btnPrecedent.classList.add("sr-only");
  } else {
    btnPrecedent.classList.remove("sr-only");
  };
  if (etape == etapes.length - 1) {
    btnSuivant.classList.add("sr-only");
  } else {
    btnSuivant.classList.remove("sr-only");
  };

  // update menu
  menu.forEach((menu, index) => {
    if (index <= etape) {
      menu.classList.remove("bg-gray-300");
      menu.classList.add("bg-red-500", "hover:bg-red-800", "hover:border-red-800");
    } else if (index >= etape) {
      menu.classList.remove("bg-red-500", "hover:bg-red-800", "hover:border-red-800");
      menu.classList.add("bg-gray-300");

    }
  })
};


// function navigation() {
// navigation left step
menuNav.forEach(element => {
  element.addEventListener('click', () => {
    validerEtape(etape);
    if (etapeValide != false) {
      etapeVisiter++
    }

    console.log("element:", element, etape)
    // on va chercher le numéro de l'étape que j'ai déclarer dans le html
    numNav = Number(element.dataset.step);

    if (numNav <= etapeVisiter) {

      etape = numNav;
      console.log("direction vers", etapeVisiter); // Output: 5 (as a number type)

      affichage();
    }
  })
});


// passe a la suivante
btnSuivant.addEventListener('click', () => {
  validerEtape(etape);
  if (etapeValide != false) {
    if (etape < etapes.length - 1) {
      etape++
      etapeVisiter++
      affichage();
    }
  }
})
// retourne a l'étape précédente
btnPrecedent.addEventListener('click', () => {
  if (etape > 0) {
    etape--
    affichage();
  }
});


/// initialisation
async function initialiser(): Promise<void> {
  await obtenirMessages();
  affichage();
}

initialiser();
// navigation();