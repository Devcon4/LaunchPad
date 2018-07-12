import { Component, Input, HostBinding, ElementRef, ViewChild } from '@angular/core';
import { ContentKey } from '../../post-editor/post-editor.component';
import { Content } from '../../../models/content';
import { Action } from '../../../helpers/action';
import { filter, debounceTime, skip } from 'rxjs/operators';
import { Engine, GameObject, Vector2 } from 'devcanvas';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ContentService } from '../../../firebaseDataAccessLayer/content.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-paragraph-content',
  templateUrl: './paragraph-content.component.html',
  styleUrls: ['./paragraph-content.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('*', style({ 'opacity': 1 })),
      state('void', style({ 'opacity': 0 })),
      transition('* => void', [
          style({ opacity: 1 }),
          animate(250, style({ opacity: 0 }))
      ]),
      transition('void => *', [
          style({ opacity: 0 }),
          animate(250, style({ opacity: 1 }))
      ])
    ])
  ]
})
@ContentKey('paragraph')
export class ParagraphContentComponent {
  
  @Input() content: Action<Content> = new Action();
  
  @HostBinding(`class`) widthClass;
  @ViewChild('canvas') private _canvas: ElementRef;
  @ViewChild('canvasWrapper') private _canvasWrapper: ElementRef;
  
  mouseOvered = false;
  paragraph = new FormControl();
  
  private _engine: Engine;

  private _textConstructor = () => new GameObject({
    name: 'Text',
    position: {x:0, y:0},
    velocity: {x:0, y:0},
    render: ctx => obj => {
      if(ctx instanceof CanvasRenderingContext2D) {
        ctx.strokeStyle = '#44edbc';
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.strokeRect(
          -this._engine.size.halfWidth + obj.props.pointSize.radius + obj.props.pointSize.padding,
          -this._engine.size.halfHeight + obj.props.pointSize.radius + obj.props.pointSize.padding,
          this._engine.size.width - 2 * (obj.props.pointSize.radius + obj.props.pointSize.padding),
          this._engine.size.height - 2 * (obj.props.pointSize.radius + obj.props.pointSize.padding)
        );
        ctx.closePath();
        ctx.stroke();

        let points = [
          new Vector2({x: -this._engine.size.halfWidth + obj.props.pointSize.radius + obj.props.pointSize.padding, y: this._engine.size.halfHeight - obj.props.pointSize.radius - obj.props.pointSize.padding}),
          new Vector2({x: this._engine.size.halfWidth - obj.props.pointSize.radius - obj.props.pointSize.padding, y: this._engine.size.halfHeight - obj.props.pointSize.radius - obj.props.pointSize.padding}),
          new Vector2({x: this._engine.size.halfWidth - obj.props.pointSize.radius - obj.props.pointSize.padding, y: -this._engine.size.halfHeight + obj.props.pointSize.radius + obj.props.pointSize.padding}),
          new Vector2({x: -this._engine.size.halfWidth + obj.props.pointSize.radius + obj.props.pointSize.padding, y: -this._engine.size.halfHeight + obj.props.pointSize.radius + obj.props.pointSize.padding}),
        ]
        
        ctx.fillStyle = '#44edbc';

        for (const point of points) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, obj.props.pointSize.radius, 0, 2*Math.PI);
          ctx.closePath();
          ctx.fill();
        }

      }
    },
    props: {
      pointSize: {
        radius: 6,
        padding: 0
      }
    }
  });

  constructor(public contentService: ContentService) {
    this.content.subject.pipe(filter(c => !!c)).subscribe(c => {
      this.widthClass = `width-${c.width}`;
      this.paragraph.setValue(c.text);
    });

    this.paragraph.valueChanges.pipe(skip(1), debounceTime(1000)).subscribe(v => {
      let copy = {...this.content.state, text: v };
      delete copy['component'];
      this.contentService.updateDoc(this.content.state.id, copy as Content);
    });
  }

  fitToContainer() {
    setTimeout(() => {
      this._engine = new Engine(this._canvas.nativeElement, this._canvas.nativeElement.getContext('2d'));
      this._engine.gameObjects.push(this._textConstructor());
      this._canvas.nativeElement.style.width ='100%';
      this._canvas.nativeElement.style.height='100%';
      this._canvas.nativeElement.width  = this._canvasWrapper.nativeElement.offsetWidth;
      this._canvas.nativeElement.height = this._canvasWrapper.nativeElement.offsetHeight;

      this._engine.resize();
    });

  }
}
