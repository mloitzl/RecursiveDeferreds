﻿module TreeStructures {

    export class TreeNode<T> {
        public children: TreeNode<T>[] = [];

        public item: T;

        constructor(item: T, children?: TreeNode<T>[]) {
            this.item = item;
            if (children) this.children = children;
        }

        public addChild(node: TreeNode<T>) {
            this.children.push(node);
        }

        public removeChild(node: TreeNode<T>) :boolean {
            var index = this.children.indexOf(node);
            if (index > -1) {
                this.children.splice(index, 1);
                return true;
            }
            return false;
        }
    }

    export class TreeWalker<T> {

        public walk(node: TreeNode<T>, action: (item: TreeNode<T>) => void) {
            action(node);
            for (var i in node.children) {
                if (node.children.hasOwnProperty(i)) {
                    this.walk(node.children[i], action);
                }
            }
        }
    }


    export class AsyncTreeWalker<T> {


        public fill(node: TreeNode<T>, generatorAction: (item: TreeNode<T>) => JQueryPromise<string>): JQueryPromise<string> {
            var dfd = $.Deferred();
            var promises = [];

            generatorAction(node).done(() => {
                
                for (var i in node.children) {
                    if (node.children.hasOwnProperty(i)) {
                        promises.push(this.fill(node.children[i], generatorAction));
                    }
                }
                $.when.apply(null, promises).then(() => {
                    dfd.resolve();
                });
            });

            return dfd.promise();
        }

        public walk(node: TreeNode<T>, action: (item: TreeNode<T>) => JQueryPromise<string>): JQueryPromise<string> {
           
            var promises = [action(node)];
            
            for (var i in node.children) {
                if (node.children.hasOwnProperty(i)) {
                   promises.push(this.walk(node.children[i], action));
                }
            }

            return $.when.apply(null, promises);
        }
    }

}