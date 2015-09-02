module TreeStructures {
    export class TreeNode<T> {
        private children: TreeNode<T>[] = [];

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
}