import { ApiProperty } from 'src/decorators/ApiProperty';

import { DemoDTO } from './DemoDTO';

export class DemoEntity {
  @ApiProperty({
    desc: 'prop1',
  })
  demo!: number;

  @ApiProperty({
    desc: 'DTO',
  })
  dto!: DemoDTO;
}
