document.addEventListener("DOMContentLoaded", () => {
    
    function navigate(viewId) {
        document.querySelectorAll(".view").forEach((view) => {
            view.style.display = "none";
        });
        document.getElementById(viewId).style.display = "block";
    }
});




const menu = document.getElementById("menu");
const links = menu.querySelectorAll('a');

links.forEach(link => {
    link.addEventListener('click', async e => {
      e.preventDefault();

      const view = e.target.getAttribute('href').replace('#', '');

      window.location.hash = view;

      navigate(view);
    });
});

navigate("home");