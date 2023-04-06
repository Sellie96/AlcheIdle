import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
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

    if (changes['timestamp'] && !changes['timestamp'].firstChange) this._refresh$.next(true);
  }

  ngOnInit(): void {
    this.startTimer()
  }

  startTimer() {
    
    this.renderer.removeStyle(this.elementRef.nativeElement.shadowRoot?.firstChild, 'transform');
    this.renderer.setStyle(this.elementRef.nativeElement.shadowRoot?.firstChild, 'width', `10%`);
  }


  ngOnDestroy(): void {
    this._destroyer$.next(true);
    this._destroyer$.unsubscribe();
    this._refresh$.unsubscribe();
    this.sub.unsubscribe();
  
    // reset this._timestampTime and this.now2 before starting a new countdown
    this._timestampTime = DateTime.fromMillis(this.timestamp * 1000);
    this.now2 = DateTime.now();
  
    this.startTimer();
  }


}