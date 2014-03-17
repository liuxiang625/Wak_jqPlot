(function(Wak_jqPlot) {

    //    /* Default width and height of your widget */
    //    Wak_jqPlot.setWidth('200');
    //    Wak_jqPlot.setHeight('20');
    //    /* Define custom event for your widget */
    //    Wak_jqPlot.addEvent('myEvent');
    //    /* Customize existing properties */
    //    Wak_jqPlot.customizeProperty('test', {
    //        sourceTitle: 'Test Source',
    //        title: 'Test Static Value',
    //        description: 'Add a datasource to this property.'
    //    });
    //    /* Add a Label property */
    //    Wak_jqPlot.addLabel({
    //        'defaultValue': '',
    //        'position': 'top'
    //    });
    //    /* Set the Design and Styles panels */
    //    Wak_jqPlot.setPanelStyle({
    //        'fClass': true,
    //        'text': true,
    //        'background': true,
    //        'border': true,
    //        'sizePosition': true,
    //        'label': true,
    //        'disabled': ['border-radius']
    //    });
    /* Override widget's initialization */
    Wak_jqPlot.prototype.init = function() {
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

// For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3870.html