import type { CommandModule } from "yargs";
import { muteTrackCommand } from "./mute-track.command";
import { muteMasterCommand } from "./mute-master.command";
import { muteToggleCommand } from "./toggle/mute-toggle.command";

export const muteCommand: CommandModule = {
  command: 'mute',
  describe: 'Mute target.',
  builder: (args) => args
    .demandCommand(1)
    .command(muteToggleCommand)
    .command(muteTrackCommand)
    .command(muteMasterCommand)
}