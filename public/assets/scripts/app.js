
Array.from(document.getElementsByClassName('eat-burger-btn')).forEach(element => {
  element.addEventListener('click', (event) => {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'api/burgers');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      location.reload();
    };
    xhr.send(JSON.stringify({
      id: event.target.parentNode.id,
      devoured: 1
    }));
  });
});

document.getElementById('burger-form').addEventListener('submit', (event) => {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'api/burgers');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    location.reload();
  };
  xhr.send(JSON.stringify({
    burger_name: event.target[0].value
  }));
});