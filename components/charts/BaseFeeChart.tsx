"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { formatUnits } from "viem";
import type { BlockStat } from "@/types";

interface Props { blocks: BlockStat[]; }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-cyan-500/20 bg-slate-900/90 backdrop-blur p-3 text-xs font-mono shadow-xl">
      <div className="text-slate-400">Block #{d.block}</div>
      <div className="text-cyan-400 font-bold">{d.baseFee} Gwei</div>
      <div className="text-slate-500">{d.txCount} txs · {d.pct}% gas used</div>
    </div>
  );
};

export function BaseFeeChart({ blocks }: Props) {
  const data = blocks.map(b => ({
    block: String(b.number),
    baseFee: b.baseFeePerGas
      ? Number(Number(formatUnits(b.baseFeePerGas, 9)).toFixed(4))
      : 0,
    gasUsed: b.pct,
    txCount: b.txCount,
    pct: b.pct,
  }));

  const avg = data.length
    ? data.reduce((s, d) => s + d.baseFee, 0) / data.length
    : 0;

  return (
    <div className="card-glow flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <span className="font-display text-sm font-bold tracking-wide text-slate-200">BASE FEE TREND</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-slate-500">
            avg: <span className="text-cyan-400">{avg.toFixed(4)} Gwei</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-cyan-400 inline-block" /> base fee
            <span className="w-3 h-0.5 bg-green-400/60 inline-block ml-2" /> gas %
          </div>
        </div>
      </div>

      {data.length < 2 ? (
        <div className="h-48 flex items-center justify-center text-slate-600 text-sm font-mono">
          Collecting block data…
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="baseFeeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#00d4ff" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gasUsedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.06)" strokeDasharray="3 3" />
            <XAxis
              dataKey="block"
              tick={{ fill: "#475569", fontSize: 10, fontFamily: "JetBrains Mono" }}
              tickFormatter={v => `#${v.slice(-4)}`}
              axisLine={false} tickLine={false}
            />
            <YAxis
              yAxisId="fee"
              tick={{ fill: "#475569", fontSize: 10, fontFamily: "JetBrains Mono" }}
              axisLine={false} tickLine={false} width={48}
              tickFormatter={v => `${v}G`}
            />
            <YAxis
              yAxisId="pct"
              orientation="right"
              tick={{ fill: "#475569", fontSize: 10, fontFamily: "JetBrains Mono" }}
              axisLine={false} tickLine={false} width={36}
              tickFormatter={v => `${v}%`}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            {avg > 0 && (
              <ReferenceLine
                yAxisId="fee"
                y={avg}
                stroke="#00d4ff"
                strokeDasharray="4 4"
                strokeOpacity={0.3}
              />
            )}
            <Area
              yAxisId="fee"
              type="monotone"
              dataKey="baseFee"
              stroke="#00d4ff"
              strokeWidth={2}
              fill="url(#baseFeeGrad)"
              dot={false}
              activeDot={{ r: 3, fill: "#00d4ff" }}
            />
            <Area
              yAxisId="pct"
              type="monotone"
              dataKey="gasUsed"
              stroke="#22c55e"
              strokeWidth={1.5}
              strokeOpacity={0.6}
              fill="url(#gasUsedGrad)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
