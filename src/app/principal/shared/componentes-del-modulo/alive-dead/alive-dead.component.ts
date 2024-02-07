import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alive-dead',
  templateUrl: './alive-dead.component.html',
  styleUrls: ['./alive-dead.component.scss']
})
export class AliveDeadComponent {

  @Input() species!: string;

@Input() status!: string;

}
