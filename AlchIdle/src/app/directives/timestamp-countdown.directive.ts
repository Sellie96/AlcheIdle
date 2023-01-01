import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DateTime } from 'luxon';
import { repeatWhen, Subject, takeUntil, takeWhile, timer } from 'rxjs';

@UntilDestroy()
@Directive({
  selector: '[appTimestampCountdown]'
})
export class TimestampCountdownDirective implements OnInit, OnChanges, OnDestroy {

  @Input() timestamp!: number;

  @Output() isFinished: EventEmitter<boolean> = new EventEmitter();

  private _timestampTime!: DateTime;

  private _destroyer$: Subject<boolean> = new Subject<boolean>();
  private _refresh$: Subject<boolean> = new Subject();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this._timestampTime = DateTime.fromMillis(this.timestamp * 1000);

    if(changes['timestamp'] && !changes['timestamp'].firstChange) this._refresh$.next(true);
  }

  ngOnInit(): void {
    timer(0, 100).pipe(
      takeUntil(this._destroyer$),
      repeatWhen(() => this._refresh$.pipe(
        takeWhile(() => true)
      )
      ),
      untilDestroyed(this)
    ).subscribe(() => {
      const now = DateTime.now();
      const diffMili = this._timestampTime.diff(now);

      if(diffMili.milliseconds <= 0) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', '00:00:00:00');
        this.isFinished.next(true);
        this._destroyer$.next(true);
      } else {
        this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', diffMili.toFormat('ss:S') + 's');
      }
    });
  }

  ngOnDestroy(): void {
    this._destroyer$.next(true);
    this._destroyer$.unsubscribe();
    this._refresh$.unsubscribe();
  }

}