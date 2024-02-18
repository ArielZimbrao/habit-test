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
    id: number;
    email: string;
    role: string;
    application_id: string;
  } {
    return this.map.get(ContextKey.USER);
  }

  getApplicationId() {
    return this.getUser().application_id;
  }
}

export enum ContextKey {
  TOKEN = 'TOKEN',
  USER = 'USER',
}
