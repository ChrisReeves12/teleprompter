import { Component, HostListener } from "@angular/core";

const initialScrollPosition: number = 100;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {


  countDownInterval: any = null;
  containerHeight: number = window.innerHeight;
  contentWidth: number = 35;
  scrollSpeed: number = 10;
  fontSize: number = 30;
  script: string = "";
  isScrolling: boolean = false;
  countDown: number|null = null;
  scrollPosition: number = initialScrollPosition;

  constructor() { }

  ngOnInit() {
  }

  startScrolling(e: any) {
    if (this.isScrolling) {
      return;
    }

    if (this.countDownInterval) {
      clearInterval(this.countDownInterval);
    }

    // Stop if counting down
    if (this.countDown) {
      this.countDown = null;
      return;
    }

    // Start the countdown only if position is at the initial position
    if (this.scrollPosition < (initialScrollPosition - 5)) {
      this.isScrolling = true;
      this._activateScrolling();
      return;
    }

    this.countDown = 3;

    this.countDownInterval = setInterval(() => {
      this.countDown = this.countDown! - 1;
      if (this.countDown === 0) {
        clearInterval(this.countDownInterval);
        this.countDownInterval = null;
        this.isScrolling = true;
        this._activateScrolling();
      }
    }, 1000);
  }

  pauseScrolling(e: any): void {
    this.isScrolling = false;
  }

  setScrollSpeed(e: any) {
    this.scrollSpeed = e.target.value;
  }

  reset(e: any) {
    this.scrollPosition = initialScrollPosition;
    this.isScrolling = false;
  }

  setFontSize(e: any) {
    this.fontSize = e.target.value;
  }

  setScript(e: any) {
    this.script = e.target.value;
  }

  setContentWidth(e: any) {
    this.contentWidth = e.target.value;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.containerHeight = window.innerHeight;
  }

  _delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async _activateScrolling() {
    while (this.isScrolling) {
      await this._delay(1000 / this.scrollSpeed);
      this.scrollPosition = this.scrollPosition - 1;
    }
  }
}
