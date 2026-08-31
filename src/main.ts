import './style.css';
const etapes = document.querySelectorAll(".etape");
const btnSuivant = document.getElementById("btn-suivant");
const btnPrecedent = document.getElementById("btn-precedent");
let etape = 0;

console.log("allo?");

// note de chose a faire 
// verification de la section a chauqe fois que suivant est cliqué pour être sur que aucune erreur se produit en cour de route 
// et si ily a erreur on ne passe pas a la section suivant :p

// mettre du css hahah ;-;
// ajouter certain exemple dans les input 
const affichage = () => {

  // affiche les élément
  etapes.forEach((etapes, index) => {
    if (index == etape) {
      etapes.classList.remove("etape-cachee");
    } else {
      etapes.classList.add("etape-cachee");
    }
  });
  if (etape == 0) {
    btnPrecedent.classList.add("etape-cachee");
  } else {
    btnPrecedent.classList.remove("etape-cachee");
  };
  if (etape == etapes.length - 1) {
    btnSuivant.classList.add("etape-cachee");
  } else {
    btnSuivant.classList.remove("etape-cachee");
  };
};

// function navigation() {
// passe a la suivante
btnSuivant.addEventListener('click', () => {
  if (etape < etapes.length - 1) {
    etape++
    affichage();
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
affichage();
// navigation();