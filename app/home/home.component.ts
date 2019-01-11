import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Page } from "ui/page";
import { EventData } from "tns-core-modules/data/observable";
import { AnimationCurve } from 'tns-core-modules/ui/enums/enums';
import { Slider } from "tns-core-modules/ui/slider";
import { Label } from 'tns-core-modules/ui/label/label';
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    sliderRValue: number = 0;
    sliderGValue: number = 0;
    sliderBValue: number = 0;

    @ViewChild("myStack") mySLRef: ElementRef;

    constructor(private _page: Page) {
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
    }

    public onSliderRValueChange(args) {
        let slider = <Slider>args.object;
        this.sliderRValue = slider.value;
        this.letsAnimateSL();
    }

    public onSliderGValueChange(args) {
        let slider = <Slider>args.object;
        this.sliderGValue = slider.value;
        this.letsAnimateSL();
    }

    public onSliderBValueChange(args) {
        let slider = <Slider>args.object;
        this.sliderBValue = slider.value;
        this.letsAnimateSL();
    }

    letsAnimate(args: EventData) {

        let lblView = <Label>args.object;

        lblView.animate({ opacity: 0, duration: 300 })
            .then(() => lblView.animate({ opacity: 1, duration: 300 }))
            .catch((e) => {
                console.log(e.message);
            });
    }

    letsAnimateSL() {

        let slView: StackLayout = this.mySLRef.nativeElement;

        const animation1 = slView.createAnimation(
            {
                scale: { x: 1.1, y: 1.1 },
                duration: 200,
                curve: AnimationCurve.linear
            }
        );
        const animation2 = slView.createAnimation({
            scale: { x: 1, y: 1 },
            duration: 200,
            curve: AnimationCurve.easeOut
        });

        animation1
            .play()
            .then(() => animation2.play())
            .catch(e => {
                console.error(e.message);
            });
    }
}
