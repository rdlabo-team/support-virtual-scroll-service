![CI](https://github.com/rdlabo-team/support-virtual-scroll-service/workflows/CI/badge.svg)
[![DEMO](https://img.shields.io/badge/DEMO-Netlify-blue)](https://support-virtual-scroll-service.netlify.app)

# SupportVirtualScrollService for @ionic/angular

Demo is [here](https://support-virtual-scroll-service.netlify.app/).

## Description

This is support `ion-virtual-scroll` service sample in angular instead of `trackBy`. `trackBy` in `ion-virtual-scroll` don't work.(2020-07-17 now):

https://github.com/ionic-team/ionic-framework/issues/17540

But if you use this service instead of `trackBy`, re-rendering is improved bit.

## How to use
1. Copy [support-virtual-scroll.service.ts](https://github.com/rdlabo-team/angular-ion-virtual-scroll-example/blob/master/src/app/services/support-virtual-scroll.service.ts) to in project.
2. Check [example](https://github.com/rdlabo-team/support-virtual-scroll-service/blob/master/src/app/home/home.page.ts#L62-L72) for getting how to use.

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


#### Sample using:
```
const { trackByArray, dirtyCheckPosition, changeRangePositions } =
      this.supportVirtualScroll.diff(this.items, incomingItem, this.trackByFn);
```

## What pattern worked
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

- Overwrite by new variable or change items is worked
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

