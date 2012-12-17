
function events() {
	var eventList = [], nodeList = $$('code.event');
	for (index in nodeList) {
		var title = nodeList[index].innerText;
		if ($$('#'+title).length) eventList.push(title);
	}
	return eventList.sort();
}

/* listEvents: alphabetical list of event listeners, generated from markup e.g. 'collapserequest, deleterequest, ...' */
function listEvents(r, content) {
	var s = '<ul>', eventList = events();
	for (index in eventList){
		var title = eventList[index];
		var description = '';
		var els = $$('#'+title+'+dd>p'); // get the paragraph children of the dd that follows the dt event element.
		if (els.length) description = els[0].innerText; // use its text value as the short description
		s += '<li><a href="#' +title+ '">' +title+ '</a>: ' +description+ '</li>';
	}
	s += '</ul>'
	return content + s;
}

/* listActions: alphabetical list generated from trimmed event names. e.g. 'collapserequest, deleterequest, ...' becomes 'collapse, delete, ...' */
function listActions(r, content) {
	var s = '<ul>', eventList = events();
	for (index in eventList){
		var title = eventList[index];
		s += '<li><code>' +title.replace('request','')+ '</code></li>';
	}
	s += '</ul>'
	return content + s;
}

