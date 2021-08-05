class LocalStorageManager {

  addItems(items) {
    items.forEach(item => {
      localStorage.setItem(item.name, JSON.stringify(item.value));
    });

    return;
  }

  getItem(itemName) {
    return JSON.parse(localStorage.getItem(itemName));
  }

  getItems(items) {
    let currentItems = items.map(item => {
      const receivedItem = localStorage.getItem(item);
      return JSON.parse(receivedItem);
    });

    return currentItems;
  }

  removeItems(itemsNames) {
    itemsNames.forEach(itemName => {
      localStorage.removeItem(itemName);
    });

    return;
  }
}

const localStorageManager = new LocalStorageManager();

export { localStorageManager };
