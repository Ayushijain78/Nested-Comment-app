const useCustomHook = () => {
  const insertComment = (tree, commentId, item) => {
    if (tree.id === commentId) {
      tree.items.push({
        id: Date.now(),
        message: item,
        items: [],
      });
      return tree;
    }
    let updatedComments = [];
    updatedComments = tree.items.map((obj) => {
      return insertComment(obj, commentId, item);
    });

    return { ...tree, items: updatedComments };
  };
  const editComment = (tree, commentId, item) => {
    if (tree.id === commentId) {
      tree.message = item;
      return tree;
    }

    tree.items.map((obj) => {
      return editComment(obj, commentId, item);
    });
    return { ...tree };
  };
  const deleteComment = (tree, commentId) => {
    tree.items = tree.items.filter((item) => {
      if (item.id === commentId) {
        return false;
      } else {
        deleteComment(item, commentId);
        return true;
      }
    });

    return tree;
  };
  return { insertComment, deleteComment, editComment };
};

export default useCustomHook;
