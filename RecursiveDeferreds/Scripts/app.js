$(function () {
    debugger;
    var tree = new TreeStructures.TreeNode("root", [
        new TreeStructures.TreeNode("node1", [
            new TreeStructures.TreeNode("level11"),
            new TreeStructures.TreeNode("level12"),
            new TreeStructures.TreeNode("level13")
        ]),
        new TreeStructures.TreeNode("node2", [
            new TreeStructures.TreeNode("level21"),
            new TreeStructures.TreeNode("level22"),
            new TreeStructures.TreeNode("level23"),
        ]),
        new TreeStructures.TreeNode("node3"),
    ]);
    console.log(tree.item);
});
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
        };
        return TreeNode;
    })();
    TreeStructures.TreeNode = TreeNode;
})(TreeStructures || (TreeStructures = {}));
//# sourceMappingURL=app.js.map