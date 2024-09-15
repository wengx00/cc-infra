export interface BasicInfo {
  title: string;
  desc?: string;
  version?: string;
  tags?: string[];
}

export function generateBasicInfo(info: BasicInfo) {
  const { title, desc: description = '', version = '1.0.0', tags = [] } = info;
  return {
    openapi: '3.0.0',
    info: {
      title,
      description,
      version,
    },
    tags: tags.map((item) => ({ name: item })),
  };
}
