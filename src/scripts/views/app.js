import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';
import routes from '../routes/routes';
import Favorite from './pages/favorite';

class App {
  constructor({ button, nav, content }) {
    this.__button = button;
    this.__nav = nav;
    this.__content = content;

    this.__initialApp();
  }

  __initialApp() {
    DrawerInitiator.init({
      button: this.__button,
      nav: this.__nav,
      content: this.__content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    if (url === '#/favorite') {
      this.__content.innerHTML = await Favorite.render();
      await Favorite.afterRender();
    } else {
      this.__content.innerHTML = await page.render();
      await page.afterRender();
    }
  }
}

export default App;
