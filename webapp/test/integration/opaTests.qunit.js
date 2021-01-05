/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"PR01_SA01/PR01_SA01/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});