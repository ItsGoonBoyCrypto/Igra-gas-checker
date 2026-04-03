export interface GasSnapshot {
  baseFee: bigint;
  low: bigint;
  avg: bigint;
  high: bigint;
  maxPriorityFee: bigint;
  timestamp: number;
}

export interface BlockStat {
  number: bigint;
  gasUsed: bigint;
  gasLimit: bigint;
  baseFeePerGas: bigint | null;
  timestamp: bigint;
  txCount: number;
  pct: number;
}

export interface TxRow {
  hash: string;
  from: string;
  to: string | null;
  gasPrice: bigint;
  gasUsed: bigint;
  value: bigint;
}

export interface AddressGas {
  address: string;
  txCount: bigint;
  totalGasSpent: bigint; // in wei
}
