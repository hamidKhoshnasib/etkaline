export function createFeatureQueryKey<const TScope extends string, const TFeature extends string>(
  scope: TScope,
  feature: TFeature,
) {
  return <const TSegments extends readonly unknown[]>(...segments: TSegments) =>
    [scope, feature, ...segments] as const;
}
