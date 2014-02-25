
WAF.onAfterInit = function onAfterInit() {// @lock
	chartDataSeries = []
// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		chartDataSeries = [{'xValue':1,'yValue':2}];
		sources.chartDataSeries.sync();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
