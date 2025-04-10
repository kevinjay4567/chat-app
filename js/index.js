let $textArea = document.getElementById("message");
let $messages = document.getElementById("msgList");
let counter = 1;

function li(text, element) {
  let li = document.createElement("li");
  li.innerText = text;

  element !== null && typeof (element) === 'object' ? li.appendChild(element) : null;
  return li;
}

function sendMessage() {

  if ($textArea.value.trim() === "") {
    console.log("Campo de mensaje vacio");
    return;
  }

  let span = document.createElement("span");
  span.innerText = $textArea.value;

  $messages.appendChild(li(`${counter} - Mensaje: `, span));

  counter++;
}
