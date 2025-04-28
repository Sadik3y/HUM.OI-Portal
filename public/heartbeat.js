import { soulLinkExchange } from './soul-link.js';

export function startHeartbeat() {
  setInterval(() => {
    soulLinkExchange();
  }, 180000); // Every 3 minutes
}
