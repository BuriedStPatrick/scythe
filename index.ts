
import yargs from 'yargs/yargs'
import { getVersion } from './macros/version.ts' with { type: 'macro' };
import { oscCommand } from './commands/osc/osc.command.ts';
import { muteCommand } from './commands/mute/mute.command.ts';
import { playCommand } from './commands/transport/play.command.ts';
import { stopCommand } from './commands/transport/stop.command.ts';
import { pauseCommand } from './commands/transport/pause.command.ts';
import { transportCommand } from './commands/transport/transport.command.ts';

yargs(process.argv.splice(2))
  .version(getVersion())
  .scriptName('scythe')
  .command(playCommand)
  .command(pauseCommand)
  .command(stopCommand)
  .command(muteCommand)
  .command(transportCommand)
  .command(oscCommand)
  .completion()
  .help()
  .argv