import type { Arguments, Argv, CommandModule } from "yargs"
import { send, type OscCommandType, type OscConnection } from '../../osc/osc'

export type OscSendCommandArgs = {
  address: string
  type: OscCommandType
  argument: string
} & OscConnection & Arguments

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
    try {
      send({
        address: argv.address,
        host: argv.host,
        port: argv.port,
        type: argv.type,
        argument: argv.argument
      })
    } catch(err) {
      console.error(err)

      process.exit(1)
    }
  }
}