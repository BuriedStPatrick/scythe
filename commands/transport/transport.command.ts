import type { CommandModule } from "yargs";
import { pauseCommand } from "./pause.command";
import { playCommand } from "./play.command";
import { stopCommand } from "./stop.command";

export const transportCommand: CommandModule = {
  command: 'transport',
  describe: 'Transport commands.',
  builder: args => args
    .command(playCommand)
    .command(pauseCommand)
    .command(stopCommand)
}