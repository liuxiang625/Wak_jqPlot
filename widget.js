//function buildPlot(widget) {
//	debugger;
//    var options = {};
//    options.title = {
//        text: widget.title() || "",
//        fontSize: widget.titleFontSize() || 16
//    };
//    if (widget.chartType() == 'PieRenderer') options.seriesDefaults = {
//        renderer: jQuery.jqplot[widget.chartType()],
//        rendererOptions: {
//            showDataLabels: true
//        }
//    };
//    options.legend = {
//        show: true,
//        location: 'se'
//    };
//    widget.jqPlot = $.jqplot(widget.id, [widget.data], options);
//}

WAF.define('Wak_jqPlot', ['waf-core/widget'], function(widget) {

    var Wak_jqPlot = widget.create('Wak_jqPlot', {
    	 
    	chartType: widget.property({
            type: 'enum',
            values: {
            	LinearAxisRenderer: 'line',
                PieRenderer: 'pie'
            },
            defaultValue: 'line',
            bindable: false
        }),
        
        items: widget.property({
            type: 'datasource',
            attributes: [{
                name: 'value'
            }, {
                name: 'label'
            }]
        }),
        
        init: function() {
            if (this.data && this.data.length > 0) {
                this.buildPlot(this);
            }
            //Temporary solution to add function to Wak_jqplot API
            this.rePlot = function (options) {
                this.jqPlot.replot(options);
            }
            this.destroy = function() {
                this.jqPlot.destroy();
            }
            
            this.chartType.onChange(function() {
                this.render();
            });
            
            this.items.onCollectionChange(function(elements) {
            	this.data = [];
            	if (!elements.length) return;
//	            if (!elements.hasOwnProperty('getClassTitle')) {
	                for (var datasourceIndex = 0; datasourceIndex < elements.length; datasourceIndex++) {
	                	var value = elements[datasourceIndex]['value'];
	                	var label = elements[datasourceIndex]['label'];
	                    this.data.push([isNumber(value) ? parseFloat(value) : value, isNumber(label) ? parseFloat(label) : label]);
	                }
	            //}
//            else if (newValue.getClassTitle() && newValue.length == 0) {
//                newValue.addListener("onCurrentElementChange", function(event) {
//                    if (event.dataSource.getCurrentElement() !== null) {
//                        var targetWidget = event.userData.targetWidget;
//                        targetWidget.data = [];
//                        var xValueDataSourceName = event.userData.xValueDataSource;
//                        var yValueDataSourceName = event.userData.yValueDataSource;
//                        event.dataSource.toArray(xValueDataSourceName + ", " + yValueDataSourceName, {
//                            onSuccess: function(event) {
//                                var dataArray = event.result;
//                                var dataObject = {};
//                                for (var datasourceIndex = 0; datasourceIndex < dataArray.length; datasourceIndex++) {
//                                    var xValue = dataArray[datasourceIndex][xValueDataSourceName];
//                                    var yValue = dataArray[datasourceIndex][yValueDataSourceName];
//                                    if (xValue in dataObject) 
//                                    	dataObject[xValue] += parseFloat(yValue)
//                                    else {
//                                  		dataObject[xValue] =  parseFloat(yValue);
//                                 		targetWidget.data.push([isNumber(xValue) ? parseFloat(xValue) : xValue, isNumber(yValue) ? parseFloat(yValue) : yValue]);
//                                	}
//                                }
//                                $('#' + targetWidget.id).empty()
//                                debugger;
//                                buildPlot(targetWidget);
//                            }
//                        });
//                    }
//                }, {}, // To pass userData, config object is required even being empty
//                { //userData object contains widget and datasources
//                    'targetWidget': this,
//                    'xValueDataSource': this.value.attributeFor("ValueX"),
//                    'yValueDataSource': this.value.attributeFor("ValueY")
//                });
//                this.data = [];
//            }
			 this.buildPlot(this);
            });
        },
        
      	buildPlot: function(widget) {
		    var options = {};
		    options.title = {
		        //text: widget.title() || "",
		        //fontSize: widget.titleFontSize() || 16
		    };
		    if (widget.chartType() == 'PieRenderer') options.seriesDefaults = {
		        renderer: jQuery.jqplot[widget.chartType()],
		        rendererOptions: {
		            showDataLabels: true
		        }
		    };
		    options.legend = {
		        show: true,
		        location: 'e'
		    };
		    widget.jqPlot = $.jqplot(widget.id, [widget.data], options);
		},
		render: function() {
		this.node.innerHTML = "";
        if (this.chartType() == 'PieRenderer') {
            var data = [
                ['Heavy Industry', 12],
                ['Retail', 9],
                ['Light Industry', 14],
                ['Out of home', 16],
                ['Commuting', 7],
                ['Orientation', 9]
            ];
            var plot1 = $.jqplot(this.id, [data], {
                seriesDefaults: {
                    renderer: $.jqplot.PieRenderer,
                    rendererOptions: {
                        showDataLabels: true
                    }
                },
                legend: {
                    show:true, 
                    location: 'e'
                }
            })
        }
        else $.jqplot(this.id, [
            [
                [1, 2],
                [3, 5.12],
                [5, 13.1],
                [7, 33.6],
                [9, 85.9],
                [11, 219.9]
            ]
        ]);
		}
    });

    //Add value property of Datasource
//    Wak_jqPlot.addProperty('value', {
//        type: "datasource",
//        attributes: [{
//            name: 'ValueX'
//        }, {
//            name: 'ValueY'
//        }],
//        onChange: function(newValue) {
//        	            debugger;
//            this.data = [];
//            if (newValue && newValue.length > 0 && !newValue.getClassTitle()) {
//                for (var datasourceIndex = 0; datasourceIndex < newValue.length; datasourceIndex++) {
//                    this.data.push([isNumber(newValue['ValueX']) ? parseFloat(newValue['ValueX']) : newValue['ValueX'], isNumber(newValue['ValueY']) ? parseFloat(newValue['ValueY']) : newValue['ValueY']]);
//                    newValue.selectNext();
//                }
//            }
//            else if (newValue.getClassTitle() && newValue.length == 0) {
//                newValue.addListener("onCurrentElementChange", function(event) {
//                    if (event.dataSource.getCurrentElement() !== null) {
//                        var targetWidget = event.userData.targetWidget;
//                        targetWidget.data = [];
//                        var xValueDataSourceName = event.userData.xValueDataSource;
//                        var yValueDataSourceName = event.userData.yValueDataSource;
//                        event.dataSource.toArray(xValueDataSourceName + ", " + yValueDataSourceName, {
//                            onSuccess: function(event) {
//                                var dataArray = event.result;
//                                var dataObject = {};
//                                for (var datasourceIndex = 0; datasourceIndex < dataArray.length; datasourceIndex++) {
//                                    var xValue = dataArray[datasourceIndex][xValueDataSourceName];
//                                    var yValue = dataArray[datasourceIndex][yValueDataSourceName];
//                                    if (xValue in dataObject) 
//                                    	dataObject[xValue] += parseFloat(yValue)
//                                    else {
//                                  		dataObject[xValue] =  parseFloat(yValue);
//                                 		targetWidget.data.push([isNumber(xValue) ? parseFloat(xValue) : xValue, isNumber(yValue) ? parseFloat(yValue) : yValue]);
//                                	}
//                                }
//                                $('#' + targetWidget.id).empty()
//                                debugger;
//                                buildPlot(targetWidget);
//                            }
//                        });
//                    }
//                }, {}, // To pass userData, config object is required even being empty
//                { //userData object contains widget and datasources
//                    'targetWidget': this,
//                    'xValueDataSource': this.value.attributeFor("ValueX"),
//                    'yValueDataSource': this.value.attributeFor("ValueY")
//                });
//                this.data = [];
//            }
//        }
//    });

//    //add title property
//    Wak_jqPlot.addProperty('title', {
//        bindable: false,
//        onChange: function(newValue) {
//            Wak_jqPlot.title = this.title(); //test() contains the widget's value at runtime
//        }
//    });

//    Wak_jqPlot.addProperty('titleFontSize', {
//        type: "integer",
//        bindable: false,
//        defaultValue: 16,
//        onChange: function(newValue) {
//            Wak_jqPlot.titleFontSize = newValue;
//        }
//    });

//    Wak_jqPlot.addProperty('chartType', {
//        type: "enum",
//        "values": {
//            LinearAxisRenderer: "line chart",
//            PieRenderer: "pie chart"
//        },
//        bindable: false,
//        onChange: function(newValue) {
//            Wak_jqPlot.renderer = this.chartType();
//        }
//    });
    
    
//     Wak_jqPlot.addProperty('SeriesColors', {
//        bindable: false,
//        attributes: [{
//            name: 'color'
//        }],
//        defaultValue: [ "#4bb2c5", "#c5b47f", "#EAA228", "#579575", "#839557", "#958c12",
//        "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc"]
//   	 });
    
//        /* Map the custom event above to the DOM click event */
//        Wak_jqPlot.mapDomEvents({
//            'click': 'action'
//        });
    return Wak_jqPlot;

});


/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */
//Ultility Function
function isNumber(o) {
    return !isNaN(o - 0) && o !== null && o !== "" && o !== false;
}