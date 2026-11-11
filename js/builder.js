
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

const fullnameinput = document.querySelector("#full-name");
const titleinput = document.querySelector("#professional-title");
const emailinput = document.querySelector("#email");
const phoneinput = document.querySelector("#phone");
const locationinput = document.querySelector("#location");
const websiteinput = document.querySelector("#website");

const resumename = document.querySelectorAll(".resume-name");
const resumetitle = document.querySelectorAll(".resume-title");
const resumecontact = document.querySelectorAll(".resume-contact-info");

fullnameinput.addEventListener("input", function () {
    resumename.forEach(function (name) {
        name.textContent = fullnameinput.value || "Your Name"
    });
});

titleinput.addEventListener("input", function () {
    resumetitle.forEach(function (title) {
        title.textContent = titleinput.value || "Your Professional Title"
    })
})

function updatecontact() {

    resumecontact.forEach(function (contact) {

        contact.innerHTML = "";

        if (emailinput.value) {
            const email = document.createElement("span");
            email.textContent = emailinput.value;
            contact.appendChild(email);
        }

        if (phoneinput.value) {
            const phone = document.createElement("span");
            phone.textContent = phoneinput.value;
            contact.appendChild(phone);
        }

        if (locationinput.value) {
            const location = document.createElement("span");
            location.textContent = locationinput.value;
            contact.appendChild(location);
        }

        if (websiteinput.value) {
            const website = document.createElement("span");
            website.textContent = websiteinput.value;
            contact.appendChild(website);
        }

    });

}

emailinput.addEventListener("input", updatecontact);
phoneinput.addEventListener("input", updatecontact);
locationinput.addEventListener("input", updatecontact);
websiteinput.addEventListener("input", updatecontact);

const summaryinput = document.querySelector("#professional-summary");

const resumesummary = document.querySelectorAll(
    ".resume-summary, .minimal-summary, .creative-summary, .professional-summary, .executive-summary"
);

summaryinput.addEventListener("input", function () {

    resumesummary.forEach(function (summary) {

        summary.querySelector("p").textContent =
            summaryinput.value || "Your professional summary will appear here";

    });

});

const educationlist = document.querySelector(".education-list");
const addeducationbutton = document.querySelector(".add-education");
const educationinputs = document.querySelectorAll(
    ".education-institution, .education-degree, .education-start, .education-end, .education-details"
);

addeducationbutton.addEventListener("click", function () {
    const educationitem = document.createElement("div");
    educationitem.classList.add("education-item");

    educationitem.innerHTML = `
        <div class="form-group">
            <label>Institution Name</label>
            <input type="text" class="education-institution"
                placeholder="e.g. University of London">
        </div>

        <div class="form-group">
            <label>Degree / Qualification</label>
            <input type="text" class="education-degree"
                placeholder="e.g. Bachelor's in Computer Science">
        </div>

        <div class="form-row">
            <div class="form-group">
                <label>Start Date</label>
                <input type="text" class="education-start" placeholder="e.g. 2022">
            </div>

            <div class="form-group">
                <label>End Date</label>
                <input type="text" class="education-end" placeholder="e.g. 2026">
            </div>
        </div>

        <div class="form-group">
            <label>Additional Details</label>
            <textarea class="education-details" rows="3"
                placeholder="Add grades, achievements or relevant coursework"></textarea>
        </div>

        <button class="remove-button remove-education" type="button">
            <i class="fa-solid fa-trash"></i>
            Remove Education
        </button>
    `;

    educationlist.appendChild(educationitem);
    educationlist.classList.add("multiple-education");

});

educationlist.addEventListener("click", function (event) {

    if (event.target.closest(".remove-education")) {
        const educationitem = event.target.closest(".education-item");
        educationitem.remove();

        if (educationlist.children.length === 1) {
            educationlist.classList.remove("multiple-education");
        }
    }

});

const resumeeducationlists = document.querySelectorAll(".resume-education-list");

function updateeducation() {

    resumeeducationlists.forEach(function (list) {

        list.innerHTML = "";

        const educationitems = educationlist.querySelectorAll(".education-item");

        educationitems.forEach(function (item) {

            const institution = item.querySelector(".education-institution").value;
            const degree = item.querySelector(".education-degree").value;
            const start = item.querySelector(".education-start").value;
            const end = item.querySelector(".education-end").value;
            const details = item.querySelector(".education-details").value;

            if (!institution && !degree && !start && !end && !details) {
                return;
            }

            const educationentry = document.createElement("div");

            educationentry.classList.add("education-entry");

            educationentry.innerHTML = `
            <h5>${institution}</h5>
            <p>${degree}</p>
            <span>${start} - ${end}</span>
            <p>${details}</p>`;


            list.appendChild(educationentry);

        });

    });

}
educationlist.addEventListener("input", function () {

    updateeducation();

});