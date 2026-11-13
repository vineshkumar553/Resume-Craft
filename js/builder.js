
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

const experiencelist = document.querySelector(".experience-list");
const addexperiencebutton = document.querySelector(".add-experience");

addexperiencebutton.addEventListener("click", function () {

    const experienceitem = document.createElement("div");

    experienceitem.classList.add("experience-item");

    experienceitem.innerHTML = `
        <div class="form-group">
            <label>Job Title</label>
            <input type="text" class="experience-title"
                placeholder="e.g. Front-End Developer">
        </div>

        <div class="form-group">
            <label>Company Name</label>
            <input type="text" class="experience-company"
                placeholder="e.g. Google">
        </div>

        <div class="form-row">
            <div class="form-group">
                <label>Start Date</label>
                <input type="text" class="experience-start"
                    placeholder="e.g. 2023">
            </div>

            <div class="form-group">
                <label>End Date</label>
                <input type="text" class="experience-end"
                    placeholder="e.g. 2025">
            </div>
        </div>

        <div class="form-group">
            <label>Job Description</label>
            <textarea class="experience-description" rows="3"
                placeholder="Describe your responsibilities and achievements"></textarea>
        </div>

        <button class="remove-button remove-experience" type="button">
            <i class="fa-solid fa-trash"></i>
            Remove Experience
        </button>
    `;

    experiencelist.appendChild(experienceitem);

});

experiencelist.addEventListener("click", function (event) {

    if (event.target.closest(".remove-experience")) {
        const experienceitem = event.target.closest(".experience-item");
        experienceitem.remove();

    }

});

const resumeexperiencelists = document.querySelectorAll(".resume-experience-list");

function updateexperience() {

    resumeexperiencelists.forEach(function (list) {

        list.innerHTML = "";

        const experienceitems = experiencelist.querySelectorAll(".experience-item");

        experienceitems.forEach(function (item) {

            const title = item.querySelector(".experience-title").value;
            const company = item.querySelector(".experience-company").value;
            const start = item.querySelector(".experience-start").value;
            const end = item.querySelector(".experience-end").value;
            const description = item.querySelector(".experience-description").value;

            if (!title && !company && !start && !end && !description) {
                return;
            }

            const experienceentry = document.createElement("div");

            experienceentry.classList.add("experience-entry");

            experienceentry.innerHTML = `
            <h5>${title}</h5>
            <p>${company}</p>
            <span>${start} - ${end}</span>
            <p>${description}</p>`
                ;

            list.appendChild(experienceentry);

        });

    });

}
experiencelist.addEventListener("input", function () {

    updateexperience();

});

const projectlist = document.querySelector(".project-list");
const addprojectbutton = document.querySelector(".add-project");

addprojectbutton.addEventListener("click", function () {

    const projectitem = document.createElement("div");

    projectitem.classList.add("project-item");

    projectitem.innerHTML = `
        <div class="form-group">
            <label>Project Name</label>
            <input type="text" class="project-name"
                placeholder="e.g. Portfolio Website">
        </div>

        <div class="form-group">
            <label>Project Link</label>
            <input type="text" class="project-link"
                placeholder="e.g. https://github.com/username/project">
        </div>

        <div class="form-group">
            <label>Technologies Used</label>
            <input type="text" class="project-technologies"
                placeholder="e.g. HTML, CSS, JavaScript">
        </div>

        <div class="form-group">
            <label>Project Description</label>
            <textarea class="project-description" rows="3"
                placeholder="Describe your project and its features"></textarea>
        </div>

        <button class="remove-button remove-project" type="button">
            <i class="fa-solid fa-trash"></i>
            Remove Project
        </button>
    `;

    projectlist.appendChild(projectitem);

});
projectlist.addEventListener("click", function (event) {

    if (event.target.closest(".remove-project")) {
        const projectitem = event.target.closest(".project-item");
        projectitem.remove();

    }

});
const resumeprojectlists = document.querySelectorAll(".resume-project-list");

function updateprojects() {

    resumeprojectlists.forEach(function (list) {

        list.innerHTML = "";

        const projectitems = projectlist.querySelectorAll(".project-item");

        projectitems.forEach(function (item) {

            const name = item.querySelector(".project-name").value;
            const link = item.querySelector(".project-link").value;
            const technologies = item.querySelector(".project-technologies").value;
            const description = item.querySelector(".project-description").value;

            if (!name && !link && !technologies && !description) {
                return;
            }

            const projectentry = document.createElement("div");

            projectentry.classList.add("project-entry");

            projectentry.innerHTML = `
            <h5>${name}</h5>
            <p>${technologies}</p>
            <p>${description}</p>
            <a href="${link}" target="_blank">${link}</a>`;
            
            list.appendChild(projectentry);

        });

    });

};

projectlist.addEventListener("input", function () {

    updateprojects();

});

const skillinput = document.querySelector("#skill-input");
const skillslist = document.querySelector(".skill-list");
const addskillbutton = document.querySelector(".add-skill");
const resumeskilllists = document.querySelectorAll(".resume-skills-list");

function updateskills() {

    resumeskilllists.forEach(function (list) {

        list.innerHTML = "";

        const skillitems = skillslist.querySelectorAll(".skill-item");

        skillitems.forEach(function (item) {

            const skill = item.querySelector(".skill-name").textContent;

            const skillentry = document.createElement("span");
            skillentry.classList.add("skill-entry");
            skillentry.textContent = skill;

            list.appendChild(skillentry);

        });

    });

}

addskillbutton.addEventListener("click", function () {

    const skill = skillinput.value.trim();

    if (!skill) {
        return;
    }

    const skillitems = skillslist.querySelectorAll(".skill-item");

    let exists = false;

    skillitems.forEach(function (item) {

        if (item.querySelector(".skill-name").textContent.toLowerCase() === skill.toLowerCase()) {
            exists = true;
        }

    });

    if (exists) {
        return;
    }

    const skillitem = document.createElement("div");
    skillitem.classList.add("skill-item");

    const skillname = document.createElement("span");
    skillname.classList.add("skill-name");
    skillname.textContent = skill;

    const removebutton = document.createElement("button");
    removebutton.classList.add("remove-button", "remove-skill");
    removebutton.type = "button";
    removebutton.innerHTML = '<i class="fa-solid fa-trash"></i> Remove Skill';

    skillitem.appendChild(skillname);
    skillitem.appendChild(removebutton);

    skillslist.appendChild(skillitem);

    skillinput.value = "";

    updateskills();

});

skillslist.addEventListener("click", function (event) {

    if (event.target.closest(".remove-skill")) {

        event.target.closest(".skill-item").remove();

        updateskills();

    }

});

const certificationlist = document.querySelector(".certification-list");
const addcertificationbutton = document.querySelector(".add-certification");
const resumecertificationlists = document.querySelectorAll(".resume-certifications-list");

addcertificationbutton.addEventListener("click", function () {

    const certificationitem = document.createElement("div");
    certificationitem.classList.add("certification-item");

    certificationitem.innerHTML = `
        <div class="form-group">
            <label>Certificate Name</label>
            <input type="text" class="certification-name"
                placeholder="e.g. Python for Everybody">
        </div>

        <div class="form-group">
            <label>Issuing Organization</label>
            <input type="text" class="certification-organization"
                placeholder="e.g. University of Michigan">
        </div>

        <div class="form-row">
            <div class="form-group">
                <label>Issue Date</label>
                <input type="text" class="certification-date"
                    placeholder="e.g. March 2025">
            </div>

            <div class="form-group">
                <label>Credential ID</label>
                <input type="text" class="certification-id"
                    placeholder="e.g. ABC12345">
            </div>
        </div>

        <button class="remove-button remove-certification" type="button">
            <i class="fa-solid fa-trash"></i>
            Remove Certification
        </button>
    `;

    certificationlist.appendChild(certificationitem);

    certificationlist.classList.add("multiple-certifications");

});

certificationlist.addEventListener("click", function (event) {

    if (event.target.closest(".remove-certification")) {

        const certificationitem = event.target.closest(".certification-item");
        certificationitem.remove();

        if (certificationlist.children.length === 1) {
            certificationlist.classList.remove("multiple-certifications");
        }

        updatecertifications();

    }

});

function updatecertifications() {

    resumecertificationlists.forEach(function (list) {

        list.innerHTML = "";

        const certificationitems = certificationlist.querySelectorAll(".certification-item");

        certificationitems.forEach(function (item) {

            const name = item.querySelector(".certification-name").value;
            const organization = item.querySelector(".certification-organization").value;
            const date = item.querySelector(".certification-date").value;
            const id = item.querySelector(".certification-id").value;

            if (!name && !organization && !date && !id) {
                return;
            }

            const certificationentry = document.createElement("div");

            certificationentry.classList.add("certification-entry");

            const certificationname = document.createElement("h5");
            certificationname.textContent = name;

            const certificationorganization = document.createElement("p");
            certificationorganization.textContent = organization;

            const certificationdate = document.createElement("span");
            certificationdate.textContent = date;

            const certificationid = document.createElement("p");
            certificationid.textContent = id ? "Credential ID: " + id : "";

            certificationentry.appendChild(certificationname);
            certificationentry.appendChild(certificationorganization);
            certificationentry.appendChild(certificationdate);
            certificationentry.appendChild(certificationid);

            list.appendChild(certificationentry);

        });

    });

}

certificationlist.addEventListener("input", function () {

    updatecertifications();

});

const languagelist = document.querySelector(".language-list");
const addlanguagebutton = document.querySelector(".add-language");
const resumelanguagelists = document.querySelectorAll(".resume-languages-list");

addlanguagebutton.addEventListener("click", function () {

    const languageitem = document.createElement("div");

    languageitem.classList.add("language-item");

    languageitem.innerHTML = `
        <div class="form-group">
            <label>Language</label>
            <input type="text" class="language-name"
                placeholder="e.g. English">
        </div>

        <div class="form-group">
            <label>Proficiency Level</label>
            <select class="language-level">
                <option value="">Select proficiency</option>
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
            </select>
        </div>

        <button class="remove-button remove-language" type="button">
            <i class="fa-solid fa-trash"></i>
            Remove Language
        </button>
    `;

    languagelist.appendChild(languageitem);
    languagelist.classList.add("multiple-languages");

});

languagelist.addEventListener("click", function (event) {

    if (event.target.closest(".remove-language")) {

        const languageitem = event.target.closest(".language-item");
        languageitem.remove();

        if (languagelist.children.length === 1) {
            languagelist.classList.remove("multiple-languages");
        }

        updatelanguages();

    }

});

function updatelanguages() {

    resumelanguagelists.forEach(function (list) {

        list.innerHTML = "";

        const languageitems = languagelist.querySelectorAll(".language-item");

        languageitems.forEach(function (item) {

            const name = item.querySelector(".language-name").value;
            const level = item.querySelector(".language-level").value;

            if (!name && !level) {
                return;
            }

            const languageentry = document.createElement("div");

            languageentry.classList.add("language-entry");

            const languagename = document.createElement("h5");
            languagename.textContent = name;

            const languagelevel = document.createElement("p");
            languagelevel.textContent = level;

            languageentry.appendChild(languagename);
            languageentry.appendChild(languagelevel);

            list.appendChild(languageentry);

        });

    });

}

languagelist.addEventListener("input", function () {

    updatelanguages();

});

languagelist.addEventListener("change", function () {

    updatelanguages();

});

const resumecolorinput = document.querySelector("#resume-color");
const resumefontsizeinput = document.querySelector("#resume-font-size");
const resumepaper = document.querySelectorAll(".resume-paper");

resumecolorinput.addEventListener("input", function () {

    resumepaper.forEach(function (paper) {
        paper.style.setProperty("--resume-accent", resumecolorinput.value);

    });

});

resumefontsizeinput.addEventListener("change", function () {

    resumepaper.forEach(function (paper) {

        paper.classList.remove("font-small", "font-medium", "font-large");
        paper.classList.add("font-" + resumefontsizeinput.value);

    });

});

