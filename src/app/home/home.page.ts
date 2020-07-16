import { Component, OnInit, ViewChild } from '@angular/core';
import { IonVirtualScroll } from '@ionic/angular';
import { SupportVirtualScrollService } from '../services/support-virtual-scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private supportVirtualScroll: SupportVirtualScrollService,
  ) {}

  @ViewChild(IonVirtualScroll, { static: true }) virtualScroll: IonVirtualScroll;
  public items = Array.from({length: 10}, (_, i) => ({ id: i, name: `${i}`}));
  private itemId = 10;
  public itemHeight = () => 44;

  public addItems(position: 'top' | 'last') {
    this.itemId ++;
    const newItem = (position === 'top') ?
      [{ id: this.itemId, name: `TopItem-${this.itemId}` }].concat(this.items)
      : this.items.concat([{ id: this.itemId, name: `BottomItem-${this.itemId}` }]);
    this.changeVirtualScroll(this.items, newItem);
  }

  public changeItems(itemId: number) {
    const newItem = this.items.map(d => {
      if (d.id === itemId) {
        d.name = 'ChangeItem-' + d.id;
      }
      return d;
    });
    this.changeVirtualScroll(this.items, newItem);
  }

  public deleteItems(itemId: number) {
    const newItem = this.items.filter(d => {
      return d.id !== itemId;
    });
    this.changeVirtualScroll(this.items, newItem);
  }

  public resetItem() {
    const newItem = Array.from({length: 10}, (_, i) => ({ id: i, name: `${i}`}));
    this.changeVirtualScroll(this.items, newItem);
  }

  private changeVirtualScroll(bindingItem, incomingItem) {
    const { trackByArray, dirtyCheckPosition, changeRangePositions } =
      this.supportVirtualScroll.diff(bindingItem, incomingItem, this.trackByFn);
    this.items = trackByArray as any;
    if (dirtyCheckPosition !== null) {
      this.virtualScroll.checkRange(dirtyCheckPosition);
    }
    changeRangePositions.forEach(range => {
      this.virtualScroll.checkRange(range.offset, range.range);
    });
  }

  private trackByFn = (index, item) => item.id;
}
