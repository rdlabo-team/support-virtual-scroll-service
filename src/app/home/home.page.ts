import { Component, OnInit, ViewChild } from '@angular/core';
import { IonVirtualScroll } from '@ionic/angular';
import { SupportVirtualScrollService } from '../services/support-virtual-scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonVirtualScroll, { static: true }) virtualScroll: IonVirtualScroll;
  items = Array.from({length: 10}, (_, i) => ({ id: i, name: `${i}`}));
  itemHeight = () => 44;
  itemId = 10;

  constructor(
    private supportVirtualScroll: SupportVirtualScrollService,
  ) {}

  addItems(position: 'top' | 'last') {
    this.itemId ++;
    const newItem = (position === 'top') ?
      [{ id: this.itemId, name: `TopItem-${this.itemId}` }].concat(this.items)
      : this.items.concat([{ id: this.itemId, name: `BottomItem-${this.itemId}` }]);

    /**
     * USE API
     */
    const { trackByArray, dirtyCheckPosition } = this.supportVirtualScroll.diff(this.items, newItem, this.trackByFn);
    this.items = trackByArray as any;
    if (dirtyCheckPosition !== null) {
      this.virtualScroll.checkRange(dirtyCheckPosition);
    }
  }

  changeItems(itemId: number) {
    const newItem = this.items.map(d => {
      if (d.id === itemId) {
        d.name = 'ChangeItem-' + d.id;
      }
      return d;
    });

    /**
     * USE API
     */
    const { trackByArray } = this.supportVirtualScroll.diff(this.items, newItem, this.trackByFn);
    this.items = trackByArray as any;
  }

  deleteItems(itemId: number) {
    const newItem = this.items.filter(d => {
      return d.id !== itemId
    });

    /**
     * USE API
     */
    const { trackByArray, dirtyCheckPosition } = this.supportVirtualScroll.diff(this.items, newItem, this.trackByFn);
    this.items = trackByArray as any;
    if (dirtyCheckPosition !== null) {
      this.virtualScroll.checkRange(dirtyCheckPosition, this.items.length);
    }
  }

  resetItem() {
    const newItem = Array.from({length: 10}, (_, i) => ({ id: i, name: `${i}`}));

    /**
     * USE API
     */
    const { trackByArray, dirtyCheckPosition } = this.supportVirtualScroll.diff(this.items, newItem, this.trackByFn);
    this.items = trackByArray as any;
    console.log([trackByArray.length, dirtyCheckPosition]);
    if (dirtyCheckPosition !== null) {
      this.virtualScroll.checkRange(dirtyCheckPosition);
    }
  }

  trackByFn = (index, item) => item.id;

}
