export type Frequency = "once" | "monthly";

export type Donation = {
  amount: number;
  frequency: Frequency;
  name: string;
  email: string;
  message: string;
  anonymous: boolean;
  date: string;
};

const KEY = "ojmr-donation";

export const PRESETS = [15, 30, 60, 120];

export function saveDonation(d: Donation) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    /* ignore */
  }
}

export function readDonation(): Donation | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Donation;
    return typeof parsed?.amount === "number" ? parsed : null;
  } catch {
    return null;
  }
}

export function clearDonation() {
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function paypalUrl(base: string, amount: number) {
  return `${base.replace(/\/$/, "")}/${amount}EUR`;
}