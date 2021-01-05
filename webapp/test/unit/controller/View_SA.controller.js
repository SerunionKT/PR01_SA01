/*global QUnit*/

sap.ui.define([
	"PR01_SA01/PR01_SA01/controller/View_SA.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View_SA Controller");

	QUnit.test("I should test the View_SA controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});