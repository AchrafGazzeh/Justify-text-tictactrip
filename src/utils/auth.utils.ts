import { v4 as uuidv4 } from 'uuid';
import { RedisType } from './types.utils';

export const generateToken = (): string => {
    return uuidv4();;
};
export const setToken = async (Client: RedisType, email: string, token: string): Promise<void> => {
  try {
      await Client.set(token, 0);
      await Client.expire(token, 60 * 60);
  } catch (error: unknown) {
      console.error(`Error setting token: ${(error as Error).message}`);
      throw error; 
  }
};

export const isAuthenticated = async (Client: RedisType, token: string): Promise<number> => {
  try {
      return await Client.exists(token);
  } catch (error: unknown) {
      console.error(`Error checking token existence: ${(error as Error).message}`);
      throw error;
  }
};


