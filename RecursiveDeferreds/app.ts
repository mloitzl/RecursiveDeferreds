$(
    () => {

        var tree: TreeStructures.TreeNode<string> = new TreeStructures.TreeNode("root", [
            new TreeStructures.TreeNode("node1",
                [
                    new TreeStructures.TreeNode("level11"),
                    new TreeStructures.TreeNode("level12"),
                    new TreeStructures.TreeNode("level13")
                ]),
            new TreeStructures.TreeNode("node2",
                [
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

        var treeEmpty: TreeStructures.TreeNode<string> = new TreeStructures.TreeNode<string>("root", []);

        var syncWalker = new TreeStructures.TreeWalker();

        var walker = new TreeStructures.AsyncTreeWalker();

        walker.fill(treeEmpty, (node: TreeStructures.TreeNode<string>) => {
            TreeStructures.DummyDataProvider.instanceCounter++;
            //return TreeStructures.DummyDataProvider.fillNode(node);
            return TreeStructures.DummyDataProvider.fillNodeFromSource(node, tree);
        }).done((result) => {
            syncWalker.walk(treeEmpty, (node) => console.log(node.item));
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

