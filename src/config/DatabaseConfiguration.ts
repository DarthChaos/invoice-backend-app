import { registerAs } from '@nestjs/config';

export default class DatabaseConfiguration {
  private postgres: () => {
    port: string | number;
    host: string;
    role: string;
    password: string;
    db: string;
  };

  getPostgresVars() {
    if (!this.postgres)
      this.postgres = registerAs('postgres', () => ({
        port: process.env.POSTGRES_PORT || 5432,
        host: process.env.POSTGRES_HOST || 'localhost',
        role: process.env.POSTGRES_ROLE,
        password: process.env.POSTGRES_ROLE_PASS || '',
        db: process.env.POSTGRES_DATABASE,
      }));

    return this.postgres;
  }
}
