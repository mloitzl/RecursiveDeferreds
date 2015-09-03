$(function () {
    var tree = new TreeStructures.TreeNode("root", [
        new TreeStructures.TreeNode("node1", [
            new TreeStructures.TreeNode("level11"),
            new TreeStructures.TreeNode("level12"),
            new TreeStructures.TreeNode("level13")
        ]),
        new TreeStructures.TreeNode("node2", [
            new TreeStructures.TreeNode("level21"),
            new TreeStructures.TreeNode("level22"),
            new TreeStructures.TreeNode("level23", [
                new TreeStructures.TreeNode("level231"),
                new TreeStructures.TreeNode("level232"),
                new TreeStructures.TreeNode("level233"),
            ])
        ]),
        new TreeStructures.TreeNode("node3")
    ]);
    var walker = new TreeStructures.AsyncTreeWalker();
    walker.walk(tree, function (node) {
        var dfd = $.Deferred();
        window.setTimeout(function () {
            console.log("Resolving: " + node.item);
            dfd.resolve(node.item);
        }, 2000 + Math.random() * 1000);
        return dfd.promise();
    }).then(function () {
        var results = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            results[_i - 0] = arguments[_i];
        }
        console.log("Finish!");
        console.log("Results: " + results);
        for (var r in results) {
            if (results.hasOwnProperty(r)) {
                console.log(results[r]);
            }
        }
    });
});
var Collections;
(function (Collections) {
    var Set = (function () {
        function Set() {
        }
        return Set;
    })();
    Collections.Set = Set;
})(Collections || (Collections = {}));
var TreeStructures;
(function (TreeStructures) {
    var TreeNode = (function () {
        function TreeNode(item, children) {
            this.children = [];
            this.item = item;
            if (children)
                this.children = children;
        }
        TreeNode.prototype.addChild = function (node) {
            this.children.push(node);
        };
        TreeNode.prototype.removeChild = function (node) {
            var index = this.children.indexOf(node);
            if (index > -1) {
                this.children.splice(index, 1);
                return true;
            }
            return false;
        };
        return TreeNode;
    })();
    TreeStructures.TreeNode = TreeNode;
    var TreeWalker = (function () {
        function TreeWalker() {
        }
        TreeWalker.prototype.walk = function (node, action) {
            action(node);
            for (var i in node.children) {
                if (node.children.hasOwnProperty(i)) {
                    this.walk(node.children[i], action);
                }
            }
        };
        return TreeWalker;
    })();
    TreeStructures.TreeWalker = TreeWalker;
    var AsyncTreeWalker = (function () {
        function AsyncTreeWalker() {
        }
        AsyncTreeWalker.prototype.walk = function (node, action) {
            var promises = [action(node)];
            for (var i in node.children) {
                if (node.children.hasOwnProperty(i)) {
                    promises.push(this.walk(node.children[i], action));
                }
            }
            return $.when.apply(null, promises);
        };
        return AsyncTreeWalker;
    })();
    TreeStructures.AsyncTreeWalker = AsyncTreeWalker;
})(TreeStructures || (TreeStructures = {}));
//# sourceMappingURL=app.js.map