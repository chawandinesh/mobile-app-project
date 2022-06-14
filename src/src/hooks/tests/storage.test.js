import { Storage } from '../storage';

const fakeWindowLocalStorage = {
    data: {},
    length: 0,
    setLength() {
        this.length = Object.keys(this.data).length;
    },
    setItem(keyName, value) {
        this.data[keyName] = value.toString();
        this.setLength();
    },
    getItem(keyName) {
        return this.data[keyName];
    },
    removeItem(keyName) {
        delete this.data[keyName];
        this.setLength();
    },
    clear() {
        this.data = {};
        this.setLength();
    }
};

describe('Storage', () => {
    let storage;
    const keyName = 'keyName';
    const value = 'Hello';

    beforeEach(() => {
        let dateValue;
        // move to helper
        jest
            .spyOn(global.Date, 'now')
            .mockImplementationOnce(() => {
                dateValue = new Date('2020-05-14T11:01:58.135Z').valueOf();
                return dateValue;
            })
            .mockImplementationOnce(() => {
                dateValue = new Date('2020-05-14T11:01:58.135Z').valueOf();
                return dateValue;
            })
            .mockImplementationOnce(() => {
                dateValue = new Date('2020-05-14T11:04:58.135Z').valueOf();
                return dateValue;
            });

        Object.defineProperty(window, 'sessionStorage', {
            value: fakeWindowLocalStorage,
            writable: true
        });

        storage = new Storage();
        storage.set(keyName, {
            value
        });
    });

    afterEach(() => {
        storage = null;
    });

    describe('set method', () => {
        it('should set object with correct keys', () => {
            const setValue = JSON.parse(window.sessionStorage.getItem(keyName));
            expect(Object.keys(setValue)).toEqual(['setTime', 'cacheLimit', 'value']);
        });

        it('should set object with correct values', () => {
            const setValue = JSON.parse(window.sessionStorage.getItem(keyName));
            expect(Object.values(setValue)).toEqual([
                1589454118135,
                1589454418135,
                {
                    value: 'Hello'
                }
            ]);
        });
    });

    describe('remove method', () => {
        it('should remove keyNamed value', () => {
            expect(window.sessionStorage.length).toBe(1);
            storage.remove(keyName);
            expect(window.sessionStorage.length).toBe(0);
        });
    });

    describe('has method', () => {
        it('should return false if keyNamed key does not exist', () => {
            expect(storage.has('bob')).toBe(false);
        });

        it('should return true if keyNamed key exists', () => {
            expect(storage.has(keyName)).toBe(true);
        });
    });

    describe('get method', () => {
        it('should return the value if it exists', () => {
            expect(storage.get(keyName)).toBeTruthy();
        });

        it('should return undefined if value does not exist', () => {
            expect(storage.get('bob')).toBeUndefined();
        });
    });

    describe('clear method and length method', () => {
        it('should clear all the data', () => {
            expect(window.sessionStorage.length).toBe(1);
            storage.clear();
            expect(window.sessionStorage.length).toBe(0);
        });
    });

    /**
     * note this method test relies on the order of the mocked Date.now (above)
     */
    describe('shouldUpdateCache method', () => {
        it('should return true if utc is expired', () => {
            // use -1 as it will set the cache to a millisecond before Date.now()
            storage.set(
                'expired',
                {
                    value
                },
                -1
            );

            expect(storage.shouldUpdateCache('expired')).toBe(true);
        });

        it('should return true if key does not exist', () => {
            expect(storage.shouldUpdateCache('bob')).toBe(true);
        });

        it('should return false if the utc is not expired', () => {
            expect(storage.shouldUpdateCache(keyName)).toBe(false);
        });
    });

    describe('getValidCache', () => {
        it('should return false when item does not exist', () => {
            expect(storage.getValidCache('bob')).toBe(false);
        });

        it('should return false when item exist and cache is out', () => {
            // use -1 as it will set the cache to a millisecond before Date.now()
            storage.set(keyName, { value }, -1);
            expect(storage.getValidCache(keyName)).toBe(false);
        });

        it('should return cached item when item exists and cache limit is still valid', () => {
            expect(storage.getValidCache(keyName)).toEqual({
                value
            });
        });
    });
});