import { ThermometerData } from "@/types";

interface HeatRecord {
  count: number;
  cooldownUntil?: number;
}

const MAX_REQUESTS = 5;
const COOLDOWN_MS = 1000 * 60 * 60; // 1 hour

const store: Record<string, HeatRecord> = {};

function cleanup(record: HeatRecord) {
  if (record.cooldownUntil && Date.now() > record.cooldownUntil) {
    record.count = 0;
    record.cooldownUntil = undefined;
  }
}

function toData(record: HeatRecord): ThermometerData {
  const level = Math.min(100, (record.count / MAX_REQUESTS) * 100);
  return {
    currentLevel: level,
    maxRequests: MAX_REQUESTS,
    currentRequests: record.count,
    cooldownDate: record.cooldownUntil ? new Date(record.cooldownUntil).toISOString() : undefined,
  };
}

export function getHeat(clientId: string): ThermometerData {
  const record = store[clientId] || { count: 0 };
  cleanup(record);
  store[clientId] = record;
  return toData(record);
}

export function recordRequest(clientId: string): { blocked: boolean; data: ThermometerData } {
  const record = store[clientId] || { count: 0 };
  cleanup(record);

  if (record.cooldownUntil && Date.now() < record.cooldownUntil) {
    return { blocked: true, data: toData(record) };
  }

  record.count += 1;
  if (record.count >= MAX_REQUESTS) {
    record.cooldownUntil = Date.now() + COOLDOWN_MS;
  }

  store[clientId] = record;
  return { blocked: false, data: toData(record) };
}
