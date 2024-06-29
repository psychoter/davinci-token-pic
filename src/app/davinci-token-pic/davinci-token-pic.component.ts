import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Input,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'davinci-token-pic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './davinci-token-pic.component.html',
  styleUrl: './davinci-token-pic.component.css',
})
export class DavinciTokenPicComponent implements OnDestroy, AfterViewInit {
  @ViewChild('observerRef') observerRef!: ElementRef;
  @Input() network: string = 'hedera';
  @Input() address!: string;
  @Input() pic!: string; // if provided, this url will be loaded as the pictuer and the http request won't be sent
  @Input() size: number = 100;
  @Input() circled: boolean = true; // if true no matter if the picture is square or circle, it will be shown as a circle
  lpNotFoundPlaceholder =
    'https://arweave.net/wW4bp6129XobnasaZbDB4RxdnpipGR8XyK0tUXGiVL0';
  data: any;
  private observer!: IntersectionObserver;

  constructor() {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadData();
            this.observer.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: [0], rootMargin: '500px 0px' }
    );

    if (this.observerRef) this.observer.observe(this.observerRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private loadData(): void {
    if (this.pic) {
      this.data = { pic: this.pic };
      return;
    }

    if (!this.address) {
      console.error(
        'Pics Error: Address is mandatory for loading a token picture.'
      );
      return;
    }

    this.fetchData(this.buildUrl())
      .then((data) => {
        if (data) {
          this.data = data;
        }
      })
      .catch((error) => {
        console.error('DavinciPics Error: ', error);

        // if the token wasn't returned for a reason other than 404, try the backup server
        if (error !== '404') {
          this.fetchData(this.buildUrl(true))
            .then((data) => (this.data = data))
            .catch((finalError) =>
              console.error('Backup DavinciPics Error: ', finalError)
            );
        }
      });
  }

  private fetchData(url: string): Promise<any> {
    return axios
      .get(url, { timeout: 5000 })
      .then((response) => response.data)
      .catch((error) => {
        if (error.code === 'ECONNABORTED') {
          throw 'timeout'; // Throw timeout error for specific handling
        }
        if (error.response && error.response.status === 404) {
          throw '404';
        }
        throw error.response
          ? `Failed with status ${error.response.status}`
          : error.message;
      });
  }

  private buildUrl(isBackup: boolean = false): string {
    const baseUrl = isBackup
      ? 'https://s2.pics.davincigraph.io/api/v2/tokens'
      : 'https://s1.pics.davincigraph.io/api/v2/tokens';
    return `${baseUrl}/${encodeURIComponent(this.network)}/${encodeURIComponent(
      this.address
    )}?scope=narrow&context=false`;
  }
}
