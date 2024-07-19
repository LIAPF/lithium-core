import { LitElement } from "lit";
import { RouteConfig, Router } from "@lit-labs/router";

export const LithiumEntry = (
  routes: RouteConfig[],
) =>
  class extends LitElement {
    private router: Router = new Router(this, routes);

    public listenHx(config: { event: string, target?: string[] }, action: (c: CustomEvent) => void) {
      const { event, target } = config;
      this.addEventListener(`htmx:${event}`, (e: CustomEvent) => {
        if (!target || (target && target.includes(e.detail.target.getAttribute('id')))) {
          action(e);
        }
      });
    }

    public listen = (eventName: string, action: (e: CustomEvent) => void) => {
      this.addEventListener(eventName, (e: CustomEvent) => {
        action(e);
      });
    }

    render() {
      return this.router.outlet();
    }
  };