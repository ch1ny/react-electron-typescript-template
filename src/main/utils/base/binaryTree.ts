/**
 * 二叉树基类
 */
export class BinaryTreeNode<T> {
    val: T;
    left: BinaryTreeNode<T> | null;
    right: BinaryTreeNode<T> | null;
    
    constructor(val: T) {
        this.val = val;
        this.left = null;
        this.right = null;
    }

    /**
     * 二叉树前序遍历
     * @param node 
     * @param cb 
     * @returns 
     */
    static preOrderTraversal<T>(node: BinaryTreeNode<T> | null, cb: (node: BinaryTreeNode<T>) => void) {
        if (node === null) return;

        cb(node);
        this.preOrderTraversal(node.left, cb);
        this.preOrderTraversal(node.right, cb);
    }

    /**
     * 二叉树后序遍历
     * @param node 
     * @param cb 
     * @returns 
     */
    static postOrderTraversal<T>(node: BinaryTreeNode<T> | null, cb: (node: BinaryTreeNode<T>) => void) {
        if (node === null) return;

        this.postOrderTraversal(node.left, cb);
        this.postOrderTraversal(node.right, cb);
        cb(node);
    }

    /**
     * 二叉树中序遍历
     * @param node 
     * @param cb 
     * @returns 
     */
    static inOrderTraversal<T>(node: BinaryTreeNode<T> | null, cb: (node: BinaryTreeNode<T>) => void) {
        if (node === null) return;

        this.inOrderTraversal(node.left, cb);
        cb(node);
        this.inOrderTraversal(node.right, cb);
    }

    /**
     * 是否为叶子结点
     * @param node 
     * @returns 
     */
    static isLeaf<T>(node: BinaryTreeNode<T>): boolean {
        return node.left === null && node.right === null;
    }
}

export class BalanceBinaryTreeNode<T> extends BinaryTreeNode<T> {
    height: number;
    left: BalanceBinaryTreeNode<T> | null;
    right: BalanceBinaryTreeNode<T> | null;

    constructor(val: T) {
        super(val);
        this.height = 1;
        this.left = null;
        this.right = null;
    }

    static getHeight<T>(node: BalanceBinaryTreeNode<T> | null): number {
        if (node === null) return 0;

        return Math.max(BalanceBinaryTreeNode.getHeight(node.left), BalanceBinaryTreeNode.getHeight(node.right)) + 1;
    }
}