import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mangoDB',
  connector: 'mongodb',
  url: 'mongodb+srv://kalidas:kalidas@loopbackcluster.errng.mongodb.net/userapi?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MangoDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mangoDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mangoDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
