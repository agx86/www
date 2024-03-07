"use server";

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL as string;
import { headers } from "next/headers";

const IP = () => {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = headers().get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
};

export const submitForm = async (e: FormData) => {
  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: IP() + "\n" + e.get("email") + "\n" + e.get("message"),
    }),
  });
};
