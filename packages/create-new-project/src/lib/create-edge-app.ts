import { resolve } from 'path';

import chalk from 'chalk';
import { copy, readFile, rm, writeFile } from 'fs-extra';

export default async function createEdgeApp(
  projectName: string,
  templatePath: string,
  targetPath: string
) {
  await new Promise((resolve, reject) => {
    copy(templatePath, targetPath, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(targetPath);
    });
  });
  const packageJson = await readFile(resolve(targetPath, 'package.template.json'), 'utf-8');
  await writeFile(
    resolve(targetPath, 'package.json'),
    packageJson.replace(/\{\{PROJECT_NAME\}\}/g, projectName),
    'utf-8'
  );
  await rm(resolve(targetPath, 'package.template.json'));
  const readme = await readFile(resolve(targetPath, 'README.md'), 'utf-8');
  await writeFile(
    resolve(targetPath, 'README.md'),
    readme.replace(/\{\{PROJECT_NAME\}\}/g, projectName),
    'utf-8'
  );
  const config = await readFile(resolve(targetPath, 'wrangler.toml'), 'utf-8');
  await writeFile(
    resolve(targetPath, 'wrangler.toml'),
    config.replace(/\{\{PROJECT_NAME\}\}/g, projectName),
    'utf-8'
  );
  console.log(chalk.green('📦 生成项目模版成功'));
  const workflow = await readFile(resolve(templatePath, '../.ci/app-edge.template.yml'), 'utf-8');
  await writeFile(
    resolve(process.cwd(), `.github/workflows/app__${projectName}.yml`),
    workflow.replace(/\{\{PROJECT_NAME\}\}/g, projectName),
    'utf-8'
  );
  console.log(chalk.green('🎉 生成流水线成功 -> ', `./.github/workflows/app__${projectName}.yml`));
}
