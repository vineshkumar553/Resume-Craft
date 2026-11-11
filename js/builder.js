
const urlparams = new URLSearchParams(window.location.search);
let selectedtemplate = urlparams.get("template") || "modern";

const templatebuttons = document.querySelectorAll(".template-button");
const resumepapers = document.querySelectorAll(".resume-paper");

function changetemplate(template) {

    const selectedbutton = document.querySelector('[data-template="' + template + '"]');
    const selectedpaper = document.querySelector("." + template + "-resume");

    if (!selectedbutton || !selectedpaper) {
        template = "modern";
    }

    templatebuttons.forEach(function (button) {

        button.classList.remove("active");

        if (button.dataset.template === template) {
            button.classList.add("active");
        }

    });

    resumepapers.forEach(function (paper) {

        paper.classList.remove("active");

        if (paper.classList.contains(template + "-resume")) {
            paper.classList.add("active");
        }

    });

}

changetemplate(selectedtemplate);

templatebuttons.forEach(function (button) {

    button.addEventListener("click", function () {

        changetemplate(button.dataset.template);

    });

});

const accordionheaders = document.querySelectorAll(".accordion-header");

accordionheaders.forEach(function (header) {

    header.addEventListener("click", function () {

        const accordion = header.parentElement;

        accordion.classList.toggle("active");

    });

});
