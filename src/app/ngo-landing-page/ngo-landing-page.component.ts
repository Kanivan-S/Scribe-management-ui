import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-ngo-landing-page',
  templateUrl: './ngo-landing-page.component.html',
  styleUrls: ['./ngo-landing-page.component.scss']
})
export class NgoLandingPageComponent {

ngOnInit(){

  (function(d, m){
    var kommunicateSettings = {"appId":"384cc0465c56b972ef0bb3036b8937a65","popupWidget":true,"automaticChatOpenOnNavigation":true};
    var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
    s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
    var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
    (window as any).kommunicate = m; m._globals = kommunicateSettings;
})(document, (window as any).kommunicate || {});
}
  
}
