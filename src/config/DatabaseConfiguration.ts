import { registerAs } from '@nestjs/config';
import { Observer, Subject } from 'rxjs';

export default class DatabaseConfiguration {
  private subject: Subject<any> = new Subject();
  private postgres: () => {
    port: string | number;
    host: string;
    role: string;
    password: string;
    db: string;
  };

  getPostgresVars() {
    if (!this.postgres) {
      this.postgres = registerAs('postgres', () => ({
        port: process.env.POSTGRES_PORT || 5432,
        host: process.env.POSTGRES_HOST || 'localhost',
        role: process.env.POSTGRES_ROLE,
        password: process.env.POSTGRES_ROLE_PASS || '',
        db: process.env.POSTGRES_DATABASE,
      }));

      this.subject.next(this.postgres().port);
    } else {
      this.subject.complete();
    }

    return this.postgres;
  }

  subscribe(observer: Observer<any>): void {
    this.subject.subscribe(observer);
  }
}
