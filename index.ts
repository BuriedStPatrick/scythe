
import yargs from 'yargs/yargs'
import { getVersion } from './macros/version.ts' with { type: 'macro' };
import { oscCommand } from './commands/osc/osc.command.ts';

yargs(process.argv.splice(2))
  .version(getVersion())
  .scriptName('scythe')
  .command(oscCommand)
  .help()
  .argv