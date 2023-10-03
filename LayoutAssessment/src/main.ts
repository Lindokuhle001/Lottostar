const form = document.getElementById("form") as HTMLFormElement;

form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.location.href = "./src/html/submitted.html";

});
