'use strict';

angular.module('admissionSystemApp')
  .directive('sunChart', function () {
    function link(scope, el) {
      var data = scope.data;
      el = el[0];

      var
        margin = {top: 200, right: 0, bottom: 50, left: 50},
        width = 960 - margin.right - margin.left,
        height = 800 - margin.top - margin.bottom,
        radius = Math.min(width, height) / 2 - 30;

      var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

      var y = d3.scale.linear()
        .range([0, radius]);

      var color = d3.scale.category20c();

      var svg = d3.select(el).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

      var partition = d3.layout.partition()
        .children(function(d) { return (typeof d.values == "number") ? null : d.values; })
        .value(function(d) { return (typeof d.values == "number") ? d.values : null; });

      var max_level = 3;
      var thickness = width/2.0/(max_level+2)*1.1;

      var arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return (!d.parent) ? 0 : Math.max(0, y(d.y))+4; })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });


      d3.select(self.frameElement).style("height", height + "px");

      // Interpolate the scales!
      function arcTween(d) {
        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
          yd = d3.interpolate(y.domain(), [d.y, 1]),
          yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(d, i) {
          return i
            ? function(t) { return arc(d); }
            : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
        };
      }

      function computeTextRotation(d) {
        //var thetaDeg = (180 / Math.PI * (arc.startAngle()(d) + arc.endAngle()(d)) / 2 - 90);
        //return (thetaDeg > 90) ? thetaDeg - 180 : thetaDeg;
        return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
      }

      scope.$watch('data', function (nested) {

        if(!nested) return;

        nested = d3.nest()
         .key(function (d) {
         return d.departmentId;
         })
         .key(function (d) {
         return d.specialtyId;
         })
         //.key(function (d) {
         //return d.specofferTypeId;
         //})
         .rollup(function (leaves) {
         return leaves.length;
         })
         .entries(nested);

         nested = {key: "Університет", values: nested};

        var g = svg.selectAll("g")
          .data(partition.nodes(nested))
          .enter().append("g");

        var path = g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color((d.children ? d : d.parent).key); })
          .on("click", click);

        var text = g.append("text")
          .classed('label', true)
          .style("font-size", "12px")
          .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
          .attr("x", function(d) { return y(d.y); })
          //.attr("text-anchor", "middle")
          .attr("dx", "6") // margin
          .attr("dy", ".35em") // vertical-align
          .text(function(d) { return d.key; })
          .attr("pointer-events","none")
          .on("click", click);

        function click(d) {
          // fade out all text elements
          text.transition().attr("opacity", 0);

          path.transition()
            .duration(750)
            .attrTween("d", arcTween(d))
            .each("end", function(e, i) {
              // check if the animated element's data e lies within the visible angle span given in d
              if (e.x >= d.x && e.x < (d.x + d.dx)) {
                // get a selection of the associated text element
                var arcText = d3.select(this.parentNode).select("text");
                // fade in the text element and recalculate positions
                arcText.transition().duration(750)
                  .attr("opacity", 1)
                  .attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
                  .attr("x", function(d) { return y(d.y); });
              }
            });
        }

      });
    }

    return {
      link: link,
      restrict: 'E',
      scope: {
        data: '='
      }
    };
  });
