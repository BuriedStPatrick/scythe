import type { Arguments, Argv, CommandModule } from "yargs"
import { send, type OscCommandType, type OscConnection } from '../../osc/osc'

export type OscSendCommandArgs = {
  address: string
  value: string
} & OscConnection & Arguments

export const oscSendCommand: CommandModule = {
  command: 'send <address> [value]',
  describe: 'Send an OSC command',
  aliases: ['s'],
  builder: (args: Argv<{}>) => args
    .example('$0 osc send f/tempo/raw 150', 'Set the tempo to 150 BPM')
    .example('$0 osc send t/play', 'Play/Pause')
    .positional('address', {
      type: 'string',
      describe: `The address of the command. Must be of format '<type>/<address>', such as 't/play', 'f/tempo/raw', etc.`,
      require: true
    })
    .positional('value', {
      type: 'string',
      describe: 'Value to pass with command.',
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
    const addressSplit = argv.address.split('/')

    if (!addressSplit.length) {
      throw new Error(`Address format invalid`)
    }

    const address = `/${addressSplit.slice(1).join('/')}`
    const type = addressSplit[0] as OscCommandType

    if (!type || !['t', 's', 'n', 'f', 'i', 'b'].includes(type)) {
      throw new Error(`Address must be prefixed with format. See examples.`)
    }

    send({
      address: address,
      host: argv.host,
      port: argv.port,
      type: type,
      argument: argv.value
    })
  }
}