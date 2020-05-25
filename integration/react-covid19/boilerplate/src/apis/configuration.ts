import { Configuration } from '@midwayjs/decorator';

@Configuration({
  importConfigs: [
    './config/config.default'
  ],
  imports: [
    '@midwayjs/faas-middleware-static'
  ]
})
export class ContainerConfiguration {}