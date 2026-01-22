# PreferredMaxLatency

Preferred maximum latency (in seconds). Can be a number (applies to p50) or an object with percentile-specific cutoffs. Endpoints above the threshold(s) may still be used, but are deprioritized in routing. When using fallback models, this may cause a fallback model to be used instead of the primary model if it meets the threshold.


## Supported Types

### `number`

```typescript
const value: number = 5;
```

### `models.PercentileLatencyCutoffs`

```typescript
const value: models.PercentileLatencyCutoffs = {};
```

### `any`

```typescript
const value: any = 5;
```

