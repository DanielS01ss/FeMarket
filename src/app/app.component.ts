import { Component, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MarketPlace';
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (localStorage.getItem('theme') == 'white') {
      this.darkmode();
    } else {
      this.lightmode();
    }
  }

  private setLogoSrc(isLightMode: boolean) {
    const agora = document.getElementById('agora-logo') as HTMLImageElement;
    if (agora) {
      const src = isLightMode ? 'assets/icons/agora.png' : 'assets/icons/agora_light.png';
      this.renderer.setAttribute(agora, 'src', src);
      const alt = isLightMode ? 'Light Mode Logo' : 'Dark Mode Logo';
      this.renderer.setAttribute(agora, 'alt', alt);
    }
  }

  darkmode() {
    localStorage.setItem('theme', 'white');
    let dark = document.getElementById('dark');
    let light = document.getElementById('light');
    if (dark) {
      dark.style.visibility = 'hidden';
      if (light) {
        light.style.visibility = 'visible';
      }
      this.setLogoSrc(true);
    }
    if (localStorage.getItem('theme') == 'white') {
      const rootElement = document.documentElement;
      rootElement.style.setProperty('--background-color', '#111');
      rootElement.style.setProperty('--white', 'white');
      rootElement.style.setProperty('--third-background', '#444');
      rootElement.style.setProperty('--second-background', '#2b2a2a');
      rootElement.style.setProperty('--transision-background', '#222');
      rootElement.style.setProperty('--shading', 'hsla(0, 0%, 100%, 0.07)');
      rootElement.style.setProperty('--border-color', '#252525');
      rootElement.style.setProperty('--span-color', '#fff');
    }
  }

  lightmode() {
    localStorage.setItem('theme', 'dark');
    let dark = document.getElementById('dark');
    let light = document.getElementById('light');
    if (light) {
      light.style.visibility = 'hidden';
      if (dark) {
        dark.style.visibility = 'visible';
      }
      this.setLogoSrc(false);
    }
    if (localStorage.getItem('theme') == 'dark') {
      const rootElement = document.documentElement;
      rootElement.style.setProperty('--background-color', '#fff');
      rootElement.style.setProperty('--white', 'black');
      rootElement.style.setProperty('--third-background', '#9e9e9e');
      rootElement.style.setProperty('--second-background', '#9e9e9e');
      rootElement.style.setProperty('--transision-background', '#eee');
      rootElement.style.setProperty('--shading', 'rgba(30,37,48,.07)');
      rootElement.style.setProperty('--border-color', '#ddd');
      rootElement.style.setProperty('--span-color', '#666');
    }
  }
}
