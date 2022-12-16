import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { ChildActivationStart } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DateTime } from 'luxon';
import { repeatWhen, Subject, takeUntil, takeWhile, timer } from 'rxjs';

@UntilDestroy()
@Directive({
  selector: '[appTimestampCountdownProgress]'
})
export class TimestampCountdownDirectiveProgress implements OnInit, OnChanges, OnDestroy {

  @Input() timestamp!: number;

  @Output() isFinished: EventEmitter<boolean> = new EventEmitter();

  private _timestampTime!: any;

  private _destroyer$: Subject<boolean> = new Subject<boolean>();
  private _refresh$: Subject<boolean> = new Subject();

  private now2: any = DateTime.now();

  private sub: any;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this._timestampTime = DateTime.fromMillis(this.timestamp * 1000);

    if(changes['timestamp'] && !changes['timestamp'].firstChange) this._refresh$.next(true);
  }

  ngOnInit(): void {
    this.startTimer()
  }

startTimer() {
  const interval = 10; // interval in milliseconds
  this.sub = timer(0, interval)
    .pipe(
      takeUntil(this._destroyer$),
      repeatWhen(() => this._refresh$.pipe(
        takeWhile(() => true)
      )),
      untilDestroyed(this)
    )
    .subscribe(() => {
      const now: any = DateTime.now();
      const diffMili = this._timestampTime.diff(now);

      // Calculate percentage of elapsed time
      const total = this._timestampTime - this.now2;
      const progress = now - this.now2;
      let currPercent = Math.round((progress / total) * 100);

      this.renderer.removeStyle(this.elementRef.nativeElement.children[0].children[2], 'transform');

      if (diffMili.milliseconds <= interval) {
        this.now2 = now;
        currPercent = 0;
        this.sub.unsubscribe();
        this._destroyer$.next(true);
        this.isFinished.next(true);
        this.startTimer();
      } else {
        this.renderer.setStyle(this.elementRef.nativeElement.children[0].children[2], 'width', `${currPercent}%`);
      }
    });
}


  ngOnDestroy(): void {
    this._destroyer$.next(true);
    this._destroyer$.unsubscribe();
    this._refresh$.unsubscribe();
    this.sub.unsubscribe();
  }

}