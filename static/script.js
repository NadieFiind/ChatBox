function sendMessage() {
	let xhr = new XMLHttpRequest();
	let message = messageInput.value;
	
	if (message.trim()) {
		xhr.open("POST", "/send", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify({
			"author": name,
			"message": message
		}));
		
		messageInput.value = "";
	}
}

function notValidName(name) {
	if (!name) return true;
	if (!name.trim()) return true;
	return false;
}

let name = prompt("What is your name?");

while (notValidName(name)) {
	name = prompt("Invalid name. Please try again.");
}

name = name.trim();
let messagesBox = document.querySelector("#messages-box");
let messageInput = document.querySelector("#message-input");
let sendMessageBtn = document.querySelector("#send-message-btn");

// Auto scroll when you send a message.
let observer = new MutationObserver((mutationsList) => {
	// Check if scrolled to bottom. If yes, autoscroll even if the message is not yours.
	if (messagesBox.scrollHeight - messagesBox.scrollTop - messagesBox.clientHeight <= 60) {
		messagesBox.scrollTop = messagesBox.scrollHeight;
		return;
	}
	
	let message = mutationsList[mutationsList.length - 1].addedNodes[1];
	let author = message.childNodes[1].textContent;
	
	if (author === name) {
		messagesBox.scrollTop = messagesBox.scrollHeight;
	}
});

observer.observe(messagesBox, {subtree: false, childList: true});
messagesBox.scrollTop = messagesBox.scrollHeight;

messageInput.addEventListener("keypress", (event) => {
	// Detect enter keypress when typing message.
	if (event.which === 13 && !event.shiftKey) {
		event.preventDefault();
		sendMessageBtn.click();
	}
})
