define(function() {
    /*global Highcharts*/
        Highcharts.wrap(Highcharts.Pointer.prototype, 'onContainerClick', function (original, e) {
            var pointer = this,
                parent = pointer.chart.container.parentNode,
                bubbleUp = true;

            console.log('onCointainerClick');

            // Add a method to the event to allow event handlers to prevent propagation if desired
            e.swallowByHighCharts = function() { bubbleUp = false; };

            // Call the original event
            original.apply(this, Array.prototype.slice.call(arguments, 1));

            // Trigger the event on the container's parent (to bubble the event out of highcharts)
            // unless the user wanted to stop it
            if (bubbleUp && typeof parent !== 'undefined' && parent) {
                jQuery(pointer.chart.container.parentNode).trigger(e);
            }
        });
});