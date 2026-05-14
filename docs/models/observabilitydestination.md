# ObservabilityDestination


## Supported Types

### `models.ObservabilityDestinationArize`

```typescript
const value: models.ObservabilityDestinationArize = {
  apiKeyIds: null,
  config: {
    apiKey: "<value>",
    baseUrl: "https://us.cloud.langfuse.com",
    modelId: "<id>",
    spaceKey: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "arize",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationBraintrust`

```typescript
const value: models.ObservabilityDestinationBraintrust = {
  apiKeyIds: null,
  config: {
    apiKey: "<value>",
    baseUrl: "https://us.cloud.langfuse.com",
    projectId: "<id>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "braintrust",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationClickhouse`

```typescript
const value: models.ObservabilityDestinationClickhouse = {
  apiKeyIds: null,
  config: {
    database: "<value>",
    host: "swift-alb.com",
    password: "DPwOvx4ikweQiWB",
    username: "Edna_Wolff45",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "clickhouse",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationDatadog`

```typescript
const value: models.ObservabilityDestinationDatadog = {
  apiKeyIds: null,
  config: {
    apiKey: "<value>",
    mlApp: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "datadog",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationGrafana`

```typescript
const value: models.ObservabilityDestinationGrafana = {
  apiKeyIds: null,
  config: {
    apiKey: "<value>",
    baseUrl: "https://us.cloud.langfuse.com",
    instanceId: "<id>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "grafana",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationLangfuse`

```typescript
const value: models.ObservabilityDestinationLangfuse = {
  apiKeyIds: null,
  config: {
    publicKey: "pk-l...EfGh",
    secretKey: "sk-l...AbCd",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "langfuse",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationLangsmith`

```typescript
const value: models.ObservabilityDestinationLangsmith = {
  apiKeyIds: null,
  config: {
    apiKey: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "langsmith",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationNewrelic`

```typescript
const value: models.ObservabilityDestinationNewrelic = {
  apiKeyIds: null,
  config: {
    licenseKey: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "newrelic",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationOpik`

```typescript
const value: models.ObservabilityDestinationOpik = {
  apiKeyIds: null,
  config: {
    apiKey: "<value>",
    projectName: "<value>",
    workspace: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "opik",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationOtelCollector`

```typescript
const value: models.ObservabilityDestinationOtelCollector = {
  apiKeyIds: null,
  config: {
    endpoint: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "otel-collector",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationPosthog`

```typescript
const value: models.ObservabilityDestinationPosthog = {
  apiKeyIds: null,
  config: {
    apiKey: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "posthog",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationRamp`

```typescript
const value: models.ObservabilityDestinationRamp = {
  apiKeyIds: null,
  config: {
    apiKey: "<value>",
    baseUrl: "https://us.cloud.langfuse.com",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "ramp",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationS3`

```typescript
const value: models.ObservabilityDestinationS3 = {
  apiKeyIds: null,
  config: {
    accessKeyId: "<id>",
    bucketName: "<value>",
    secretAccessKey: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "s3",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationSentry`

```typescript
const value: models.ObservabilityDestinationSentry = {
  apiKeyIds: null,
  config: {
    dsn: "<value>",
    otlpEndpoint: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "sentry",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationSnowflake`

```typescript
const value: models.ObservabilityDestinationSnowflake = {
  apiKeyIds: null,
  config: {
    account: "01202639",
    token: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "snowflake",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationWeave`

```typescript
const value: models.ObservabilityDestinationWeave = {
  apiKeyIds: null,
  config: {
    apiKey: "<value>",
    baseUrl: "https://us.cloud.langfuse.com",
    entity: "<value>",
    project: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "weave",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

### `models.ObservabilityDestinationWebhook`

```typescript
const value: models.ObservabilityDestinationWebhook = {
  apiKeyIds: null,
  config: {
    url: "https://scornful-experience.org",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "webhook",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

