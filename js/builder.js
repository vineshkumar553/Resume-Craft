
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

    selectedtemplate = template;

    templatebuttons.forEach(function (button) {
        button.classList.toggle("active", button.dataset.template === template);
    });

    resumepapers.forEach(function (paper) {
        paper.classList.toggle("active", paper.classList.contains(template + "-resume"));
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
        header.parentElement.classList.toggle("active");
    });
});


const fullnameinput = document.querySelector("#full-name");
const titleinput = document.querySelector("#professional-title");
const emailinput = document.querySelector("#email");
const phoneinput = document.querySelector("#phone");
const locationinput = document.querySelector("#location");
const websiteinput = document.querySelector("#website");
const summaryinput = document.querySelector("#professional-summary");

const resumename = document.querySelectorAll(".resume-name");
const resumetitle = document.querySelectorAll(".resume-title");
const resumecontact = document.querySelectorAll(".resume-contact-info");

const resumesummary = document.querySelectorAll(
    ".resume-summary, .minimal-summary, .creative-summary, .professional-summary, .executive-summary"
);

function updatename() {
    resumename.forEach(function (name) {
        name.textContent = fullnameinput.value || "Your Name";
    });

    const nameparts = fullnameinput.value.trim().split(/\s+/).filter(Boolean);

    let initials = "YN";

    if (nameparts.length > 0) {
        initials = nameparts.length > 1
            ? nameparts[0][0] + nameparts[nameparts.length - 1][0]
            : nameparts[0].substring(0, 2);
    }

    document.querySelector(".modern-avatar").textContent = initials.toUpperCase();
    document.querySelector(".creative-avatar").textContent = initials.toUpperCase();
};

function updatetitle() {
    resumetitle.forEach(function (title) {
        title.textContent = titleinput.value || "Your Professional Title";
    });
}

function updatecontact() {
    resumecontact.forEach(function (contact) {
        contact.innerHTML = "";

        const contactdetails = [
            emailinput.value,
            phoneinput.value,
            locationinput.value,
            websiteinput.value
        ];

        contactdetails.forEach(function (detail) {
            if (detail) {
                const span = document.createElement("span");
                span.textContent = detail;
                contact.appendChild(span);
            }
        });
    });
}

function updatesummary() {
    resumesummary.forEach(function (summary) {
        const paragraph = summary.querySelector("p");

        if (paragraph) {
            paragraph.textContent =
                summaryinput.value || "Your professional summary will appear here";
        }
    });
}

fullnameinput.addEventListener("input", updatename);
titleinput.addEventListener("input", updatetitle);

emailinput.addEventListener("input", updatecontact);
phoneinput.addEventListener("input", updatecontact);
locationinput.addEventListener("input", updatecontact);
websiteinput.addEventListener("input", updatecontact);

summaryinput.addEventListener("input", updatesummary);


const educationlist = document.querySelector(".education-list");
const addeducationbutton = document.querySelector(".add-education");
const resumeeducationlists = document.querySelectorAll(".resume-education-list");

function addeducation() {
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

    if (educationlist.children.length > 1) {
        educationlist.classList.add("multiple-education");
    }
}

addeducationbutton.addEventListener("click", addeducation);

educationlist.addEventListener("click", function (event) {
    if (event.target.closest(".remove-education")) {
        event.target.closest(".education-item").remove();

        if (educationlist.children.length <= 1) {
            educationlist.classList.remove("multiple-education");
        }

        updateeducation();
    }
});

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

            const entry = document.createElement("div");
            entry.classList.add("education-entry");

            const heading = document.createElement("h5");
            heading.textContent = institution;

            const degreeparagraph = document.createElement("p");
            degreeparagraph.textContent = degree;

            const date = document.createElement("span");
            date.textContent = [start, end].filter(Boolean).join(" - ");

            const detailparagraph = document.createElement("p");
            detailparagraph.textContent = details;

            entry.appendChild(heading);
            entry.appendChild(degreeparagraph);
            entry.appendChild(date);
            entry.appendChild(detailparagraph);

            list.appendChild(entry);
        });
    });
}

educationlist.addEventListener("input", updateeducation);


const experiencelist = document.querySelector(".experience-list");
const addexperiencebutton = document.querySelector(".add-experience");
const resumeexperiencelists = document.querySelectorAll(".resume-experience-list");

function addexperience() {
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
                <input type="text" class="experience-start" placeholder="e.g. 2023">
            </div>

            <div class="form-group">
                <label>End Date</label>
                <input type="text" class="experience-end" placeholder="e.g. 2025">
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
}

addexperiencebutton.addEventListener("click", addexperience);

experiencelist.addEventListener("click", function (event) {
    if (event.target.closest(".remove-experience")) {
        event.target.closest(".experience-item").remove();
        updateexperience();
    }
});

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

            const entry = document.createElement("div");
            entry.classList.add("experience-entry");

            const heading = document.createElement("h5");
            heading.textContent = title;

            const companyparagraph = document.createElement("p");
            companyparagraph.textContent = company;

            const date = document.createElement("span");
            date.textContent = [start, end].filter(Boolean).join(" - ");

            const descriptionparagraph = document.createElement("p");
            descriptionparagraph.textContent = description;

            entry.appendChild(heading);
            entry.appendChild(companyparagraph);
            entry.appendChild(date);
            entry.appendChild(descriptionparagraph);

            list.appendChild(entry);
        });
    });
}

experiencelist.addEventListener("input", updateexperience);


const projectlist = document.querySelector(".project-list");
const addprojectbutton = document.querySelector(".add-project");
const resumeprojectlists = document.querySelectorAll(".resume-project-list");

function addproject() {
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
}

addprojectbutton.addEventListener("click", addproject);

projectlist.addEventListener("click", function (event) {
    if (event.target.closest(".remove-project")) {
        event.target.closest(".project-item").remove();
        updateprojects();
    }
});

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

            const entry = document.createElement("div");
            entry.classList.add("project-entry");

            const heading = document.createElement("h5");
            heading.textContent = name;

            const technologiesparagraph = document.createElement("p");
            technologiesparagraph.textContent = technologies;

            const descriptionparagraph = document.createElement("p");
            descriptionparagraph.textContent = description;

            entry.appendChild(heading);
            entry.appendChild(technologiesparagraph);
            entry.appendChild(descriptionparagraph);

            if (link) {
                const projectlink = document.createElement("a");
                projectlink.href = link;
                projectlink.textContent = link;
                projectlink.target = "_blank";
                projectlink.rel = "noopener noreferrer";

                entry.appendChild(projectlink);
            }

            list.appendChild(entry);
        });
    });
}

projectlist.addEventListener("input", updateprojects);


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

            const entry = document.createElement("span");
            entry.classList.add("skill-entry");
            entry.textContent = skill;

            list.appendChild(entry);
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

function addcertification() {
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

    if (certificationlist.children.length > 1) {
        certificationlist.classList.add("multiple-certifications");
    }
}

addcertificationbutton.addEventListener("click", addcertification);

certificationlist.addEventListener("click", function (event) {
    if (event.target.closest(".remove-certification")) {
        event.target.closest(".certification-item").remove();

        if (certificationlist.children.length <= 1) {
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

            const entry = document.createElement("div");
            entry.classList.add("certification-entry");

            const heading = document.createElement("h5");
            heading.textContent = name;

            const organizationparagraph = document.createElement("p");
            organizationparagraph.textContent = organization;

            const dateelement = document.createElement("span");
            dateelement.textContent = date;

            const idelement = document.createElement("p");
            idelement.textContent = id ? "Credential ID: " + id : "";

            entry.appendChild(heading);
            entry.appendChild(organizationparagraph);
            entry.appendChild(dateelement);
            entry.appendChild(idelement);

            list.appendChild(entry);
        });
    });
}

certificationlist.addEventListener("input", updatecertifications);


const languagelist = document.querySelector(".language-list");
const addlanguagebutton = document.querySelector(".add-language");
const resumelanguagelists = document.querySelectorAll(".resume-languages-list");

function addlanguage() {
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

    if (languagelist.children.length > 1) {
        languagelist.classList.add("multiple-languages");
    }
}

addlanguagebutton.addEventListener("click", addlanguage);

languagelist.addEventListener("click", function (event) {
    if (event.target.closest(".remove-language")) {
        event.target.closest(".language-item").remove();

        if (languagelist.children.length <= 1) {
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

            const entry = document.createElement("div");
            entry.classList.add("language-entry");

            const heading = document.createElement("h5");
            heading.textContent = name;

            const levelparagraph = document.createElement("p");
            levelparagraph.textContent = level;

            entry.appendChild(heading);
            entry.appendChild(levelparagraph);

            list.appendChild(entry);
        });
    });
}

languagelist.addEventListener("input", updatelanguages);
languagelist.addEventListener("change", updatelanguages);


const resumecolorinput = document.querySelector("#resume-color");
const resumefontsizeinput = document.querySelector("#resume-font-size");

function updatecustomization() {
    const selectedpaper = document.querySelector("." + selectedtemplate + "-resume");

    if (selectedpaper && resumecolorinput.value) {
        selectedpaper.style.setProperty("--resume-accent", resumecolorinput.value);
    }

    resumepapers.forEach(function (paper) {
        paper.classList.remove("font-small", "font-medium", "font-large");
        paper.classList.add("font-" + resumefontsizeinput.value);
    });
};

resumecolorinput.addEventListener("input", updatecustomization);
resumefontsizeinput.addEventListener("change", updatecustomization);


const savestatus = document.querySelector(".save-status");
const storagekey = "resumecraft-data";
const builderpage = document.querySelector(".builder-page");

function collectresumedata() {
    const educationdata = [];
    const educationitems = educationlist.querySelectorAll(".education-item");

    educationitems.forEach(function (item) {
        educationdata.push({
            institution: item.querySelector(".education-institution").value,
            degree: item.querySelector(".education-degree").value,
            start: item.querySelector(".education-start").value,
            end: item.querySelector(".education-end").value,
            details: item.querySelector(".education-details").value
        });
    });

    const experiencedata = [];
    const experienceitems = experiencelist.querySelectorAll(".experience-item");

    experienceitems.forEach(function (item) {
        experiencedata.push({
            title: item.querySelector(".experience-title").value,
            company: item.querySelector(".experience-company").value,
            start: item.querySelector(".experience-start").value,
            end: item.querySelector(".experience-end").value,
            description: item.querySelector(".experience-description").value
        });
    });

    const projectdata = [];
    const projectitems = projectlist.querySelectorAll(".project-item");

    projectitems.forEach(function (item) {
        projectdata.push({
            name: item.querySelector(".project-name").value,
            link: item.querySelector(".project-link").value,
            technologies: item.querySelector(".project-technologies").value,
            description: item.querySelector(".project-description").value
        });
    });

    const skillsdata = [];
    const skillitems = skillslist.querySelectorAll(".skill-item");

    skillitems.forEach(function (item) {
        skillsdata.push(item.querySelector(".skill-name").textContent);
    });

    const certificationsdata = [];
    const certificationitems = certificationlist.querySelectorAll(".certification-item");

    certificationitems.forEach(function (item) {
        certificationsdata.push({
            name: item.querySelector(".certification-name").value,
            organization: item.querySelector(".certification-organization").value,
            date: item.querySelector(".certification-date").value,
            id: item.querySelector(".certification-id").value
        });
    });

    const languagesdata = [];
    const languageitems = languagelist.querySelectorAll(".language-item");

    languageitems.forEach(function (item) {
        languagesdata.push({
            name: item.querySelector(".language-name").value,
            level: item.querySelector(".language-level").value
        });
    });

    return {
        selectedtemplate: selectedtemplate,

        personal: {
            fullname: fullnameinput.value,
            title: titleinput.value,
            email: emailinput.value,
            phone: phoneinput.value,
            website: websiteinput.value,
            location: locationinput.value
        },

        summary: summaryinput.value,

        education: educationdata,
        experience: experiencedata,
        projects: projectdata,
        skills: skillsdata,
        certifications: certificationsdata,
        languages: languagesdata,

        customization: {
            color: resumecolorinput.value,
            fontsize: resumefontsizeinput.value
        }
    };
}

function savedata() {
    const resumedata = collectresumedata();

    localStorage.setItem(storagekey, JSON.stringify(resumedata));

    savestatus.innerHTML = `
        <i class="fa-solid fa-cloud-check"></i>
        All changes saved
    `;
}

builderpage.addEventListener("input", savedata);
builderpage.addEventListener("change", savedata);

builderpage.addEventListener("click", function () {
    savedata();
});


function loadresume() {
    const saveddata = localStorage.getItem(storagekey);

    if (!saveddata) {
        updatename();
        updatetitle();
        updatecontact();
        updatesummary();
        updateeducation();
        updateexperience();
        updateprojects();
        updateskills();
        updatecertifications();
        updatelanguages();
        updatecustomization();

        return;
    }

    let resumedata;

    try {
        resumedata = JSON.parse(saveddata);
    } catch (error) {
        localStorage.removeItem(storagekey);
        return;
    }

    const personal = resumedata.personal || {};
    const customization = resumedata.customization || {};

    fullnameinput.value = personal.fullname || "";
    titleinput.value = personal.title || "";
    emailinput.value = personal.email || "";
    phoneinput.value = personal.phone || "";
    websiteinput.value = personal.website || "";
    locationinput.value = personal.location || "";

    summaryinput.value = resumedata.summary || "";


    educationlist.innerHTML = "";

    (resumedata.education || []).forEach(function (education) {
        addeducation();

        const items = educationlist.querySelectorAll(".education-item");
        const lastitem = items[items.length - 1];

        lastitem.querySelector(".education-institution").value = education.institution || "";
        lastitem.querySelector(".education-degree").value = education.degree || "";
        lastitem.querySelector(".education-start").value = education.start || "";
        lastitem.querySelector(".education-end").value = education.end || "";
        lastitem.querySelector(".education-details").value = education.details || "";
    });

    if (educationlist.children.length <= 1) {
        educationlist.classList.remove("multiple-education");
    }


    experiencelist.innerHTML = "";

    (resumedata.experience || []).forEach(function (experience) {
        addexperience();

        const items = experiencelist.querySelectorAll(".experience-item");
        const lastitem = items[items.length - 1];

        lastitem.querySelector(".experience-title").value = experience.title || "";
        lastitem.querySelector(".experience-company").value = experience.company || "";
        lastitem.querySelector(".experience-start").value = experience.start || "";
        lastitem.querySelector(".experience-end").value = experience.end || "";
        lastitem.querySelector(".experience-description").value = experience.description || "";
    });


    projectlist.innerHTML = "";

    (resumedata.projects || []).forEach(function (project) {
        addproject();

        const items = projectlist.querySelectorAll(".project-item");
        const lastitem = items[items.length - 1];

        lastitem.querySelector(".project-name").value = project.name || "";
        lastitem.querySelector(".project-link").value = project.link || "";
        lastitem.querySelector(".project-technologies").value = project.technologies || "";
        lastitem.querySelector(".project-description").value = project.description || "";
    });


    skillslist.innerHTML = "";

    (resumedata.skills || []).forEach(function (skill) {
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
    });


    certificationlist.innerHTML = "";

    (resumedata.certifications || []).forEach(function (certification) {
        addcertification();

        const items = certificationlist.querySelectorAll(".certification-item");
        const lastitem = items[items.length - 1];

        lastitem.querySelector(".certification-name").value = certification.name || "";
        lastitem.querySelector(".certification-organization").value = certification.organization || "";
        lastitem.querySelector(".certification-date").value = certification.date || "";
        lastitem.querySelector(".certification-id").value = certification.id || "";
    });

    if (certificationlist.children.length <= 1) {
        certificationlist.classList.remove("multiple-certifications");
    }


    languagelist.innerHTML = "";

    (resumedata.languages || []).forEach(function (language) {
        addlanguage();

        const items = languagelist.querySelectorAll(".language-item");
        const lastitem = items[items.length - 1];

        lastitem.querySelector(".language-name").value = language.name || "";
        lastitem.querySelector(".language-level").value = language.level || "";
    });

    if (languagelist.children.length <= 1) {
        languagelist.classList.remove("multiple-languages");
    }


    if (resumedata.selectedtemplate) {
        changetemplate(resumedata.selectedtemplate);
    }

    if (customization.color) {
        resumecolorinput.value = customization.color;
    }

    if (customization.fontsize) {
        resumefontsizeinput.value = customization.fontsize;
    }


    updatename();
    updatetitle();
    updatecontact();
    updatesummary();

    updateeducation();
    updateexperience();
    updateprojects();
    updateskills();
    updatecertifications();
    updatelanguages();

    updatecustomization();
}

loadresume();

const resetbutton = document.querySelector(".reset-button");

resetbutton.addEventListener("click", function (event) {

    event.stopPropagation();
    const confirmreset = confirm("Are you sure you want to reset your resume?");

    if (!confirmreset) {
        return;
    }

    localStorage.removeItem(storagekey);
    window.location.reload();

});

const downloadbutton = document.querySelector(".download-button");

downloadbutton.addEventListener("click", function () {
    window.print();
});