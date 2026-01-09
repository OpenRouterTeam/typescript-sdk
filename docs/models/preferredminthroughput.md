# PreferredMinThroughput

Preferred minimum throughput (in tokens per second). Can be a number (applies to p50) or an object with percentile-specific cutoffs. Endpoints below the threshold(s) may still be used, but are deprioritized in routing. When using fallback models, this may cause a fallback model to be used instead of the primary model if it meets the threshold.


## Supported Types

### `number`

```typescript
const value: number = 100;
```

### `models.PercentileThroughputCutoffs`

```typescript
const value: models.PercentileThroughputCutoffs = {};
```

### `any`

```typescript
const value: any = 100;
```

