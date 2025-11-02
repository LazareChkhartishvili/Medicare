// Global logger utility using Reactotron
export const logger = {
  log: (message: string, ...args: any[]) => {
    if (__DEV__ && (global as any).__REACTOTRON__) {
      (global as any).__REACTOTRON__.log(message, ...args);
    } else {
      console.log(message, ...args);
    }
  },

  error: (message: string, ...args: any[]) => {
    if (__DEV__ && (global as any).__REACTOTRON__) {
      (global as any).__REACTOTRON__.error(message, ...args);
    } else {
      console.error(message, ...args);
    }
  },

  warn: (message: string, ...args: any[]) => {
    if (__DEV__ && (global as any).__REACTOTRON__) {
      (global as any).__REACTOTRON__.warn(message, ...args);
    } else {
      console.warn(message, ...args);
    }
  },

  info: (message: string, ...args: any[]) => {
    if (__DEV__ && (global as any).__REACTOTRON__) {
      (global as any).__REACTOTRON__.info(message, ...args);
    } else {
      console.info(message, ...args);
    }
  },

  // API specific logging
  api: {
    request: (method: string, url: string, data?: any) => {
      logger.log(`🌐 API ${method}: ${url}`, data);
    },
    response: (method: string, url: string, data: any) => {
      logger.log(`✅ API ${method} Success: ${url}`, data);
    },
    error: (method: string, url: string, error: any) => {
      logger.error(`❌ API ${method} Error: ${url}`, error);
    }
  },

  // Auth specific logging
  auth: {
    login: (email: string) => {
      logger.log('🔐 Login attempt:', email);
    },
    loginSuccess: (user: any) => {
      logger.log('✅ Login successful:', user);
    },
    register: (email: string, role: string) => {
      logger.log('📝 Register attempt:', email, role);
    },
    registerSuccess: (user: any) => {
      logger.log('✅ Register successful:', user);
    },
    logout: () => {
      logger.log('🚪 Logout');
    }
  }
};
