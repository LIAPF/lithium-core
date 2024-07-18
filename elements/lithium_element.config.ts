import { LitElement, unsafeCSS } from 'lit';
import { SignalWatcher } from '@lit-labs/preact-signals';
import htmx from 'htmx.org';

import { OutputEventOption } from "../interface/event.interface";

export const LithiumElement = (globalStyle?: string, style?: string) => {
  return class extends SignalWatcher(LitElement) {
    static styles = [unsafeCSS(globalStyle), unsafeCSS(style)];

    updated() {
        htmx.process(this.shadowRoot);
        htmx.config.selfRequestsOnly = false;
    }

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
    };

    public output(
      name: string,
      data: any = undefined,
      options: OutputEventOption = { bubbles: true, composed: true }
    ) {
      this.dispatchEvent(
        new CustomEvent(name, {
          detail: data,
          bubbles: options?.bubbles ?? true,
          composed: options?.composed ?? true,
        })
      );
    }
  };
};
