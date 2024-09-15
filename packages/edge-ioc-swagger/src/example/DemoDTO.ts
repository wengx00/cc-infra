import { ApiProperty } from 'src/decorators/ApiProperty';

export class DemoDTO {
  @ApiProperty({
    desc: 'age',
    required: true,
  })
  age!: number;
}
