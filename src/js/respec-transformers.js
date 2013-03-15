
// utility used by both listEvents and listActions
function events() {
	var eventList = [], nodeList = $$('code.event');
	for (var i=0; i<nodeList.length; i++) {
		var title = nodeList[i].innerText;
		if ($$('#'+title).length) eventList.push(title);
	}
	return eventList.sort();
}

/* listEvents: alphabetical list of event listeners, generated from markup e.g. 'collapserequest, deleterequest, ...' */
function listEvents(r, content) {
	var s = '<ul>', eventList = events();
	for (var i=0; i<eventList.length; i++){
		var title = eventList[i];
		var description = '';
		var els = $$('#'+title+'+dd>p'); // get the paragraph children of the dd that follows the dt event element.
		if (els.length) description = els[0].innerText; // use its text value as the short description
		s += '<li><a href="#' +title+ '">' +title+ '</a>: ' +description+ '</li>';
	}
	s += '</ul>';
	return content + s;
}

/* listActions: alphabetical list generated from trimmed event names. e.g. 'collapserequest, deleterequest, ...' becomes 'collapse, delete, ...' */
function listActions(r, content) {
	var s = '<ul>', eventList = events();
	for (var i=0; i<eventList.length; i++){
		var title = eventList[i];
		s += '<li><code>' +title.replace('request','')+ '</code></li>';
	}
	s += '</ul>';
	return content + s;
}


// utility used by listKeys
function allKeys() {
	var selector = '', keyList = [], nodeList = $$('.key');
	for (var i=0; i<nodeList.length; i++) {
		keyList.push(nodeList[i].id);
	}
	return keyList.sort();
}

/* listKeys: alphabetical list generated from user context keys. */
function listKeys(r, content) {
	var s = '<ul>', keyName = '', linkId = '', keyList = allKeys();
	for (var i=0; i<keyList.length; i++){
		keyName = keyList[i];
		linkId = keyName.replace(/([a-z]+)-([a-z]+)/i, 'widl-$2-$1'); // regex: hardcoded ID 'fooBar-bazBop' becomes ReSpec-generated ID 'widl-bazBop-fooBar'
		keyName = keyName.substring(0, keyName.indexOf('-'));
		//console.log(keyList[i] + ' : ' + keyName + ' : ' + linkId);
		s += '<li><code><a href="#' + linkId + '">' + keyName + '</a></code></li>';
	}
	s += '</ul>';
	return content + s;
}


/* syntax highlighting for JavaScript examples */
function syntaxJavaScript(r, content) {
	lines = content.split(/\n/);
	for (var i=0; i<lines.length; i++) {
		// line comments
		if (lines[i].indexOf('//') !== -1) {
			lines[i] = lines[i].replace('//', '<span class="comment linecomment">//').replace(/$/, '</span>');
		}
		// block comments
		lines[i] = lines[i].replace('/*', '<span class="comment blockcomment">/*');
		lines[i] = lines[i].replace('*/', '*/</span>');
	}
	return lines.join('\n'); // reassemble the string
}

/* syntax highlighting for CSS examples */
function syntaxCSS(r, content) {
	lines = content.split(/\n/);
	for (var i=0; i<lines.length; i++) {
		// block comments
		lines[i] = lines[i].replace('/*', '<span class="comment blockcomment">/*');
		lines[i] = lines[i].replace('*/', '*/</span>');
	}
	return lines.join('\n'); // reassemble the string
}

/* syntax highlighting for markup examples */
function syntaxMarkup(r, content) {
	lines = content.split(/\n/);
	for (var i=0; i<lines.length; i++) {
		// comments
		lines[i] = lines[i].replace('&lt;!--', '<span class="comment blockcomment">&lt;!--');
		lines[i] = lines[i].replace('--&gt;', '--&gt;</span>');
	}
	return lines.join('\n'); // reassemble the string
	
}

