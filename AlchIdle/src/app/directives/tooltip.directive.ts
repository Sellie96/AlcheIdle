import { Directive, ElementRef, Inject, Input, OnInit, SecurityContext, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
    constructor(private elementRef: ElementRef,
        @Inject(DomSanitizer) private sanitizer: DomSanitizer
        ) { }

    @Input() html!: TemplateRef<any>;

    ngOnInit() {
        // Get the image element
        const imageElement = this.elementRef.nativeElement;

        // Create the tooltip element and append it to the image element
        const tooltipElement = document.createElement('div');
        tooltipElement.classList.add('tooltip');
        imageElement.appendChild(tooltipElement);

        // Set up the mouseenter event listener to show the tooltip
        imageElement.addEventListener('mouseenter', () => {
            tooltipElement.style.position = 'absolute';
            tooltipElement.style.top = '0';
            // Show the tooltip
            tooltipElement.style.zIndex = '9999';
            tooltipElement.style.display = 'block';
            tooltipElement.style.backgroundColor = '#663399';

            // Set the font and text style of the tooltip element
            tooltipElement.style.fontFamily = 'Arial, sans-serif';
            tooltipElement.style.fontSize = '14px';
            tooltipElement.style.color = 'white';
            tooltipElement.style.textAlign = 'center';

            // Set the background color and border of the tooltip element
            tooltipElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltipElement.style.border = '1px solid #333';
            tooltipElement.style.borderRadius = '4px';

            // Set the padding and box shadow of the tooltip element
            tooltipElement.style.padding = '8px';
            tooltipElement.style.boxShadow = '2px 2px 8px rgba(0, 0, 0, 0.5)';

            // Set the width and max-width of the tooltip element
            tooltipElement.style.width = '400px';

            // Set the position and left offset of the tooltip element
            tooltipElement.style.position = 'absolute';
            tooltipElement.style.left = '100%';

            if (this.html) {
                // Create a view container to hold the template
                const viewContainer = document.createElement('div');
                // Append the view container to the tooltip element
                tooltipElement.appendChild(viewContainer);
                // Create a view using the template and the view container
                const viewRef = this.html.createEmbeddedView(null);
                // Append the view to the view container
                viewRef.rootNodes.forEach(rootNode => {
                    viewContainer.appendChild(rootNode);
                });
            }
        });

        // Set up the mouseleave event listener to hide the tooltip
        imageElement.addEventListener('mouseleave', () => {
            // Hide the tooltip
            tooltipElement.innerHTML = '';
            tooltipElement.style.zIndex = '0';
            tooltipElement.style.display = 'none';
        });
    }
}
