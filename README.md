# SupportVirtualScrollService

## Description

This is support `ion-virtual-scroll` service sample in angular instead of `trackBy`. `trackBy` don't work.(2020-07-17 now):

https://github.com/ionic-team/ionic-framework/pull/21762

But if you use this instead of `trackBy`, re-rendering is slightly improved.

## How to use
1. Copy service( https://github.com/rdlabo-team/angular-ion-virtual-scroll-example/blob/master/src/app/services/support-virtual-scroll.service.ts ) to in project

## Method
### diff(bindingItem: any[], incomingItem: any[], trackByFn:TrackByFunction<any>)
Return interface:
```
{
  changeRangePositions: {
    offset: number;
    range: number;
  }[];
  dirtyCheckPosition: number | null;
  trackByArray: any[];
}
```

- changeRangePositions: This tell you must dirty check range
- dirtyCheckPosition: This tell you must dirty check under item position
- trackByArray: This must be substitute to binding item


#### Using sample:
```
const { trackByArray, dirtyCheckPosition, changeRangePositions } =
      this.supportVirtualScroll.diff(this.items, incomingItem, this.trackByFn);
```

## What is patten worked
### 1. work well

- Add items to bottom is worked well
```
items = [
  { id: 1, name: 'ionic' },
  { id: 2, name: 'angular' },
];

incomingItem = [
  { id: 1, name: 'ionic' },
  { id: 2, name: 'angular' },
  { id: 3, name: 'react' },   // added
}

trackByFn = (index, item) => item.id;
```

- Overwrite by new variable and change items is fixed
```
items = [
  { id: 1, name: 'ionic' },
  { id: 2, name: 'angular' },
];

incomingItem = [
  { id: 1, name: 'ionic' },
  { id: 2, name: 'angular10' }, // changed
}

trackByFn = (index, item) => item.id;
```

### 2. work improved
- Add items to middle position is worked, but under item added is be re-render
```
items = [
  { id: 1, name: 'ionic' },
  { id: 2, name: 'angular' },  // re-render
];

incomingItem = [
  { id: 1, name: 'ionic' },
  { id: 3, name: 'react' },   // added
  { id: 2, name: 'angular' },
}

trackByFn = (index, item) => item.id;
```

### 3. has bug
- Delete items to middle => has trouble rendering(maybe ionic/core's bug)

