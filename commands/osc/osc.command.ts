import type { ArgumentsCamelCase, Argv, CommandModule } from "yargs";
import { oscSendCommand } from "./send.command";
import { Buffer } from 'node:buffer'

export const oscCommand: CommandModule = {
  command: 'osc',
  describe: 'Advanced low-level OSC communication with REAPER',
  builder: args => args
    .command(oscSendCommand),
  handler: function (): void {}
}

export function parseOscTypeTag(type: string, argument: string): string | undefined {
  switch (type) {
    case 's':
      return oscString(argument)
    case 'n':
      return oscFloat(Number.parseFloat(argument))
    case 'f':
      return oscFloat(Number.parseFloat(argument))
    case 'i':
        return oscInt32(Number.parseInt(argument))
    case 'b': {
      const value = (argument === 'true' || argument === '1')
        ? 1
        : 0

      return oscInt32(value)
    }
    default:
      return undefined
  }
}

export function pad4(buffer: Buffer) {
  const padding = (4 - (buffer.length % 4) % 4)

  return Buffer.concat([buffer, Buffer.alloc(padding)])
}

export function oscString(value: string): Buffer {
  return pad4(Buffer.from(`${value}\0`))
}

export function oscInt32(value: number): Buffer {
  const buffer = Buffer.alloc(4)

  buffer.writeInt32BE(value)

  return buffer
}

export function oscFloat(value: number): Buffer {
  const buffer = Buffer.alloc(4)

  buffer.writeFloatBE(value)

  return buffer
}