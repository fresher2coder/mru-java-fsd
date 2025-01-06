const academicsLink = document.getElementById("academics-link");
const academicsMenu = document.getElementById("academicsMenu");
const researchLink = document.getElementById("research-link");
const researchMenu = document.getElementById("researchMenu");
const projectsLink = document.getElementById("projectsLink");
const projectMenu = document.getElementById("projectMenu");
const studentLifeLink = document.getElementById("studentLifeLink");
const studentLifeMenu = document.getElementById("studentLifeMenu");
const arrowIconAcademics = academicsLink.querySelector(".arrow");
const arrowIconProjects = projectsLink.querySelector(".arrow");
const arrowIconStudentLife = studentLifeLink.querySelector(".arrow");
const menuBarCheckBox = document.getElementById("menu-bar");
const menuicon = document.getElementById("menuicon");

// Toggle menu icon between "menu" and "close"
menuBarCheckBox.addEventListener("change", function () {
  if (menuBarCheckBox.checked) {
    menuicon.textContent = "close";
  } else {
    menuicon.textContent = "menu";
  }
});

// Toggle Academics dropdown
academicsLink.addEventListener("click", function (e) {
  e.preventDefault();
  projectMenu.style.display = "none";
  studentLifeMenu.style.display = "none";
  arrowIconProjects.classList.remove("open");
  arrowIconStudentLife.classList.remove("open");

  academicsMenu.style.display =
    academicsMenu.style.display === "block" ? "none" : "block";
  arrowIconAcademics.classList.toggle("open");
  e.stopPropagation();
});

// Toggle Research submenu
researchLink.addEventListener("click", function (e) {
  e.preventDefault();
  researchMenu.style.display =
    researchMenu.style.display === "block" ? "none" : "block";
  e.stopPropagation();
});

// Toggle Projects dropdown
projectsLink.addEventListener("click", function (e) {
  e.preventDefault();
  academicsMenu.style.display = "none";
  studentLifeMenu.style.display = "none";
  arrowIconAcademics.classList.remove("open");
  arrowIconStudentLife.classList.remove("open");

  projectMenu.style.display =
    projectMenu.style.display === "block" ? "none" : "block";
  arrowIconProjects.classList.toggle("open");
  e.stopPropagation();
});

// Toggle Student Life dropdown
studentLifeLink.addEventListener("click", function (e) {
  e.preventDefault();
  academicsMenu.style.display = "none";
  projectMenu.style.display = "none";
  arrowIconAcademics.classList.remove("open");
  arrowIconProjects.classList.remove("open");

  studentLifeMenu.style.display =
    studentLifeMenu.style.display === "block" ? "none" : "block";
  arrowIconStudentLife.classList.toggle("open");
  e.stopPropagation();
});

// Prevent dropdowns from closing when clicked inside
academicsMenu.addEventListener("click", function (e) {
  e.stopPropagation();
});

researchMenu.addEventListener("click", function (e) {
  e.stopPropagation();
});

projectMenu.addEventListener("click", function (e) {
  e.stopPropagation();
});

studentLifeMenu.addEventListener("click", function (e) {
  e.stopPropagation();
});

// Close all dropdowns when clicking outside
document.addEventListener("click", function () {
  academicsMenu.style.display = "none";
  researchMenu.style.display = "none";
  projectMenu.style.display = "none";
  studentLifeMenu.style.display = "none";
  arrowIconAcademics.classList.remove("open");
  arrowIconProjects.classList.remove("open");
  arrowIconStudentLife.classList.remove("open");
});
