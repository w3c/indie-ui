
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


// utility used by listMediaFeatures
function allMediaFeatures() {
	var node, selector = '', mediaFeatureList = [], nodeList = $$('.media-feature');
	for (var i=0; i < nodeList.length; i++) {
		node = nodeList[i].parentElement.id;
		mediaFeatureList.push(node);
	}
	return mediaFeatureList.sort();
}

/* listMediaFeatures: alphabetical list generated from user context media features. */
function listMediaFeatures(r, content) {
	var s = '<ul>', mediaFeatureName = '', linkId = '', mediaFeatureList = allMediaFeatures();
	for (var i = 0; i < mediaFeatureList.length; i++){
		mediaFeatureName = mediaFeatureList[i];
		linkId = mediaFeatureName;
		s += '<li><code><a href="#' + linkId + '">' + mediaFeatureName + '</a></code></li>';
	}
	s += '</ul>';
	return content + s;
}

/* Turns <el>myId</el> into <el><a href="myId">myId</a></el> */ 
function linkId(r, content) {
	return ['<a href="#', r.xmlEscape(content), '">', content, '</a>'].join('');	
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

