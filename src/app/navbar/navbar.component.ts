import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ElementRef, HostListener} from '@angular/core';
import { MatButton } from '@angular/material';
import { Overlay, OverlayConfig, OverlayRef, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        overflow: 'hidden',
        height: '*',
      })),
      state('out', style({
        overflow: 'hidden',
        height: '0px',
      })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class NavbarComponent implements OnInit {
	
  @ViewChild('overlayMenuList') overlayMenuList: TemplateRef<any>;
  @ViewChild('originFab') originFab: MatButton;

  overlayRef: OverlayRef;
  overlayDropped: string = 'out';
  scrollStrategy: ScrollStrategy;
  width: number;

	constructor(private overlay: Overlay, 
    private viewContainerRef: ViewContainerRef, 
    private readonly sso: ScrollStrategyOptions,
    private auth: AuthService) {}

  ngOnInit() {
  	this.width = window.innerWidth;
    const strategy = this.overlay
      .position()
      // .connectedTo(this.originFab._elementRef, { originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' })
      .global()
      .centerHorizontally()


    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: strategy,
      scrollStrategy: this.sso.block()
    });
    this.overlayRef = this.overlay.create(config);

    this.overlayRef.backdropClick().subscribe(() => {
    	this.overlayDropped = 'out';
	    setTimeout(()=>{this.overlayRef.detach();},250);      	
    });
  }

  displayMenu() {
	  if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayDropped = 'out';
      setTimeout(()=>{this.overlayRef.detach();},250);
    } else {
      this.overlayRef.attach(new TemplatePortal(this.overlayMenuList, this.viewContainerRef));
      this.overlayDropped = 'in';
    }	
  }
  closeMenu() {
    this.overlayDropped = 'out';
    setTimeout(()=>{this.overlayRef.detach();},250);     
  }
  @HostListener('window: resize', ['$event'])
  onResize(event) {
    this.width = event.target.innerWidth;
  }

}
