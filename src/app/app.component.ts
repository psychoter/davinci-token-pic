import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DavinciTokenPicComponent } from './davinci-token-pic/davinci-token-pic.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DavinciTokenPicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'DavinciPicAngular';
}
