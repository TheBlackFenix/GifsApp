import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './gif-card.component.html',
  styleUrls: ['./gif-card.component.css']
})
export class GifCardComponent implements OnInit {
  ngOnInit(): void {
    if(!this.gif) throw new Error('Gif Not initialized');
  }

  @Input()
  public gif!: Gif;
}
