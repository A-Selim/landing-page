// Define Global Variables
const navBarList = document.querySelector('#navbar__list');
const sectionTitleElements = document.querySelectorAll('.section__title');
const sections = document.querySelectorAll('section');
// Define last paragraph in sections
const lastParas = document.querySelectorAll(
    '.landing__container p:nth-of-type(1)'
);
const btnToTop = document.querySelector('button');

// Build the nav bar
for (let i = 0; i < sectionTitleElements.length; i++) {
    let sectionId = sections[i].id;
    let navItemAnchor = document.createElement('a');
    navItemAnchor.setAttribute('href', '#' + sectionId);
    navItemAnchor.textContent = sectionTitleElements[i].textContent;

    let navItem = document.createElement('li');
    navItem.setAttribute('class', 'menu__link');

    navItem.appendChild(navItemAnchor);
    navBarList.appendChild(navItem);
}

// Set section active when is in viewport
// Set item active in nav bar when section is in viewport

// Define all anchor tags in nav bar
const navBarAnchors = document.querySelectorAll('.menu__link a');
// Set default active link to nav item Home
navBarAnchors.item(0).setAttribute('id', 'active__link');

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        const sectionId = element.parentElement.parentElement.id;

        const sectionInView = document.querySelector('#' + sectionId);
        const isActive = sectionInView.classList.contains('.active');
        // Remove class 'active' from previous section to add it to section currently viewed
        if (!isActive) {
            const classToRemove = document.querySelector('.active');
            classToRemove.removeAttribute('class');
            sectionInView.setAttribute('class', 'active');
        }
        // Define nav item of the section currently viewed
        const activeLink = Array.from(navBarAnchors).find(
            (anchor) => anchor.getAttribute('href') == '#' + sectionId
        );
        // Remove id 'active__link' from previous nav item to add it to currently viewed
        const linkWasActive = document.querySelector('#active__link');
        linkWasActive.removeAttribute('id');
        activeLink.setAttribute('id', 'active__link');
    }
}

document.addEventListener('scroll', function () {
    for (const para of lastParas) {
        isInViewport(para);
    }
});

// Scroll to section on link click
navBarList.addEventListener('click', function (event) {
    event.preventDefault();
    let sectionId = event.target.getAttribute('href');
    // if condition to make sure that any click on nav bar besides anchor tag will not cause error
    if (sectionId) {
        const activeSection = document.querySelector(sectionId);
        activeSection.scrollIntoView({
            behavior: 'smooth',
        });
    }
});

// Scroll to top of the page
btnToTop.addEventListener('click', function (event) {
    event.preventDefault();
    scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});
