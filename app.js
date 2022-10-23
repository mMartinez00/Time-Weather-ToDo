const switchBtn = document.getElementById("toggle");
const location_input = document.getElementById("location-input");
const search_btn = document.getElementById("search-btn");
const task_input = document.getElementById("task-input");
const submit_btn = document.getElementById("submit-btn");
const [clock_icon, weather_icon, list_icon] = document.querySelectorAll(
  "#time-icon, #weather-icon, #todo-icon"
);

clock_icon.addEventListener("click", iconScroll);

weather_icon.addEventListener("click", iconScroll);

list_icon.addEventListener("click", iconScroll);

function iconScroll(e) {
  if (e.target.classList.contains("fa-clock")) {
    document
      .getElementById("time-container")
      .scrollIntoView({ behavior: "smooth", block: "start" });

    clock_icon.classList.add("active");
    weather_icon.classList.remove("active");
    list_icon.classList.remove("active");
  } else if (e.target.classList.contains("fa-cloud")) {
    document
      .getElementById("weather-container")
      .scrollIntoView({ behavior: "smooth", block: "start" });

    clock_icon.classList.remove("active");
    weather_icon.classList.add("active");
    list_icon.classList.remove("active");
  } else if (e.target.classList.contains("fa-list-ul")) {
    document
      .getElementById("todo-container")
      .scrollIntoView({ behavior: "smooth", block: "start" });

    clock_icon.classList.remove("active");
    weather_icon.classList.remove("active");
    list_icon.classList.add("active");
  }
}

// Time & Date
function getTimeAndDate() {
  let date = new Date();
  // Get Time
  let hour;
  let ampm;
  if (switchBtn.checked === true) {
    hour = date.getHours();
    ampm = "";
  } else {
    hour = date.getHours() % 12;
    ampm = date.getHours() >= 12 ? "PM" : "AM";
  }
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Time
  let time = hour + ":" + minutes + ":" + seconds + " " + ampm;
  document.getElementById("time").innerText = time;

  // Date
  let currentDate = date.toDateString();
  document.getElementById("date").innerText = currentDate;
}

setInterval(getTimeAndDate, 1000);

// Fetch Weather data
const fetchWeatherData = async () => {
  // 1. Fetch coordinates for the location input
  const locationData = await fetch(
    `https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=${location_input.value}&accept-language=en&polygon_threshold=0.0`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
        "x-rapidapi-key": "0bcbf5a353msha8406c3fb5e2a28p1bf8dcjsn166516264400",
      },
    }
  );
  const response = await locationData.json();
  const data = await response[0];
  let { lat, lon } = data;

  // 2. Fetch data from Weather API
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&country=US&appid=540d39671c0abbb4a5eb491bcbfb2df3
      `,
    {
      Method: "GET",
    }
  )
    .then((data) => data.json())
    .then((weather) => outputHtml(weather))
    .catch(
      (error) =>
        (document.querySelector(".weather").innerHTML =
          '<h1 class="error">Error something went wrong!</h1>')
    );
};

function outputHtml(weather) {
  const container = document.getElementById("weather");
  let html = `
    <h1 class="location">${weather.name}</h1>
    <div class="temp-icon">
      <p class="temp">${Math.round(weather.main.temp)}&deg;</p>
      <img src="http://openweathermap.org/img/wn/${
        weather.weather[0].icon
      }@2x.png" alt="icon">
    </div>
    <p class="description">${weather.weather[0].description.toUpperCase()}</p>
    <p class="humidity">Humidity: ${weather.main.humidity}%</p>
    <p class="wind">Wind: ${Math.round(weather.wind.speed)} mph</p>
  `;
  container.innerHTML = html;
}

search_btn.addEventListener("click", fetchWeatherData);

// Sumbit and delete Tasks
submit_btn.addEventListener("click", submitTask);

function submitTask() {
  if (task_input.value === "") {
    // Alert
    const alert = document.createElement("p");
    alert.setAttribute("class", "alert");
    alert.innerText = "Please enter a task";
    task_input.insertAdjacentElement("afterend", alert);
    setTimeout(() => alert.remove(), 1000);
  } else {
    // Task Element
    const task = document.createElement("p");
    task.setAttribute("class", "task");
    task.innerText = task_input.value;

    // Delete Btn
    const delete_btn = document.createElement("button");
    delete_btn.setAttribute("class", "delete-task");
    delete_btn.innerHTML = '<i class="fas fa-times"></i>';

    // Append delete button to task
    task.appendChild(delete_btn);

    // Append task to list
    const todo_list = document.getElementById("todo-list");
    todo_list.appendChild(task);
    task_input.value = "";

    // Delete task
    delete_btn.addEventListener("click", () => todo_list.removeChild(task));

    // Double click to complete task
    task.addEventListener("dblclick", () => task.classList.toggle("completed"));
  }
}
