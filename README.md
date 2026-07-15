# Scythe - CLI network client for REAPER

This is a CLI client for manipulating REAPER over UDP using the OSC (Open Sound Control) protocol.

Some examples:

```bash
# Toggle transport play/pause
scythe play

# Toggle track 2 mute
scythe mute track 2

# Toggle MASTER track mute (same as muting track 0)
scythe mute master

# Make a low-level OSC call when the built-in commands aren't enough.
# Here, sets the tempo to 150 BPM.
scythe osc send f/tempo/raw 150
```

## Usage

First, you must enable the OSC server in REAPER to allow the CLI to connect. Go to `Preferences` => `Control/OSC/Web` => `Add`. Then pick OSC (Open Sound Control) and configure the following settings:

| Setting     | Value |
|-------------|------|
| Device Name | Name it anything, `OSC Server` is fine. |
| Pattern config | Default |
| Mode | `Local port [receive only]` (`Local port` will also work, but I haven't implemented any two-way communication yet so it's a bit pointless.) |
| Local listen port | The CLI assumes port `8000` by default, but it can be overridden if you have a port conflict. So just put whatever isn't in use. |

Everything else should just be left default.

Then, assuming you have the executable in your `PATH`, you should be able to send commands to REAPER. I recommend pressing the `Listen...` button in the OSC settings dialog in REAPER to troubleshoot connectivity issues. You should see small messages come through when a command is run:

```bash
# Start playback. This should produce a /play event in the "Listen..." debug window in REAPER.
scythe play
```

That's pretty much it. Use `--help` in the CLI to help navigating the application.