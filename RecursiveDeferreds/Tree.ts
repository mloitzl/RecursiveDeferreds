module TreeStructures {
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

        public removeChild(node: TreeNode<T>) {


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

        public walk(node: TreeNode<T>, action: (item: TreeNode<T>) => JQueryPromise<string>): JQueryPromise<string> {
            var dfd = $.Deferred();
            var promises = [action(node)];
            
            for (var i in node.children) {
                if (node.children.hasOwnProperty(i)) {
                   promises.push(this.walk(node.children[i], action));
                }
            }

            //dfd.resolve(node.item);

            return $.when.apply(null, promises);
        }
    }

}