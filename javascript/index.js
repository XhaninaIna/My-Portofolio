//TASK 1 : SHOW/HIDE MENU
document.getElementById("menu_icon").addEventListener("click", function () {
  var mobileNav = document.getElementById("mobileNav");
  mobileNav.classList.toggle("showSidebar");
});
document.getElementById("close_btn").addEventListener("click", function () {
  var mobileNav = document.getElementById("mobileNav");
  mobileNav.classList.remove("showSidebar");
});
//TASK 2: SMOOTH SCROLLING
//therret te gjithe taget anchor a qe kane nje atribut qe fillon me #
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    //rrimer atributin href qe ka tagu anchor
    const targetSection = document.querySelector(this.getAttribute("href"));
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
      var mobileNav = document.getElementById("mobileNav");
      mobileNav.classList.remove("showSidebar");
    }
  });
});
//TASK 3: FILTRING PROJECTS
const filterButtons = document.querySelectorAll(".filter_btn");
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const filter = this.getAttribute("data-filter");
    //get all projects box
    const projectBoxes = document.querySelectorAll(".myprojects .box");
    projectBoxes.forEach((box) => {
      //if "all" is selected
      if (filter === "all") {
        box.style.display = "grid";
      } else if (box.getAttribute("data-category") === filter) {
        box.style.display = "grid";
      } else {
        box.style.display = "none";
      }
    });
  });
});
//TASK 4: VALIDATION FORM
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  //get forms values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  //name validation
  if (name === "" || !/^[a-zA-Z\s]+$/.test(name)) {
    alert("Please enter a valid name(letters and space only)");
    return;
  }
  if (!validateEmail(email)) {
    alert("Please enter a valid email address!");
    return;
  }
  if (subject === "") {
    alert("Please enter a subject!");
    return;
  }
  if (message === "") {
    alert("Please enter a message!");
    return;
  }
  alert("Form submitted succesfully!");
  //reset the form field
  document.getElementById("contactForm").reset();
});
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

//TASK 5: MODAL FOR PROJECT DETAILS
const modal = document.getElementById("projectModal");
const closeBtn = document.getElementById("close");
const projectBoxes = document.querySelectorAll(".myprojects .box");

projectBoxes.forEach((box) => {
  box.addEventListener("click", function () {
    const title = box.querySelector(".title").textContent;
    const image = box.querySelector("img").src;
    const description = box.querySelector("p:nth-of-type(2)").textContent;
    //set modal content
    modal.querySelector(".modal_title").textContent = title;
    modal.querySelector(".modal_image").src = image;
    modal.querySelector(".modal-description").textContent = description;
    //show modal
    modal.style.display = "block";
  });
});
//close modal when button is clicked
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// TASK 6: SCROLL TO TOP BUTTON
const scrollToTopBtn = document.getElementById("scrollToTopButton");
//show the button when the user scrolls doen 200px from the top
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// TASK 7: DYNAMIC YEAR IN FOOTER
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;
// TASK 8: MENU EVENTS
const eventForm = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");
const searchInput = document.getElementById("searchInput");
let events = [];
eventForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("eventTitle").value;
  const description = document.getElementById("eventDesc").value;
  const date = document.getElementById("eventDate").value;
  const newEvent = { title, description, date };
  events.push(newEvent);
  displayEvents(events);
  eventForm.reset();
});
//display events
function displayEvents(eventArray) {
  eventList.innerHTML = "";
  eventArray.forEach((event, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${event.title}</span>  ${event.description} <span>${event.date}</span>
<button onclick="deleteEvent(${index})">X</button>`;
    eventList.appendChild(li);
  });
}
//delete event
function deleteEvent(index) {
  events.splice(index, 1);
  displayEvents(events);
}
//filter events
searchInput.addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm)
  );
  displayEvents(filteredEvents);
});
