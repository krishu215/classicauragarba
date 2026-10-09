import { getSettings } from "@netlify/identity";
import type { UserLoginEvent, UserValidateEvent } from "@netlify/functions";

export default {
  async userValidate(event: UserValidateEvent) {
    try {
      if ((await getSettings()).autoconfirm) return event.deny();
    } catch {
      return event.deny();
    }
  },
  userLogin(event: UserLoginEvent) {
    if (!event.user.confirmedAt) return event.deny();
  },
};
