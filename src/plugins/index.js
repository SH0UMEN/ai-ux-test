/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify';
import pinia from './store';
import router from '@/plugins/router.js';

export function registerPlugins(app) {
	app.use(vuetify);
	app.use(pinia);
	app.use(router);
}
