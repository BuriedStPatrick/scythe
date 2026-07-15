import type { CommandModule } from "yargs";
import { muteToggleTrackCommand } from "./mute-toggle-track.command";
import { muteToggleMasterCommand } from "./mute-toggle-master.command";

export const muteToggleCommand: CommandModule = {
  command: 'toggle',
  describe: 'Mute toggle target.',
  builder: (args) => args
    .demandCommand(1)
    .command(muteToggleTrackCommand)
    .command(muteToggleMasterCommand)
}