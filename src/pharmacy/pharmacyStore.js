import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCurrentUser } from '../auth/authStore.js';
import { createInitialPharmacyData } from './pharmacyData.js';

const STORE_PREFIX = 'tebyan-pharmacy';
const STORE_VERSION = 'v1';
const EVENT_NAME = 'tebyan:pharmacy-data-changed';

function clone(value) {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

export function pharmacyStorageKey(userId = getCurrentUser()?.id) {
  return `${STORE_PREFIX}-${userId || 'guest'}-${STORE_VERSION}`;
}

function mergeStoredData(stored, initial) {
  if (!stored || typeof stored !== 'object') return clone(initial);

  return {
    ...initial,
    ...stored,
    profile: { ...initial.profile, ...(stored.profile || {}) },
    settings: { ...initial.settings, ...(stored.settings || {}) },
    orders: Array.isArray(stored.orders) ? stored.orders : initial.orders,
    inventory: Array.isArray(stored.inventory) ? stored.inventory : initial.inventory,
    consultations: Array.isArray(stored.consultations) ? stored.consultations : initial.consultations,
    conversations: Array.isArray(stored.conversations) ? stored.conversations : initial.conversations,
    notifications: Array.isArray(stored.notifications) ? stored.notifications : initial.notifications,
    reportSeries: Array.isArray(stored.reportSeries) ? stored.reportSeries : initial.reportSeries,
  };
}

export function getPharmacyData() {
  const user = getCurrentUser() || {};
  const initial = createInitialPharmacyData(user);

  try {
    const raw = localStorage.getItem(pharmacyStorageKey(user.id));
    if (!raw) return clone(initial);
    return mergeStoredData(JSON.parse(raw), initial);
  } catch {
    return clone(initial);
  }
}

export function savePharmacyData(nextData) {
  const next = {
    ...nextData,
    lastUpdatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(pharmacyStorageKey(), JSON.stringify(next));
  } catch {
    // تبقى الواجهة عاملة حتى لو كان التخزين المحلي غير متاح.
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: next }));
  }

  return next;
}

export function resetPharmacyData() {
  const next = createInitialPharmacyData(getCurrentUser() || {});
  return savePharmacyData(next);
}

export function subscribePharmacyData(callback) {
  if (typeof window === 'undefined') return () => {};

  const handler = (event) => callback(event.detail || getPharmacyData());
  const storageHandler = (event) => {
    if (event.key === pharmacyStorageKey()) callback(getPharmacyData());
  };

  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', storageHandler);

  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', storageHandler);
  };
}

export function usePharmacyStore() {
  const [data, setData] = useState(() => getPharmacyData());

  useEffect(() => subscribePharmacyData(setData), []);

  const setAll = useCallback((updater) => {
    setData((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater;
      return savePharmacyData(next);
    });
  }, []);

  const updateSection = useCallback((section, updater) => {
    setAll((current) => {
      const currentSection = current[section];
      const nextSection = typeof updater === 'function' ? updater(currentSection) : updater;
      return { ...current, [section]: nextSection };
    });
  }, [setAll]);

  const updateOrder = useCallback((orderId, updater) => {
    updateSection('orders', (orders) =>
      orders.map((order) => {
        if (order.id !== orderId) return order;
        return typeof updater === 'function' ? updater(order) : { ...order, ...updater };
      }),
    );
  }, [updateSection]);

  const updateInventoryItem = useCallback((medicineId, updater) => {
    updateSection('inventory', (items) =>
      items.map((item) => {
        if (item.id !== medicineId) return item;
        return typeof updater === 'function' ? updater(item) : { ...item, ...updater };
      }),
    );
  }, [updateSection]);

  const updateConsultation = useCallback((consultationId, updater) => {
    updateSection('consultations', (items) =>
      items.map((item) => {
        if (item.id !== consultationId) return item;
        return typeof updater === 'function' ? updater(item) : { ...item, ...updater };
      }),
    );
  }, [updateSection]);

  const updateConversation = useCallback((conversationId, updater) => {
    updateSection('conversations', (items) =>
      items.map((item) => {
        if (item.id !== conversationId) return item;
        return typeof updater === 'function' ? updater(item) : { ...item, ...updater };
      }),
    );
  }, [updateSection]);

  const summary = useMemo(() => ({
    unreadNotifications: data.notifications.filter((notification) => !notification.read).length,
    unreadMessages: data.conversations.reduce((sum, conversation) => sum + Number(conversation.unread || 0), 0),
    newOrders: data.orders.filter((order) => order.status === 'new').length,
    pendingPrescriptions: data.orders.filter((order) =>
      order.prescription && ['pending', 'reviewing', 'clarification'].includes(order.prescription.status),
    ).length,
    stockAlerts: data.inventory.filter((item) => ['low', 'out', 'expiring', 'expired'].includes(item.status)).length,
  }), [data]);

  return {
    data,
    summary,
    setAll,
    updateSection,
    updateOrder,
    updateInventoryItem,
    updateConsultation,
    updateConversation,
  };
}
