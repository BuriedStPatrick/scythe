import type { ArgumentsCamelCase, Argv, CommandModule } from "yargs";
import { oscSendCommand } from "./send.command";

export const oscCommand: CommandModule = {
  command: 'osc',
  describe: 'Advanced low-level OSC communication with REAPER',
  builder: args => args
    .command(oscSendCommand),
  handler: function (): void {}
}
