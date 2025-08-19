'use client'

export type SubscriptionTier = 'basic' | 'premium' | 'enterprise';

export interface SubscriptionData {
  tier: SubscriptionTier;
  renewsAt: string; // ISO string
}

const STORAGE_KEY = 'subscription';

export function loadSubscription(): SubscriptionData | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as SubscriptionData) : null;
}

export function saveSubscription(data: SubscriptionData) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
