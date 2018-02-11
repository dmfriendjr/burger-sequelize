console.log('Testing');

Array.from(document.getElementsByClassName('eat-burger-btn')).forEach(element => {
  element.addEventListener('click', (event) => {
    console.log(event.target.id);
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'api/burgers');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      location.reload();
    };
    xhr.send(JSON.stringify({
      burgerId: event.target.id,
      devoured: 1
    }));
  });
});