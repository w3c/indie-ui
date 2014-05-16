
// utility used by both listEvents and listActions
function events(query) {
	if (typeof query == "undefined") {
		var query = 'code.event';
	}
	var eventList = [], nodeList = $$(query);
	for (var i=0; i<nodeList.length; i++) {
		var title = nodeList[i].innerText || nodeList[i].textContent;
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
		if (els.length) description = els[0].innerText || els[0].textContent; // use its text value as the short description
		s += '<li><a href="#' +title+ '">' +title+ '</a>: ' +description+ '</li>';
	}
	s += '</ul>';
	return content + s;
}

/* listActions: alphabetical list generated from trimmed event names. e.g. 'collapserequest, deleterequest, ...' becomes 'collapse, delete, ...' */
function listActions(r, content) {
	return content + actionLinkList(events());
}

/* listTriggerActions: subset of listActions, only includes those that can be used with @uitrigger. */
function listTriggerActions(r, content) {
	return content + actionLinkList(events("#UIRequestEvent code.event"));
}

/* listManipulatorActions: subset of listActions, only includes those that can be used with @uimanipulator. */
function listManipulatorActions(r, content) {
	return content + actionLinkList(events("#UIManipulationRequestEvent code.event, #UIScrollRequestEvent code.event, #UIValueChangeRequestEvent code.event"));
}

function actionLinkList(eventList) {
	// Sort order can change for between events list and actions list.
	// E.g. scrollcancelrequest precedes scrollrequest, but scroll precedes scrollcancel.
	// So we need to trim the event strings into action strings and then sort again.
	for (var i in eventList) {
		eventList[i] = eventList[i].replace("request", "");
	}
	var actionList = eventList.sort();
	var s = "<ul>";
	for (var i=0; i<actionList.length; i++){
		var title = actionList[i];
		s += "<li><code>" + title + "</code></li>";
	}
	s += "</ul>";

	return s;
}

// utility used by listMediaFeatures
function allMediaFeatures() {
	var mf, mediaFeatureList = [], nodeList = $$('.media-feature code');
	for (var i=0; i < nodeList.length; i++) {
		mf = nodeList[i].innerText || nodeList[i].textContent;
		mediaFeatureList.push(mf);
	}
	return mediaFeatureList.sort();
}

/* listMediaFeatures: alphabetical list generated from user context media features. */
function listMediaFeatures(r, content) {
	var s = '<ul>', mediaFeatureName = '', linkId = '', mediaFeatureList = allMediaFeatures();
	for (var i = 0; i < mediaFeatureList.length; i++){
		mediaFeatureName = mediaFeatureList[i];
		linkId = mediaFeatureName;
		s += '<li><code><a href="#media-feature-' + linkId + '">' + mediaFeatureName + '</a></code></li>';
	}
	s += '</ul>';
	return content + s;
}

// utility used by listSettingsKeys
function allSettingsKeys() {
	var key, keyList = [], nodeList = $$('.settings-key code');
	for (var i=0; i < nodeList.length; i++) {
		key = nodeList[i].innerText || nodeList[i].textContent;
		keyList.push(key);
	}
	return keyList.sort();
}

/* listSettingsKeys: alphabetical list generated from user context settings keys. */
function listSettingsKeys(r, content) {
	var s = '<ul>', key = '', linkId = '', keyList = allSettingsKeys();
	for (var i = 0; i < keyList.length; i++){
		key = keyList[i];
		linkId = key;
		s += '<li><code><a href="#' + linkId + '">' + key + '</a></code></li>';
	}
	s += '</ul>';
	return content + s;
}

/* Turns <el>myId</el> into <el><a href="myId">myId</a></el> */ 
function linkId(r, content, optLink) {
	var link = optLink || content;
	return ['<a href="#', r.xmlEscape(link), '">', content, '</a>'].join('');	
}
function linkRestrictionCategory(r, content) {
	return linkId(r, content, ("idl-def-RestrictionCategory." + content));
}