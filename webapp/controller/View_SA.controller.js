var gvLoteLine;
var gvindex;
var userId,
	gvUname = null;
var gvIntid = -1;
var DelNotesList = [];
var gvObject,
	gvObjectPath,
	gvLifnr;

var comboBoxHdr,
	comboBoxBdy;

var BapiErrors = [],
	arrayOfEntities = [],
	executePress = false;

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/ButtonType",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Device, MessageBox, MessageToast, Fragment, Dialog, Button, ButtonType, Sorter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("PR01_SA01.PR01_SA01.controller.View_SA", {
		onInit: function () {

			var itemTemplate = new sap.ui.core.ListItem(); //  creating a ListItem object                  
			itemTemplate.bindProperty("key", "Grund"); //  bind for the "text" property a certain path from the model
			itemTemplate.bindProperty("text", "Grtxt");
			itemTemplate.bindProperty("additionalText", "Grund");

			comboBoxHdr = new sap.m.ComboBox({
				placeholder: "Tipo de incidencia",
				showSecondaryValues: true
			}); // create the ComboBox
			comboBoxHdr.bindItems({
				path: "/items",
				template: itemTemplate,
				templateShareable: true
			});

			var itemTemplate2 = new sap.ui.core.ListItem(); //  creating a ListItem object                  
			itemTemplate2.bindProperty("key", "Bsgru"); //  bind for the "text" property a certain path from the model
			itemTemplate2.bindProperty("text", "Bezei");
			itemTemplate2.bindProperty("additionalText", "Bsgru");

			comboBoxBdy = new sap.m.ComboBox({
				placeholder: "Tipo de incidencia",
				showSecondaryValues: true
			}); // create the ComboBox
			comboBoxBdy.bindItems({
				path: "/items",
				template: itemTemplate2,
				templateShareable: true
			});

			var url = "/sap/opu/odata/sap/ZPPG_PR01_SA01_SRV/";
			var oData2 = new sap.ui.model.odata.v2.ODataModel(url);

			var model2 = new sap.ui.model.json.JSONModel();
			var model3 = new sap.ui.model.json.JSONModel();

			oData2.read("/ZPPH_PR01_SA01_GRUNDSet", {
				success: function (oData, oResponse) {

					model2.setData({
						items: oData.results
					});

					comboBoxHdr.setModel(model2);
				}
			});

			oData2.read("/ZPPH_PR01_SA01_BSGRUSet", {
				success: function (oData, oResponse) {

					model3.setData({
						items: oData.results
					});

					comboBoxBdy.setModel(model3);
				}
			});

			sap.ui.getCore().getConfiguration().setLanguage("es-ES");
			//	var x = {!$User.Id}; 
			userId = Math.floor(Math.random() * 1000000); //Id to store the data in case the same user is being used in multiple sessions.
			//this.getView().byId("useridSmartLow").mAggregations.defaultFilterValues[0].setProperty("low", userId); //setProperty("low", userId); 
			// this.getView().byId("counterSmartLow").setProperty("low", gvcounter); 
			var oSmtFilter = this.getView().byId("smartFilterBar");
			//var oSelect = oSmtFilter.getControlByKey("Userid");
			this.getView().getModel().setDeferredGroups(["group1", "group2"]);
			//	var inModel = new sap.ui.model.json.JSONModel();
			//	inModel.loadData("/sap/opu/odata/sap/ZPR01_SA01_SRV/zpr01_sa01Set?$format=json", "", false);
			/*	 sap.ui.getCore().setModel(inModel);
				 this.getView().setModel(inModel);
				 this.getView().bindElement("/");
				 var data = this.getView().getModel().getData();
				 this.getView().getModel().setData(data);
				 this.getView().getModel().refresh();*/

			// Keeps reference to any of the created sap.m.ViewSettingsDialog-s in this sample
			this._mViewSettingsDialogs = {};

			var drsf = this.getView().byId("DR_SF");

			var tbl = this.getView().byId("tableSA");
			//tbl.setModel(inModel);
			//	var smartFilterBar = this.getView().byId("smartFilterBar");  // get the filter bar instance

			//var fieldWerks = smartFilterBar.getControlByKey("Werks"); // get the field (FieldName is the name of the field in Metadata)
			//debugger;
			//fieldWerks.setValue("G896");

			/*	var inModel = new sap.ui.model.json.JSONModel();
				inModel.loadData("/sap/opu/odata/sap/ZPR01_SA01_SRV/zpr01_sa01Set?$format=json", "", false);
				var data = inModel.getData();
				this.getView().setModel(inModel); */

			// disable checkboxes
			/*        var tabmod = this.getView().byId("TreeTable").getModel("nodeModel");
			        var header = tbl.$().find('thead');
			        var selectAllCb = header.find('.sapMCb');
			        selectAllCb.remove();
			        var x = tbl.getRows();*/

			tbl.addDelegate({
				onAfterRendering: function () {

					var header = this.$().find('thead');

					//	$("th.sapMListTblSelCol").addClass("sapUiTableCellInner");
					//	$("th.sapMListTblSelCol").append("<p>OK</p>");
					//	$(".sapMListTblCell").animate({left: '250px'});

					/*$(".sapMCbBg").on("click", function() {	
						$(".sapMCbBg").remove();
						$(".sapMCbBg").append("<p>&#9786;</p>"); 
						
					});*/

					var selectAllCb = header.find('.sapMCb');
					selectAllCb.remove();

					//var markup = "<input type='checkbox' name='record'>";
					//selectAllCb.append(markup);
					/*this.getRows().forEach(function (r) {
						var obj = r.getBindingContext("nodeModel").getObject();
						var oparentnode = obj.parentnode;
						var cb = r.$().find('.sapMCb');
						var x = cb.context.id;
						
						//var oCb = sap.ui.getCore().byId(cb.attr('id'));
						var oCb = sap.ui.getCore().byId(x);
						if (oparentnode == 0) {
							debugger;
							oCb.setVisible(false);
						}
					});*/
				}
			}, tbl);

			/*        tbl.getItems().forEach(function(r) {
			          var obj = r.getBindingContext().getObject();
			          var oStatus = obj.Status;
			          var cb = r.$().find('.sapMCb');
			          var oCb = sap.ui.getCore().byId(cb.attr('id'));
			          if (oStatus == "Discontinued") {
			            oCb.setEnabled(false);
			          }
			        });*/

		},

		onAfterRendering: function () {
			// Stick the toolbar and header of the smart table to top.
			var oTable = this.byId("tableSA");

			oTable.onAfterRendering = function () {
				this.getDelnotes(oTable);
				$("#container-PR01_SA01---View_SA--smartFilterBar-btnFilters").remove();

				/*var oToolbar = this.byId("stickyToolbar"),
						oParent = oToolbar.$().parent();
					if (oParent) {
						oParent.addClass("stickyToolbar");
					}*/

			}.bind(this);
		},

		//Create the View Settings Dialog (for filtering and ordering)
		createViewSettingsDialog: function (sDialogFragmentName) {
			var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];
			//		if (this._oDialog) {
			//			this._oDialog.destroy();
			//		}
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(sDialogFragmentName, this);
				this._mViewSettingsDialogs[sDialogFragmentName] = oDialog;
				if (Device.system.desktop) {
					oDialog.addStyleClass("sapUiSizeCompact");
				}
			}
			return oDialog;
		},

		/* HEADER BUTTONS */
		onBeforeRebind: function (oEvent) {
			var mBindingParams = oEvent.getParameter("bindingParams");
			var oSmtFilter = this.getView().byId("smartFilterBar");
			var oSelect = oSmtFilter.getControlByKey("Userid");
			var oSelect2 = oSmtFilter.getControlByKey("Intid");
			var oSelect3 = oSmtFilter.getControlByKey("Eindt");
			//var date1 = oSelect3.getDateValue();
			var date1 = oSelect3.getValue();
			var aFilters = oSmtFilter.getFilters();
			var FilterData = oSmtFilter.getFilterData();
			//add userId and Intid to the filters
			var newFilter = new sap.ui.model.Filter("Userid", sap.ui.model.FilterOperator.EQ, userId);
			mBindingParams.filters.push(newFilter);
			newFilter = new sap.ui.model.Filter("Intid", sap.ui.model.FilterOperator.EQ, gvIntid);
			mBindingParams.filters.push(newFilter);
			//newFilter = new sap.ui.model.Filter("Eindt", sap.ui.model.FilterOperator.EQ, date1);
			//mBindingParams.filters.push(newFilter);
			gvIntid = gvIntid + 1;
			$("#container-PR01_SA01---View_SA--smartFilterBar-btnFilters").remove();
		},

		onTableInit: function (oEvent) {},

		onSmartFilterBarInit: function (oEvent) {
			$("#container-PR01_SA01---View_SA--smartFilterBar-btnFilters").remove();
			//var header = this.$().find('.sapUiCompFilterBarToolbar');
			//header.find("#container-PR01_SA01---View_SA--smartFilterBar-btnFilters").hide();
			var self = this;

			var url = "/sap/opu/odata/sap/ZPPG_PR01_SA01_SRV/";
			var oData2 = new sap.ui.model.odata.v2.ODataModel(url);
			var smartFilterBar = this.getView().byId("smartFilterBar"); // get the filter bar instance
			var field = smartFilterBar.getControlByKey("Eindt"); // get the field (FieldName is the name of the field in Metadata)
			var field2 = smartFilterBar.getControlByKey("Werks"); // get the field (FieldName is the name of the field in Metadata)

			/*	var oTodaysDate = new Date();
			var oJsonFilter = new sap.ui.model.json.JSONModel();
			oJsonFilter = {
				SomeDate: { //DateRange field with filter-restriction="interval"
                                  low: oTodaysDate, //Date fields require JavaScript Date objects!
                                  high: oTodaysDate
                           },
			};*/
			//	smartFilterBar.setFilterData(oJsonFilter, true);
			oData2.read("/ZPPH_PR01_SA01_WERKSSet", {
				success: function (oData, response) {
					//Set the first center to the default if just one is received
					if (oData.results.length == 1) {
						field2.setValue(oData.results[0].Werks);
						field2.setEditable(false);
					}
				}
			});

			var dateToday = new Date();
			dateToday.setHours(12);
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd/MM/YYYY"
			});
			var dateToday2 = dateFormat.format(dateToday);
			//field.setValue(dateToday.toISOString());
			var x = smartFilterBar.getFilters();
			var FilterData = smartFilterBar.getFilterData();
			//field.setValue(dateToday);
			//smartFilterBar.fireChange();
			//$("#container-PR01_SA01---View_SA--smartFilterBar-btnFilters").hide();

		},

		updateFilterIntid: function () {
			var oTableFiltered = this.byId("tableSA"),
				oFilterBinding = oTableFiltered.getBinding("items"),
				aFiltersBind = [];
			gvIntid = gvIntid + 1;

			//	var newFilter = new sap.ui.model.Filter("Intid", sap.ui.model.FilterOperator.EQ, gvIntid);
			//	oFilterBinding.filters.push(newFilter);
			//	gvIntid = gvIntid + 1;

			for (var i = 0; i < oFilterBinding.aApplicationFilters.length; i++) {
				var filter = oFilterBinding.aApplicationFilters[i];
				if (oFilterBinding.aApplicationFilters[i].sPath == "Intid") {
					oFilterBinding.aApplicationFilters[i].oValue1 = gvIntid;
				}
				//	aFiltersBind.push(filter);
			}
			oFilterBinding.filter(aFiltersBind);
		},

		onIncidenciaPress: function () {
			var drsf = this.getView().byId("DR_SF");

			//Get the items of the table to show them.
			var oTable = this.byId("tableSA").getItems();
			var oTable2 = this.byId("tableSA");
			var oTablemodel = this.byId("tableSA").getModel();
			//		debugger;

			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var dialog = new Dialog({
				title: "Incidencias cabecera",
				type: "Message",
				contentHeight: "50%",
				contentWidth: "45%",
				//	stretch: "{:= ${device>/system/phone}}"
				content: [
					/*new sap.m.Panel("p1", {
						headerText: "Albarán: ID6720190000006",
						expandable: true,
						expanded: true,
						headerToolbar: new sap.m.Toolbar({
							design: sap.m.ToolbarDesign.Transparent,
							content: [new sap.m.Title({
									text: "Albarán: ID6720190000006"
								}),
								new sap.m.ToolbarSpacer(), 
								new sap.m.Button({
									icon: "sap-icon://process",
									press: function () {
										sap.m.MessageToast.show("Sorting-Grouping-Filtering popup will be shown on press.");
									}
								})
							]
						}),
						content: [
							new sap.m.Title({
								text: " Tipo:"
							}),
							new sap.m.HBox("hbox1", {
								items: [
									new sap.m.ComboBox({
										id: "MultiComboBox0",
										placeholder: "Tipo de incidencia",
										width: "auto",
										items: {}
									})
								]
							}),
							new sap.m.Title({
								text: " Comentarios:"
							}),
							new sap.m.TextArea({
								placeholder: "{/placeholder}",
								showExceededText: true,
								editable: true,
								width: "100%",
								growing: true
							})
						]
					})*/
				],

				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: "Grabar",
					enabled: true,
					press: function () {
						dialog.close();
					}
				}),
				endButton: new Button({
					text: "Cancel",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});

			var oNavContainer = new sap.m.NavContainer();
			var contentDelNote = [];
			var oItem = new sap.ui.core.ListItem({
				key: "{Werks}",
				text: "{Werks}"
			});

			var oItemHeaderTemplate2 = new sap.ui.core.ListItem({
				text: "Grund",
				key: "A",
				additionalText: "a"
			});
			//oItemHeaderTemplate2.bindProperty("text", "Werks");
			//Loop all the Delivery Notes and create the dynamic content
			for (var contenti = 0; contenti < DelNotesList.length; contenti++) {
				var panelcont = new sap.m.Panel("p1" + contenti, {
					headerText: "Albarán: " + DelNotesList[contenti][0],
					expandable: true,
					expanded: false,
					headerToolbar: new sap.m.Toolbar({
						design: sap.m.ToolbarDesign.Transparent,
						content: [
							new sap.m.HBox("hboxt0" + contenti, {
								items: [
									new sap.m.VBox("delvbox1" + contenti, {
										items: [
											new sap.m.Title({
												text: ("Albarán: " + DelNotesList[contenti][0])
											}),
											new sap.m.Text({
												text: ("Proveedor: " + DelNotesList[contenti][1])
											})
										]
									})
								]
							}),
							new sap.m.ToolbarSpacer(),
							new sap.m.Button({
								icon: "sap-icon://process",
								press: function () {
									oNavContainer.to(oPage2);
								}
							})
						]
					}),
					content: [
						new sap.m.Title({
							text: " Tipo:"
						}),
						new sap.m.HBox("hbox0" + contenti, {
							//items: 	[comboBoxHdr]
							/*	new sap.m.ComboBox({
									id: "MultiComboBox0" + contenti,
									placeholder: "Tipo de incidencia",
									showSecondaryValues: true,
									width: "auto",
										items: [
											new sap.ui.core.ListItem({
												key: "A1",
												text: "A1",
												additionalText: "Tipo A1"
											}),
											new sap.ui.core.ListItem({
												key: "A2",
												text: "A2",
												additionalText: "Tipo A2"
											})
										]
									
									items: {
										path: "/ZPPH_PR01_SA01_GRUNDSet",
										template: oItemHeaderTemplate2,
										templateShareable: true
									}
								})*/

						}),
						new sap.m.Title({
							text: " Comentarios:"
						}),
						new sap.m.TextArea({
							placeholder: "{/placeholder}",
							showExceededText: true,
							editable: true,
							width: "100%",
							growing: true
						})
					]
				});
				var hboxc = sap.ui.getCore().byId("hbox0" + contenti);
				hboxc.addItem(comboBoxHdr.clone(contenti));
				contentDelNote.push(panelcont);
			}

			var oPage = new sap.m.Page({
				enableScrolling: true,
				showHeader: false,
				/*
								subHeader: new sap.m.Bar({
									contentMiddle: new sap.m.Button({
										text: 'SubHeader Button'
									})
								}),*/
				content: contentDelNote
			});

			var oPage2 = new sap.m.Page({
				enableScrolling: true,
				showHeader: false,
				content: []
			});

			oNavContainer.addPage(oPage);
			oNavContainer.addPage(oPage2);
			oNavContainer.setInitialPage(oPage);
			dialog.addContent(oNavContainer);

			//add dynamically all the items to the corresponding header
			for (var i = 0; i < oTable.length; i++) {

				var oBindingContext = oTable[i].getBindingContext();
				var path = oBindingContext.getPath();
				var selectedRow = oTable2.getModel().getProperty(path);

				var oPanel = new sap.m.Panel(("p2" + i), {
					headerText: "Pedido",
					expandable: true,
					expanded: false,
					headerToolbar: new sap.m.Toolbar({
						design: sap.m.ToolbarDesign.Transparent,
						content: [
							new sap.m.VBox("vbox1" + i, {
								items: [

									new sap.m.Title({
										text: ("Pedido: " + selectedRow.Ebeln)
									}),
									new sap.m.Text({
										text: ("Material: " + oTable[i].getCells()[0].getItems()[1].getValue() + " - " + oTable[i].getCells()[3].getText())
											// text: ("Material: " + oTable[i].getCells()[1].getText() + " - " + oTable[i].getCells()[3].getText())
									})
								]
							}),
							new sap.m.ToolbarSpacer(),
							new sap.m.Button({
								icon: "sap-icon://close-command-field",
								press: function () {
									oNavContainer.back();
								},
								visible: (i == 0) //just show the back button in the initial line
							})
						]
					}),
					content: [
						new sap.m.Title({
							text: " Tipo:"
						}),
						new sap.m.HBox(("hbox1" + i), {
							/*	items: [
									new sap.m.ComboBox({
										id: ("MultiComboBox1" + i),
										placeholder: "Tipo de incidencia",
										showSecondaryValues: true,
										width: "auto"
										items: [
											new sap.ui.core.ListItem({
												key: "B1",
												text: "B1",
												additionalText: "Tipo B1"
											}),
											new sap.ui.core.ListItem({
												key: "B2",
												text: "B2",
												additionalText: "Tipo B2"
											})
										]
									})
								]*/
						}),
						new sap.m.Title({
							text: " Comentarios:"
						}),
						new sap.m.TextArea({
							placeholder: "{/placeholder}",
							showExceededText: true,
							editable: true,
							width: "100%",
							growing: true
						})
					]
				});

				var hboxbdy = sap.ui.getCore().byId("hbox1" + i);
				hboxbdy.addItem(comboBoxBdy.clone(i));
				oPage2.addContent(oPanel);
			}

			dialog.open();

		},

		onCopy: function () {
			this.getView().getModel().setDeferredGroups(["group1"]);
			var self = this;
			var lTable = this.byId("tableSA").getSelectedContexts();
			var oTable = this.byId("tableSA");
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			if (lTable.length === 0) {

				MessageBox.information("Seleccione los ingredientes que desea copiar", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				});
			} else {
				var row;
				for (row = 0; row < lTable.length; row++) {
					var oBindingContext = lTable[row];
					var selectedRow = oTable.getModel().getProperty(oBindingContext.sPath);
					var EdiIcon;

					if (selectedRow.Edico == "1") {
						EdiIcon = new sap.ui.core.Icon({
							src: "sap-icon://circle-task-2",
							color: "#00FF00"
						});
					} else {
						EdiIcon = new sap.ui.core.Icon({
							src: "sap-icon://circle-task-2",
							color: "#FF0000"
						});
					}
					var newRow = new sap.m.ColumnListItem({
						cells: [
							new sap.m.Input({
								value: selectedRow.Matnr,
								change: function (oEvent) {
									self.updateLine(oEvent, oBindingContext);

								}
							}),
							new sap.m.Text({
								text: selectedRow.Idnlf
							}),
							new sap.m.Text({
								text: selectedRow.Cntrl
							}),
							new sap.m.Button({
								text: selectedRow.Maktx,
								type: "Transparent"
							}),
							EdiIcon,
							new sap.m.Input({
								value: selectedRow.Xblnr,
								change: function (oEvent) {
									self.updateLine(oEvent, oBindingContext);

								}
							}),
							new sap.m.Input({
								value: selectedRow.Charg,
								change: function (oEvent) {
									self.updateLine(oEvent, oBindingContext);

								}
							}),
							/*new sap.m.Button({
								text: selectedRow.Charg,
								type: "Transparent"
							}),*/
							/*new sap.m.Text({
								text: (this.addZero(selectedRow.Vfdat.getDate()) + "/" + this.addZero(selectedRow.Vfdat.getMonth() + 1) + "/" +
									selectedRow.Vfdat.getFullYear())
							}),*/
							new sap.m.DatePicker({
								dateValue: selectedRow.Vfdat,
								displayFormat: "dd/MM/yyyy"
									// change: handleChange
							}),
							new sap.m.Button({
								icon: "sap-icon://add"

							}),
							new sap.m.Input({
								value: {
									value: selectedRow.Menge,
									type: "sap.ui.model.type.Float",
									formatOptions: {
										maxFractionDigits: 3,
										roundingMode: "away_from_zero"
									}
								},
								change: function (oEvent) {
									self.updateLine(oEvent, oBindingContext);

								}

								/*value: selectedRow.Menge,
								
											type: "sap.ui.model.type.Float",
											formatOptions: {
												maxFractionDigits: 3,
												roundingMode: "away_from_zero"
											}*/
							}),
							new sap.m.Input({
								value: selectedRow.Meins,
								change: function (oEvent) {
									self.updateLine(oEvent, oBindingContext);

								}
							}),

							new sap.m.Text({
								text: {
									value: selectedRow.Brtwr,
									type: "sap.ui.model.type.Float",
									formatOptions: {
										maxFractionDigits: 2,
										roundingMode: "away_from_zero"
									}
								}
							}),
							new sap.m.CheckBox({})
						]
					});
					//oTable.insertItem(newRow, 0);
					//gvIntid++;
					this.updateFilterIntid();
					this.getView().getModel().create("/ZMMS_PR01_SA01Set", selectedRow, {
						changeSetId: ("changeSetId" + row)
					});

					//oTable.getModel().updateBindings();
					//oTable.getModel().refresh();
				}
				//this.getView().getModel().submitChanges({ groupId: "group1"});
			}

		},
		onDeletePress: function () {

			this.getView().getModel().setDeferredGroups(["group1"]);
			var self = this;
			var lTable = this.byId("tableSA").getSelectedContexts();
			var oTable = this.byId("tableSA");
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			//Check that just copied rows have been selected.
			for (var row = 0; row < lTable.length; row++) {
				var oBindingObject = lTable[row].getObject();
				if (oBindingObject.Parnt == 0) {
					MessageBox.error("Por favor, seleccione sólo entradas nuevas.", {
						title: "Error",
						styleClass: bCompact ? "sapUiSizeCompact" : "",
						contentWidth: "250px"
					});
					return false;
				}
			}
			//Delete entries selected
			for (row = 0; row < lTable.length; row++) {
				var oBindingContext = lTable[row];
				this.getView().getModel().remove(oBindingContext.sPath);
			}
		},

		onSort: function () {
			this.createViewSettingsDialog("PR01_SA01.PR01_SA01.view.SortDialog").open();
		},

		/* TABLE BUTTONS HANDLERS */
		onAddPress: function (oEvent) {
			var oTable = oEvent.getSource().getParent();
			var oObject = oTable.getBindingContext().getObject();
			gvObjectPath = oTable.getBindingContext().sPath;
			gvObject = oObject;
			//Get the view to add the dependency
			var viewSettingsD = this.createViewSettingsDialog("PR01_SA01.PR01_SA01.view.SelloDialog");
			//Once the dependency is added, we can bind the data into the List inside the fragment
			this.getView().addDependent(viewSettingsD);
			var DialogContent = viewSettingsD.getContent()[0].getContent(); //Access the fields inside the dialog
			DialogContent[0].getContent()[1].setValue(parseFloat(oObject.Ztemp).toFixed(2));
			DialogContent[0].getContent()[1].setValueState("None");
			//Aspect Field:
			if (oObject.Zaspc == '1') {
				DialogContent[1].getContent()[1].setPressed(true);
				DialogContent[1].getContent()[2].setPressed(false);
			} else if (oObject.Zaspc == '2') {
				DialogContent[1].getContent()[1].setPressed(false);
				DialogContent[1].getContent()[2].setPressed(true);
			} else {
				DialogContent[1].getContent()[1].setPressed(false);
				DialogContent[1].getContent()[2].setPressed(false);
			}

			//Transport Field:
			if (oObject.Ztran == '1') {
				DialogContent[2].getContent()[1].setPressed(true);
				DialogContent[2].getContent()[2].setPressed(false);
			} else if (oObject.Ztran == '2') {
				DialogContent[2].getContent()[1].setPressed(false);
				DialogContent[2].getContent()[2].setPressed(true);
			} else {
				DialogContent[2].getContent()[1].setPressed(false);
				DialogContent[2].getContent()[2].setPressed(false);
			}

			//Weight Field:
			if (oObject.Zwght == '1') {
				DialogContent[3].getContent()[1].setPressed(true);
				DialogContent[3].getContent()[2].setPressed(false);
			} else if (oObject.Zwght == '2') {
				DialogContent[3].getContent()[1].setPressed(false);
				DialogContent[3].getContent()[2].setPressed(true);
			} else {
				DialogContent[3].getContent()[1].setPressed(false);
				DialogContent[3].getContent()[2].setPressed(false);
			}

			//Calibre Field:
			if (oObject.Zclbr == '1') {
				DialogContent[4].getContent()[1].setPressed(true);
				DialogContent[4].getContent()[2].setPressed(false);
			} else if (oObject.Zclbr == '2') {
				DialogContent[4].getContent()[1].setPressed(false);
				DialogContent[4].getContent()[2].setPressed(true);
			} else {
				DialogContent[4].getContent()[1].setPressed(false);
				DialogContent[4].getContent()[2].setPressed(false);
			}

			//Hide cancel button
			/* eslint-disable sap-no-ui5base-prop */
			//	viewSettingsD._dialog.mAggregations.endButton.setVisible(false);
			/* eslint-enable sap-no-ui5base-prop */
			viewSettingsD.open();
		},

		onBatchPress: function (oEvent) {
			var oButton = oEvent.getSource(); //Button in the row
			// Get binding context of the button to identify the row where the event is originated
			var oBindingContext = oButton.getBindingContext();
			var oBindingObject = oBindingContext.getObject();
			gvLoteLine = oBindingObject;
			var oItem = oEvent.getSource().getParent(); //Get the Item
			var mainTable = this.getView().byId("tableSA");
			gvindex = mainTable.indexOfItem(oItem); //Store globally the index of the row.

			//Get the view to add the dependency
			var viewSettingsD = this.createViewSettingsDialog("PR01_SA01.PR01_SA01.view.BatchDialog");
			//Once the dependency is added, we can bind the data into the List inside the fragment
			this.getView().addDependent(viewSettingsD);
			sap.ui.getCore().byId("BatchLabel").setText(oBindingObject.Maktx);
			sap.ui.getCore().byId("inputMatnr").setValue(oBindingObject.Idnlf);
			sap.ui.getCore().byId("inputQuantity").setValue(oBindingObject.Menge);
			sap.ui.getCore().byId("inputUm").setValue(oBindingObject.Meins);
			sap.ui.getCore().byId("DP2").setDateValue(oBindingObject.Vfdat);
			sap.ui.getCore().byId("inputBatch").setValue(oBindingObject.Charg);

			viewSettingsD.open();
		},

		onMatnrPress: function (oEvent) {
			var oButton = oEvent.getSource(); //Button in the row
			// Get binding context of the button to identify the row where the event is originated
			var oBindingContext = oButton.getBindingContext();
			var oBindingObject = oBindingContext.getObject();
			var mssg_info = ("Ingrediente: " + oBindingObject.Matnr + " " + oBindingObject.Maktx);

			var url = "/sap/opu/odata/sap/ZPPG_PR01_SA01_SRV/";
			var oData2 = new sap.ui.model.odata.ODataModel(url);
			var strx = ("/ZPPS_PR01_SA01_SUB_DETSet(Werks='" + oBindingObject.Werks + "',Matnr='" + oBindingObject.Matnr + "')"); //+"/?$expand=YourChild");
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var oGlobalBusyDialog = new sap.m.BusyDialog();
			oGlobalBusyDialog.open();

			oData2.read(strx, {
					success: function (oData, oResponse) {
						oGlobalBusyDialog.close();
						var mssg_info2 = ("\n\nSubingredientes: " + oData.Subing + "\nAlérgenos: " + oData.Allerg);
						MessageBox.information(mssg_info + mssg_info2, {
							title: "Listado de subingredientes y alérgenos",
							id: "messageBoxId2",
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						});
					},
					error: function (err) {
						oGlobalBusyDialog.close();
						sap.m.MessageBox.error("No se encontraron datos.");
					}
				}

			);

		},

		onUmDetailPress: function (oEvent) {
			var oButton = oEvent.getSource(); //Button in the row
			// Get binding context of the button to identify the row where the event is originated
			var oBindingContext = oButton.getBindingContext();
			var oBindingObject = oBindingContext.getObject();
			var mssg_info = oBindingObject.Msehl;
			if (mssg_info == ""){
				mssg_info = "Sin descripción";
			}

			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.information(mssg_info, {
				title: "Unidad de medida",
				id: "messageBoxId2",
				styleClass: bCompact ? "sapUiSizeCompact" : ""
			});
		},

		/* DIALOG BUTTONS HANDLERS */
		onSaveSello: function (oEvent) {
			var screenContent = oEvent.getSource().getParent().getContent()[0].getContent();
			gvObject.Ztemp = parseFloat(screenContent[0].getContent()[1].getValue());
			gvObject.Zaspc = screenContent[1].getContent()[3].getText();
			gvObject.Ztran = screenContent[2].getContent()[3].getText();
			gvObject.Zwght = screenContent[3].getContent()[3].getText();
			gvObject.Zclbr = screenContent[4].getContent()[3].getText();
			this._mViewSettingsDialogs["PR01_SA01.PR01_SA01.view.SelloDialog"].close();

			this.updateFilterIntid();
			this.getView().getModel().update(gvObjectPath, gvObject, {
				error: function (err) {
					gvObject = null;
					gvObjectPath = null;
					if (err.statusCode === '410') sap.m.MessageBox.error(JSON.parse(err.responseText)["error"]["message"]["value"]);
				}
			});

			gvObject = null;
			gvObjectPath = null;
			var msg = "Saved successfully";
			MessageToast.show(msg);
			//	this._mViewSettingsDialogs["PR01_SA01.PR01_SA01.view.SelloDialog"].destroy();
		},

		onCloseSello: function () {
			this._mViewSettingsDialogs["PR01_SA01.PR01_SA01.view.SelloDialog"].close();
			//	this._mViewSettingsDialogs["PR01_SA01.PR01_SA01.view.SelloDialog"].destroy();
		},

		onSaveBatch: function (oEvent) {
			var msg = "Saved successfully";
			MessageToast.show(msg);
			this._mViewSettingsDialogs["PR01_SA01.PR01_SA01.view.BatchDialog"].close();
			//	this._mViewSettingsDialogs["PR01_SA01.PR01_SA01.view.SelloDialog"].destroy();
		},

		onIncidenciaBatch: function (oEvent) {},

		onNuevoLotePress: function (oEvent) {
			var idHL = "HorizontalLayout";
			var idparam = "inputHidden";
			var visible = true;

			if (oEvent.getSource().getPressed()) {
				visible = true;
			} else {
				visible = false;
			}

			for (var i = 0; i < 4; i++) {
				//Make visible all the Horizontal Layouts and hidden parameters
				sap.ui.getCore().byId(idHL + i).setVisible(visible);
				sap.ui.getCore().byId(idparam + i + i).setVisible(visible); //The ID's of the labels are with the identifyier repeated.
				sap.ui.getCore().byId(idparam + i).setVisible(visible);
			}
			sap.ui.getCore().byId("buttonAddLote").setVisible(visible);
		},

		onAddLotePress: function (oEvent) {
			var self = this;
			var oTable = this.getView().byId("tableSA");

			//Determine the color of the EDI icon
			var colorBtn;
			if (gvLoteLine.Edico == '0') {
				colorBtn = "#FF0000";
			} else {
				colorBtn = "#00FF00";
			}

			var newRow = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Text({
						text: gvLoteLine.Idnlf
					}),
					new sap.m.Text({
						text: gvLoteLine.Cntrl
					}),
					new sap.m.Button({
						text: gvLoteLine.Maktx,
						type: "Transparent",
						width: "auto",
						press: function () {
							self.onMatnrPress(oEvent);
						}
					}),
					new sap.ui.core.Icon({
						src: "sap-icon://circle-task-2",
						color: colorBtn
					}),
					new sap.m.Text({
						text: gvLoteLine.Xblnr
					}),
					new sap.m.Button({
						text: gvLoteLine.Charg,
						type: "Transparent",
						width: "auto",
						press: function () {
							self.onBatchPress(oEvent);
						}
					}),
					new sap.m.Text({
						text: {
							value: gvLoteLine.Vfdat,
							type: "sap.ui.model.type.Date",
							formatOptions: {
								pattern: 'dd/MM/yyyy'
							}
						}
					}),
					new sap.m.Button({
						icon: "sap-icon://add",
						type: "Default",
						width: "auto",
						press: function () {
							self.onAddPress(oEvent);
						}
					}),
					new sap.m.Input({
						value: gvLoteLine.Menge
					}),
					new sap.m.Text({
						text: gvLoteLine.Meins
					}),
					new sap.m.Text({
						text: {
							value: gvLoteLine.Brtwr,
							type: "sap.ui.model.type.Float",
							formatOptions: {
								maxFractionDigits: 2,
								roundingMode: "away_from_zero"
							}
						}
					}),
					new sap.m.CheckBox({
						visible: true
					})
				]
			});

			//Create the new row
			oTable.addItem(newRow);
			//	sap.ui.getCore().getModel().getProperty("/d/results").push(gvLoteLine);
			/*var attModel = sap.ui.getCore().getModel();
			attModel.getProperty("/d/results").push(gvLoteLine);
			var x = this.getView().getModel().refresh();*/
			//this.getView().setModel(attModel);
			//oTable.bindRows("/");
			//oTable.insertItem(newRow, gvindex + 1);
			//oTable.setModel(sap.ui.getCore().getModel());

			//this.getView().getModel().create("/zpr01_sa01Set", gvLoteLine, null);
			this.updateFilterIntid();

			//oTable.getModel().refresh();
			//oTable.getModel().updateBindings();

		},

		onCloseBatch: function () {
			this._mViewSettingsDialogs["PR01_SA01.PR01_SA01.view.BatchDialog"].close();
			//	this._mViewSettingsDialogs["PR01_SA01.PR01_SA01.view.SelloDialog"].destroy();
		},

		handleSortDialogConfirm: function (oEvent) {

			var oTable = this.byId("tableSA"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath, bDescending, aSorters = [];
			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));
			// apply the selected sort and group settings
			oBinding.sort(aSorters);
			MessageToast.show("Sorted");
		},

		/* UTILS FUNCTIONS */
		addZero: function (i) {
			if (i < 10) {
				i = "0" + i;
			}
			return i;
		},

		updateLine: function (oEvent, oBindingContext) {
			var oTable = this.byId("tableSA");
			var originalRow = false;
			//if the change is done on an initial row, we must redefine the BindingContext.
			if (typeof oBindingContext == "undefined") {
				oBindingContext = oEvent.getSource().getBindingContext();
				originalRow = true;
			}

			var path = oBindingContext.getPath();
			var selectedRow = oTable.getModel().getProperty(path);
			if (typeof (oEvent.getSource().getParent().getCells) == "function") {
				var lineCells = oEvent.getSource().getParent().getCells();
			} else {
				var lineCells = oEvent.getSource().getParent().getParent().getCells();
			}
			//Update the row to send it.
			/*			if (originalRow === false) {
							//selectedRow.Matnr = lineCells[0].getValue();
							selectedRow.Matnr = lineCells[0].getItems()[1].getValue();
						} else {
							selectedRow.Matnr = lineCells[0].getItems()[0].getText();
						}*/
			selectedRow.Matnr = lineCells[0].getItems()[1].getValue();
			selectedRow.Xblnr = lineCells[6].getValue();
			selectedRow.Charg = lineCells[7].getValue();
			selectedRow.Vfdat = lineCells[8].getDateValue();
			//selectedRow.Menge = parseFloat(lineCells[10].getValue());
			selectedRow.Menge = lineCells[10].getValue();
			// selectedRow.Meins = lineCells[11].getValue();
			if (lineCells[13].getSelected() == true) {
				selectedRow.NoOk = 'X';
				oEvent.getSource().getParent().setSelected(true);

			} else {
				selectedRow.NoOk = '';
			}
			//selectedRow.Eindt.setHours(12);
			if (selectedRow.Vfdat !== null) {
				selectedRow.Vfdat.setHours(12);
			}
			gvIntid = gvIntid + 1;
			// this.getView().getModel().update(oBindingContext.sPath, selectedRow, null, function () {
			this.updateFilterIntid();
			this.getView().getModel().update(oBindingContext.sPath, selectedRow, {
				error: function (err) {
					if (err.statusCode === '410') sap.m.MessageBox.error(JSON.parse(err.responseText)["error"]["message"]["value"]);
				}
			});
			//this.getView().getModel().create(oBindingContext.sPath, selectedRow, null);
		},

		onCataOkPress: function (oEvent) {
			var ToggleButtons = oEvent.getSource().getParent().getContent();
			var isPressed = oEvent.getSource().getPressed();
			var id = oEvent.getSource().getId();
			if (isPressed == false) { //If we unpress the button, we store a zero.
				ToggleButtons[3].setText("0");
			} else { //We set dynamically the value to the Label 3
				for (var i = 0; i < ToggleButtons.length; i++) {
					if (ToggleButtons[i].getId() == id) {
						ToggleButtons[3].setText(i);
					}
				}
			}
			//Unpress both buttons
			ToggleButtons[1].setPressed(false);
			ToggleButtons[2].setPressed(false);
			oEvent.getSource().setPressed(isPressed);
		},

		onTempLiveChange: function (oEvent) {
			var value = parseFloat(oEvent.getSource().getValue());
			var maxT = parseFloat(gvObject.TempMax);
			var minT = parseFloat(gvObject.TempMin);

			//if we have values setted and not are both zero
			if (maxT != minT || maxT != 0) {

				if (value <= maxT && value >= minT) {
					oEvent.getSource().setValueState("Success");
					sap.ui.getCore().byId("SelloSaveBttn").setEnabled(true);
				} else {
					oEvent.getSource().setValueState("Error");
					oEvent.getSource().setValueStateText("La temperatura debe estar entre " + minT + " y " + maxT + "ºC");
					sap.ui.getCore().byId("SelloSaveBttn").setEnabled(false);
				}
			}
			// var valueState = isNaN(value) ? "Warning" : value > 3 ? "Warning" : "Success";
			// oEvent.getSource().setValueState(valueState);
		},

		getDelnotes: function (otable) {
			//var oTableItems2 = this.byId("tableSA").getItems();
			var oTableItems = otable.getItems();
			// var oTableBinding = this.byId("tableSA").getBinding("items").getModel(); //.oData;
			//var oTableBinding = oTableItems.getModel(); //.oData;

			//var x = oTableBinding[0];
			//var x = oTableBinding[0].getContext();
			//var oTableContexts = this.byId("tableSA").getContexts();
			for (var i = 0; i < oTableItems.length; i++) {
				//var selectedRow = oTable.getModel().getProperty(oBindingContext.sPath);

				//If its not a red Edi item
				//	if (oTableItems[i].getCells()[4].getColor() != "#FF0000") {
				var delNoteNum = oTableItems[i].getCells()[6].getValue();
				var lineItem = oTableItems[i].getBindingContext().getObject().Name1;
				var delNote = [delNoteNum, lineItem];
				//Add the item to the list if we don't have it.
				if (DelNotesList.indexOf(delNote) === -1) {
					DelNotesList.push(delNote);
				}
				//	}
			}
		},

		onEjecutar: function (oEvent) {
			var self = this;
			this.updateFilterIntid();
			BapiErrors = [];
			var lTable = this.byId("tableSA").getSelectedContexts();
			var TableItems = this.byId("tableSA").getSelectedItems();
			//Check if all fields have been filled.
			for (var h = 0; h < lTable.length; h++) {
				//Check if table has all the fields filled.
				if (this.checkTableRow(lTable[h]) === false) return;
			}
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			if (lTable.length === 0) {

				MessageBox.information("Seleccione almenos una recepción.", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				});

			} else {
				//Store SAP Username.
				if (gvUname === null) {
					var x = lTable[0].getObject();
					gvUname = lTable[0].getObject().Bname;
				}
				if (this._oDialog) {
					this._oDialog.destroy();
				}

				this.getView().getModel().attachBatchRequestCompleted(function (oEvent2) {
					if (executePress == true) {
						executePress = false;
						if (BapiErrors.length == 0) {
							MessageBox.success("Se ha realizado la recepci\xF3n de las entradas seleccionadas.", {
								styleClass: bCompact ? "sapUiSizeCompact" : ""
							});
						} else {
							//var details2 = BapiErrors.join('\n');
							var details2 = "";
							BapiErrors.forEach(function (errormssg) {
								details2 = details2 + errormssg;
							});
							BapiErrors = [];
							MessageBox.error("No se pudieron ejecutar todas las entradas.", {
								title: "Error",
								//id: "messageBoxId2",
								details: details2,
								styleClass: bCompact ? "sapUiSizeCompact" : "",
								contentWidth: "250px"
							});
						}
					}
				});

				var dialogname = new Dialog({
					title: 'Nombre del usuario',
					type: 'Message',
					content: [
						new sap.m.Input('submitDialogTextarea', {
							value: gvUname,
							liveChange: function (oEvent2) {
								var regEx = /[^A-Za-z0-9._]+/;
								var sText = oEvent2.getParameter('value');
								var parent = oEvent2.getSource().getParent();

								parent.getBeginButton().setEnabled(sText.length > 0 && sText.length < 13 && !sText.match(regEx));
								if (sText.length >= 13) {
									oEvent2.getSource().setValueState("Error");
									oEvent2.getSource().setValueStateText("Nombre de usuario demasiado largo");
								} else if (sText.match(regEx)) {
									oEvent2.getSource().setValueState("Error");
									oEvent2.getSource().setValueStateText("Carácteres no válidos.");
								} else {
									oEvent2.getSource().setValueState("None");
								}
							},
							width: '100%',
							placeholder: 'Introduzca un usuario (obligatorio)'
						})
					],
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: 'Aceptar',
						enabled: true,
						press: function () {

							gvUname = sap.ui.getCore().byId('submitDialogTextarea').getValue();
							dialogname.close();
							executePress = true; //to count the executions

							for (var i = 0; i < lTable.length; i++) {
								var oBindingObject = lTable[i].getObject();
								oBindingObject.Perma = "1";
								if (oBindingObject.Xblnr != "") {
									var oEntry = self.getView().getModel().createEntry("/ZMMS_PR01_SA01Set", {
										groupId: "group1",
										changeSetId: ("cs" + i),
										properties: oBindingObject,
										error: function (err) {
											if (err.statusCode === '410') {
												var errorcatched = JSON.parse(err.responseText)["error"]["message"]["value"];
												//If the error is not repeated, add it
												if (BapiErrors.indexOf(errorcatched) == -1) BapiErrors.push(errorcatched);
											} else if (err.statusCode == '504') {
												var errorcatched = "Connection timeout.";
												if (BapiErrors.indexOf(errorcatched) == -1) BapiErrors.push(errorcatched);
											} else {
												var errorcatched = "Error(es) desconocido(s).";
												if (BapiErrors.indexOf(errorcatched) == -1) BapiErrors.push(errorcatched);
											}
										},
										success: function (succ) {}
									});
									arrayOfEntities.push(oEntry);
								} else {
									var errorcatched = ("<strong> " + oBindingObject.Matnr + "</strong><ul><li> El albarán debe estar informado. </li></ul>");
									if (BapiErrors.indexOf(errorcatched) == -1) BapiErrors.push(errorcatched);
								}

							}

							self.getView().getModel().submitChanges({
								groupId: "group1"
							});
							for (var curr = 0; curr < arrayOfEntities.length; curr++) {
								try {
									self.getView().getModel().deleteCreatedEntry(arrayOfEntities[curr]);
								} catch (e) {}
							}
							arrayOfEntities = [];
						}
					}),
					endButton: new Button({
						text: 'Cancelar',
						press: function () {
							dialogname.close();
						}
					}),
					afterClose: function () {
						dialogname.destroy();
					}
				});

				dialogname.open();
			}
		},

		onRecuperar: function (oEvent) {
			gvIntid = -2;
			var url = "/sap/opu/odata/sap/ZPPG_PR01_SA01_SRV/";
			var oData2 = new sap.ui.model.odata.v2.ODataModel(url);

			var model2 = new sap.ui.model.json.JSONModel();
			var oFilter = new Filter("Intid", sap.ui.model.FilterOperator.StartsWith, gvIntid);
			
			oData2.read("/ZMMS_PR01_SA01Set", {
				filters: [oFilter],
				success: function (oData, oResponse) {

					model2.setData({
						items: oData.results
					});

					comboBoxHdr.setModel(model2);
				}
			});	
			gvIntid = 0;
		},
		
		onSearchSmart: function (oEvent) {
			gvIntid = -1;
		},

		handleValueHelp: function (oEvent) {
			gvLifnr = "";
			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			//if (!this._valueHelpDialog) {
			this._valueHelpDialog = sap.ui.xmlfragment("PR01_SA01.PR01_SA01.view.DialogHelpMatnr", this);
			this.getView().addDependent(this._valueHelpDialog);
			//	}
			//We need to send the LIFNR also as a filter, so we get the row info:
			var productInput = this.byId(this.inputId);
			var tableRow = productInput.getParent().getParent();
			var oBindingContext = tableRow.getBindingContext();
			var selectedRow = tableRow.getModel().getProperty(oBindingContext.getPath());
			gvLifnr = selectedRow.Lifnr;
			// create a filter for the binding
			this._valueHelpDialog.getBinding("items").filter([new Filter("Matnr", sap.ui.model.FilterOperator.StartsWith, sInputValue), new Filter(
				"Lifnr", sap.ui.model.FilterOperator.StartsWith, selectedRow.Lifnr)]);
			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
		},
		_handleValueHelpSearch: function (evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter("Matnr", sap.ui.model.FilterOperator.StartsWith, sValue);
			evt.getSource().getBinding("items").filter([oFilter, new Filter("Lifnr", sap.ui.model.FilterOperator.StartsWith, gvLifnr)]);
		},
		_handleValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
				var tableRow = productInput.getParent().getParent();
				var oBindingContext = tableRow.getBindingContext();

				var path = oBindingContext.getPath();
				var selectedRow = tableRow.getModel().getProperty(path);
				selectedRow.Matnr = oSelectedItem.getTitle();

				//Update the value in backend.
				this.getView().getModel().update(oBindingContext.sPath, selectedRow, {
					error: function (err) {
						if (err.statusCode === '410') sap.m.MessageBox.error(JSON.parse(err.responseText)["error"]["message"]["value"]);
					}
				});
			}
			evt.getSource().getBinding("items").filter([]);
		},

		checkTableRow: function (tableLine) {
			//Chek if all the fields have been informed.
			var lineData = tableLine.getObject();
			var FieldsToFill = [];
			var smthng = false;
			FieldsToFill.push("<strong> " + lineData.Matnr + "</strong>");
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var maxT = parseFloat(lineData.TempMax);
			var minT = parseFloat(lineData.TempMin);
			var Temp = parseFloat(lineData.Ztemp);

			//if we have values setted and not are both zero
			if (maxT != minT || maxT != 0) {
				if (!(Temp >= minT && Temp <= maxT)) {
					smthng = true;
					FieldsToFill.push("<li> La temperatura debe estar dentro del rango especificado. </li>");
				}
			}

			if (lineData.Xblnr == "" || lineData.Xblnr === null) {
				smthng = true;
				FieldsToFill.push("<li> El albarán debe estar informado. </li>");

			}
			if (lineData.Charg == "" || lineData.Charg === null) {
				smthng = true;
				FieldsToFill.push("<li> El lote de proveedor debe estar informado. </li>");

			}
			if (lineData.Vfdat == "" || lineData.Vfdat === null) {
				smthng = true;
				FieldsToFill.push("<li> Es necesario especificar una fecha de caducidad. </li>");

			}
			if (lineData.Menge == "" || lineData.Menge === null) {
				smthng = true;
				FieldsToFill.push("<li> Introduzca una cantidad. </li>");

			}
			if (lineData.Meins == "" || lineData.Meins === null) {
				smthng = true;
				FieldsToFill.push("<li> Introduzca una unidad de medida. </li>");
			}

			if (smthng === true) {
				FieldsToFill.push("</ul>");
				var message = "";
				FieldsToFill.forEach(function (errormssg) {
					message = message + errormssg;
				});

				MessageBox.error("Por favor, introduzca todos los campos.", {
					title: "Error",
					details: message,
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					contentWidth: "250px"
				});
				return false;

			} else return true;
		},

		onMedida: function (oEvent) {
			var lTable = this.byId("tableSA").getSelectedContexts();
			if (lTable.length === -1) {
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.information("Seleccione los ingredientes a cambiar la UM.", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				});

			} else {
				if (this._oDialog) {
					this._oDialog.destroy();
				}

				var oButton = oEvent.getSource();
				//	if (!this._oDialog) {
				Fragment.load({
					name: "PR01_SA01.PR01_SA01.view.UMDialog",
					controller: this
				}).then(function (oDialog) {
					this._oDialog = oDialog;
					this._oDialog.setModel(this.getView().getModel());
					this._configDialog(oButton);
					this._oDialog.setGrowing(true);
					this._oDialog.open();
				}.bind(this));
				//	} else {
				//		this._configDialog(oButton);
				//		this._oDialog.open();
				//	}
			}
		},
		_configDialog: function (oButton) {
			var sCustomConfirmButtonText = oButton.data("confirmButtonText");
			try {
				this._oDialog.setConfirmButtonText(sCustomConfirmButtonText);
			} catch (e) {}
			// clear the old search filter
			this._oDialog.getBinding("items").filter([]);
			// Set growing property
			var bGrowing = oButton.data("growing");
			this._oDialog.setGrowing(bGrowing === "true");
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
		},
		handleUMSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			// var oFilter = new Filter("Msehl", FilterOperator.StartsWith, sValue);
			var oFilter = new Filter("Msehl", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
			oBinding.refresh(true);
		},
		handleUMClose: function (oEvent) {
			this.updateFilterIntid();
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {
				var lvunit = aContexts.map(function (oContext) {
					return oContext.getObject().Mseh3;
				}).join(", ");
				//	MessageToast.show("You have chosen " + lvunit);
				//Modificamos los elementos de la tabla seleccionados
				var lTable = this.byId("tableSA").getSelectedContexts();
				if (lTable.length === 0) {
					MessageToast.show("Seleccione los ingredientes que desea determinar la UM");
				} else {
					var row;
					for (row = 0; row < lTable.length; row++) {
						var oBindingObject = lTable[row].getObject();
						oBindingObject.Meins = lvunit;
						//m.setProperty(lTable[row].getPath() + "/Meins", lvunit);
						//	var bindingObj = m.getContext().getObject();
						this.getView().getModel().update(lTable[row].getPath(), oBindingObject, {
							error: function (err) {
								//sap.m.MessageBox.error($(err.response.body).find('message').first().text());
								if (err.statusCode === '410') {
									sap.m.MessageBox.error(JSON.parse(err.responseText)["error"]["message"]["value"]);
									//oItem.getCells()[6].setValue(""); //Clear the value
								}
							}
						});

						//this.updateFilterIntid();
					}
				}
			} else {
				MessageToast.show("No new item was selected.");
			}
			oEvent.getSource().getBinding("items").filter([]);
		},

		handleWarning2MessageBoxPress: function (oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.warning("Los datos no ser\xE1n grabados. Desea cancelar?", {
				actions: [
					MessageBox.Action.YES,
					MessageBox.Action.NO
				],
				styleClass: bCompact ? "sapUiSizeCompact" : "",
				onClose: function (sAction) {
					//MessageToast.show("Action selected: " + sAction);
					if (sAction == 'YES') window.location.reload();
				}
			});
		}

	});

});