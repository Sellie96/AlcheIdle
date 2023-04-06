import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  selector: '[myTooltip]'
})
export class MyTooltipDirective {
  @Input('myTooltip') tooltipTemplate!: TemplateRef<any>;

  private tooltip!: HTMLElement | null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private viewContainerRef: ViewContainerRef
  ) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    this.tooltip = this.renderer.createElement('div');

    // Create a new view and attach it to the tooltip element
    const view = this.viewContainerRef.createEmbeddedView(this.tooltipTemplate);
    this.renderer.appendChild(this.tooltip, view.rootNodes[0]);

    // Append the tooltip to the host element
    this.renderer.appendChild(this.elementRef.nativeElement, this.tooltip);
  }

  private hideTooltip() {
    if (this.tooltip) {
      // Remove the tooltip and its associated view
      this.viewContainerRef.clear();
      this.renderer.removeChild(this.elementRef.nativeElement, this.tooltip);
      this.tooltip = null;
    }
  }
}
