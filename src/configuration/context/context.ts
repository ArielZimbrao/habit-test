import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class Context {
  private map: Map<string, any> = new Map();

  getKey(key: ContextKey) {
    return this.map.get(key);
  }

  setKey(key: ContextKey, value: any) {
    this.map.set(key, value);
  }

  getToken() {
    return this.map.get(ContextKey.TOKEN);
  }

  getUser(): {
    id: string;
    email: string;
    role: string;
    application_id: string;
  } {
    return this.map.get(ContextKey.USER);
  }

  getApplicationId() {
    const userContext = this.getUser();
    return userContext?.application_id || null;
  }
}

export enum ContextKey {
  TOKEN = 'TOKEN',
  USER = 'USER',
}
