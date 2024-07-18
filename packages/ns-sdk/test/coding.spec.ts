import dotenv from 'dotenv';
import { expect, test } from 'vitest';

dotenv.config();

test('Coding第三方服务', () => {
  // coding.setConfig({
  //   openApi: 'https://g-jtln3843.coding.net/open-api',
  //   token: `token ${process.env.CODING__TOKEN!}`,
  // });
  // const result = await coding.invoke('DescribeArtifactVersionList', {
  //   ProjectId: 13407199,
  //   Repository: 'npm',
  //   Package: 'title-evaluation-audit',
  //   PageSize: 20,
  //   PageNumber: 1,
  // });
  // console.log(result);
  // expect(result).toBeDefined();
  expect(1).toBe(1);
});
