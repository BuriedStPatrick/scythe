import dgram from 'node:dgram'
import { Buffer } from 'node:buffer'
import { oscString, parseOscTypeTag } from '../commands/osc/osc.command'

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