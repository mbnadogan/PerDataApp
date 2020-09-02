sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("PerDataApp.controller.View1", {

		onInit: function () {

			this._oView = this.getView();

			var oViewModel = new JSONModel({
				Pernr: "",
				Bukrs: "",
				Werks: "",
				Btrtl: ""
			
			});

			this._oView.setModel(oViewModel, "viewModel");
			this._oTable = this._oView.byId("table0");

		},

		onAddPerData: function () {
			debugger;
			var oModel = this._oView.getModel(),
				sPath = "/PerDataSet",
				oData = {},
				mParameters = {},
				bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			oData.Pernr = this._oView.getModel("viewModel").getProperty("/Pernr");
			oData.Ename = this._oView.getModel("viewModel").getProperty("/Bukrs");
			oData.Gbdat = this._oView.getModel("viewModel").getProperty("/Werks");
			oData.Gbort = this._oView.getModel("viewModel").getProperty("/Btrtl");
		

			mParameters.success = function (oData2, oResponse) {
				debugger;
				var oBinding = this._oTable.getBinding("items");
				oBinding.filter([]);

				MessageBox.success(
					"Kayıt Başarılı......", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			}.bind(this);

			mParameters.error = function (oError) {
				debugger;
				MessageBox.error(oError.responseText, {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				});
			};

			oModel.create(sPath, oData, mParameters);

		}

	});

});