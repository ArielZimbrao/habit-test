import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: config.get('PGHOST'),
        port: parseInt(config.get('PGPORT')),
        username: config.get('PGUSER'),
        password: config.get('PGPASSWORD'),
        database: config.get('PGNAME'),
        entities: [__dirname + '/entities/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
      });

      return dataSource.initialize();
    },
  },
];
