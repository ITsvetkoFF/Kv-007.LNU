'use strict';

angular.module('admissionSystemApp')
  .directive('treeChart', function () {
    function link(scope, el) {
      var data = scope.data;
      el = el[0];

      var margin = {top: 60, right: 160, bottom: 0, left: 250},
        width = 960 - margin.left - margin.right,
        barHeight = 20,
        barWidth = width * .8;

      var i = 0,
        duration = 400,
        root;

      var tree = d3.layout.tree()
        .nodeSize([0, 20])
        .children(function(d) { return (typeof d.values == "number") ? null : d.values; })
        .value(function(d) { return (typeof d.values == "number") ? d.values : null; });

      var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

      var svg = d3.select(el).append("svg")
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      function update(source) {

        // Compute the flattened node list.
        var nodes = tree.nodes(root);

        var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);

        d3.select("svg").transition()
          .duration(duration)
          .attr("height", height);

        d3.select(self.frameElement).transition()
          .duration(duration)
          .style("height", height + "px");

        // Compute the "layout".
        nodes.forEach(function(n, i) {
          n.x = i * barHeight;
        });

        // Update the nodes…
        var node = svg.selectAll("g.node")
          .data(nodes, function(d) { return d.id || (d.id = ++i); });

        var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
          .style("opacity", 1e-6);

        // Enter any new nodes at the parent's previous position.
        nodeEnter.append("rect")
          .attr("y", -barHeight / 2)
          .attr("height", barHeight)
          .attr("width", barWidth)
          .style("fill", color)
          .on("click", click);

        nodeEnter.append("text")
          .attr("dy", 3.5)
          .attr("dx", 5.5)
          .text(function(d) { return d.key; });

        // Transition nodes to their new position.
        nodeEnter.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
          .style("opacity", 1);

        node.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
          .style("opacity", 1)
          .select("rect")
          .style("fill", color);

        // Transition exiting nodes to the parent's new position.
        node.exit().transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
          .style("opacity", 1e-6)
          .remove();

        // Update the links…
        var link = svg.selectAll("path.link")
          .data(tree.links(nodes), function(d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
          .attr("class", "link")
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          })
          .transition()
          .duration(duration)
          .attr("d", diagonal);

        // Transition links to their new position.
        link.transition()
          .duration(duration)
          .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          })
          .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
          d.x0 = d.x;
          d.y0 = d.y;
        });
      }

      // Toggle children on click.
      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }

      function color(d) {
        return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
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
         .key(function (d) {
         return d.specofferTypeId;
         })
         .rollup(function (leaves) {
         return leaves.length;
         })
         .entries(nested);
         //nested = {key: "FF", values:nested.slice(1, 24)};
         nested = {key: "FF", values: nested};
         console.log('nested', nested);
         nested.x0 = 0;
         nested.y0 = 0;
         root = nested;
         update(root);

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
