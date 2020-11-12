
import "@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';
//   import { alert, notice, info, success, error } from '@pnotify/core';
import { alert, defaultModules } from '@pnotify/core/';

// import * as PNotifyBootstrap4 from '@pnotify/bootstrap4';
// import * as PNotifyFontAwesome4 from '@pnotify/font-awesome4';
// import * as PNotifyMobile from '@pnotify/mobile';
// import * as PNotifyAnimate from '@pnotify/animate';

// defaultModules.set(PNotifyBootstrap4, {});
// defaultModules.set(PNotifyFontAwesome4, {});
// defaultModules.set(PNotifyMobile, {});
// defaultModules.set(PNotifyAnimate, {});

import { Stack } from '@pnotify/core';

// const stackContext = document.createElement('div');
// stackContext.classList.add('notify-alerts');
// document.body.append(stackContext);

const myStack = new Stack({
  dir1: 'down',
  // dir2: 'left',
  firstpos1: 125,
  firstpos2: 25,
  spacing1: 36,
  spacing2: 36,
  push: 'left',
    context: document.querySelector('.find-country__alert')
});

const options = {
        title: "Something went wrong.",
        // text: "I'm an alert.",
  type: 'error',
        delay: 8000,
        mouseReset: true,
        stack: myStack

    }

function pnotifyOptions(options = {}) { 
 
}



export { options, alert };