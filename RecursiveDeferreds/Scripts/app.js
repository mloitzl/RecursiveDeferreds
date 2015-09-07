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
                new TreeStructures.TreeNode("level233")
            ])
        ]),
        new TreeStructures.TreeNode("node3")
    ]);
    var treeEmpty = new TreeStructures.TreeNode("root", []);
    var syncWalker = new TreeStructures.TreeWalker();
    var walker = new TreeStructures.AsyncTreeWalker();
    walker.fill(treeEmpty, function (node) {
        TreeStructures.DummyDataProvider.instanceCounter++;
        //return TreeStructures.DummyDataProvider.fillNode(node);
        console.log("Calling generator Action for node: " + node.item + " Source: " + tree.item);
        return TreeStructures.DummyDataProvider.fillNodeFromSource(node, tree);
    }).done(function (result) {
        syncWalker.walk(treeEmpty, function (node) { return console.log(node.item); });
    });
    console.log("");
    //walker.walk(tree, (node) => {
    //    var dfd = $.Deferred();
    //    window.setTimeout(
    //        () => {
    //            console.log("Resolving: " + node.item);
    //            dfd.resolve(node.item);
    //        }, 100 + Math.random() * 1000);
    //    return dfd.promise();
    //}).then((...results: any[]) => {
    //    console.log("Finish!");
    //    console.log("Results: " + results);
    //    for (var r in results) {
    //        if (results.hasOwnProperty(r)) {
    //            console.log(results[r]);
    //        }
    //    }
    //});
});
var TreeStructures;
(function (TreeStructures) {
    var DummyDataProvider = (function () {
        function DummyDataProvider() {
        }
        DummyDataProvider.fillNode = function (node) {
            var dfd = $.Deferred();
            if (DummyDataProvider.instanceCounter < 4) {
                window.setTimeout(function () {
                    for (var i = 0; i < 3; i++) {
                        var childNode = new TreeStructures.TreeNode(node.item + "/" + DummyDataProvider.instanceCounter);
                        node.addChild(childNode);
                    }
                    console.log("Resolving node: " + node.item);
                    dfd.resolve(node.item);
                }, 500 + Math.random() * 1000);
            }
            else {
                console.log("Resolving finale node: " + node.item);
                dfd.resolve(node.item);
            }
            return dfd.promise();
        };
        DummyDataProvider.fillNodeFromSource = function (node, source) {
            var dfd = $.Deferred();
            var promises = [];
            console.log("Filling: " + node.item);
            window.setTimeout(function () {
                node.item = source.item;
                for (var sourceNode in source.children) {
                    console.log("Creating child: " + source.children[sourceNode].item);
                    var childNode = new TreeStructures.TreeNode(source.children[sourceNode].item);
                    node.addChild(childNode);
                }
                if (promises.length === 0) {
                    console.log("Resolving final: " + node.item);
                    dfd.resolve(node.item);
                }
                else {
                    $.when.apply(null, promises).then(function () {
                        console.log("Resolving: " + node.item);
                        dfd.resolve(node.item);
                    });
                }
            }, 0);
            return dfd.promise();
        };
        DummyDataProvider.instanceCounter = 0;
        return DummyDataProvider;
    })();
    TreeStructures.DummyDataProvider = DummyDataProvider;
})(TreeStructures || (TreeStructures = {}));
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
        AsyncTreeWalker.prototype.fill = function (node, generatorAction) {
            var _this = this;
            var dfd = $.Deferred();
            var promises = [];
            generatorAction(node).done(function () {
                for (var i in node.children) {
                    if (node.children.hasOwnProperty(i)) {
                        promises.push(_this.fill(node.children[i], generatorAction));
                    }
                }
                $.when.apply(null, promises).then(function () {
                    dfd.resolve();
                });
            });
            return dfd.promise();
        };
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