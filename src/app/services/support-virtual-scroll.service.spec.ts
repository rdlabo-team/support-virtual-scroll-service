import { TestBed } from '@angular/core/testing';

import { SupportVirtualScrollService } from './support-virtual-scroll.service';

describe('SupportVirtualScrollService', () => {
  let service: SupportVirtualScrollService;
  const trackByFn = (index, item) => item.id;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportVirtualScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add item to bottom', () => {
    const items = Array.from({length: 10}, (_, i) => ({ id: i, name: `${i}`}));
    const newItem = items.concat([{ id: 11, name: `TopItem-11` }]);

    const { trackByArray, dirtyCheckPosition }  = service.diff(items, newItem, trackByFn);
    expect(dirtyCheckPosition).toEqual(10);
    expect(trackByArray.length).toEqual(11);
  });

  it('add item to top', () => {
    const items = Array.from({length: 10}, (_, i) => ({ id: i, name: `${i}`}));
    const newItem = [{ id: 11, name: `TopItem-11` }].concat(items);

    const { trackByArray, dirtyCheckPosition }  = service.diff(items, newItem, trackByFn);
    expect(dirtyCheckPosition).toEqual(null); // because return new Array
    expect(trackByArray.length).toEqual(11);
  });

  it('change item', () => {
    const items = Array.from({length: 10}, (_, i) => ({ id: i, name: `${i}`}));
    const newItem = items.map(d => {
      if (d.id === 5) {
        d.name = 'changeItem';
      }
      return d;
    });

    const { trackByArray }  = service.diff(items, newItem, trackByFn);
    expect(trackByArray[5].name).toEqual('changeItem');
  });

  it('delete item', () => {
    const items = Array.from({length: 10}, (_, i) => ({ id: i, name: `${i}`}));
    const newItem = items.filter(d => d.id !== 5);

    const { trackByArray, dirtyCheckPosition }  = service.diff(items, newItem, trackByFn);
    expect(dirtyCheckPosition).toEqual(5);
    expect(trackByArray.length).toEqual(9);
  });

  it('add and change item', () => {
    const items = Array.from({length: 10}, (_, i) => ({ id: i, name: `${i}`}));
    let newItem = items.concat([{ id: 11, name: `BottomItem-11` }]);
    newItem = newItem.map((d, i) => {
      if (i === 5) {
        d.name = 'ChangeItem-' + d.id;
      }
      return d;
    });

    const { trackByArray, dirtyCheckPosition }  = service.diff(items, newItem, trackByFn);
    expect(dirtyCheckPosition).toEqual(10);
    expect(trackByArray.length).toEqual(11);
    expect(trackByArray[5].name).toEqual('ChangeItem-5');
  });
});
