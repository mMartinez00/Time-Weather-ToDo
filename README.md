# Time - Weather - To Do App

This is an app with three functionalities:

1. Display time
   - Can be switched to 24hr format
2. Search the weather status for a city
   - Using [Forward & Reverse Geocoding](https://rapidapi.com/GeocodeSupport/api/forward-reverse-geocoding/) API and the [OpenWeather](https://openweathermap.org/) API.
3. To Do list
   - Add task
   - Mark task ask completed
   - Delete task

What motivited me to build this app was a desire to create an app with three functionalities. Building this app was useful to touch bases on JavaScripts date object, Fetch API, and creating a simple To Do list.

---

In the function `getTimeAndDate()` the Conditional Operator was useful to display the minutes and seconds.

A condtional operator takes three operands. A condition followed by a question mark `?`, then an expression to execute if the condition is `true` followed by a colon `:` and finally an expression to execute if the condition is `false`.

```javascript
let minutes = date.getMinutes();
let seconds = date.getSeconds();

minutes = minutes < 10 ? "0" + minutes : minutes;
seconds = seconds < 10 ? "0" + seconds : seconds;
```

A condition operator is similar to the If...else statement, but the conditional operator takes less space and helps write the if/else statements in the shortest way possible.
