# DavinciTokenPicComponent

The `DavinciTokenPicComponent` is an Angular component designed for fetching and displaying images of cryptocurrency tokens from the davinciPics API. It supports displaying pictures for individual tokens as well as liquidity pool (LP) tokens. This component integrates smoothly into any Angular application and handles both direct token image URLs and fetching from the API based on network and token address.

## Features

**Dynamic Image Fetching:** Automatically fetches token images based on the provided network and address.

**Fallback Handling:** Utilizes a backup API endpoint in case the primary request fails.

**Lazy Loading:** Images are only loaded as they are about to enter the viewport, optimizing resource usage and performance.

**Customizable Appearance:** Allows for customization of image size and shape (circular or square).

## Attributes

**network:** Specifies the blockchain network of the token. Default is 'hedera'.

**address:** The contract address of the token for which to fetch the image. This is a required attribute.

**pic:** A direct URL to a token image. If provided, bypasses the API fetch and uses this URL directly.

**size:** Size of the image in pixels. Defaults to 100.

**circled:** Boolean indicating whether the image should be displayed as a circle. Defaults to true, making the image circular regardless of its original shape.

## Installation

To use DavinciTokenPicComponent in your project, ensure you have Angular installed and then copy the `src/app/davinci-token-pic` directory in your module:

```JAVSCRIPT
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DavinciTokenPicComponent } from './path/to/davinci-token-pic.component';

@NgModule({
  declarations: [
    AppComponent,
    DavinciTokenPicComponent  // Declare the component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## Usage Examples

### Basic Usage

Simply add the component to your Angular template and provide the required attributes:

```JAVASCRIPT
<davinci-token-pic
  network="ethereum"
  address="0x...contract address..."
  size="150"
  circled="false">
</davinci-token-pic>
```

### With Direct Image URL

If you have a direct URL to the token image:

```JAVASCRIPT
<davinci-token-pic
  pic="https://example.com/path/to/image.jpg"
  size="200"
  circled="true">
</davinci-token-pic>

```
