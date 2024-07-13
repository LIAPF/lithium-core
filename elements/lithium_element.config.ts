import { LitElement, unsafeCSS } from 'lit';
import { SignalWatcher } from '@lit-labs/preact-signals';
import htmx from 'htmx.org';

import { OutputEventOption } from "../interface/event.interface";

export const LithiumElement = (globalStyle?: string, style?: string) => {
  return class extends SignalWatcher(LitElement) {
    static styles = [unsafeCSS(globalStyle), unsafeCSS(style)];

    updated() {
        htmx.process(this.shadowRoot);
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
