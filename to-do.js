// Add activity

let activityInput = document.getElementById("activity-input");
let submitActivity = document.getElementById("submit-activity");
let detailsInput =document.getElementById('details-input');
let tasks = document.getElementById("tasks");
let activitiesImgs = ["1.jpg", "2.jpg", "3.png", "4.jpg", "5.jpg", "6.jpg", "7.png", "8.jpg", "9.png"];
  

submitActivity.addEventListener('click', function(){

  let task = document.createElement('div');
  task.classList.add('task');

  let taskh2 = document.createElement('h2');
  taskh2.innerText = activityInput.value;

  let detailspara = document.createElement('p');
  detailspara.innerText = detailsInput.value;

  let taskImg = document.createElement('img');
  let randomNumber = Math.floor(Math.random() * activitiesImgs.length);
  taskImg.setAttribute('src', `images-activities/${activitiesImgs[randomNumber]}`);

  let deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.innerText = 'Delete';
  
  task.appendChild(taskh2);
  task.appendChild(detailspara);
  task.appendChild(taskImg);
  task.appendChild(deleteBtn);
  tasks.appendChild(task);


  activityInput.value = '';
  detailsInput.value = '';

});

// delete task

window.onclick = function(e){
  if (e.target.classList.contains('delete'))
  {
    e.target.parentElement.remove();
  }
}


// Calendar

const calender = document.querySelector(".calender .container .calender-app");

const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");

let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


function openModal(date){
  clicked = date;

  // searching over the events array to check if there is an event existing add that day clicked.
  const eventForDay = events.find(e => e.date === clicked);

  if(eventForDay)
  {
    let eventsfordday = eventForDay.title.split("/").map(function(ele){
      
      return ` | ${ele} |
      
      `
    }).join("")

    

    document.getElementById("eventText").innerText = eventsfordday;
    deleteEventModal.style.display = 'block';

  }else
  {
      newEventModal.style.display = 'block';
      
  }

  backDrop.style.display ="block";

}



function load(){

  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }


  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  const today = dt.getDay();


  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayInMonth = new Date(year, month, 1);
  const DateString = firstDayInMonth.toLocaleDateString('en-us',
  {
          weekday:'long',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
  });


  const paddingDays = weekdays.indexOf(DateString.split(', ')[0]);
  
  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;


      // IMPORTANT to clear the div

      calender.innerHTML = '';

    for(let i = 1; i <= paddingDays + daysInMonth; i++)
    {
      const daySquare = document.createElement('div');
      daySquare.classList.add("day");

      const dayString = `${month + 1}/${i - paddingDays}/${year}`;

      if(i > paddingDays)
      {
        daySquare.innerText = i - paddingDays;

        const eventForDay = events.find(e => e.date === dayString);

        if(eventForDay)
        {
          const eventDiv = document.createElement('div');
          eventDiv.classList.add('event');
          let eventsfordday = eventForDay.title.split("/");

          eventDiv.innerText = eventsfordday;
            daySquare.appendChild(eventDiv);
        }


        if (i - paddingDays === day && nav === 0) {
          daySquare.id = 'currentDay';
        }
        document.getElementById('Date').innerText = `${today} / ${month + 1} / ${year}`;
        document.getElementById('header').innerText = `${today} / ${month + 1} / ${year}`;

        daySquare.addEventListener("click", function(ev){
        
              ev.target.classList.toggle("active");
              openModal(dayString);

        })

      }  else 
      {
        daySquare.classList.add('padding');
      }


      calender.appendChild(daySquare);    
    }

  
}

function closeModal(){

  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  deleteEventModal.style.display = 'none';
  load();

  // clear input out
}

function saveEvent(){

  if(eventTitleInput)
  {
    
    eventTitleInput.classList.remove('error');

    // push an object in hte events array
    events.push({
        
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();


  } else{
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent(){

  //reset events except for the one we need to delete
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();

}

function initButtons(){

  document.getElementById("nextButton").addEventListener("click", () =>{

    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () =>{

    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);

  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();


/*

let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();

*/




