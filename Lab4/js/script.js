document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("focus", suggestPassword);
document.querySelector("#submitBtn").addEventListener("click", validateForm);

async function displayCity() {
  let zip = document.querySelector("#zip").value;
  let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zip}`;
  let response = await fetch(url);
  let data = await response.json();

  if (!data.city) {
    document.querySelector("#city").innerHTML = "";
    document.querySelector("#latitude").textContent = "";
    document.querySelector("#longitude").textContent = "";
    document.querySelector("#zipError").innerHTML ='<span style="color: red;">Zip code not found</span>';
  } else 
    {
    document.querySelector("#zipError").innerHTML = "";

    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;
  }
}

getStates();

async function getStates() {
  let url = `https://csumb.space/api/allStatesAPI.php`;
  let data = await fetchData(url);

  let state = document.querySelector("#state");
  state.innerHTML = "";

  let defaultOption = document.createElement("option");
  defaultOption.innerText = "-select a state-";
  defaultOption.value = "0";
  state.appendChild(defaultOption);
  for (let s of data) 
    {
    let optionEl = document.createElement("option");
    optionEl.innerText = s.state;
    optionEl.value = s.usps;
    state.appendChild(optionEl);
  }
}
async function displayCounties() {
  let state = document.querySelector("#state").value;
  let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
  let data = await fetchData(url);

  let county = document.querySelector("#county");
  county.innerHTML = "<option>Select County</option>";
  for (let c of data) 
    {
    let optionEl = document.createElement("option");
    optionEl.innerText = c.county;
    county.appendChild(optionEl);
  }
}
async function checkUsername() {
  let username = document.getElementById("username").value;
  let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  let response = await fetch(url);
  let data = await response.json();

  if (data.available) {
    document.getElementById("usernameError").innerHTML = '<span style="color: green;">Username is available!</span>';
  } else
     {
    document.getElementById("usernameError").innerHTML = '<span style="color: red;">Username is NOT available!</span>';
  }
}
function suggestPassword() {
  let suggested = generatePassword();
  document.querySelector("#suggestedPwd").innerHTML = `<span style="color: blue;">Suggested: ${suggested}</span>`;
}

function generatePassword() 
{
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  let passwd = "";
  for (let i = 0; i < 10; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return passwd;
}

function validateForm(e) {

  e.preventDefault();
  let username = document.querySelector("#username").value;
  let passwd = document.querySelector("#password").value;
  let passwd2 = document.querySelector("#password2").value;
  let valid = true;

  if (username.length < 3) {
    document.querySelector("#usernameError").innerHTML ='<span style="color: red;">Username must be at least 3 characters</span>';
    valid = false;
  }
  if (passwd.length < 6)
     {
    document.querySelector("#passwordError").innerHTML ='<span style="color: red;">Password must be at least 6 characters</span>';
    valid = false;
  } else if (passwd !== passwd2) 
    {
    document.querySelector("#passwordError").innerHTML ='<span style="color: red;">Passwords do not match</span>';
    valid = false;
  } else {
    document.querySelector("#passwordError").innerHTML = "";
  }

  if (valid) {
    alert("Form was submitted successfully!");
  }
}
async function fetchData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}
