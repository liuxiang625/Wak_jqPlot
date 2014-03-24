
WAF.define('Wak_jqPlot', ['waf-core/widget'], function(widget) {

    var Wak_jqPlot = widget.create('Wak_jqPlot', {
    	 
 //Widget Properties List
    	chartType: widget.property({
            type: 'enum',
            values: {
            	LinearAxisRenderer: 'line chart',
                PieRenderer: 'pie chart',
                BarRenderer: 'bar chart'
            },
            defaultValue: 'line',
            bindable: false
        }),
        
        series: widget.property({
            type: 'datasource',
            attributes: [{
                name: 'xAxeValue'
            }, {
                name: 'yAxeValue'
            }]
        }),
        
        init: function() {
            if (this.data && this.data.length > 0) 
                this.buildPlot(this);
            else
            	this.render();
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
            
            this.series.onCollectionChange(function(elements) {
            	this.data = [];
            	if (!elements.length) return;
				var dataObject = {};
                for (var datasourceIndex = 0; datasourceIndex < elements.length; datasourceIndex++) {
                	var xAxeValue = elements[datasourceIndex]['xAxeValue'];
                	var yAxeValue = elements[datasourceIndex]['yAxeValue'];
                	(xAxeValue in dataObject)?dataObject[xAxeValue] += yAxeValue: dataObject[xAxeValue] = yAxeValue;// Detect if the lable is duplicated.
                    //this.data.push([isNumber(xAxeValue) ? parseFloat(xAxeValue) : xAxeValue, isNumber(yAxeValue) ? parseFloat(yAxeValue) : yAxeValue]);
                }
	            
	            for (key in dataObject) {
	            	
	         		this.data.push([key,dataObject[key]]); 	
	        	}
				console.log(elements);
			 this.buildPlot(this);
            });
        },
        
      	buildPlot: function(widget) {
		    var options = {};
		    options.title = {
		        //text: widget.title() || "",
		        //fontSize: widget.titleFontSize() || 16
		    };
		    if (widget.chartType() == 'PieRenderer') {
		    	
		    	options.seriesDefaults = {
		        renderer: jQuery.jqplot[widget.chartType()],
		        rendererOptions: {
		            showDataLabels: true
		        }
			    };
			    options.legend = {
			        show: true,
			        location: 'e'
			    };
			}
			if (this.chartType() == 'BarRenderer') {
	      		options.series= [{renderer:$.jqplot.BarRenderer}]
	      		options.axes = {
			        xaxis: {
			          renderer: $.jqplot.CategoryAxisRenderer,
			          labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
			          tickRenderer: $.jqplot.CanvasAxisTickRenderer
			           
			     	}
			     };
	    	}	
		    if (widget.chartType() == 'LinearAxisRenderer') 
		    options.axes = {
		        xaxis: {
		          renderer: $.jqplot.CategoryAxisRenderer,
		          labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
		          tickRenderer: $.jqplot.CanvasAxisTickRenderer
		           
		        }
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