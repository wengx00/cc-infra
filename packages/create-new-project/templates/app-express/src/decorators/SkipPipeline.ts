export default function SkipPipeline(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('skipPipeline', true, target);
  };
}
