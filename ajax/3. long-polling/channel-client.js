console.log(publish);

publish.onsubmit = function() {
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/post', true);

	xhr.send(JSON.stringify({ message: this.elements.message.value }));

	this.elements.message.value = '';

	return false;
};

function subscribe() {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', '/channel', true);

	xhr.onreadystatechange = function() {
		if (this.readyState != 4) { return; }

		if (this.status != 200) {
			setTimeout(subscribe, 500);
			return;
		}

		var li = document.createElement('li');
		li.appendChild(document.createTextNode(this.responseText));
		messages.appendChild(li);

		subscribe();
	};

	xhr.send(null);
}

subscribe();