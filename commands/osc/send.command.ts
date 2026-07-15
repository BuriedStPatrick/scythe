import dgram from 'node:dgram'
import { Buffer } from 'node:buffer'
import osc from 'osc'
import type { Arguments, Argv, CommandModule } from "yargs"

export type OscTarget = {
  port: number,
  host: string
}

export type TypeTag = 't' | 's' | 'n' | 'f' | 'i' | 'b'

export type OscSendCommandArgs = {
  address: string
  type: TypeTag
  argument: string
} & OscTarget & Arguments

export const oscSendCommand: CommandModule = {
  command: 'send [address]',
  describe: 'Send an OSC command',
  aliases: ['s'],
  builder: (args: Argv<{}>) => args
    .positional('address', {
      type: 'string',
      describe: 'The address of the command',
      require: true
    })
    .option('type', {
      type: 'string',
      describe: 'The type tag to use. s = string, n = number (floating between 0-1), f = number (floating), i = number (integer), b = binary (boolean, 0 or 1), t = trigger',
      require: false,
      default: 't',
      choices: [
        't',
        's',
        'n',
        'f',
        'i',
        'b'
      ],
    })
    .option('argument', {
      type: 'string',
      describe: 'Argument to pass with command.',
      required: false
    })
    .option('port', {
      type: 'number',
      describe: 'The OSC server port',
      default: 8000
    })
    .option('host', {
      type: 'string',
      describe: 'The OSC server host',
      default: '127.0.0.1'
    }),
  handler: async (argv: OscSendCommandArgs) => {
    const socket = dgram.createSocket('udp4')

    const address = oscString(argv.address)
    const typeTag = oscString(`,${argv.type === 'b' ? 'i' : argv.type}`)
    let argument = undefined

    switch (argv.type) {
      case 's':
        argument = oscString(argv.argument)
        break
      case 'n':
        argument = oscFloat(Number.parseFloat(argv.argument))
        break
      case 'f':
        argument = oscFloat(Number.parseFloat(argv.argument))
        break
      case 'i':
          argument = oscInt32(Number.parseInt(argv.argument))
          break
      case 'b': {
        const value = (argv.argument === 'true' || argv.argument === '1')
          ? 1
          : 0

        argument = oscInt32(value)
        break
      }
      default:
        argument = undefined
    }

    const message = argument !== undefined
      ?
        Buffer.concat([
        address,
        typeTag,
        argument
      ])
      : Buffer.concat([address])

    socket.send(message, argv.port, argv.host, (err?: Error) => {
      socket.close()

      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
  }
}

function pad4(buffer: Buffer) {
  const padding = (4 - (buffer.length % 4) % 4)

  return Buffer.concat([buffer, Buffer.alloc(padding)])
}

function oscString(value: string): Buffer {
  return pad4(Buffer.from(`${value}\0`))
}

function oscInt32(value: number): Buffer {
  const buffer = Buffer.alloc(4)

  buffer.writeInt32BE(value)

  return buffer
}

function oscFloat(value: number): Buffer {
  const buffer = Buffer.alloc(4)

  buffer.writeFloatBE(value)

  return buffer
}