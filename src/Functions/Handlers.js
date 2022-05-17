  // Passed to ItemForm and called when a new part is added
  const refreshDataHandler = (setRefresh) => {
    setRefresh(true);
  };

  const Handlers = {
      refreshDataHandler: refreshDataHandler
  }

  module.exports = Handlers;