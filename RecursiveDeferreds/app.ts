$(
    () => {

        debugger;
        var tree: TreeStructures.TreeNode<string> = new TreeStructures.TreeNode("root",
            [
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
                        new TreeStructures.TreeNode("level23"),
                    ]),
                new TreeStructures.TreeNode("node3"),
            ]
            );

        console.log(tree.item);

    }
    );

