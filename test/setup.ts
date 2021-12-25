import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (e) {
    console.log(e);
  }
});

global.afterEach(async () => {
  try {
    const conn = getConnection();
    await conn.close();
  } catch (e) {}
});
