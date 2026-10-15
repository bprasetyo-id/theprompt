import fs from 'fs';
import path from 'path';
import { Order, DownloadToken } from './types';

interface DatabaseData {
  orders: Record<string, Order>;
  downloadTokens: Record<string, DownloadToken>;
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

function ensureDb(): DatabaseData {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseData = {
      orders: {},
      downloadTokens: {},
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading DB file, resetting to empty state', err);
    return { orders: {}, downloadTokens: {} };
  }
}

function saveDb(data: DatabaseData) {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  const tempFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

// ---------------- Orders Operations ---------------- //
export async function createOrder(order: Order): Promise<Order> {
  const db = ensureDb();
  db.orders[order.id] = order;
  saveDb(db);
  return order;
}

export async function getOrder(orderId: string): Promise<Order | null> {
  const db = ensureDb();
  return db.orders[orderId] || null;
}

export async function updateOrder(orderId: string, updates: Partial<Order>): Promise<Order | null> {
  const db = ensureDb();
  const existing = db.orders[orderId];
  if (!existing) return null;

  const updated: Order = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  db.orders[orderId] = updated;
  saveDb(db);
  return updated;
}

export async function listOrders(): Promise<Order[]> {
  const db = ensureDb();
  return Object.values(db.orders).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// ---------------- Download Tokens Operations ---------------- //
export async function createDownloadToken(tokenData: DownloadToken): Promise<DownloadToken> {
  const db = ensureDb();
  db.downloadTokens[tokenData.token] = tokenData;
  saveDb(db);
  return tokenData;
}

export async function getDownloadToken(token: string): Promise<DownloadToken | null> {
  const db = ensureDb();
  return db.downloadTokens[token] || null;
}

export async function incrementDownloadCount(token: string): Promise<DownloadToken | null> {
  const db = ensureDb();
  const existing = db.downloadTokens[token];
  if (!existing) return null;

  existing.downloadCount += 1;
  db.downloadTokens[token] = existing;
  saveDb(db);
  return existing;
}
