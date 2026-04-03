# API Reference

All data fetching uses standard **Ethereum JSON-RPC 2.0** methods via `viem`. No custom backend is required.

## RPC Methods Used

### `eth_getBlockByNumber`

Fetches the latest block including full transaction objects.

```typescript
const block = await client.getBlock({ includeTransactions: true });
```

**Returns (relevant fields):**

| Field              | Type      | Description                        |
|--------------------|-----------|------------------------------------|
| `number`           | `bigint`  | Block height                       |
| `baseFeePerGas`    | `bigint`  | Base fee in wei (EIP-1559)         |
| `gasUsed`          | `bigint`  | Total gas used by all transactions |
| `gasLimit`         | `bigint`  | Maximum gas allowed in block       |
| `timestamp`        | `bigint`  | Unix timestamp                     |
| `transactions`     | `array`   | Full transaction objects           |

---

### `eth_feeHistory`

Fetches historical base fees and priority fee percentiles.

```typescript
const feeHistory = await client.getFeeHistory({
  blockCount: 5,
  rewardPercentiles: [25, 50, 75],
});
```

**Returns (relevant fields):**

| Field         | Type          | Description                                |
|---------------|---------------|--------------------------------------------|
| `baseFeePerGas` | `bigint[]`  | Base fees for each block in range          |
| `reward`      | `bigint[][]`  | Priority fee percentiles per block         |
| `gasUsedRatio`| `number[]`    | Gas used / gas limit ratio per block       |

---

### `eth_getTransactionCount`

Returns the number of transactions sent from an address.

```typescript
const txCount = await client.getTransactionCount({ address });
```

---

## Hooks API

### `useGasData(autoRefresh, intervalMs?)`

```typescript
const {
  snapshot,    // GasSnapshot | null
  blocks,      // BlockStat[]   — last 20 blocks
  topTxs,      // TxRow[]       — top gas txs from latest block
  tps,         // number        — transactions per second
  loading,     // boolean
  error,       // string | null
  refresh,     // () => void    — manual trigger
} = useGasData(true, 10_000);
```

### `useAddressGas()`

```typescript
const {
  result,   // AddressGas | null
  loading,  // boolean
  error,    // string | null
  lookup,   // (address: string) => Promise<void>
} = useAddressGas();
```

### `useIKasPrice()`

```typescript
const priceUsd: number = useIKasPrice();
// Returns Kaspa USD price from CoinGecko as iKAS proxy
```

---

## Types

```typescript
interface GasSnapshot {
  baseFee:        bigint;   // wei
  low:            bigint;   // wei — 25th pct
  avg:            bigint;   // wei — 50th pct
  high:           bigint;   // wei — 75th pct
  maxPriorityFee: bigint;   // wei
  timestamp:      number;   // ms since epoch
}

interface BlockStat {
  number:        bigint;
  gasUsed:       bigint;
  gasLimit:      bigint;
  baseFeePerGas: bigint | null;
  timestamp:     bigint;
  txCount:       number;
  pct:           number;    // 0–100
}

interface TxRow {
  hash:      string;
  from:      string;
  to:        string | null;
  gasPrice:  bigint;
  gasUsed:   bigint;
  value:     bigint;
}

interface AddressGas {
  address:       string;
  txCount:       bigint;
  totalGasSpent: bigint;  // wei; 0n if no indexer
}
```

---

## Environment Variables

| Variable                               | Required | Default                       |
|----------------------------------------|----------|-------------------------------|
| `NEXT_PUBLIC_RPC_URL`                  | No       | `https://rpc.igra.network`    |
| `NEXT_PUBLIC_EXPLORER_API`             | No       | `https://explorer.igra.network/api` |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Yes*     | —                             |
| `NEXT_PUBLIC_CHAIN_ID`                 | No       | `69420`                       |

> *Required for WalletConnect to work. MetaMask (injected) works without it.
