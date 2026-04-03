"use client";

import { useState, useCallback } from "react";
import { createPublicClient, http, isAddress } from "viem";
import { igra } from "@/lib/chain";
import type { AddressGas } from "@/types";

const client = createPublicClient({ chain: igra, transport: http() });

export function useAddressGas() {
  const [result, setResult] = useState<AddressGas | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = useCallback(async (address: string) => {
    if (!isAddress(address)) {
      setError("Invalid EVM address");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const txCount = await client.getTransactionCount({ address });
      // Approximate total gas via balance delta — real usage needs indexer
      setResult({
        address,
        txCount: BigInt(txCount),
        totalGasSpent: 0n, // requires indexer; shown as N/A
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lookup failed");
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, lookup };
}
