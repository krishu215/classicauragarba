import type { Config } from "@netlify/functions";
import { deliverEmails } from "../../src/server/mail.server";

export default async () => {
  await deliverEmails();
};

export const config: Config = { schedule: "*/5 * * * *" };
