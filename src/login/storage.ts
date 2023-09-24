import Cookie from 'js-cookie';

interface Storage {
  set: (key: string, value: any) => void;
  get: (key: string) => any | null;
  remove: (key: string) => void;
}

const storage: Storage = {
    set: function (): void {
        throw new Error('Function not implemented.');
    },
    get: function () {
        throw new Error('Function not implemented.');
    },
    remove: function (): void {
        throw new Error('Function not implemented.');
    }
};

try {
  if (!window.localStorage) {
    throw new Error('no local storage');
  }
  storage.set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  storage.get = (key) => {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item!);
    } catch (e) {
      return null;
    }
  };
  storage.remove = (key) => localStorage.removeItem(key);
} catch (e) {
  storage.set = Cookie.set;
  storage.remove = Cookie.remove;
}

export default storage;
