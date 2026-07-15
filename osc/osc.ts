import dgram from 'node:dgram'
import { Buffer } from 'node:buffer'

export type OscConnection = {
  host: string
  port: number
}

export type OscCommandType = 't' | 's' | 'n' | 'f' | 'i' | 'b'

export type OscCommand = {
  address: string
  type: OscCommandType
  argument?: string
} & OscConnection

export function send(command: OscCommand) {
  const message = command.argument !== undefined
    ? Buffer.concat([
        oscString(command.address),
        oscString(`,${command.type === 'b' ? 'i' : command.type}`),
        parseOscTypeTag(command.type, command.argument)
      ])
    : Buffer.concat([
        oscString(command.address)
      ])

  const socket = dgram.createSocket('udp4')
  socket.send(message, command.port, command.host, (err?: Error) => {
    socket.close()

    if (err) {
      throw err
    }
  })
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

export function pad4(buffer: Buffer): Buffer {
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