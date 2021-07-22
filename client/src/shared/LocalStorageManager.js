class LocalStorageManager {

  addItems(items) {
    items.forEach(item => {
      localStorage.setItem(item.name, JSON.stringify(item.value));
    })

    return;
  };

  removeItems(itemsNames) {
    itemsNames.forEach(itemName => {
      localStorage.removeItem(itemName);
    })

    return;
  };
};

const localStorageManager = new LocalStorageManager();

export { localStorageManager };
