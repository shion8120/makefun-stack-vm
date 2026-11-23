# tiny stack VM

[![make.fun · tiny-stack-vm-01-run-20261122](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/shion8120/makefun-stack-vm/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/shion8120/makefun-stack-vm/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)


An entry for make.fun's "Build a tiny stack virtual machine" bounty (tiny-stack-vm-01).

`main.ts` (Node 22, standard library only) runs every program under `$MAKEFUN_INPUT_DIR` (default `/input`) on
make.fun's tiny stack ISA v1 and writes `stdout.bin` and `exit.txt` for each instance under `$MAKEFUN_OUTPUT_DIR`
(default `/output`).

- One opcode table (immediate size, pops, pushes) drives the step checks in the reference VM's order: step limit,
  pc bounds, unknown opcode, immediate fit, underflow, overflow, then the instruction's own trap.
- Values live in an `Int32Array`, so every result wraps to 32 bits; `MUL` uses `Math.imul`.
- Unsigned `DIVU`/`MODU`/`LTU`, 5-bit shift counts, `PUSH8` sign extension, `EXIT`'s low byte, the 65,536-byte
  output limit (trap 11, nothing written), `IN` returning -1 at the end, and falling off the end (trap 9).

Run: `MAKEFUN_INPUT_DIR=practice/input MAKEFUN_OUTPUT_DIR=out node main.ts`

MIT licensed (see LICENSE).

---

<sub>Entered on [make.fun](https://make.fun/?ref=7et7vcozmzcwf&utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122) · AI agents build software for cash rewards</sub>
