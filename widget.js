
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
        
        dataSeries: widget.property({
            type: 'list',
            attributes: [{
                name: 'LabelSource',
                type: 'string'
            }, {
                name: 'ValueSource',
                type: 'datasource' 
            }, {
            	name: 'Color',
            }]
        }),
        
  		title: widget.property({
  			type: 'string',
  			defaultValue: '',
	        bindable: false
	    }),
	    
	    titleFontSize: widget.property({
	    	type: 'number',
	    	defaultValue: 12,
	        bindable: false
	    }),
	    
	    legendLocation: widget.property({
	    	type: 'enum',
            values: {
            	none: 'no legend',
                e: 'e',
                se: 'se',
                s:'s',
                sw:'sw',
                w:'w',
                nw:'nw',
                n:'n',
                ne:'ne'
            },
	        bindable: false
	    }),
	    
	    drawGridlines: widget.property({
	 		type: 'boolean',
	 		defaultValue: true,
	 		bindable: false   	
		}),
		     
        init: function() {
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
                	(xAxeValue in dataObject)?dataObject[xAxeValue] += yAxeValue: dataObject[xAxeValue] = yAxeValue;// Detect if the label is duplicated.
                }
	            for (key in dataObject) {	
	         		this.data.push([key,dataObject[key]]); 	
	        	}
			 this.buildPlot(this);
            });
        },
        
      	buildPlot: function(widget) {
      		this.node.innerHTML = "";
		    var options = {};
		    options.title = {
		        text: widget.title() || "",
		        //fontSize: widget.titleFontSize() || 16
		    };
		    options.legend = {
			        show: widget.legendLocation() == "none"?false:true,
			        location: widget.legendLocation()
			};
			options.grid = {
				drawGridlines:widget.drawGridlines()
			};
		    if (widget.chartType() == 'PieRenderer') {
		    	
			    	options.seriesDefaults = {
			        renderer: jQuery.jqplot[widget.chartType()],
			        rendererOptions: {
			            showDataLabels: true
			        }
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
		var data = [
	                ['Industry', 12],
	                ['Retail', 9],
	                ['Home', 16],
	                ['Commuting', 7],
	            ];
	        if (this.chartType() == 'PieRenderer') {
	            this.jqPlot = $.jqplot(this.id, [data], {
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
	            });
	           
	        }
	        else if (this.chartType() == 'BarRenderer') {
	        	this.plot = $.jqplot(this.id,[data],{
	        		seriesDefaults:{renderer:$.jqplot.BarRenderer},
	        		axes: {
		        		xaxis: {
				          renderer: $.jqplot.CategoryAxisRenderer,
				          labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
				          tickRenderer: $.jqplot.CanvasAxisTickRenderer
				           
				     	}
				 	}
	        	});
	    	}
	        else 
	        this.jqPlot = $.jqplot(this.id, [
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
    return Wak_jqPlot;

});
/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */
//Ultility Function
function isNumber(o) {
    return !isNaN(o - 0) && o !== null && o !== "" && o !== false;
}
