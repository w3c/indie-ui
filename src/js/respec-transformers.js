/* listEvents: alphabetically list of event listeners, generated from markup */
function listEvents(r, content) {
	var s = '', eventList = [], nodeList = $$('code.event');
	for (index in nodeList) {
		var title = nodeList[index].innerText;
		if ($$('#'+title).length) eventList.push(title);
	}
	s += '<ul>'
	for (index in eventList.sort()){
		var title = eventList[index];
		var description = '';
		var els = $$('#'+title+'+dd>p'); // get the paragraph children of the dd that follows the dt event element.
		if (els.length) description = els[0].innerText; // use its text value as the short description
		s += '<li><a href="#' +title+ '">' +title+ '</a>: ' +description+ '</li>';
	}
	s += '</ul>'
	return content + s;
}

/* markRestricted: appends a link to the definition of restricted events */
function markRestricted(r, content){
	return content + ' (<a href="#def_restricted_event">' +loc('_restricted event')+ '</a>)';
}
